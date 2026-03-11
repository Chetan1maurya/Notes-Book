import axios from 'axios'
const BACKEND_URL = axios.create({
    baseURL:"https://notes-book-1.onrender.com/notesapp"
})

export default BACKEND_URL