import { mimeTypes } from "~/collections/mimetype"

export const useMimeTypes = (mimetype: string) => {
    const fileColor = () => {
        if (mimetype in mimeTypes && 'color' in mimeTypes[mimetype]) {
            return mimeTypes[mimetype]['color'];
        }
        return '';
    }

    const fileIcon = () => {
        if (mimetype in mimeTypes && 'icon' in mimeTypes[mimetype]) {
            return mimeTypes[mimetype]['icon'];
        }
        return '';
    }

    return {
        fileColor,
        fileIcon
    }
}