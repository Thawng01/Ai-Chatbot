import axios from "axios"


export const baseURL = "http://localhost:5000"
export const clientApi = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})