import {
  HiOutlineChevronDoubleRight,
  HiOutlineCalendarDays,
  HiOutlineFolder,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi2";
import { PiNotebook } from "react-icons/pi";
import { LuListTodo } from "react-icons/lu";

import { NavLink } from "react-router-dom";

import SearchInput from "./SearchInput";
import DarkLightSwitch from "./DarkLightSwitch";

import { useApp } from "../context/AppProvider";

const sidebarIcons = [
  {
    title: "home",
    children: <HiOutlineHome className="svg" />,
  },
  {
    title: "notes",
    children: <PiNotebook className="svg" />,
  },
  {
    title: "tasks",
    children: <LuListTodo className="svg" />,
  },
  {
    title: "favorites",
    children: <HiOutlineHeart className="svg" />,
  },
  {
    title: "tags",
    children: <HiOutlineTag className="svg" />,
  },
  {
    title: "folders",
    children: <HiOutlineFolder className="svg" />,
  },
  {
    title: "schedule",
    children: <HiOutlineCalendarDays className="svg" />,
  },
  {
    title: "trash",
    children: <HiOutlineTrash className="svg" />,
  },
  {
    title: "login",
    children: <HiOutlineUser className="svg" />,
  },
];

function Sidebar() {
  const { isOpenSidebar, handleOpenSidebar } = useApp();

  return (
    <div
      className={`bg-classicBlue z-50 h-[calc(100vh_-_64px)] absolute top-16 inset-x-0 transition-transform duration-500 ease-in-out py-4 ${
        isOpenSidebar
          ? "translate-x-0 md:w-52 lg:w-56"
          : "-translate-x-full md:translate-x-0 md:w-16 xl:w-56"
      } md:rounded-xl md:h-full md:block md:static md:transition-[width] md:duration-700 md:ease-in-out`}
    >
      <div className="h-16 px-5 py-4 w-full mb-4 items-center justify-end hidden md:flex md:h-14">
        <button
          onClick={handleOpenSidebar}
          type="button"
          className={`w-6 h-6 hidden md:block xl:hidden transition-transform duration-500 ease-in-out ${
            isOpenSidebar ? "rotate-180" : "rotate-0"
          }`}
        >
          <HiOutlineChevronDoubleRight className="w-full h-6 stroke-2 stroke-turquoise" />
        </button>
      </div>

      <div className="w-full max-w-md px-4 mx-auto md:hidden">
        <SearchInput />
      </div>

      <ul className="flex flex-col gap-y-2 h-full max-h-[calc(100%_-_36px)] md:max-h-[calc(100%_-_72px)] overflow-y-auto overflow-x-hidden py-4 md:pt-0">
        {sidebarIcons.map((item) => (
          <SidebarLink key={item.title} {...item} />
        ))}
        <div className="mx-auto mt-4 md:hidden">
          <DarkLightSwitch />
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;

export function SidebarLink({ children, title }) {
  const { isOpenSidebar } = useApp();

  return (
    <li className={`${title === "trash" ? "md:mt-auto" : ""}`}>
      <NavLink
        to={title === "home" ? "/" : `/${title}`}
        className="flex items-center justify-center md:justify-start gap-x-2 px-[22px] py-1.5 text-turquoise hover:bg-slate-950 transition-colors duration-300 ease-in-out"
      >
        <span className="hidden md:block">{children}</span>
        <span
          className={`capitalize font-semibold text-sm ${
            isOpenSidebar
              ? "opacity-100 visible"
              : "opacity-0 invisible xl:opacity-100 xl:visible"
          } transition-all duration-500 ease-in-out`}
        >
          {title}
        </span>
      </NavLink>
    </li>
  );
}
