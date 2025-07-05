import axios from "axios";

// const API_URL = process.env.VITE_API_URL;

// const DEV_TOKEN = process.env.VITE_DEV_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;
const DEV_TOKEN = import.meta.env.VITE_DEV_TOKEN;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${DEV_TOKEN}`,
  },
});

export { apiClient };
