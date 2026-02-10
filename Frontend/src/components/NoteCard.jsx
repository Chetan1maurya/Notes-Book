import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sure, setSure] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });
  const handleUpdate = () => {
    updateNote(note._id, editData);
    setIsEditing(false);
  };
  const handleDelete = () => {
    console.log("Delete karna hai");
    setShowConfirm(true);
  };
  const confirmDelete = () => {
    deleteNote(note._id);
    setShowConfirm(false);
  };
  return (
    <div className="bg-blue-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col z-50">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
          <textarea
            className="border rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows="3"
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {note.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1">
            {note.content}
          </p>
          {/* Footer:date + actions */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400 ">
            <span>
              {new Date(note.timeStamp).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Delete
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Are you sure you want to delete this note?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
