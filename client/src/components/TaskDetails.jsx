import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
export default function TaskDetails() {
  return (
    <div>
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            className="object-cover rounded-lg w-36 h-36"
            src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/IMG%20Worlds%20of%20Adventure%20Admission%20Ticket%20in%20Dubai%20-%20Klook.jpg"
            alt=""
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Subnit</h2>
            <div className="flex gap-1">
              <span>Priority: </span> <span>High</span>
            </div>
            <div className="flex gap-1">
              <span>Priority: </span> <span>High</span>
            </div>
            <div className="flex gap-1 text-sm text-slate-300">
              <span>Priority: </span> <span>High</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="mt-3">
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            tempore exercitationem consequatur eum nostrum odio suscipit dolor
            incidunt? Autem quis rem nulla ex labore cupiditate temporibus
            aspernatur possimus dignissimos nemo?
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button className="p-2 text-base text-green-500 rounded-md bg-green-50">
            <CiEdit></CiEdit>
          </button>
          <button className="p-2 text-base text-red-500 rounded-md bg-red-50">
            <MdOutlineDelete></MdOutlineDelete>
          </button>
        </div>
      </div>
    </div>
  );
}
