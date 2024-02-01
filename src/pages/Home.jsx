import { Link, NavLink } from "react-router-dom";
import { useNotes } from "../features/notes/context/NotesProvider";
import { bgColor } from "../util/colors";
import { HiOutlineHeart, HiOutlineXMark } from "react-icons/hi2";
import { useEffect } from "react";
import { useTasks } from "../features/tasks/context/TasksProvider";

function Home() {
  const { notes, getNotes } = useNotes();
  const { tasks, getTasks, checkTask, deleteTask } = useTasks();
  useEffect(() => {
    getNotes();
    getTasks();
  }, []);

  return (
    <div className="h-full">
      <div className="min-h-[calc(100vh_-_160px)] md:min-h-fit md:h-full">
        <div className="max-h-full overflow-auto flex flex-col sm:flex-row flex-wrap gap-2 md:grid grid-cols-12 grid-rows-2 h-full">
          <div className="bg-classicBlue rounded-xl p-2 min-h-44 max-h-80 w-full md:max-h-full md:min-h-full overflow-auto col-span-7 row-span-2">
            <div className="flex items-center justify-between gap-x-2 mb-2">
              <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg">
                notes
              </h2>

              <Link
                to="/notes"
                className="text-gold rounded-full text-xs capitalize font-bold"
              >
                go to notes ...
              </Link>
            </div>

            {!notes.length ? (
              <div className="flex flex-col justify-center items-center">
                <p className="w-full capitalize text-center text-slate-600 text-sm tracking-widest mb-4 mt-8">
                  there is not any note here!
                </p>

                <Link
                  to="notes/add"
                  className="text-classicBlue px-3 py-1 rounded-full text-[10px] md:text-[11px] capitalize font-bold bg-turquoise text-center"
                >
                  add new note
                </Link>
              </div>
            ) : (
              <div className="flex flex-col xs:flex-row xs:flex-wrap gap-2">
                {notes.slice(0, 4).map((note) => (
                  <NavLink
                    to={`notes/${note.id}`}
                    key={note.id}
                    className={`min-h-32 max-h-48 ${
                      note.color ? bgColor(note.color) : "bg-slate-800"
                    } flex-grow min-w-40 max-w-full min-[450px]:max-w-[50%] lg:max-w-[33.3333%] rounded-xl p-2 xl:p-4 flex flex-col`}
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
                ))}
              </div>
            )}
          </div>

          <div className="bg-classicBlue rounded-xl p-2 min-h-44 col-span-5 sm:w-[49.35%] md:w-full">
            <div className="flex items-center justify-between gap-x-2 mb-2">
              <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg">
                tasks
              </h2>

              <Link
                to="/tasks"
                className="text-gold rounded-full text-xs capitalize font-bold"
              >
                go to tasks ...
              </Link>
            </div>
            {
              <ul className="max-w-screen-sm mx-auto flex flex-col gap-y-2 max-h-[calc(100%_-_44px)] overflow-auto">
                {tasks.length ? (
                  tasks.slice(0, 4).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-x-3 py-2 px-4 bg-slate-800 rounded-full"
                    >
                      <input
                        onChange={() => checkTask(item.id, !item.completed)}
                        type="checkbox"
                        name={item.id}
                        id={item.id}
                        className={`appearance-none w-3 h-3 md:w-3.5 md:h-3.5 ring-2 ring-turquoise ring-offset-2 ring-offset-gray-800 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                          item.completed ? "bg-turquoise" : "bg-transparent "
                        }`}
                        checked={item.completed}
                      />

                      <label
                        htmlFor={item.id}
                        className="first-letter:uppercase cursor-pointer select-none"
                      >
                        {item.title}
                      </label>

                      <button
                        onClick={() => deleteTask(item.id)}
                        type="button"
                        className="ml-auto"
                      >
                        <HiOutlineXMark className="w-5 h-5 stroke-red-500" />
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="w-full capitalize text-center text-slate-600 text-sm tracking-widest">
                    there is not any task here!
                  </p>
                )}
              </ul>
            }
          </div>

          <div className="bg-classicBlue rounded-xl p-2 min-h-44 col-span-5 sm:w-[49.35%] md:w-full">
            <span className="text-xs capitalize text-turquoise font-medium">
              schedule
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
