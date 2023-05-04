import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";

import "./index.css";
import BackgroundImage from "../background";
const MyInsuranceModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const Back = () => {
    navigate("/mydetails");
  };
  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle">My Insurance</span>
          <div onClick={Back}>
            <Icon
              disabled
              name="close"
              size="large"
              color="black"
              style={{ marginTop: "10px", marginLeft: "20px" }}
            />
          </div>
        </div>
        <div style={{ marginTop: "100px", width: '90%', background: 'white', marginLeft: '20px'}}>
          <h1>Insurance link</h1>
        </div>
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyInsuranceModal;
