import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [theme, setTheme] = useState(localStorage.theme || "light");

  const handleOpenSidebar = () => setIsOpenSidebar((prev) => !prev);
  
  // theme
  const handleDarkMode = () =>
    setTheme((prev) => {
      if (prev === "light") return "dark";
      else return "light";
    });

  useEffect(() => {
    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{ isOpenSidebar, handleOpenSidebar, theme, handleDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
