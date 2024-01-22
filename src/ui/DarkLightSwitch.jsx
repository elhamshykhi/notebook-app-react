import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useApp } from "../context/AppProvider";

function DarkLightSwitch() {
  const { handleDarkMode, theme } = useApp();
  return (
    <button
      type="button"
      onClick={handleDarkMode}
      className="bg-slate-800 w-20 rounded-full shadow-sm p-1 cursor-pointer"
    >
      <div
        className={`w-7 h-7 border-2 flex items-center justify-center rounded-full transition-all duration-1000 ease-in-out ${
          theme === "dark"
            ? "translate-x-10 rotate-[360deg] border-turquoise text-turquoise"
            : "translate-x-0 rotate-0 border-gold text-gold"
        }`}
      >
        {theme === "dark" ? (
          <HiOutlineMoon
            className={`svg transition-opacity duration-1000 ease-in-out ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <HiOutlineSun className="svg" />
        )}
      </div>
    </button>
  );
}

export default DarkLightSwitch;
