import { authenticatedAxios } from './axiosInstance';

export const getPosts = async () => {
    const response = await authenticatedAxios.get(`/posts`, { withCredentials: true });
    return response.data;
}

export const getPost = async (id) => {
    const response = await authenticatedAxios.get(`/posts/${id}`, { withCredentials: true });
    return response.data;
}

export const setPost = async ({ title, content }) => {
    const response = await authenticatedAxios.post(`/posts`, {
        title,
        content,
    }, {
        withCredentials: true,
    });

    return response.data;
}