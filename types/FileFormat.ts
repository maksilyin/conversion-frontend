import type {Seo} from "~/types/Seo";

export type FileType = {
    id: number,
    name: string,
    slug: string,
    icon: string,
    icon_image: string,
    excerpt?: string,
    description?: string,
    formats: FileFormat[],
    seo: Seo,
};

export type FileFormat = {
    id: string,
    name: string,
    extended_name: string
    extension: string,
    icon: string,
    icon_image: string,
    color?: string,
    mime_type?: string,
    excerpt?: string,
    description?: string,
    convertible: [{
        id: string,
        name: string,
        extension: string,
    }],
    convertible_types: [{
        id: number,
        slug: string,
    }]
    type?: {
        id: number,
        name: string,
        slug: string,
    },
    seo: Seo,
};