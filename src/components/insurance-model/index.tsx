import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";

import { getMyInsuranceStatus } from "../../reduxtoolkit/myDetailsSlice";
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

  const [insuranceData, setInsuranceData] = useState(null);
  const [insuranceStatu, setInsuranceStatu] = useState(false);

  useEffect(() => {
    if (insuranceStatus.data === null) {
      setInsuranceData(null);
      setInsuranceStatu(true);
    }
    else {
      setInsuranceData(insuranceStatus.data);
      setInsuranceStatu(false)
      console.log('status::', insuranceData);
    }
  })

  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle" style={{background: '#4A98CD'}}>Insurance Claim Status</span>
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

        <Grid style={{ marginTop: "10%", marginLeft: "-1%" }}>
          <Grid.Column floated="left" width={1}>
            <span
              style={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
            >
              status
            </span>
          </Grid.Column>
          <Grid.Column width={1}>
            <span
              style={{
                fontSize: "100%",
                fontWeight: "bold",
                color: "black",
                marginLeft: "13px",
              }}
            >
              :
            </span>
          </Grid.Column>
          {
insuranceStatu ? 
<Grid.Column floated="left" width={6}>
<span style={{ whiteSpace: "nowrap", fontSize: "100%", fontWeight: "bold", color: "black"}}>
  No Data
</span>
</Grid.Column>  :
  <Grid.Column floated="left" width={6}>
            <span style={{ whiteSpace: "nowrap", fontSize: "100%", fontWeight: "bold", color: "black"}}>
              {insuranceStatus?.data?.call_log_reason}
            </span>
          </Grid.Column>  
          }
        </Grid>
        <Grid style={{ marginLeft: "-1%" }}>
          <Grid.Column floated="left" width={1}>
            <span
              style={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
            >
              Ramarks
            </span>
          </Grid.Column>
          <Grid.Column width={1}>
            <span
              style={{
                fontSize: "100%",
                fontWeight: "bold",
                color: "black",
                marginLeft: "24px",
              }}
            >
              :
            </span>
          </Grid.Column>
          <Grid.Column floated="left" width={7}>
            <div className="scrollable-div">
              {
                insuranceStatu ?
                <p
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "black",
                  float: "left",
                  marginLeft: "20%",
                }}
              >
                No Data
              </p>
              :
              <p
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "black",
                  float: "right",
                  marginLeft: "6%",
                }}
              >
                {insuranceStatus?.data?.payer_remarks}
              </p>
              }
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyInsuranceModal;
