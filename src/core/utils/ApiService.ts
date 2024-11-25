const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
} as const;

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface IOptions {
    method?: TMethod;
    timeout?: number;
    data?: unknown;
    headers?: Record<string, string>;
}

type HTTPMethod = (url: string, options?: IOptions) => Promise<XMLHttpRequest>;

interface IHTTPTransport {
    get: HTTPMethod;
    post: HTTPMethod;
    put: HTTPMethod;
    delete: HTTPMethod;
}

function queryStringify(data: Record<string, unknown>) {
    const listKeys = Object.keys(data);
    return listKeys.reduce((string, key, index) => {
        string += `${key}=${data[key]}`;
        string += listKeys.length - 1 !== index ? '&' : '';
        return string;
    }, '?');
}

export class ApiService implements IHTTPTransport {
    private readonly baseUrl: string;

    constructor(url: string = '', isOrigin = false) {
        const _url = isOrigin ? '' : 'https://ya-praktikum.tech/api/v2';
        this.baseUrl = _url + url;
    }

    public get: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.GET }, options?.timeout);
    };

    public put: HTTPMethod = (url, options = { method: METHODS.PUT, timeout: 5000 }) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    public post: HTTPMethod = (url, options = { method: METHODS.POST, timeout: 5000 }) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    public delete: HTTPMethod = (url, options = { method: METHODS.DELETE, timeout: 5000 }) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    private request = (url: string, options: IOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
        const { method, data = {}, headers = { 'Content-Type': 'application/json' } } = options;
        let dataBeingSend: string | FormData | undefined;
        let readyUrl = '';

        if (method === METHODS.GET) {
            readyUrl = this.baseUrl + url + queryStringify(data as Record<string, unknown>);
        } else if (data instanceof FormData) {
            dataBeingSend = data;
            readyUrl = this.baseUrl + url;
        } else {
            dataBeingSend = JSON.stringify(data);
            readyUrl = this.baseUrl + url;
        }

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, readyUrl);

            if (!(data instanceof FormData)) {
                for (const name in headers) {
                    xhr.setRequestHeader(name, headers[name]);
                }
            }

            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.send(dataBeingSend);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.ontimeout = reject;
            xhr.onerror = reject;
        });
    };
}
