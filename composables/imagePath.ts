import type {ImagePath} from "~/types/ImagePath";

export const imagePath = () => {
    const { public: { FILE_URL, STORAGE_URL } } = useRuntimeConfig();
    const baseFileUrl = FILE_URL || '/img/';
    const storageFileUrl = STORAGE_URL || '/img/';
    const getImagePath = (task: string, fileName: string):ImagePath => {
        return {
            src: `${baseFileUrl}${task}/${fileName}`
        }
    }

    const getStoragePath = (source: string):ImagePath => {
        return {
            src: `${storageFileUrl}${source}`
        }
    }

    return {
        getImagePath,
        getStoragePath
    }
}