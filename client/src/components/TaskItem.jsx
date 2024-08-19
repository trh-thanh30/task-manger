import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { Dropdown } from "flowbite-react";
export default function TaskItem() {
  return (
    <div className="p-6">
      <div className="p-3 border border-solid rounded-md border-slate-400 hover:bg-slate-50 hover:transition-all">
        <div className="flex items-center justify-between">
          <span className="border-8 border-red-500 border-solid rounded-full "></span>
          <h2 className="text-xl font-semibold">Tets</h2>
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="cursor-pointer">
                <PiDotsThreeOutlineThin />
              </span>
            )}
          >
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex items-center my-4 text-sm text-slate-400">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            quibusdam ipsum quae neque et dolore tenetur accusamus nemo totam.
            In, esse eaque! Praesentium amet quis libero, maxime dicta vel
            tempore?
          </p>
          <img
            className="object-cover w-20 h-20 rounded-lg"
            src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/IMG%20Worlds%20of%20Adventure%20Admission%20Ticket%20in%20Dubai%20-%20Klook.jpg"
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
            <span>2011-11-1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
