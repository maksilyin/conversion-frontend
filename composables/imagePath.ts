import type {ImagePath} from "~/types/ImagePath";

export const imagePath = () => {
    const { public: { FILE_URL } } = useRuntimeConfig();
    const baseFileUrl = FILE_URL || '/img/';
    const getImagePath = (task: string, source: string):ImagePath => {
        return {
            src: `${baseFileUrl}${task}/${source}`
        }
    }

    return {
        getImagePath
    }
}