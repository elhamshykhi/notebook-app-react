import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const TrashContext = createContext();

const initialState = { trash: [], loading: false };

function trashReducer(state, { type, payload }) {
  switch (type) {
    case "pending":
      return { ...state, loading: true };
    case "fetchTrash":
      return { ...state, loading: false, trash: payload };
    case "deleteTrash":
      return {
        ...state,
        loading: false,
        trash: state.trash.filter((item) => item.id !== payload.id),
      };
    case "reject":
      return { trash: [], loading: false };
    default:
      return state;
  }
}

export default function TrashProvider({ children }) {
  const [{ trash, loading }, dispatch] = useReducer(trashReducer, initialState);

  async function getTrash() {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.get("http://localhost:5000/trash");
      dispatch({ type: "fetchTrash", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function addToTrash(item) {
    dispatch({ type: "pending" });
    try {
      await axios.post("http://localhost:5000/trash", item);
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function deleteTrash(id) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.delete(`http://localhost:5000/trash/${id}`);
      dispatch({ type: "deleteTrash", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  return (
    <TrashContext.Provider
      value={{ trash, loading, getTrash, addToTrash, deleteTrash }}
    >
      {children}
    </TrashContext.Provider>
  );
}

export function useTrash() {
  return useContext(TrashContext);
}
