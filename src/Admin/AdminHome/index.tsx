import React from "react";
import TopBar from "../common/TopBar";
import SideBar from "../common/SideBar";
import MainBar from "../common/MainBar";
import './index.css';
function AdminHome() {
  return (
    <div>
      <TopBar />
      <div className="flex-container">
        <SideBar />
        <MainBar />
    </div>
    </div>
  );
}

export default AdminHome;
