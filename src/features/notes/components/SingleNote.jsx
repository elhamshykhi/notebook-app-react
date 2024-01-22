import {
  HiOutlineArrowUturnLeft,
  HiOutlineHeart,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../../ui/Button";
import { useNotes } from "../context/NotesProvider";
import { useTrash } from "../../../context/TrashProvider";

export default function SingleNote() {
  const { currentNote, loading, getNote, deleteNote } = useNotes();
  const { addToTrash } = useTrash();

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
      <div className="flex items-center justify-between gap-x-2 mb-2">
        <Button handleClick={() => navigate(-1)}>
          <HiOutlineArrowUturnLeft className="svg stroke-turquoise" />
        </Button>

        <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg">
          {currentNote.title}
        </h2>

        <div className="flex items-center gap-x-1 xs:gap-x-2">
          <span className="text-turquoise w-7 h-7 bg-gray-800 flex items-center justify-center">
            <HiOutlineHeart
              className={`svg ${
                currentNote.favorite
                  ? "stroke-gold fill-gold"
                  : "stroke-turquoise"
              }`}
            />
          </span>
          <Button
            handleClick={() =>
              navigate(`/notes/edit/${currentNote.id}`, { replace: true })
            }
          >
            <HiOutlinePencilSquare className="w-5 h-5 stroke-turquoise" />
          </Button>
          <Button
            handleClick={() => {
              deleteNote(currentNote.id);
              addToTrash(currentNote);
              navigate(-1, { replace: true });
            }}
          >
            <HiOutlineTrash className="svg stroke-turquoise" />
          </Button>
        </div>
      </div>

      <div className="border-b border-b-gray-800 mb-2 relative">
        <div className="mb-2 flex items-center gap-x-4 flex-wrap text-gray-600 text-[11px] xs:text-xs capitalize font-medium">
          <p className="">
            created :&nbsp;
            {new Date(currentNote.createdAt).toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
          {currentNote.updatedAt && (
            <>
              <span className=""> - </span>
              <p className="">
                updated :&nbsp;
                {new Date(currentNote.updatedAt).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </>
          )}
        </div>
      </div>

      <p className="first-letter:uppercase flex-grow max-h-full overflow-auto whitespace-pre-line break-all cursor-text">
        {currentNote.text}
      </p>
    </div>
  );
}
