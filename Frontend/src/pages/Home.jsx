import { useContext ,useState} from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const { notes, loading } = useContext(NoteContext);
  console.log("hello ", notes);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }
  if (notes.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-lg text-gray-500">No Notes Available</p>
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
      {notes.map((note, index) => {
        if (!note._id) {
          console.warn("Note missing _id:", note);
        }
        return <NoteCard key={note._id || index} note={note} />;
      })}
    </div>
  );
};

export default Home;
