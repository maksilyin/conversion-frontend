type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type Endpoint = {
    method: HttpMethod;
    url: string;
};

export type Endpoints = {
    [key: string]: Endpoint;
};

export type Params = {
    [key: string]: any
}