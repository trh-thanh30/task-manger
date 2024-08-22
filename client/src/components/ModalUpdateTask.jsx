/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
export default function ModalUpdateTask({
  openModal,
  setOpenModal,
  todoDetails,
  getTask,
}) {
  const [formData, setFormData] = useState({
    title: todoDetails?.title || "",
    description: todoDetails?.description || "",
    priority: todoDetails?.priority || "",
    taskImage: todoDetails?.taskImage || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onchangeFile = (e) => {
    setFormData({ ...formData, taskImage: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("title", formData.title);
    newForm.append("description", formData.description);
    newForm.append("priority", formData.priority);
    newForm.append("taskImage", formData.taskImage);
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://localhost:3000/api/to-do-list/${todoDetails?._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: newForm,
        }
      );
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message);
      }
      setOpenModal(false);
      getTask();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
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
                  defaultValue={todoDetails?.title}
                  onChange={onChange}
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
                  onChange={onChange}
                  defaultValue={todoDetails?.priority}
                >
                  <option value="Extreme">Extreme</option>
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
                  onChange={onchangeFile}
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
                  id="description"
                  name="description"
                  defaultValue={todoDetails?.description}
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
                  {loading ? <Spinner size={"md"} /> : "Update Task"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
