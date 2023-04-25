import React from "react";
import Logo from "../../../assets/Logo.png";
import './index.css';
function TopBar() {
  return (
    // <div className="topbar">
    //   <div className="topbarWrapper">
    //     <div className="topLeft">
    //       <img src={Logo} width={'20%'} style={{marginLeft: '40px'}}/>
    //     </div>
    //     <div className="topRight">
    //       <div className="topbarIconContainer">
    //         <span className="topIconBadge">AdminName</span>
    //       </div>
    //       <div className="topbarIconContainer">
    //         <span className="topIconBadge">Logout</span>
    //       </div>
    //       <div className="topbarIconContainer"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="container">
<div className="topbarWrapper">
        <div className="topLeft">
          <img src={Logo} width={'60%'} />
        </div>
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
