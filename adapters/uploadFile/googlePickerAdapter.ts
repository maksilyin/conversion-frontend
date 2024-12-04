export default (data: any) => {
    return {
        size: data.sizeBytes,
        filename: data.name,
        mimetype: data.mimeType,
        externalPath: data?.embedUrl,
    }
}