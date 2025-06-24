import axios from "axios";

export const authenticatedAxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})