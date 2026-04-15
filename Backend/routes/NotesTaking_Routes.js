import express from 'express'
import {createNote, getNotes, updateNote, deleteNote} from '../controllers/NotesTaking_Controller.js'
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router()
router.post('/create-note',authMiddleware, createNote);
router.get('/get-notes',authMiddleware, getNotes);
router.put('/update-note/:id',authMiddleware,updateNote);
router.delete('/delete-note/:id',authMiddleware,deleteNote);

export default router;