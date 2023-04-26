import React from "react";
import TopBar from "../common/TopBar";
import SideBar from "../common/SideBar";
import MainBar from "../common/MainBar";

function AdminHome() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <SideBar />
      </div>
      {/* <div className="container">
        <SideBar />
        <div>
          <MainBar />
        </div>
      </div> */}
    </div>
  );
}

export default AdminHome;
