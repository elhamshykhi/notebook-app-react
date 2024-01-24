import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Trash from "./pages/Trash";
import Favorites from "./pages/Favorites";

import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";

import NewNote from "./features/notes/components/NewNote";
import EditNote from "./features/notes/components/EditNote";
import NotesList from "./features/notes/components/NotesList";
import SingleNote from "./features/notes/components/SingleNote";

import AppProvider from "./context/AppProvider";
import TrashProvider from "./context/TrashProvider";
import NotesProvider from "./features/notes/context/NotesProvider";
import Tasks from "./features/tasks/components/Tasks";
import TasksProvider from "./features/tasks/context/TasksProvider";

function App() {
  return (
    <AppProvider>
      <NotesProvider>
        <TrashProvider>
          <TasksProvider>
            <div className="text-white h-full max-w-screen-xl mx-auto md:h-screen md:max-h-screen md:p-4 md:flex md:gap-x-4">
              <Sidebar />

              <div className="flex-1 h-full">
                <Header />

                <div className="p-4 md:px-0">
                  <div className="bg-classicBlue h-full min-h-[calc(100vh_-_96px)] rounded-xl md:h-[calc(100vh_-_104px)] md:min-h-[calc(100vh_-_104px)]">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/notes">
                        <Route index element={<NotesList />} />
                        <Route path="add" element={<NewNote />} />
                        <Route path=":id" element={<SingleNote />} />
                        <Route path="edit/:id" element={<EditNote />} />
                      </Route>
                      <Route path="/tasks">
                        <Route index element={<Tasks />} />
                      </Route>
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/trash" element={<Trash />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </TasksProvider>
        </TrashProvider>
      </NotesProvider>
    </AppProvider>
  );
}

export default App;
