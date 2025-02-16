import type {UploadFile} from "~/types/UploadFile";

export type Task = {
    id: number,
    uuid: string,
    status: string,
    type: string,
    payload?: {
        files: UploadFile[],
    },
}