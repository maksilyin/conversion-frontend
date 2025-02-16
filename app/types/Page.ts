import type {Seo} from "~/types/Seo";

export type Page = {
    id: number,
    url: string,
    image?: string,
    name: string,
    description: string,
    seo: Seo,
};