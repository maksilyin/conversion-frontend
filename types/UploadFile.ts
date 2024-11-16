export type UploadFile = {
    file?: File,
    status: number,
    hash: string,
    progress: number,
    message?: any,
    convert: Array<string>,
    result?: object,
    filename?: string,
    extension?: string,
};