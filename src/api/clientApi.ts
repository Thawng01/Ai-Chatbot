import axios from "axios"

export const url = "https://ai-chatbot-api-5rm8.onrender.com"
export const baseURL = "http://localhost:5000"
export const clientApi = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
})