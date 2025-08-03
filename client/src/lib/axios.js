import axios from "axios";

const instance = axios.create({
  baseURL: "https://internal-hackathon-backend.onrender.com", // adjust to your backend URL
  withCredentials: true,
});

export default instance;
