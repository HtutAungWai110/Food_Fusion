async function register(formData) {
    
    const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)

    })

    if(!res.ok){
    const errorData = await res.json();
    if (errorData.errors && errorData.errors.email) {
        throw new Error(errorData.errors.email[0]);
    }
    }

    
    

    const data = await res.json();
    return data;
     

}

export {register};