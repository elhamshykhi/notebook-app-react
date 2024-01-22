import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const NotesContext = createContext();

const initialState = { notes: [], loading: false, currentNote: {} };

function NotesReducer(state, { type, payload }) {
  switch (type) {
    case "pending":
      return { ...state, loading: true };
    case "fetchNotes":
      return { ...state, loading: false, notes: payload };
    case "fetchNote":
      return { ...state, loading: false, currentNote: payload };
    case "addNote":
      return { ...state, loading: false, notes: [...state.notes, payload] };
    case "editNote":
      return {
        ...state,
        loading: false,
        currentNote: payload,
      };
    case "deleteNote":
      return {
        ...state,
        loading: false,
        currentNote: {},
      };
    case "reject":
      return { notes: [], loading: false, currentNote: {} };
    default:
      return state;
  }
}

export default function NotesProvider({ children }) {
  const [{ notes, loading, currentNote }, dispatch] = useReducer(
    NotesReducer,
    initialState
  );

  async function getNotes() {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.get("http://localhost:5000/notes");
      dispatch({ type: "fetchNotes", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function getNote(id) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.get(`http://localhost:5000/notes/${id}`);
      dispatch({ type: "fetchNote", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function saveNote(newNote) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.post(`http://localhost:5000/notes`, newNote);
      dispatch({
        type: "addNote",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function editNote(id, newNote) {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/notes/${id}`,
        newNote
      );

      dispatch({ type: "editNote", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }

  async function deleteNote(id) {
    dispatch({ type: "pending" });
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      dispatch({ type: "deleteNote" });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "reject" });
    }
  }
  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        currentNote,
        getNotes,
        getNote,
        saveNote,
        editNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
