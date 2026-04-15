import { createContext, useState, useContext, useEffect } from "react";
import BACKEND_URL from "../api/url.js";
export const NoteContext = createContext();
import { AuthContext } from './AuthContext.jsx'

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes");
      setNotes(response.data);
    } catch (error) {
      console.log("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!user) return;
    getNotes();   //get notes only when user is logged in
  }, [user]);

  useEffect(() => {
    if (!user) {
      setNotes([]);   // clear notes when logged out
    }
  }, [user]);

  const createNote = async (note) => {
    const response = await BACKEND_URL.post("/create-note", note);
    const newNote = response.data.note;
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const updateNote = async (id, updateNote) => {
    const response = await BACKEND_URL.put(`/update-note/${id}`, updateNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? response.data.update : note)),
    );
  };

  const deleteNote = async (id) => {
    const response = await BACKEND_URL.delete(`/delete-note/${id}`);
    console.log(response.data.message);
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
