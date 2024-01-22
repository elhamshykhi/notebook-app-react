import axios from "axios";
import { createContext, useContext, useState } from "react";

const TrashContext = createContext();

export default function TrashProvider({ children }) {
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState([]);

  async function getTrash() {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/trash");
      setTrash(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addToTrash(item) {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/trash", item);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTrash(id) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`http://localhost:5000/trash/${id}`);
      setTrash(trash.filter((item) => item.id !== data.id));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
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
