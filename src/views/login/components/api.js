async function fetchData(url, options) {
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
}


export async function loginToApi(form) {

    const formData = new FormData();
    formData.append('email', form.email.value);
    formData.append('password', form.password.value);


    for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }

    const response = await fetchData(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        method: 'POST',
        body: formData,
    });

    return response;
}


export const useFetchLogin = () => {

    const login = async (form, selectedFile) => {
        const response = await loginToApi(form, selectedFile);
        return response;
    };

    return [login];
};