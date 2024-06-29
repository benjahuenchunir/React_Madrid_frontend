import {jwtDecode} from "jwt-decode";

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


export async function editUserToApi(form, selectedFile, token) {

    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('last_name', form.lastname.value);
    formData.append('email', form.email.value);
    formData.append('password', form.password.value);
    formData.append('phone', form.phone.value);
    formData.append('files', selectedFile);

    for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
    }

    let decodedToken = jwtDecode(token);
    let userId = decodedToken.sub;

    const response = await fetchData(import.meta.env.VITE_BACKEND_URL + '/users/' + userId, {
        method: 'PATCH',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }

    });

    return response;
}


export const useFetchUser = () => {

    const editUser = async (form, selectedFile, token) => {
        const response = await editUserToApi(form, selectedFile, token);
        return response;
    };

    return [editUser];
};