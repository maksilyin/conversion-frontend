import type {FileFormat, FileType} from "~/types/FileFormat";
import {useI18n} from "vue-i18n";
import type {Page} from "~/types/Page";
import type {BreadcrumbLink} from "#ui/types";

const links: BreadcrumbLink[] = reactive([])
export const useBreadcrumbs = () => {
    const { t } = useI18n();
    const localePath = useLocalePath();
    const setItem = (item: BreadcrumbLink) => {
        links.push(item);
    }

    const clearLinks = () => {
        links.splice(0, links.length)
    }

    const initConvertChain = (format: FileFormat | null = null, format2: FileFormat | null = null, fileType: FileType | null = null) => {
        clearLinks();

        setItem({
            label: t('convert'),
            to: localePath('/convert')
        })

        if (format) {
            if (format?.type) {
                setItem({
                    label: format.type.name,
                    to: localePath(`/convert/${format?.type.slug}`)
                })
            }

            let label = format2 ? `${format.name} ${t('to')} ${format2.name}` : format.name;

            setItem({
                label: label,
            })
        }
        else if (fileType) {
            setItem({
                label: fileType.name,
            })
        }
    }

    const initPageChain = (page: Page) => {
        clearLinks();

        setItem({
            label: page.name,
        })
    }

    return {
        setItem,
        initConvertChain,
        initPageChain,
        links,
    }
}