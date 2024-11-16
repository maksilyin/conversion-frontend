import type {PaginationData} from "~/types/PaginationData";

export type ResponseList<T> = {
    data: T,
    pagination: PaginationData,
};