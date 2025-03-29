import type {FileFormat, FileType} from "~/types/FileFormat";

const formats = ref<FileType[]>([])
const formatDetail = ref<FileFormat | null>(null)

export const useFormats = (extension: string[] | string = '') => {
    const api = useApi();

    const loadFormats = async () => {
        const data = await api.fetchData<FileType[]>('formats');

        if (data) {
            formats.value = data;
        }
    };

    const loadDetailFormat = async (format: string) => {
        formatDetail.value = await api.fetchData<FileFormat>('formats.detail', {format});
        return formatDetail.value;
    }

    const loadDetailTypeFile = async (type: string) => {
        return await api.fetchData<FileType>('formats.detail.type', {type});
    }

    const formatMap = computed(() => {
        const result: Record<string, FileFormat> = {};
        if (formats.value.length) {
            for (const fileType of formats.value) {
                for (const format of fileType.formats) {
                    result[format.extension] = format;
                }
            }
        }

        return result;
    });

    const chosenExtension = computed(() => {
        return !Array.isArray(extension) ? [extension] : extension;
    });

    const currentFormats = computed(() => {
        if (!formats.value.length || !chosenExtension.value.length) {
            return [];
        }

        const extensions = chosenExtension.value;
        const result:FileFormat[] = [];

        extensions.forEach(extension => {
            if (extension in formatMap.value) {
                result.push(formatMap.value[extension]);
            }
        })

        return result;
    });

    const convertible = computed(() => {
        let result: string[] = [];

        currentFormats.value.forEach(currentFormat => {
            result = result.concat(currentFormat.convertible.map(item => item.extension))
        });

        return result;
    });

    const convertibleTypes = computed(() => {
        let result: string[] = []
        currentFormats.value.forEach(currentFormat => {
            result = result.concat(currentFormat.convertible_types.map(item => item.slug))
        });

        return result;
    });

    const fromConvertible = (format: FileFormat) => {
        const convertible: FileFormat[] = [];
        const typeConvertible: FileFormat[] = [];

        for (let key in formatMap.value) {
            const formatItem = formatMap.value[key];
            let added = false;

            if (formatItem.extension !== format.extension) {
                formatItem.convertible.forEach(extensionConvertible => {
                    if (extensionConvertible.extension === format.extension) {
                        convertible.push(formatItem);
                        added = true;
                        return;
                    }
                });

                if (added) {
                    continue;
                }

                formatItem.convertible_types.forEach(extensionConvertibleType => {
                    if (extensionConvertibleType.slug === format.type?.slug) {
                        typeConvertible.push(formatItem);
                        return;
                    }
                });
            }
        }

        return [...convertible, ...typeConvertible];
    };

    const toConvertFormats = (format: FileFormat) => {
        let result: FileFormat[] = [];

        if (formats.value.length) {
            format.convertible_types.forEach(type => {
                const fileType = formats.value.find(item => item.slug === type.slug);

                if (fileType) {
                    fileType.formats.forEach(item => {
                        if (item.extension !== format.extension) {
                            result.push(item);
                        }
                    })
                }
            })
        }

        format.convertible.forEach(item => {
            if (item.extension in formatMap.value) {
                result.push(formatMap.value[item.extension]);
            }
        })

        return result;
    }

    const searchFormats = (search: string) => {
        const result: FileFormat[] = [];

        filteredFormats.value.forEach(fileType => {
            fileType.formats.forEach(format => {
                if (format.name.indexOf(search) === 0) {
                    result.push(format);
                }
            })
        });

        return result;
    }

    const filteredFormats = computed(() => {
        if (!formats.value.length) {
            return [];
        }

        let result: FileType[] = [];

        if (convertible.value.length || convertibleTypes.value.length) {
            formats.value.forEach(fileType => {
                if (convertibleTypes.value.includes(fileType.slug)) {
                    result.push(fileType);
                }
                else if (convertible.value.length) {
                    const data = Object.assign({}, fileType);
                    data.formats = data.formats.filter(format => convertible.value.includes(format.extension));

                    if (data.formats.length) {
                        result.push(data);
                    }
                }
            });
        }
        else {
            result = formats.value;
        }

        return result;
    });

    const getExtensionByMimeType = (mimeType: string) => {
        const arFormats = Object.values(formatMap.value);
        const format = arFormats.find(item => item.mime_type === mimeType);

        return format?.extension ? format.extension : null;
    }

    const getFileFormat = (extension: string) => {
        return formatMap.value[extension]
    }

    const getFileTypeByExtension = (extension: string) => {
        for (const fileType of formats.value) {
            for (const format of fileType.formats) {
                if (format.extension.toLowerCase() === extension.toLowerCase()) {
                    return fileType;
                }
            }
        }

        return null;
    };

    const getSiblingsFormats = (extension: string) => {
        for (const fileType of formats.value) {
            for (const format of fileType.formats) {
                if (format.extension.toLowerCase() === extension.toLowerCase()) {
                    return fileType.formats;
                }
            }
        }

        return null;
    };

    const getFirstSiblingsFormat = (extension: string) => {
        const siblingsFormats = getSiblingsFormats(extension);

        if (siblingsFormats) {
            const format = siblingsFormats.find(formatItem => {
                return formatItem.extension.toLowerCase() !== extension.toLowerCase()
            })

            if (format) {
                return format.extension
            }
        }

        return null;
    }

    return {
        formats,
        loadFormats,
        filteredFormats,
        searchFormats,
        formatMap,
        loadDetailFormat,
        formatDetail,
        fromConvertible,
        toConvertFormats,
        loadDetailTypeFile,
        getExtensionByMimeType,
        getFileFormat,
        getFileTypeByExtension,
        getSiblingsFormats,
        getFirstSiblingsFormat,
    }
}