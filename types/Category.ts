import type {Seo} from "~/types/Seo";
import type {Post} from "~/types/Post";

export type Category = {
    id: number,
    slug: string,
    name: string,
    color?: string,
    previewImage?: string,
    seo?: Seo,
    parent?: Category|null,
    posts?: Post[]
};