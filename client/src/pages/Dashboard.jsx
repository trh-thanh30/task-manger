import { useLocation } from "react-router-dom";
import FooterCom from "../components/Footer";
import Header from "../components/Header";
import SidebarDash from "../components/SidebarDash";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const loaction = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [loaction.search]);
  return (
    <>
      <Header></Header>
      <div className="flex flex-col min-h-screen md:flex-row">
        <div className="md:w-56">
          {/* SideBar */}
          <SidebarDash></SidebarDash>
        </div>

        {/* Content */}
        {tab === "dash" && <div className="flex-1 p-4">Content</div>}
        {tab === "my-taks" && <div className="flex-1 p-4">Content</div>}
        {tab === "vital-task" && <div className="flex-1 p-4">Content</div>}
        {tab === "task-pin" && <div className="flex-1 p-4">Content</div>}
        {tab === "task-categories" && <div className="flex-1 p-4">Content</div>}
      </div>
      <FooterCom></FooterCom>
    </>
  );
}
