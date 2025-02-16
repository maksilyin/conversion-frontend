import type {Seo} from "~/types/Seo";
import type {Category} from "~/types/Category";

export type Post = {
    id: number,
    slug: string,
    previewImage: string,
    detailImage?: string,
    readTime: string,
    publishedAt: string,
    dateModified: string,
    datePublished: string,
    title: string,
    previewText: string,
    detailText?: string,
    wordCount?: number,
    seo?: Seo,
    locale: string,
    categories: Category[],
};