import { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useTasks } from "../context/TasksProvider";

export default function Tasks() {
  const [task, setTask] = useState({ title: "", completed: false });
  const { tasks, loading, getTasks, saveTask, checkTask, deleteTask } =
    useTasks();
  const inputRef = useRef();

  useEffect(() => {
    getTasks();
    inputRef.current.focus();
  }, []);

  const handleTaskTitle = (e) => {
    setTask((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  const handleSaveNewTask = () => {
    if (!task.title) return;
    saveTask(task);
    setTask({ title: "", completed: false });
  };

  return (
    <div className="p-4 h-full bg-classicBlue rounded-xl">
      <h2 className="capitalize font-bold text-turquoise text-sm xs:text-base lg:text-lg mb-2">
        Tasks
      </h2>

      <div className="min-h-[calc(100vh_-_160px)] md:min-h-fit md:h-full md:max-h-[calc(100%_-_36px)]">
        <div className="bg-slate-800 mb-2 max-w-screen-sm mx-auto px-3 py-1.5 rounded-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveNewTask();
            }}
            className="flex items-center"
          >
            <input
              type="text"
              name="task"
              id="task"
              placeholder="Add Task..."
              autoComplete="off"
              ref={inputRef}
              value={task.title}
              onChange={handleTaskTitle}
              className="bg-transparent w-full text-lg font-semibold outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              className={`px-4 xs:px-6 py-1.5 rounded-full font-bold uppercase text-sm border-2 ${
                task.title
                  ? "border-gold text-gold"
                  : "border-turquoise text-turquoise"
              }`}
            >
              add
            </button>
          </form>
        </div>

        {loading ? (
          <p className="p-4 capitalize animate-pulse text-gray-600">
            loading...
          </p>
        ) : (
          <ul className="max-w-screen-sm mx-auto flex flex-col gap-y-2 max-h-[calc(100%_-_44px)] overflow-auto">
            {tasks.length ? (
              tasks.map((item) => (
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
        )}
      </div>
    </div>
  );
}
