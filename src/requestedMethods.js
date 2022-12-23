import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTIwYWNjNzUyYWMwNDllNjc1MjczYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTgxMjAwNSwiZXhwIjoxNjcyMDcxMjA1fQ.erIta5KLTp43LW8-nxIRfWYs0lj0YT3vnWhUgg-KoA0";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
