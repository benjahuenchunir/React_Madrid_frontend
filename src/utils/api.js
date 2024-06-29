import axios from 'axios';

export function useApi() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchApi(endpoint, { method = 'GET', body = null, headers = {} } = {}) {
        const url = `${baseUrl}${endpoint}`;
        const response = await axios({
            method,
            url,
            data: body,
            headers: {
                ...headers
            },
        });
        return response.data;
    }

    return {
        get: (endpoint) => fetchApi(endpoint),
        post: (endpoint, body) => fetchApi(endpoint, { method: 'POST', body }),
        patch: (endpoint, body) => fetchApi(endpoint, { method: 'PATCH', body }),
        delete: (endpoint) => fetchApi(endpoint, { method: 'DELETE' }),
    };
}