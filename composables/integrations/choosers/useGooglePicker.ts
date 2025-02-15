import axios from "axios";
import {addScriptIfNotExists} from "~/utils/addScript";
import type {Chooser} from "~/types/Chooser";

export const useGooglePicker = (): Picker => {
    const { addFile } = useUploader();

    const { public: { GOOGLE_PICKER_CLIENT_ID, GOOGLE_PICKER_API_KEY } } = useRuntimeConfig();

    const clientId = GOOGLE_PICKER_CLIENT_ID;
    const apiKey = GOOGLE_PICKER_API_KEY;
    const scope = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly'];

    let tokenClient: any;
    let accessToken: string | null = null;
    let pickerInited = false;
    let gisInited = false;
    const onApiLoad = () => {
        window.gapi.load('picker', () => {
            pickerInited = true;
        });
    };

    const gisLoaded = () => {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: scope.join(' '),
            callback: '',
        });
        gisInited = true;
    };

    // Создание Picker
    const createPicker = () => {
        const showPicker = () => {
            const picker = new window.google.picker.PickerBuilder()
                .addView(window.google.picker.ViewId.DOCS)
                .setOAuthToken(accessToken)
                .setDeveloperKey(apiKey)
                .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        };

        tokenClient.callback = async (response: any) => {
            if (response.error !== undefined) {
                console.error('Error during token retrieval:', response);
                return;
            }
            accessToken = response.access_token;
            showPicker();
        };

        if (accessToken === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    };

    const pickerCallback = (data: any) => {
        console.log(data)
        if (data.action == window.google.picker.Action.PICKED) {
            data.docs.forEach((fileData: any) => {
                uploadFile(fileData);
            });
        }
    };

    const showChooser = () => {
        if (pickerInited && gisInited) {
            createPicker();
        } else {
            console.error('Picker or GIS not initialized');
        }
    };

    const uploadFile = (dataFile: any) => {
        const file = addFile({
            file: null,
            size: dataFile.sizeBytes,
            filename: dataFile.name,
            mimetype: dataFile.mimeType,
            externalPath: dataFile?.embedUrl,
            status: FILE_STATUS.PREPARE,
        });

        const headers = {
            Authorization: 'Bearer ' + accessToken,
        }

        axios.get(`https://www.googleapis.com/drive/v2/files/${dataFile.id}`, {headers})
            .then(async res => {
                console.log(res)
                const { data } = res;
                file.extension = data.fileExtension;

                const blobRes = await axios.get(data.downloadUrl, {
                    headers,
                    responseType: "blob"
                })

                file.file = new File([blobRes.data], file.filename, {type: blobRes.data.type});
                file.status = FILE_STATUS.CREATED;
            })
    }

    onMounted(() => {
        try {
            addScriptIfNotExists('https://apis.google.com/js/api.js', onApiLoad);
            addScriptIfNotExists('https://accounts.google.com/gsi/client', gisLoaded);
        }
        catch (e) {
            console.log(e)
        }
    });

    return {
        showChooser,
    };
};
