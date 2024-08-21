/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
export default function ModalAddTask({ openModal, setOpenModal, getTask }) {
  // strip html reactQuill
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    taskImage: null,
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeFile = (e) => {
    setFormData({ ...formData, taskImage: e.target.files[0] });
  };

  // create task
  const handleSubmit = async (e) => {
    const newForm = new FormData();
    newForm.append("title", formData.title);
    newForm.append("description", formData.description);
    newForm.append("taskImage", formData.taskImage);
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/api/to-do-list", {
        method: "POST",
        credentials: "include",
        body: newForm,
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          taskImage: null,
        });
        setOpenModal(false);
        getTask();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                name="title"
                value={formData.title}
                onChange={onChange}
                placeholder="Add your title task"
                className="p-3 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
              ></input>
            </div>
            {/* Priority */}
            {/* <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="priority"
                value="Priority"
              ></Label>
              <select
                onSelect={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="p-3 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
                name="priority"
                id="priority"
              >
                <option value="Extreme">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div> */}
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
                onChange={handleChangeFile}
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
                id="description"
                name="description"
                placeholder="Write something..."
                className="mb-12 h-72"
                onChange={(e) =>
                  setFormData({ ...formData, description: stripHtml(e) })
                }
              ></ReactQuill>
            </div>
            {error && (
              <Alert color={"failure"} onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}
            <Modal.Footer className="flex justify-end pb-0">
              <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
                {loading ? <Spinner size={"xs"}></Spinner> : "Create Task"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
