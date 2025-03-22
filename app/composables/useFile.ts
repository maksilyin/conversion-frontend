import {FILE_STATUS} from "~/utils/constants";
import type {UploadFile} from "~/types/UploadFile";
import {downloadFile} from "~/utils/functions";

export const useFile = (uploadFile: UploadFile|null = null, hash: string | boolean = false) => {
    const api = useApi();
    const { t } = useI18n();
    const toast = useToast();
    const { files, deleteFile2 } = useUploader();
    const { uuid } = useTask();
    const isProcessingFile = ref(false);
    const file = ref(uploadFile)
    const processing = reactive<Record<string, boolean>>({
        download: false,
        remove: false
    })

    if (!uploadFile) {
        const f = files.value.find(file => {
            return file.hash === hash
        })

        if (f) {
            file.value = f;
        }
    }

    const removeFile = async () => {
        if (file.value && file.value.hash) {
            setStatus(FILE_STATUS.DELETE)
            file.value.progress = 0;

            try {
                const timeout = setTimeout(() => {
                    if (!file.value) {
                        return;
                    }
                    file.value.progress = 70;
                }, 200)

                setProcessing('remove', true);

                await api.callApi('file.delete', {
                    hash: file.value.hash,
                    task: uuid.value,
                    filename: file.value.filename,
                });
                clearTimeout(timeout)
                file.value.progress = 100;

                setTimeout(() => {
                    if (file.value && file.value.hash) {
                        deleteFile2(file.value.hash)
                    }
                }, 100)
            } catch (e: any) {
                showError(e.message)
            } finally {
                setProcessing('remove', false);
            }
        }
    }

    const downloadResultFile = async (index = 0) => {
        if (!file.value) {
            return;
        }
        if (file.value.status !== FILE_STATUS.COMPLETED || !file.value.result || file.value.result.length - 1 < index) {
            return;
        }

        const headers = {
            Accept: 'application/octet-stream',
        }
        const fileResult = file.value.result[index];

        setProcessing('download', true);

        api.callApi<BlobPart>('file.download', {
            task: uuid.value,
            hash: hash,
        }, headers, 'blob').then((res) => {
            const blob = new Blob([res], {type: fileResult.mimetype});
            downloadFile(blob, fileResult.originalName);
        }).catch(e => {
            showError(e.message)
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
        if (!file.value) {
            return;
        }

        file.value[key] = value;
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

    const showError = (message: string) => {
        toast.add({ title: t('error.notify'), description: message, color: 'red' })
    }

    return {
        removeFile,
        downloadResultFile,
        file,
        processingFile,
        isDownloadProcessingFile,
        isRemoveProcessingFile,
    }
}