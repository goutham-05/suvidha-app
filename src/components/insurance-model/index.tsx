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
import { useTranslation } from "react-i18next"; 

import "./index.css";
import BackgroundImage from "../background";
const MyInsuranceModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetails"]);

  const Back = () => {
    navigate("/mydetails");
  };

  // useEffect(() => {
  //   let unit_id = "";
  //   const unitCodeStr = localStorage.getItem("unit_code");
  //   const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
  //   if (unit_code) {
  //     unit_id = unit_code.unit;
  //   }
  //   dispatch(
  //     getMyInsuranceStatus({
  //       admissionno: localStorage.getItem("admissionno"),
  //       unit_id: unit_id,
  //     })
  //   );
  // }, []);

  // const insuranceStatus = useAppSelector((state) => state.myDetails);

  // const insuranceDate = insuranceStatus.data?.approveddate;

  // const myInsuranceData = [
  //   insuranceStatus.data?.status_name,
  //   insuranceDate
  // ]

  // useEffect(() =>{
  //   myInsuranceData;
  // }, [])

  useEffect(() => {
    let unit_id = "";
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }
    dispatch(
      getMyInsuranceStatus({
        admissionno: localStorage.getItem("admissionno"),
        unit_id: unit_id,
      })
    );
  }, []);
  
  const insuranceStatus = useAppSelector((state) => state.myDetails);
  
  const insuranceDate = insuranceStatus.data?.approveddate;
  
  const myInsuranceData = [
    insuranceStatus.data?.status_name || "--",
    insuranceDate || "--"
  ];
  
  useEffect(() => {
    myInsuranceData
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle" style={{ background: "#4A98CD" }}>
            {t('Insurance Claim Status')}
          </span>
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

        <div style={{display: 'flex'}}>
                <Grid>
        <div style={{marginTop: '45px',  textAlign: 'left'}}>
          {[
            "Status",
            "Approved Date",
          ].map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: 'black',
                  marginLeft: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t(item)}
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid>
      <Grid>
        <div style={{marginTop: '8%', marginLeft: '2%', textAlign: 'left'}}>
          {myInsuranceData.map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: 'black',
                  whiteSpace: 'nowrap'
                }}
              >
                :<span style={{marginLeft: '4%'}}>{item}</span>
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid> 
      </div>
        
{/* 
        <Grid style={{ marginTop: "10%", marginLeft: "-1%" }}>
          <Grid.Column floated="left" width={1}>
            <span
              style={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
            >
              {t('Status')}
            </span>
          </Grid.Column>
          <Grid.Column>
            <span
              style={{
                fontSize: "100%",
                fontWeight: "bold",
                color: "black",
                marginLeft: "1px",
              }}
            >
              :
            </span>
          </Grid.Column>
          {insuranceStatu ? (
            <Grid.Column floated="left" width={6}>
              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                No Data
              </span>
            </Grid.Column>
          ) : (
            <Grid.Column floated="left" width={6}>
              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "84%",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {insuranceStatus?.data?.call_log_reason}
              </span>
            </Grid.Column>
          )}
        </Grid> */}
        {/* <Grid style={{ marginLeft: "-1%" }}>
          <Grid.Column floated="left" width={1}>
            <span
              style={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
            >
              {t('Remarks')}
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
              {insuranceStatu ? (
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
              ) : (
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
              )}
            </div>
          </Grid.Column>
        </Grid> */}
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyInsuranceModal;
