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
import { Loader } from "semantic-ui-react";
import Footer from "../footer";

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
  const [loading, setLoading] = useState(false);

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
  const dsStartedTimeData =
    DischargeStatus.data?.discharge_date === null
      ? "-"
      : DischargeStatus.data?.discharge_date;
  const summarySatus =
    DischargeStatus.data?.native_summary_status === null
      ? "-"
      : DischargeStatus.data?.native_summary_status;
  const dsApprovedTime = DischargeStatus.data?.dsstarted_time;
  const dsApprovedTimeData = dsApprovedTime === null ? "-" : dsStartedTime;

  const disInitiatedDt =
    DischargeStatus.data?.dis_initiated_dt === null
      ? "-"
      : DischargeStatus.data?.dis_initiated_dt;

  const myDischargeData = [
    DischargeStatus.data?.discharge_initiated,
    disInitiatedDt,
    dsStartedTimeData,
    summarySatus,
  ];

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    // Rest of the code...
  }, []);

  useEffect(() => {
    if (DischargeStatus.data) {
      setLoading(false); // Set loading state to false when data is fetched
    }
  }, [DischargeStatus]);

  const Back = () => {
    navigate("/services");
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "6%" }}
        onClick={() => Back()}
      >
        <Icon disabled name="arrow left" size="large" />
      </div>
      <div className="mydischargeContainer">
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "-10%" }}
        >
          <div
            style={{
              //background: "#4A98CD",
              width: "100%",
              height: "50px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              marginTop: "-5.3%",
            }}
          >
            <p
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                marginLeft: "28%",
                textDecoration: "underline",
              }}
            >
              {t("my_discharge")}
            </p>
          </div>
        </div>
        <div className="two-column-container" style={{ marginTop: "-10%" }}>
          <div
            className="column"
            style={{
              marginTop: "45px",
              textAlign: "left",
            }}
          >
            {[
              "discharge_initiated",
              "discharge_initiated_date",
              "discharge_date",
              "summary_status",
            ].map((item, index) => (
              <Grid.Column
                width={8}
                textAlign="justified"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <span
                  style={{
                    padding: "10%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "black",
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
              marginLeft: "2%",
            }}
          >
            {myDischargeData.map((item, index) => (
              <Grid.Column
                width={8}
                textAlign="justified"
                style={{ marginBottom: "10px" }}
              >
                {loading ? ( // Render loader if loading state is true
                <p>: Loading...</p>
                ) : (
                  <span
                    style={{
                      padding: "10%",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "black",
                      marginLeft: "-10%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    : {t(item)}
                  </span>
                )}
              </Grid.Column>
            ))}
          </div>
        </div>
      </div>
      <BackgroundImage />
      <div style={{ marginTop: "-20%", position: 'fixed'}}>
        <Footer />
      </div>
    </div>
  );
};

export default MyDischargeModal;
