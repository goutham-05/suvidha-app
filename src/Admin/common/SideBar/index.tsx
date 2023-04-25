import React from 'react';
import { Link } from "react-router-dom";
import './index.css';
function SideBar() {
    return (
      <div className="box1">
<div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              QR CODES
            </li>
            </Link>
          </ul>
        </div>
        
      </div>
      </div>

    );
}

export default SideBar;