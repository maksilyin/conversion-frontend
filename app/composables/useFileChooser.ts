
import { useDropBox } from "./integrations/choosers/useDropBox"
import { useGooglePicker } from "./integrations/choosers/useGooglePicker"
import type {Chooser} from "~/types/Chooser";

const choosers: Record<string, () => Chooser> = {
    dropbox: useDropBox,
    google: useGooglePicker,
};

export const useFileChooser = (services: string[] = []) => {
    if (!services.length) {
        services = Object.keys(choosers);
    }
    const availableChoosers: Record<string, Chooser> = {}

    services.forEach(service => {
        if (choosers[service]) {
            availableChoosers[service] = choosers[service]();
        }
    })

    const openChooser = (chooser: keyof typeof availableChoosers) => {
        if (!availableChoosers[chooser]) {
            throw new Error(`Chooser ${chooser} not found`);
        }

        availableChoosers[chooser].showChooser();
    }

    return {
        openChooser
    }
}