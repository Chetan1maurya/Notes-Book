import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'
import {useNavigate} from 'react-router-dom'
function Noteform() {
    const navigate = useNavigate();
    const {createNote} = useContext(NoteContext)
    const [note,setNote]=useState({
        title:"",
        content:""
    })
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!note.title || !note.content) return
        await createNote(note)
        setNote({title:"",content:""});
        navigate("/");
    }
  return (
    <div className="max-w-xl mx-auto mt-10 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg p-8 z-50">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Create a New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-400 placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          placeholder="Write your note here..."
          className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-gray-300 dark:text-white text-gray-900 dark:placeholder-gray-400 placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="5"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer"
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default Noteform