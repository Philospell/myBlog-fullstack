import { authenticatedAxios } from './axiosInstance';

export const loginUser = async ({ email, password }) => {
    const response = await authenticatedAxios.post(`/auth/login`, {
        email,
        password
    });
    return response.data;
}

export const logout = async () => {
    const response = await authenticatedAxios.post('/auth/logout');
    return response.data;
}