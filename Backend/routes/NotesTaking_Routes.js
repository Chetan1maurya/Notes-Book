import express from 'express'
import {createNote, getNotes, updateNote, deleteNote} from '../controllers/NotesTaking_Controller.js'

const router = express.Router()
router.post('/create-note', createNote);
router.get('/get-notes', getNotes);
router.put('/update-note/:id',updateNote);
router.delete('/delete-note/:id' ,deleteNote);

export default router;