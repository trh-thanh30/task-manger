"use client";

import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { MdTask } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { GiPin } from "react-icons/gi";
import { GrTask } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
export default function SidebarDash() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=dash"}>
            <Sidebar.Item
              as="div"
              icon={HiChartPie}
              active={tab === "dash" || !tab}
            >
              Dashboard
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=my-taks"}>
            <Sidebar.Item active={tab === "my-taks"} icon={MdTask} as="div">
              My Taks
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=vital-task"}>
            <Sidebar.Item
              as="div"
              active={tab === "vital-task"}
              icon={CgDanger}
            >
              Vital Task
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=task-pin"}>
            <Sidebar.Item as="div" active={tab === "task-pin"} icon={GiPin}>
              {" "}
              Task Pin
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=task-categories"}>
            <Sidebar.Item
              as="div"
              active={tab === "task-categories"}
              icon={GrTask}
            >
              {" "}
              Task Categories
            </Sidebar.Item>
          </Link>

          <Sidebar.Item icon={GoSignOut} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
