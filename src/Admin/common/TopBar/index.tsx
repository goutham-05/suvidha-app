import React from "react";
import Logo from "../../../assets/Logo.png";
import './index.css';
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <img src={Logo} width={'8%'}/>
        {/* <div className="topLeft">
          <img src={Logo} />
        </div> */}
        <div className="topRight">
          <div className="topbarIconContainer">
            <span className="topIconBadge">AdminName</span>
          </div>
          <div className="topbarIconContainer">
            <span className="topIconBadge">Logout</span>
          </div>
          <div className="topbarIconContainer"></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
