import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // now defined
});

export function setToken(token) {
  api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
}
