async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        const clone = response.clone();

        let data;
        try {
            data = await response.json();
        } catch (error) {
            data = await clone.text();
        }

        return {
            status: response.status,
            data: data
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            status: 'network_error',
            data: error.message
        };
    }
}

export async function loginToApi(form) {
    const body = {
        email: form.email.value,
        password: form.password.value
    };

    console.log(body);

    const response = await fetchData(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });

    return response;
}


export const useFetchLogin = () => {

    const login = async (form) => {
        const response = await loginToApi(form);
        return response;
    };

    return [login];
};