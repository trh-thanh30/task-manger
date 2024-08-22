import TaskDetails from "./TaskDetails";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import ModalAddTask from "./ModalAddTask";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function MyTask() {
  const naigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [todoDetails, setToDoDetails] = useState();
  const [taskItem, setTaskItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageTaksDetailsNull =
    "https://glints.com/vn/blog/wp-content/uploads/2022/09/to-do-list-ma%CC%82%CC%83u.jpeg";
  // get all to do list
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
      if (res.status === 401) {
        naigate("/sign-in");
      }
      setLoading(false);
      setTaskItem(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTask();
  }, []);

  // get to do deatils
  const getToDoDeatils = async (item) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/to-do-list/${item._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoading(false);
      setToDoDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <TaskItem
                    getToDoDeatils={getToDoDeatils}
                    key={item._id}
                    item={item}
                    getTask={getTask}
                  ></TaskItem>
                ))}
              </div>
            )}
          </div>

          {/* Taks content */}
          <div className="flex-1 border border-solid rounded-lg border-slate-400">
            {todoDetails ? (
              <TaskDetails
                todoDetails={todoDetails}
                getTask={getTask}
              ></TaskDetails>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="mt-4 text-sm text-center text-slate-400">
                  Click your to do task to see details
                </p>
                <img
                  className="object-cover w-40 h-40 rounded-md"
                  src={imageTaksDetailsNull}
                  alt=""
                />
              </div>
            )}
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
