import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import SearchInput from "./SearchInput";
import DarkLightSwitch from "./DarkLightSwitch";
import { useApp } from "../context/AppProvider";

function Header() {
  const { isOpenSidebar, handleOpenSidebar } = useApp();

  return (
    <div className="bg-classicBlue flex items-center justify-between border-b border-b-slate-800 px-4 h-16 md:border-b-0 md:h-14 md:rounded-xl">
      <h1 className="text-gold font-bold uppercase">notebook</h1>
      <button onClick={handleOpenSidebar} type="button" className="md:hidden">
        {isOpenSidebar ? (
          <HiOutlineXMark className="w-6 h-6 stroke-turquoise stroke-2" />
        ) : (
          <HiOutlineBars3 className="w-6 h-6 stroke-turquoise stroke-2" />
        )}
      </button>
      <div className="w-1/2 max-w-sm hidden md:block">
        <SearchInput />
      </div>

      <div className="hidden md:block">
        <DarkLightSwitch />
      </div>
    </div>
  );
}

export default Header;
