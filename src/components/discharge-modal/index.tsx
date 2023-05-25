import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";
import "./index.css";
import BackgroundImage from "../background";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { useTranslation } from "react-i18next";
import { getMyDischarge } from "../../reduxtoolkit/myDischargeSlice";

const MyDischargeModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetailsdata"]);
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
  }, []);

  const DischargeStatus = useAppSelector((state) => state.myDischarge);

  const myDis = DischargeStatus?.data?.native_summary_status;

  const getStatus = (status: any) => {
    switch (status) {
      case "Approved":
        return DischargeStatus.data?.dsapproved_time;
      case "PreAudit":
        return DischargeStatus.data?.dsapproved_time;
      case "Started":
        return DischargeStatus.data?.dsstarted_time;
      case "Rejected":
        return "Rejected";
      case "Rework":
        return "Rework";
      case "Pending":
      case null: // check for null value
        return "NOT COMPLETED";
      default:
        return "";
    }
  };

  const dischargeStatusValue = getStatus(myDis);

  const dsStartedTime = DischargeStatus.data?.dsstarted_time;
  const dsStartedTimeData = dsStartedTime === null ? "--" : dsStartedTime;

  const dsApprovedTime = DischargeStatus.data?.dsstarted_time;
  const dsApprovedTimeData = dsApprovedTime === null ? "--" : dsStartedTime;

  const disInitiatedDt = DischargeStatus.data?.dis_initiated_dt;

  const myDischargeData = [
    DischargeStatus.data?.discharge_initiated,
    disInitiatedDt,
    dsStartedTimeData,
    dsApprovedTimeData,
    dischargeStatusValue,
  ];

  const Back = () => {
    navigate("/services");
  };

  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle" style={{ background: "#4A98CD" }}>
            {t("my_discharge")}
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
        <div style={{ display: "flex", marginLeft: '-4%'}}>
        <Grid stackable style={{marginTop:'12px'}}>
        {[
                "discharge_initiated",
                "discharge_initiated_date",
                "discharge_started",
                "discharge_approved",
                "summary_status",
              ].map((item, index) => (
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
              {myDischargeData.map((item, index) => (
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
                      marginLeft: '-30%'
                    }}
                  >
                    :<span style={{ marginLeft: "4%" }}>{item}</span>
                  </span>
                </Grid.Column>
              ))}
          </Grid>
        </div>
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyDischargeModal;
