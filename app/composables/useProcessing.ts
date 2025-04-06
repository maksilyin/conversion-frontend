export const useProcessing = () => {
    const { isDownloadZipLoading, downLoadZipProgress} = useUploader();
    const { isProcessingTask } = useTask();
    const isSomeProcessing = computed(() => {
        return isProcessingTask.value || isDownloadZipLoading.value
    })

    return {
        isSomeProcessing,
        isProcessingTask,
        isDownloadZipLoading,
        downLoadZipProgress,
    }
}