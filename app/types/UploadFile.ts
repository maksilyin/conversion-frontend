export type UploadFile = {
    file?: File,
    index: number,
    status: number,
    hash: string,
    progress: number,
    message?: string,
    params: Record<string, any>,
    filename: string,
    size: number,
    extension?: string,
    mimetype: string,
    externalPath?: string,
    result?: [{
        status: boolean,
        extension: string,
        filename: string
        mimetype: string
        originalName: string
        size: number
        error?: string
    }]
};