import {
  HiOutlineArrowUturnLeft,
  HiOutlineFolder,
  HiOutlineHeart,
  HiOutlineTag,
} from "react-icons/hi2";
import { IoColorFillOutline } from "react-icons/io5";
import { MdOutlineSaveAlt } from "react-icons/md";

import { noteColors } from "../../../util/colors";
import Button from "../../../ui/Button";
import { useState } from "react";
import { useNotes } from "../context/NotesProvider";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
  const [isOpenNoteOption, setIsOpenNoteOption] = useState(false);
  const [note, setNote] = useState({
    title: "",
    text: "",
    color: "",
    favorite: false,
  });
  const { saveNote } = useNotes();
  const navigate = useNavigate();

  const handleOpenNoteOptions = () => {
    setIsOpenNoteOption((prev) => !prev);
  };

  const handleNoteOptions = (option, value) => {
    setNote((prev) => {
      return { ...prev, [option]: value };
    });
  };

  const handleSaveNewNote = () => {
    if (!note.title || !note.text) return;
    saveNote({ ...note, createdAt: new Date().toISOString() });
    setNote({
      title: "",
      text: "",
      color: "",
      favorite: false,
    });
    navigate("/notes", { replace: true });
  };

  return (
    <div className="p-4 h-full">
      {/* header */}
      <div className="flex items-center justify-between gap-x-2 mb-2">
        <Button handleClick={() => navigate(-1)}>
          <HiOutlineArrowUturnLeft className="svg stroke-turquoise" />
        </Button>

        <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg">
          new note
        </h2>

        <div className="flex items-center gap-x-1 xs:gap-x-2">
          <div className="relative">
            <Button handleClick={handleOpenNoteOptions}>
              <IoColorFillOutline className="svg" />
            </Button>

            <ul
              onClick={(e) => {
                handleNoteOptions("color", e.target.dataset.color);
                setIsOpenNoteOption(false);
              }}
              className={`w-7 flex flex-col items-center gap-y-1.5 absolute top-full mt-1 z-10 ${
                isOpenNoteOption ? "visible" : "invisible"
              }`}
            >
              {noteColors.map((item) => (
                <li
                  key={item.color}
                  data-color={item.color}
                  className={`w-6 h-6 rounded-full cursor-pointer ring-1 ring-offset-2 ring-offset-classicBlue ${
                    item.bg
                  } ${
                    item.color === note.color ? item.ring : "ring-transparent"
                  }`}
                ></li>
              ))}
            </ul>
          </div>

          <Button
            handleClick={() => handleNoteOptions("favorite", !note.favorite)}
          >
            <HiOutlineHeart
              className={`svg ${note.favorite ? "stroke-gold fill-gold" : ""}`}
            />
          </Button>

          <Button handleClick={handleSaveNewNote}>
            <MdOutlineSaveAlt className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="min-h-[calc(100vh_-_172px)] md:min-h-fit md:h-full md:max-h-[calc(100%_-_44px)] flex flex-col relative">
        <div className="border-b border-slate-800">
          <input
            type="text"
            name="note_title"
            id="note_title"
            placeholder="Add Title..."
            autoComplete="off"
            value={note.title}
            onChange={(e) => handleNoteOptions("title", e.target.value)}
            className="bg-transparent w-full pb-2 text-2xl font-bold outline-none placeholder:text-slate-500"
          />

          <div className="flex items-center gap-1 flex-wrap mb-2">
            <button
              type="button"
              className={`bg-slate-800 text-slate-500  px-2 py-1 text-xs font-semibold capitalize rounded-full flex items-center gap-x-1`}
            >
              <HiOutlineTag className="w-3.5 h-3.5" />
              <span>tag</span>
            </button>
            <button
              type="button"
              className={`bg-slate-800 text-slate-500  px-2 py-1 text-xs font-semibold capitalize rounded-full flex items-center gap-x-1`}
            >
              <HiOutlineFolder className="w-3.5 h-3.5" />
              <span>folder</span>
            </button>
          </div>
        </div>

        <textarea
          name="note_text"
          id="note_text"
          placeholder="Write Text..."
          value={note.text}
          onChange={(e) => handleNoteOptions("text", e.target.value)}
          className="bg-transparent flex-grow focus:outline-none resize-none placeholder:text-slate-500"
        ></textarea>
      </div>
    </div>
  );
}
