import { createContext, useState, useEffect } from "react";
import BACKEND_URL from "../api/url.js";
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    getNotes();
  }, []);

  const createNote = async (note) => {
    console.log("Hello Notes creation started");
    const response = await BACKEND_URL.post("/create-note", note);
    console.log(response);
    const newNote = response.data.note;
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    console.log("Hello Notes created");
  };

  const updateNote = async (id, updateNote) => {
    const response = await BACKEND_URL.put(`/update-note/${id}`, updateNote);
    console.log(response.data.message);
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
