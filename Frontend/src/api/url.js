import axios from 'axios'
const BACKEND_URL = axios.create({
    baseURL:"https://notes-book-regm.onrender.com/notesapp"
})

export default BACKEND_URL