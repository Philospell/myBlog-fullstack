import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`, { withCredentials: true });
    return response.data;
}

export const getPost = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`, { withCredentials: true });
    return response.data;
}