import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const loginUser = async ({ email, password }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
    }, {
        withCredentials: true,
    });
    return response.data;
}