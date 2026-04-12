


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
    } else if (errorData.errors && errorData.errors.password) {
        throw new Error(errorData.errors.password[0]);
    } else if (errorData.errors && errorData.errors.firstname) {
        throw new Error(errorData.errors.firstname[0]);
    } else if (errorData.errors && errorData.errors.lastname) {
        throw new Error(errorData.errors.lastname[0]);
    }
    }

    
    

    const data = await res.json();
    return data;
     

}

async function login(formData){
    const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'applicaton/json'
        },
        body: JSON.stringify(formData)
    })

    if(!res.ok){
    const errorData = await res.json();
    
        throw new Error(errorData.message);
    
    }


    const data = await res.json();
    return data;
}

async function proxyFetch(url, options = {}) {

    //Set default headers and credentials
    const defaultOptions = {
        credentials: 'include',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            
        },
    };

    //Attempt the actual request first
    let response = await fetch(url, defaultOptions);

    //If unauthorized, try to refresh once
    if (response.status === 401) {
        const refreshRes = await fetch('/api/auth/refresh-token', {
            method: "POST",
            credentials: 'include',
        });

        if (refreshRes.ok) {
            // Refresh worked, retry the original request
         
            response = await fetch(url, defaultOptions);
        } else {
            // Both tokens failed: Wipe session and throw
            sessionStorage.setItem("guest", JSON.stringify(true));
            const error = await refreshRes.json();
            throw new Error(error.message || 'Session expired');
        }
    }

    return response;
}

async function getRecipes(cuisine, difficulty, page, search){
    const res = await fetch(`/api/recipes?cuisine=${encodeURI(cuisine)}&difficulty=${encodeURI(difficulty)}&page=${page}&title=${search}`, {
        method: "GET"
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(`${error.message}`)
    }

    const data = await res.json();
    return data;
}

async function  getRecipe(id) {
    const res = await fetch(`/api/recipes/search?id=${encodeURI(id)}`, {
        method: "GET"
    });

    if(!res.ok){
        const error = await res.json();
        throw new Error(`Status: ${res.status}, ${error.message}`)
    }

    const data = await res.json();
    return data;
}


async function likeRecipe(postId) {
    const res = await proxyFetch(`/api/recipes/likeRecipe`, {
        method: "POST",
        body: JSON.stringify({id: postId})
    })

    if(!res.ok){
        const error = await res.json();
        throw new Error(`Status: ${res.status}, ${error.message}`)
    }

    const data = await res.json();
    return data;
}

export {register, login, proxyFetch, getRecipes, getRecipe, likeRecipe};