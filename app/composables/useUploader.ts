import { FILE_STATUS } from "~/utils/constants"
import type {UploadFile} from "~/types/UploadFile";
import type {ChunkResult} from "~/types/ChunkResult";
import { downloadFile } from "~/utils/functions"
interface UploaderParams {
    chunkSize: number,
    maxRetries: number,
    ext?: string[]
}

const defaultParams:UploaderParams = {
    chunkSize: 1024 * 1024,
    maxRetries: 3,
    ext: []
}

const files: Record<string, UploadFile> = reactive({});
const filesToUpload: UploadFile[] = reactive([]);
const defaultFileParams = ref({});
const isDownloadZipLoading = ref(false);
let fileIndex = 0;
export const useUploader = () => {
    const api = useApi();
    const { getFirstSiblingsFormat } = useFormats();
    const upload = (formData: FormData):Promise<ChunkResult> => {
        return api.callApi('file.upload', formData);
    }
    const deleteFile = async (hash: string, uuid: string) => {
        if (hash in files) {
            setFileStatus(hash, FILE_STATUS.DELETE)
            const file = files[hash];
            file.progress = 0;

            try {
                const timeout = setTimeout(() => {
                    file.progress = 70;
                }, 200)
                await api.callApi('file.delete', {
                    hash,
                    task: uuid,
                    filename: file.filename,
                });
                clearTimeout(timeout)
                file.progress = 100;

                setTimeout(() => {
                    delete files[hash];
                }, 100)
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const downloadResult = async (hash: string, uuid: string, index = 0) => {
        if (hash in files) {
            const file = files[hash];

            if (!file.result || file.result.length - 1 < index) {
                return;
            }

            const headers = {
                Accept: 'application/octet-stream',
            }

            const fileResult = file.result[index];

            api.callApi<BlobPart>('file.download', {
                task: uuid,
                hash: hash,
            }, headers, 'blob').then((res) => {
                const blob = new Blob([res], {type: fileResult.mimetype});
                downloadFile(blob, fileResult.originalName);
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const downloadZip = async (uuid: string) => {
        isDownloadZipLoading.value = true;
        const headers = {
            Accept: 'application/octet-stream',
        }
        api.callApi<BlobPart>('file.download.all', {
            task: uuid,
        }, headers, 'blob').then((res) => {
            const blob = new Blob([res]);
            downloadFile(blob, 'archive.zip');
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            isDownloadZipLoading.value = false;
        })
    }

    const createFile = (data: object) => {
        const params = {
            ...data
        };
        return api.callApi<string>('file.create', params);
    }

    const setInputFiles = (inputFiles: File[]) => {
        inputFiles.forEach(file => {
            addFile({
                file,
                size: file.size,
                filename: file.name,
                progress: 0,
                status: FILE_STATUS.ADD,
                mimetype: file.type,
            })
        });
    }

    const setFromPayload = (data: UploadFile[]) => {
        data.forEach(file => {
            if (!file.params) {
                file.params = defaultFileParams.value
            }
            setFile(file.hash, {
                ...file,
                index: getIndex(),
                progress: 100,
            })
        })
    }

    const addFile = (params: any = {}) => {
        if (!params?.params) {
            params.params = Object.assign({}, defaultFileParams.value);
        }

        const fileData = {
            progress: 0,
            index: getIndex(),
            status: FILE_STATUS.ADD,
            ...params,
        }

        filesToUpload.push(fileData)

        const arrayIndex = filesToUpload.findIndex(file => file.index === fileData.index);

        return filesToUpload[arrayIndex];
    }

    const getIndex = () => {
        return fileIndex++;
    }

    const addCreatedFile = (hash: string, index: number) => {
        const arrayIndex = filesToUpload.findIndex(file => file.index === index);
        const file = filesToUpload.splice(arrayIndex, 1)[0];
        file.status = FILE_STATUS.CREATED
        file.hash = hash;

        return setFile(hash, file);
    }

    const setFile = (hash: string, params: UploadFile) => {
        files[hash] = params;
        return files[hash];
    }

    const setFileStatus = (hash: string, status: number, message: any = null) => {
        setValue('status', hash, status);

        if (message) {
            setValue('message', hash, message);
        }
    }

    const setFileProgress = (hash:string, value: number) => {
        setValue('progress', hash, value);
    }

    const setFileParams = (hash: string, params= {}) => {
        setValue('params', hash, params);
    }

    const addParam = (hash: string, key: string, value: any) => {
        const file = files[hash];

        if (!file.params) {
            file.params = {};
        }

        file.params[key] = value;
    }

    const setValue = <K extends keyof UploadFile> (key: K, hash: string, value: UploadFile[K]) => {
        if (hash in files) {
            files[hash][key] = value;
        }
    }

    const filesArray = computed(() => {
        return [...Object.values(files), ...filesToUpload].sort((a, b) => a.index - b.index);
    })

    const uploadFile = async (file: File, hash: string, uuid: string, chunkSize: number, maxRetries: number) => {
        const totalChunks = Math.ceil(file.size / chunkSize);
        let chunkIndex = 1;
        let retries = 0;

        setFileStatus(hash, FILE_STATUS.LOADING);
        const uploadNext = async (hash: string) => {
            const start = (chunkIndex - 1) * chunkSize;
            const end = Math.min(file.size, start + chunkSize);
            const chunk = file.slice(start, end);
            const formData = new FormData();
            formData.append('file', chunk, file.name);
            formData.append('index', chunkIndex.toString());
            formData.append('total', totalChunks.toString());
            formData.append('task', uuid);
            formData.append('hash', hash);
            formData.append('size', file.size.toString());
            formData.append('filename', file.name);

            try {
                const res = await upload(formData);

                if (res.status && totalChunks > chunkIndex) {
                    const progress = chunkIndex / totalChunks * 100;
                    setFileProgress(hash, progress)
                    chunkIndex++;
                    await uploadNext(res.hash);
                }
                else if (res.status) {
                    setFileProgress(hash, 100)
                    files[hash].extension = res.extension;
                    files[hash].mimetype = res.mimetype;
                    files[hash].size = res.size || 0;
                    files[hash].filename = file.name;

                    if (res.extension && !files[hash].params.convert?.length) {
                        const firstFormat = getFirstSiblingsFormat(res.extension);

                        if (firstFormat) {
                            files[hash].params.convert = [firstFormat]
                        }
                    }

                    setFileStatus(hash, FILE_STATUS.UPLOADED);
                }
            }
            catch (e: any) {
                retries++;

                if (e.status >= 500 && retries < maxRetries) {
                    await uploadNext(hash);
                }
                else {
                    const errorMessage = e?.response?.data?.error || 'Upload failed';
                    setFileStatus(hash, FILE_STATUS.ERROR, errorMessage);
                    console.error(e);
                }
            }
        };
        await uploadNext(hash);
    }

    const getFile = (hash: string) => {
        return files[hash]
    }

    const setDefaultFileParams = (params: any = {}) => {
        defaultFileParams.value = params;
    }

    const unmount = () => {
        Object.keys(files).forEach((key) => {
            delete files[key];
        });
    }

    const deleteFile2 = (hash: string) => {
        delete files[hash];
    }

    return {
        files: filesArray,
        addFile,
        setInputFiles,
        uploadFile,
        deleteFile,
        setFileParams,
        getFile,
        setFile,
        addParam,
        setFromPayload,
        downloadResult,
        downloadZip,
        setDefaultFileParams,
        unmount,
        isDownloadZipLoading,
        setFileStatus,
        createFile,
        addCreatedFile,
        deleteFile2,
    }
}