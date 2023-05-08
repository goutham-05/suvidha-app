import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";
import './index.css';
import BackgroundImage from "../background";
const MyDischargeModal = () => {
  const navigate = useNavigate();

  const Back = () => {
    navigate("/mydetails");
  };
  return (
    <div>
        <Navbar />
        <div className="mydischargeContainer">
            <div className="mydischargeHeader">
                <span className="headerTitle" style={{background: '#4A98CD'}}>My Discharge</span>
                <div onClick={Back}>
                <Icon disabled name='close'  size="large" color="black" style={{marginTop: '10px', marginLeft: '20px'}}/>
                </div>
            </div>
            {/* <div>
                <Grid>
        <div style={{marginTop: '50px', marginLeft: '20px'}}>
          {[
            "Discharge Time: 12:00 PM",
            "Discharge Start: May 3,2023",
            "Discharge Complete: May 3,2023",
            "Discharge Approved: Yes",
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
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid>
            </div> */}
            <div style={{display: 'flex'}}>
                <Grid>
        <div style={{marginTop: '45px', marginLeft: '10px', textAlign: 'left'}}>
          {[
            "Discharge Time",
            "Discharge Start",
            "Discharge Complete",
            "Discharge Approved",
          ].map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {item}
                {/* <div style={{border: '1px solid #6C6D70'}} /> */}
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid>
      <Grid>
        <div style={{marginTop: '20px', marginLeft: '20px', textAlign: 'left'}}>
          {[
            ":12:00 PM",
            ":May 3,2023l",
            ":May 3,2023",
            ":Approved",
          ].map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {item}
                {/* <div style={{border: '1px solid #6C6D70'}} /> */}
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid> 
 
            </div>
        </div>
        <BackgroundImage />
    </div>
  );
};

export default MyDischargeModal;

