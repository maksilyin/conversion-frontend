import {FILE_STATUS} from "~/utils/constants";
import type {UploadFile} from "~/types/UploadFile";
import {downloadFile} from "~/utils/functions";

export const useFile = (hash: string) => {
    const api = useApi();
    const { getFile, deleteFile2 } = useUploader();
    const { uuid } = useTask();
    const file = getFile(hash);
    const isProcessingFile = ref(false);
    const processing = reactive<Record<string, boolean>>({
        download: false,
        remove: false
    })

    const removeFile = async () => {
        setStatus(FILE_STATUS.DELETE)
        file.progress = 0;

        try {
            const timeout = setTimeout(() => {
                file.progress = 70;
            }, 200)

            setProcessing('remove', true);

            await api.callApi('file.delete', {
                hash,
                task: uuid.value,
                filename: file.filename,
            });
            clearTimeout(timeout)
            file.progress = 100;

            setTimeout(() => {
                deleteFile2(hash)
            }, 100)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setProcessing('remove', false);
        }
    }

    const downloadResultFile = async (index = 0) => {
        if (file.status !== FILE_STATUS.COMPLETED || !file.result || file.result.length - 1 < index) {
            return;
        }

        const headers = {
            Accept: 'application/octet-stream',
        }
        const fileResult = file.result[index];

        setProcessing('download', true);

        api.callApi<BlobPart>('file.download', {
            task: uuid.value,
            hash: hash,
        }, headers, 'blob').then((res) => {
            const blob = new Blob([res], {type: fileResult.mimetype});
            downloadFile(blob, fileResult.originalName);
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            setProcessing('download', false);
        })
    }

    const setStatus = (status: number, message: any = null) => {
        setValue('status', status);

        if (message) {
            setValue('message', message);
        }
    }

    const setValue = <K extends keyof UploadFile> (key: K, value: UploadFile[K]) => {
        file[key] = value;
    }

    const setProcessing = (key: string, value: boolean) => {
        if (key in processing) {
            processing[key] = value;
        }
        let mainProcessing = false;

        Object.values(processing).forEach(valueItem => {
            if (valueItem) {
                mainProcessing = true;
            }
        });

        isProcessingFile.value = mainProcessing;
    }

    const isDownloadProcessingFile = computed(() => {
        return processing.download;
    })

    const isRemoveProcessingFile = computed(() => {
        return processing.remove;
    })

    const processingFile = computed(() => {
        return {
            processing: isProcessingFile,
            ...processing
        }
    })

    return {
        removeFile,
        downloadResultFile,
        file,
        processingFile,
        isDownloadProcessingFile,
        isRemoveProcessingFile,
    }
}