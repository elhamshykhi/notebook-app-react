import { NavLink } from "react-router-dom";
import { useNotes } from "../features/notes/context/NotesProvider";
import { HiOutlineHeart } from "react-icons/hi2";
import { useEffect } from "react";

function Favorites() {
  const { notes, loading, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="p-4 h-full bg-classicBlue rounded-xl">
      <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg mb-2">
        favorites list
      </h2>

      <div className="min-h-[calc(100vh_-_160px)] md:min-h-fit md:h-full md:max-h-[calc(100%_-_36px)]">
        <div className="max-h-full overflow-auto flex flex-wrap gap-2">
          {!notes.length ? (
            <p className="w-full capitalize text-center text-slate-600 text-sm tracking-widest">
              favorites is empty!
            </p>
          ) : loading ? (
            <p className="p-4 capitalize animate-pulse text-gray-600">
              loading...
            </p>
          ) : (
            notes
              .filter((item) => item.favorite)
              .map((note) => (
                <NavLink
                  to={`/notes/${note.id}`}
                  key={note.id}
                  className={`min-h-32 max-h-48 bg-gray-800 flex-grow min-w-40 max-w-full min-[450px]:max-w-[50%] lg:max-w-[33.3333%] rounded-xl p-2 xl:p-4 flex flex-col`}
                >
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <p className="capitalize font-semibold text-slate-200">
                        {note.title}
                      </p>

                      <span className="cursor-default">
                        <HiOutlineHeart
                          className={`w-4 h-4 pointer-events-none stroke-2 stroke-gold ${
                            note.favorite ? "fill-gold" : ""
                          }`}
                        />
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      {new Date(note.createdAt).toLocaleString("en-US", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <p className="text-xs line-clamp-5 text-slate-300 whitespace-pre-line mb-4">
                    {note.text}
                  </p>
                </NavLink>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
