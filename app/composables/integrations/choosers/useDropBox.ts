import axios from "axios";
import {addScriptIfNotExists} from "~/utils/addScript";
import type {Chooser} from "~/types/Chooser";

export const useDropBox = (): Chooser => {
    const { addFile } = useUploader();
    const { public: { DROPBOX_KEY } } = useRuntimeConfig();
    let inited = false;
    const onApiLoad = () => {
        inited = true;
    };

    const showChooser = () => {
        if (!inited) {
            throw new Error("Dropbox not initialized");
        }
        Dropbox.choose({
            success: function(files: []) {
                files.forEach(file => uploadFile(file))
            },
            linkType: "direct",
            multiselect: true,
        });
    };

    const uploadFile = (dataFile: any) => {
        const file = addFile({
            file: null,
            size: dataFile.bytes,
            filename: dataFile.name,
            mimetype: dataFile.type,
            externalPath: dataFile?.thumbnailLink,
            status: FILE_STATUS.PREPARE,
        });

        axios.get(dataFile.link,  {responseType: "blob"})
            .then(async res => {
                const { data } = res;

                file.file = new File([data], file.filename, {type: data.type});
                file.status = FILE_STATUS.CREATED;
            })
    }

    onMounted(() => {
        addScriptIfNotExists(
            'https://www.dropbox.com/static/api/2/dropins.js',
            onApiLoad,
            {
                id: 'dropboxjs',
                'data-app-key': DROPBOX_KEY,
            }
        );
    });

    return {
        showChooser,
    };
};
