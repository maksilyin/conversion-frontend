import type {Language} from "~/types/Language";

const locales = ref<Language[]>([])

export const useLocale = () => {
    const api = useApi();

    const loadLocales = async () => {
        const data = await api.fetchData<Language[]>(
          'lang',
          {},
          {},
          {
              key: 'locales'
          }
        );

        if (data) {
            locales.value = data;
        }

        return locales.value;
    }

    return {
        locales,
        loadLocales,
    }
}