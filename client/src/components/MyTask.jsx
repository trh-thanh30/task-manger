import TaskDetails from "./TaskDetails";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import ModalAddTask from "./ModalAddTask";
import { Spinner } from "flowbite-react";

export default function MyTask() {
  const [openModal, setOpenModal] = useState(false);
  const [taskItem, setTaskItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTask = async () => {
    const limit = 3;
    const page = 1;
    const search = "";
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/to-do-list?limit=${limit}&page=${page}&search=${search}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoading(false);
      setTaskItem(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <>
      <div className="p-8">
        <div className="flex gap-3">
          {/* List task */}
          <div className="flex-1 p-3 border border-solid rounded-lg border-slate-400">
            <div className="flex items-center justify-between mb-4">
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
            {taskItem?.data?.length === 0 && (
              <p className="mt-4 text-sm text-slate-400">
                No task yet, click add task to get started
              </p>
            )}
            {loading ? (
              <div className="flex items-center justify-center ">
                <Spinner size={"md"}></Spinner>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {taskItem?.data?.map((item) => (
                  <TaskItem key={item._id} item={item}></TaskItem>
                ))}
              </div>
            )}
          </div>

          {/* Taks content */}
          <div className="flex-1 border border-solid rounded-lg border-slate-400">
            <TaskDetails></TaskDetails>
          </div>
        </div>
      </div>

      <ModalAddTask
        getTask={getTask}
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></ModalAddTask>
    </>
  );
}

