import axios from 'axios';
import type {Endpoints, Params} from '~/types/Api';
import endpointsModule from "~/Endpoints";

const endpoints: Endpoints = endpointsModule;

export const useApi = () => {
    const { public: { API_URL } } = useRuntimeConfig();
    const baseUrl = API_URL ? API_URL.replace('**', '') : '/api/';
    const callApi = async <T>(key: string, params: Params = {}, headers: Record<string, string> = {}): Promise<T> => {
        if (!endpoints[key]) {
            throw new Error(`Endpoint "${key}" не найден`)
        }

        let { method, url } = endpoints[key]

        Object.keys(params).forEach(param => {
            if (url.includes(`{${param}}`)) {
                url = url.replace(`{${param}}`, params[param]);
                delete params[param];
            }
        })

        try {
            const response = await axios({
                method,
                url: `${baseUrl}${url}`,
                [method === 'get' ? 'params' : 'data']: params,
                headers
            });

            return response.data as T;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Not Found',
                    fatal: true
                })
            }
            else {
                console.error(`Ошибка при запросе ${method.toUpperCase()} ${url}:`, error);
                throw error;
            }
        }
    }
    const fetchData = async <T>(key: string, params: Params = {}, headers: Record<string, string> = {}) => {
        const { ssrContext } = useNuxtApp();

        if (ssrContext) {
            const {data, error} = await useAsyncData<T>(key, () => callApi<T>(key, params, headers));

            if (error.value) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Not Found',
                    fatal: true
                })
            }

            return data.value;
        }
        else {
            return await callApi<T>(key, params, headers);
        }
    };

    return {
        callApi,
        fetchData
    }
}