import TaskItem from "./TaskItem";

export default function MyTask() {
  return (
    <div className="p-8">
      <div className="flex gap-3">
        {/* List task */}
        <div className="flex-1 p-3 border border-solid rounded-lg border-slate-400">
          <h1 className="text-xl font-bold border-b-2 border-red-500 border-solid w-fit">
            My Task
          </h1>
          <TaskItem></TaskItem>
        </div>

        {/* Taks content */}
        <div className="flex-1 border border-solid rounded-lg border-slate-400">
          Task desc
        </div>
      </div>
    </div>
  );
}
