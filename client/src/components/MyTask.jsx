import { Button, Label, Modal } from "flowbite-react";
import TaskDetails from "./TaskDetails";
import TaskItem from "./TaskItem";
import ReactQuill from "react-quill";
import { useState } from "react";

export default function MyTask() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="p-8">
        <div className="flex gap-3">
          {/* List task */}
          <div className="flex-1 p-3 border border-solid rounded-lg border-slate-400">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold border-b-2 border-red-500 border-solid w-fit">
                My Task
              </h1>
              <p
                onClick={() => setOpenModal(true)}
                className="text-sm cursor-pointer text-slate-400 hover:underline"
              >
                Add Task
              </p>
            </div>
            <TaskItem></TaskItem>
          </div>

          {/* Taks content */}
          <div className="flex-1 border border-solid rounded-lg border-slate-400">
            <TaskDetails></TaskDetails>
          </div>
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex flex-col gap-3">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer w-fit"
                  htmlFor="title"
                  value="Title"
                ></Label>
                <input
                  type="text"
                  id="title"
                  placeholder="Add your title task"
                  className="p-3 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
                ></input>
              </div>

              {/* Priority */}
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer w-fit"
                  htmlFor="priority"
                  value="Priority"
                ></Label>
                <select
                  className="p-3 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
                  name="priority"
                  id="priority"
                >
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* taskImage */}
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer w-fit"
                  htmlFor="taskImage"
                  value="Task Image"
                ></Label>
                <input
                  type="file"
                  accept="image/*"
                  className="p-3 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
                  name="taskImage"
                  id="taskImage"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer w-fit"
                  htmlFor="description"
                  value="Task Description"
                ></Label>
                <ReactQuill
                  theme="snow"
                  placeholder="Write something..."
                  className="mb-12 h-72"
                  required
                  id="description"
                ></ReactQuill>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button gradientDuoTone={"purpleToBlue"} outline>
            Add
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
