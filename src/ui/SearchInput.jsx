import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function SearchInput() {
  return (
    <form className="bg-slate-800 flex items-center gap-x-2 rounded-full px-2">
      <input
        type="text"
        name="search"
        id="search"
        autoComplete="off"
        placeholder="Search ..."
        className="py-2 pl-2 text-sm text-slate-200 flex-1 bg-transparent focus:outline-none placeholder:text-slate-500"
      />

      <button type="submit">
        <HiOutlineMagnifyingGlass className="w-6 h-6 stroke-turquoise stroke-2" />
      </button>
    </form>
  );
}

export default SearchInput;
