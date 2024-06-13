async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    return response.json();
}


export async function addUserToApi(form, selectedFile) {

    try {
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

        const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/auth/signup', {
            method: 'POST',
            body: formData,
        });

        return data;
  
    } catch (error) {
        console.error('Error al registrarse', error);
        return null;
    }
}


export const useFetchUser = () => {

    const addUser = async (form, selectedFile) => {
        const newUser = await addUserToApi(form, selectedFile);
        console.log(newUser);
        if (!newUser) return; // TODO display error that user could not be created
    };

    return [addUser];
};