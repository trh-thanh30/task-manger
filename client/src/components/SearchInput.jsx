import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <div className="w-64 2xl:w-[400px] flex items-center py-1 px-2 rounded-full bg-[#f3f4f6]">
      <input
        type="text"
        placeholder="Search...."
        className="flex-1 text-sm bg-transparent border-none text-slate-500 placeholder:text-slate-500 focus:ring-0"
      />
      <div className="h-5 mr-2 border-l border-solid border-slate-600"></div>
      <CiSearch className="text-xl text-slate-500" />
    </div>
  );
}
