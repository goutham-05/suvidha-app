import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";
import './index.css';
import BackgroundImage from "../background";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { getMyDischarge } from "../../reduxtoolkit/myDischargeSlice";

const MyDischargeModal = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let unit_id = "";
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }



  useEffect(() => {
    dispatch(
      getMyDischarge({
        admissionno: localStorage.getItem("admissionno"),
        unit_id: unit_id,
      })
    );
  }, [])

  const DischargeStatus = useAppSelector((state) => state.myDischarge);

let myDis = DischargeStatus.data?.native_summary_status;
myDis = myDis === null ? "NO" : myDis;

  const myDischargeData = [
    DischargeStatus.data?.discharge_initiated,
    myDis,
  ]


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
 
            <div style={{display: 'flex'}}>
                <Grid>
        <div style={{marginTop: '45px', marginLeft: '10px', textAlign: 'left'}}>
          {[
            "Discharge Initiated",
            "Summary Created",
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
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid>
      <Grid>
        <div style={{marginTop: '20px', marginLeft: '20px', textAlign: 'left'}}>
          {myDischargeData.map((item, index) => (
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
                : {item}
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

