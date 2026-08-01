import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});


let accessToken : string | null = null;

export function setAccessToken(token: string | null) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export function removeAccessToken() {
    accessToken = null;
}

export default api;
