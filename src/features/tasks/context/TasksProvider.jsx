import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext();

const initialState = { tasks: [], loading: false };

function tasksReducer(state, { type, payload }) {
  switch (type) {
    case "pending":
      return { ...state, loading: true };
    case "fetchTasks":
      return { ...state, loading: false, tasks: payload };
    case "addTask":
      return { ...state, loading: false, tasks: [...state.tasks, payload] };
    case "checkTask":
      return {
        ...state,
        loading: false,
        tasks: [
          ...state.tasks.map((item) =>
            item.id === payload.id
              ? { ...item, completed: payload.completed }
              : item
          ),
        ],
      };
    case "deleteTask":
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((item) => item.id !== payload.id),
      };
    case "reject":
      return { notes: [], loading: false };
    default:
      return state;
  }
}

export default function TasksProvider({ children }) {
  const [{ tasks, loading }, dispatch] = useReducer(tasksReducer, initialState);

  async function getTasks() {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.get(`http://localhost:5000/tasks`);
      dispatch({ type: "fetchTasks", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function saveTask(newTask) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.post(`http://localhost:5000/tasks`, {
        ...newTask,
        createdAt: new Date().toISOString(),
      });
      dispatch({ type: "addTask", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function checkTask(id, completed) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.patch(`http://localhost:5000/tasks/${id}`, {
        completed,
      });
      dispatch({ type: "checkTask", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function deleteTask(id) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.delete(`http://localhost:5000/tasks/${id}`);
      dispatch({ type: "deleteTask", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  return (
    <TasksContext.Provider
      value={{ tasks, loading, getTasks, saveTask, checkTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
