import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTIwYWNjNzUyYWMwNDllNjc1MjczYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTU2NDQ5NCwiZXhwIjoxNjcxODIzNjk0fQ.hTsXJ1aAMVdngWppPHs9Uf-wNqBVGT7xajrh826QytU";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
