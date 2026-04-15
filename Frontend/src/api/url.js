import axios from 'axios'
import { auth } from "../../firebase/firebase.js";
const BACKEND_URL = axios.create({
    baseURL:"https://notes-book-1.onrender.com/notesapp"
    //baseURL:"http://localhost:3000/notesapp"
})

BACKEND_URL.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default BACKEND_URL;