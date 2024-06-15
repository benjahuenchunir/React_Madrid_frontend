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


export async function addUserToApi(form, selectedFile) {

    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('last_name', form.lastname.value);
    formData.append('email', form.email.value);
    formData.append('password', form.password.value);
    formData.append('phone', form.phone.value);
    formData.append('file', selectedFile);

    for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }

    const response = await fetchData(import.meta.env.VITE_BACKEND_URL + '/auth/signup', {
        method: 'POST',
        body: formData,
    });

    return response;
}


export const useFetchUser = () => {

    const addUser = async (form, selectedFile) => {
        const response = await addUserToApi(form, selectedFile);
        return response;
    };

    return [addUser];
};