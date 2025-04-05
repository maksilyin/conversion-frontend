import axios, { type ResponseType } from 'axios';
import type {Endpoints, Params} from '~/types/Api';
import endpointsModule from "~/Endpoints";
import type { H3Event } from 'h3';
import { getRequestHeader } from 'h3'
import type {FetchParams} from "~/types/FetchParams";

const endpoints: Endpoints = endpointsModule;

export const useApi = () => {
    const { public: { API_URL } } = useRuntimeConfig();
    const { locale } = useI18n();
    const baseUrl = API_URL ? API_URL.replace('**', '') : '/api/';
    const callApi = async <T>(key: string, params: Params = {}, headers: Record<string, string> = {}, responseType:ResponseType | undefined = undefined): Promise<T> => {
        if (!endpoints[key]) {
            throw new Error(`Endpoint "${key}" не найден`)
        }

        headers['X-Accept-Language'] = locale.value;

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
                headers,
                responseType,
                withCredentials: true,
            });

            return response.data as T;
        }
        catch (error) {
            console.error(`Ошибка при запросе ${method.toUpperCase()} ${url}:`, error);
            throw error;
            /*if (axios.isAxiosError(error) && error.response?.status === 404) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Not Found',
                    fatal: true
                })
            }
            else {
                console.error(`Ошибка при запросе ${method.toUpperCase()} ${url}:`, error);
                throw error;
            }*/
        }
    }
    const fetchData = async <T>(endpoint: string, params: Params = {}, headers: Record<string, string> = {}, fetchParams: FetchParams = {}) => {
        const { ssrContext } = useNuxtApp();

        if (fetchParams?.useClient && !ssrContext) {
            return await callApi<T>(endpoint, params, headers);
        }

        if (ssrContext) {
            const event = ssrContext.event as H3Event
            const cookie = getRequestHeader(event, 'cookie')

            if (cookie) {
                headers['cookie'] = cookie
            }
        }

        const cacheKey = fetchParams?.key || `${endpoint}-${locale}`;

        const {data, error} = await useAsyncData<T>(
            cacheKey,
            () => callApi<T>(endpoint, params, headers),
            {
                dedupe: 'defer',
                default: () => null,
                lazy: false,
                server: true,
            }
        );

        if (error.value) {
            throw createError({
                statusCode: error.value?.statusCode,
                statusMessage: error.value?.statusMessage,
                fatal: true
            })
        }

        return data.value;
    };

    return {
        callApi,
        fetchData
    }
}