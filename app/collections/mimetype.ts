export const mimeTypes = {
    // Текстовые файлы
    "text/plain": { extensions: ["txt"] },
    "text/html": { extensions: ["html", "htm"] },
    "text/css": { extensions: ["css"] },
    "text/javascript": { extensions: ["js"] },
    "text/csv": { extensions: ["csv"] },
    "text/markdown": { extensions: ["md"] },
    "text/xml": { extensions: ["xml"] },
    "text/vtt": { extensions: ["vtt"] },

    // Изображения
    "image/jpeg": { extensions: ["jpg", "jpeg"] },
    "image/png": {
        extensions: ["png"],
    },
    "image/gif": { extensions: ["gif"] },
    "image/bmp": { extensions: ["bmp"] },
    "image/tiff": { extensions: ["tiff", "tif"] },
    "image/webp": { extensions: ["webp"] },
    "image/x-icon": { extensions: ["ico"] },
    "image/svg+xml": { extensions: ["svg"] },
    "image/heif": { extensions: ["heif"] },
    "image/heic": { extensions: ["heic"] },

    // Аудиофайлы
    "audio/mpeg": { extensions: ["mp3"] },
    "audio/wav": { extensions: ["wav"] },
    "audio/ogg": { extensions: ["ogg"] },
    "audio/flac": { extensions: ["flac"] },
    "audio/aac": { extensions: ["aac"] },
    "audio/webm": { extensions: ["weba"] },
    "audio/3gpp": { extensions: ["3gp"] },
    "audio/3gpp2": { extensions: ["3g2"] },

    // Видеофайлы
    "video/mp4": { extensions: ["mp4"] },
    "video/mpeg": { extensions: ["mpeg", "mpg"] },
    "video/ogg": { extensions: ["ogv"] },
    "video/webm": { extensions: ["webm"] },
    "video/quicktime": { extensions: ["mov"] },
    "video/x-msvideo": { extensions: ["avi"] },
    "video/x-matroska": { extensions: ["mkv"] },

    // Архивы и сжатые файлы
    "application/zip": { extensions: ["zip"] },
    "application/x-rar-compressed": { extensions: ["rar"] },
    "application/x-7z-compressed": { extensions: ["7z"] },
    "application/x-tar": { extensions: ["tar"] },
    "application/gzip": { extensions: ["gz"] },
    "application/x-bzip2": { extensions: ["bz2"] },
    "application/x-xz": { extensions: ["xz"] },

    // Документы
    "application/pdf": {
        extensions: ["pdf"],
        icon: 'vscode-icons:file-type-pdf2',
        //color: 'red-500'
    },
    "application/msword": { extensions: ["doc"] },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        extensions: ["docx"]
    },
    "application/vnd.ms-excel": { extensions: ["xls"] },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        extensions: ["xlsx"]
    },
    "application/vnd.ms-powerpoint": { extensions: ["ppt"] },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        extensions: ["pptx"]
    },
    "application/rtf": { extensions: ["rtf"] },
    "application/vnd.oasis.opendocument.text": { extensions: ["odt"] },
    "application/vnd.oasis.opendocument.spreadsheet": { extensions: ["ods"] },

    // Программное обеспечение и бинарные файлы
    "application/x-executable": { extensions: ["exe"] },
    "application/x-sh": { extensions: ["sh"] },
    "application/x-msdownload": { extensions: ["dll"] },
    "application/x-python-code": { extensions: ["py"] },
    "application/java-archive": { extensions: ["jar"] },
    "application/vnd.android.package-archive": { extensions: ["apk"] },
    "application/octet-stream": { extensions: ["bin"] },

    // Прочие
    "application/json": { extensions: ["json"] },
    "application/xml": { extensions: ["xml"] },
    "application/javascript": { extensions: ["js"] },
    "application/x-www-form-urlencoded": { extensions: [] },
    "application/sql": { extensions: ["sql"] },
    "application/graphql": { extensions: ["graphql"] },
    "application/ld+json": { extensions: ["jsonld"] },
    "application/vnd.api+json": { extensions: ["json"] },
    "application/protobuf": { extensions: ["proto"] },
    "application/wasm": { extensions: ["wasm"] },

    // Шрифты
    "font/otf": { extensions: ["otf"] },
    "font/ttf": { extensions: ["ttf"] },
    "font/woff": { extensions: ["woff"] },
    "font/woff2": { extensions: ["woff2"] }
};
