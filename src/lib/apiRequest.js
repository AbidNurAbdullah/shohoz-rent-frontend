import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://shohoz-rent-backend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;