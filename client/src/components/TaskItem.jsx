/* eslint-disable react/prop-types */
import { TiPin } from "react-icons/ti";
import dayjs from "dayjs";
export default function TaskItem({ item }) {
  return (
    <div className="">
      <div className="p-3 border border-solid rounded-md border-slate-400 hover:bg-slate-50 hover:transition-all">
        <div className="flex items-center justify-between">
          <span className="border-8 border-red-500 border-solid rounded-full "></span>
          <h2 className="text-xl font-semibold">{item?.title}</h2>
          <div className="p-1 text-base transition-all cursor-pointer text-slate-400 hover:text-blue-500">
            <TiPin></TiPin>
          </div>
        </div>
        <div className="flex items-center justify-between my-4 text-sm text-slate-400">
          <p>{item?.description}</p>
          <img
            className="object-cover w-20 h-20 rounded-lg"
            src={item?.taskImage}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span>Priority: </span>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Status: </span>
            <span>Not Stared</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span className="">Created on: </span>
            <span>{dayjs(item?.createdAt).format("YYYY/MM/DD")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
