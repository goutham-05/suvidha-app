import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";
import './index.css';
import BackgroundImage from "../background";
const MyBillModal = () => {
  const navigate = useNavigate();

  const Back = () => {
    navigate("/mydetails");
  };
  return (
    <div>
        <Navbar />
        <div className="mydischargeContainer">
            <div className="mydischargeHeader">
                <span className="headerTitle">My Bills</span>
                <div onClick={Back}>
                <Icon disabled name='close'  size="large" color="black" style={{marginTop: '10px', marginLeft: '20px'}}/>
                </div>
            </div>
            <div>
                <Grid>
        <div style={{marginTop: '50px', marginLeft: '34px'}}>
          {[
            "Advance paid: 100",
            "Approximate bill: Nill",
            "initial_estimated_amount: 100",
            "Due amt: Nill",
          ].map((item, index) => (
            <Grid.Column width={8} textAlign="justified">
              <span
                style={{
                  padding: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: 'black'
                }}
              >
                {item}
                <div style={{border: '1px solid #6C6D70'}} />
              </span>
            </Grid.Column>
          ))}
            <div
           className="payBillButton"
          >
            <span style={{ marginLeft: "6px", color: "white"}}>Pay Bill</span>
          </div>
        </div>
      </Grid>
            </div>
        </div>
        <BackgroundImage />
    </div>
  );
};

export default MyBillModal;
