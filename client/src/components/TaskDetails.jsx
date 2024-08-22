/* eslint-disable react/prop-types */

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import ModalUpdateTask from "./ModalUpdateTask";
export default function TaskDetails({ todoDetails, getTask }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            className="object-cover rounded-lg w-36 h-36"
            src={todoDetails?.taskImage}
            alt=""
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{todoDetails?.title}</h2>
            <div className="flex gap-1">
              <span>Priority: </span> <span>{todoDetails?.priority}</span>
            </div>
            <div className="flex gap-1">
              <span>Status: </span> <span>High</span>
            </div>
            <div className="flex gap-1 text-sm text-slate-300">
              <span>Tags: </span> <span>High</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="mt-3">
          <p className="text-sm text-slate-500">{todoDetails?.description}</p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={() => setOpenModal(true)}
            className="p-2 text-base text-green-500 rounded-md bg-green-50"
          >
            <CiEdit></CiEdit>
          </button>
          <button className="p-2 text-base text-red-500 rounded-md bg-red-50">
            <MdOutlineDelete></MdOutlineDelete>
          </button>
        </div>
      </div>

      <ModalUpdateTask
        openModal={openModal}
        setOpenModal={setOpenModal}
        todoDetails={todoDetails}
        getTask={getTask}
      ></ModalUpdateTask>
    </div>
  );
}
