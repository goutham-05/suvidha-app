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
  const { t } = useTranslation(["mydetailsdata"]);

  const Back = () => {
    navigate("/services");
  };

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
      <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              //background: "#4A98CD",
              width: "100%",
              height: "50px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              marginTop:'-0.3%'
            }}
          >
            <u
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                marginLeft: '14%',
                //textDecoration: 'underline''
              }}
            >
              {t('insurance_claim_status')}
            </u>
            <p
              onClick={Back}
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                cursor: "pointer",
                marginLeft: '8%',
                marginTop:'2%'
              }}
            >
              X
            </p>
          </div>
        </div>
        {/* <div className="mydischargeHeader">
          <span className="headerTitle" style={{ background: "#4A98CD" }}>
            {t('insurance_claim_status')}
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
        </div> */}


<div className="two-column-container">
          <div
            className="column"
            style={{
              marginTop: "45px",
              textAlign: "left",
              marginLeft:'-10%'
            }}
          >
              {[
            "status",
            "approved_date",
          ]?.map((item, index) => (
              <Grid.Column
                width={8}
                textAlign="justified"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <span
                  style={{
                    padding: "10%",
                    fontSize: "100%",
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: "5%",
                    whiteSpace: "nowrap",
                  }}
                >
                 {t(item)}
                </span>
              </Grid.Column>
            ))}
          </div>
          <div
            className="column"
            style={{
              marginTop: "45px",
              textAlign: "left",
              marginLeft: "-25%",
            }}
          >
            {myInsuranceData.map((item, index) => (
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
                    marginLeft: "-20px",
                  }}
                >
                  :  {item}
                </span>
              </Grid.Column>
            ))}
          </div>
        </div>

        {/* <div style={{display: 'flex', marginLeft: '-2%'}}>
              <Grid stackable style={{marginTop:'12px'}}>
              {[
            "status",
            "approved_date",
          ]?.map((item, index) => (
                <Grid.Column
                  textAlign="justified"
                  style={{ marginBottom: "12%" }}
                >
                  <span
                    style={{
                      padding: "10px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "black",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t(item)}
                  </span>
                </Grid.Column>
              ))}
          </Grid>
      <Grid stackable>
              {myInsuranceData?.map((item, index) => (
                <Grid.Column
                  textAlign="justified"
                  style={{ marginBottom: "12%" }}
                >
                  <span
                    style={{
                      padding: "10px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "black",
                      whiteSpace: "nowrap",
                      marginLeft: '-20%'
                    }}
                  >
                    :<span style={{ marginLeft: "4%" }}>{item}</span>
                  </span>
                </Grid.Column>
              ))}
          </Grid>
      </div> */}
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyInsuranceModal;
