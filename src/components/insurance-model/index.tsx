import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";

import { getMyInsuranceStatus } from '../../reduxtoolkit/myDetailsSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

import "./index.css";
import BackgroundImage from "../background";
const MyInsuranceModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const Back = () => {
    navigate("/mydetails");
  };

  useEffect(() => {
    dispatch(
      getMyInsuranceStatus({
        admissionno: localStorage.getItem("admissionno"),
      })
    );
  }, []);
  const insuranceStatus = useAppSelector((state) => state.myDetails);
  console.log("insuranceStatus::",insuranceStatus.data?.call_log_reason);
  const insuranceValues = [
    insuranceStatus?.data?.call_log_reason,
    insuranceStatus?.data?.payer_remarks
  ];
  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle">My Bill</span>
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
        <div className="two-column-container">
      <div className="column" style={{
      marginTop: "45px",
      textAlign: "left",
    }}>
        {[
      "Status",
      "Remarks"
    ].map((item, index) => (
      <Grid.Column
        width={8}
        textAlign="justified"
        style={{ marginBottom: "10px", width: '100%'}}
      >
        <span
          style={{
            padding: "10%",
            fontSize: "100%",
            fontWeight: "bold",
            color: "black",
            marginLeft: "10%",
          }}
        >
          {item}
        </span>
      </Grid.Column>
    ))}
      </div>
      <div className="column" style={{
      marginTop: "45px",
      textAlign: "left",
      marginLeft: '10%'
    }}>
      {insuranceValues.map((item, index) => (
      <Grid.Column
        width={8}
        textAlign="justified"
        style={{ marginBottom: "10px" }}
      >
        <span
          style={{
            padding: "10%",
            fontSize: "100%",
            fontWeight: "bold",
            color: "black",
            marginLeft: "10px",
          }}
        >
          : 
          {item}
        </span>
      </Grid.Column>
    ))}
    <div
    className="payBillButton"
    style={{ marginTop: "30px", marginLeft: "-60px" }}
  >
    <span
      style={{
        marginLeft: "22%",
        color: "white",
        marginTop: "100%",
      }}
    >
      Pay Bill
    </span>
  </div>
      </div>
    </div>
    
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyInsuranceModal;
