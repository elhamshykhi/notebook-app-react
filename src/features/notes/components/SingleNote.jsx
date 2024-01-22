import { useNavigate, useParams } from "react-router-dom";
import NotesHeader from "./NotesHeader";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Button from "../../../ui/Button";
import { useEffect } from "react";

import { useNotes } from "../context/NotesProvider";

export default function SingleNote() {
  const { currentNote, loading, getNote } = useNotes();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNote(id);
  }, [id]);

  if (loading)
    return (
      <p className="p-4 capitalize animate-pulse text-gray-600">loading...</p>
    );

  return (
    <div className="h-full p-4 max-h-full flex flex-col gap-1 overflow-auto text-sm relative">
      <NotesHeader heading={currentNote.title}>
        <Button
          handleClick={() =>
            navigate(`/notes/edit/${currentNote.id}`, { replace: true })
          }
        >
          <HiOutlinePencilSquare className="w-5 h-5 text-turquoise" />
        </Button>
      </NotesHeader>

      <div className="border-b border-b-gray-800 mb-2 relative">
        <div className="mb-2 flex items-center gap-x-4 flex-wrap text-gray-600 text-[11px] xs:text-xs capitalize font-medium">
          <p className="">
            created :&nbsp;
            {new Date(currentNote.createdAt).toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
          <span className=""> - </span>
          <p className="">
            updated :&nbsp;
            {new Date(currentNote.updatedAt).toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <p className="first-letter:uppercase flex-grow max-h-full overflow-auto whitespace-pre-line break-all cursor-text">
        {currentNote.text}
      </p>
    </div>
  );
}
