import axios from 'axios';

export function useApi() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchApi(endpoint, { method = 'GET', body = null } = {}) {
        const url = `${baseUrl}${endpoint}`;
        try {
            const response = await axios({
                method,
                url,
                data: body,
            });
            return {
                status: 'success',
                data: response.data,
            };
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    status: error.response.status,
                    data: error.response.data.message,
                };
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error', error.message);
                return {
                    status: 'network_error',
                    data: error.message,
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
                return {
                    status: 'error',
                    data: error.message,
                };
            }
        }
    }

    return {
        get: (endpoint) => fetchApi(endpoint),
        post: (endpoint, body) => fetchApi(endpoint, { method: 'POST', body }),
        patch: (endpoint, body) => fetchApi(endpoint, { method: 'PATCH', body }),
        delete: (endpoint) => fetchApi(endpoint, { method: 'DELETE' }),
    };
}