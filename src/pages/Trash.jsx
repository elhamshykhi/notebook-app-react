import { useTrash } from "../context/TrashProvider";
import { useEffect } from "react";
import { useNotes } from "../features/notes/context/NotesProvider";
import { bgColor } from "../util/colors";

export default function Trash() {
  const { trash, loading, getTrash, deleteTrash } = useTrash();
  const { saveNote } = useNotes();

  useEffect(() => {
    getTrash();
  }, []);

  return (
    <div className="p-4 h-full bg-classicBlue rounded-xl">
      <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg mb-2">
        trash
      </h2>

      <div className="min-h-[calc(100vh_-_160px)] md:min-h-fit md:h-full md:max-h-[calc(100%_-_36px)]">
        <div className="max-h-full overflow-auto flex flex-wrap gap-2">
          {!trash.length ? (
            <p className="w-full capitalize text-center text-slate-600 text-sm tracking-widest">
              trash is empty!
            </p>
          ) : loading ? (
            <p className="p-4 capitalize animate-pulse text-gray-600">
              loading...
            </p>
          ) : (
            trash.map((trashItem) => (
              <div
                key={trashItem.id}
                className={`min-h-32 max-h-48 ${
                  trashItem.color ? bgColor(trashItem.color) : "bg-slate-800"
                } bg-gray-800 flex-grow min-w-40 max-w-full min-[450px]:max-w-[50%] lg:max-w-[33.3333%] rounded-xl p-2 xl:p-4 flex flex-col`}
              >
                <div className="mb-2">
                  <p className="capitalize font-semibold text-slate-200">
                    {trashItem.title}
                  </p>

                  <p className="text-[11px] text-slate-500">
                    {new Date(trashItem.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <p className="text-xs line-clamp-5 text-slate-300 whitespace-pre-line">
                  {trashItem.text}
                </p>

                <div className="flex items-center justify-between mt-auto text-xs font-medium">
                  <button
                    onClick={() => {
                      deleteTrash(trashItem.id);
                      saveNote(trashItem);
                    }}
                    className="text-green-500 capitalize tracking-wider"
                  >
                    restore
                  </button>
                  <button
                    onClick={() => deleteTrash(trashItem.id)}
                    className="text-red-500 capitalize tracking-wider"
                  >
                    delete permanently
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
