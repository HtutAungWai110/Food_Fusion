import apiClient from '../lib/client';

async function register(formData) {
    try {
        const res = await apiClient.post('/auth/register', formData);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data.errors) {
            const errorData = error.response.data;
            if (errorData.errors.email) {
                throw new Error(errorData.errors.email[0]);
            } else if (errorData.errors.password) {
                throw new Error(errorData.errors.password[0]);
            } else if (errorData.errors.firstname) {
                throw new Error(errorData.errors.firstname[0]);
            } else if (errorData.errors.lastname) {
                throw new Error(errorData.errors.lastname[0]);
            }
        }
        throw error;
    }
}

async function login(formData) {
    try {
        const res = await apiClient.post('/auth/login', formData);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

async function uploadPost(formData) {
    try {
        const res = await apiClient.post('/community_cookbook/uploadPost', formData);
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

async function getRecipes(cuisine, difficulty, page, search) {
    try {
        const res = await apiClient.get('/recipes', {
            params: {
                cuisine,
                difficulty,
                page,
                title: search
            }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.message}`);
        }
        throw error;
    }
}

async function getRecipe(id) {
    try {
        const res = await apiClient.get('/recipes/search', {
            params: { id }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

async function likeRecipe(postId) {
    try {
        
        const res = await apiClient.post('/recipes/likeRecipe', { id: postId });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

async function likePost(postId) {
    try {
       
        const res = await apiClient.post('/community_cookbook/likePost', { id: postId });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

async function postComment(newComment, postId) {
    try {
        const res = await apiClient.post('/community_cookbook/postComment', { id: postId, comment: newComment });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

async function getPosts(page) {
    try {
        const res = await apiClient.get('/community_cookbook/getPosts', {
            params: { page }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
        }
        throw error;
    }
}

export { register, login, getRecipes, getRecipe, likeRecipe, likePost, getPosts, postComment, uploadPost };
