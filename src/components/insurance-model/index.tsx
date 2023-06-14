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
import Footer from "../footer";
const MyInsuranceModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetailsdata"]);
  

  const [loading, setLoading] = useState(false);

  const Back = () => {
    navigate("/services");
  };


  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    // Rest of the code...
  }, []);

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
  }, [getMyInsuranceStatus]);

  const insuranceStatus = useAppSelector((state) => state.myDetails);
  const [insuranceData, setInsuranceData] = useState<any[]>([]);
  

  const insuranceDate = insuranceStatus.data?.approveddate;

  const myInsuranceData = [
    insuranceStatus.data?.status_name || "-",
    insuranceDate || "-",
  ];

  useEffect(() => {
    if(insuranceStatus.data){
      //setInsuranceData(myInsuranceData);
      setLoading(false);
    }
  }, [myInsuranceData]);

  return (
    <div>
      <Navbar />
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "6%" }}
        onClick={() => Back()}
      >
        <Icon disabled name="arrow left" size="large" />
      </div>
      <div className="MydischargeContainer">
        <div style={{ display: "flex", alignItems: "center" }}>
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
            <u
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                marginLeft: "14%",
                //textDecoration: 'underline''
              }}
            >
              {t("insurance_claim_status")}
            </u>
          </div>
        </div>

        <div className="two-column-container" style={{ marginTop: "-10%" }}>
          <div
            className="column"
            style={{
              marginTop: "45px",
              textAlign: "left",
              marginLeft: "-10%",
            }}
          >
            {["status", "approved_date"]?.map((item, index) => (
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
                    marginLeft: "10%",
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
                 {/* {loading ? ( // Render loader if loading state is true
                <p>: Loading...</p>
                ) : ( */}
                <span
                  style={{
                    padding: "10%",
                    fontSize: "100%",
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: "30px",
                  }}
                >
                  : {item}
                </span>
              </Grid.Column>
            ))}
          </div>
        </div>
      </div>
      <BackgroundImage />
      <div style={{marginTop: '0%', position: 'fixed'}}>
      <Footer />
      </div>
    </div>
  );
};

export default MyInsuranceModal;
