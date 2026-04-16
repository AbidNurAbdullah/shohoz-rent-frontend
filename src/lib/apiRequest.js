import axios from "axios";

const apiRequest = axios.create({
  // এটি লোকালহোস্ট এবং রেন্ডার উভয়ই হ্যান্ডেল করবে
  baseURL: import.meta.env.VITE_API_URL || "https://shohoz-rent-backend.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;