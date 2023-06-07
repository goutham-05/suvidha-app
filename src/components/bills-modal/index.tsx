import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useEffect, useState, SetStateAction } from "react";
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
import { getMyBill } from "../../reduxtoolkit/myBillSlice";

const MyBillModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetailsdata"]);
  useEffect(() => {
    let unit_id = "";
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }
    dispatch(
      getMyBill({
        admissionno: localStorage.getItem("admissionno"),
        unit_id: unit_id,
      })
    );
  }, []);

  const userData = useAppSelector((state) => state.myBill);

  const [patientTypeChecking, setPatientTypeChecking] = useState<any[]>([]);
  const [billProperties, setBillProperties] = useState([
    "Advance Paid",
    "Approximate Bill",
    "Estimated Amount",
    "Due Amt",
  ]);

  const ipNum = localStorage.getItem("admissionno");
  const bedNo = localStorage.getItem("patient_bed");
  const myBed = bedNo === "null" ? "-" : bedNo;

  const billData = () => {
    if (userData.data?.patient_type !== "GENERAL") {
      const billProps = [
        "IP Number",
        "Bed Number",
        "advance_paid",
        "approximate_bill",
      ];
      const billValues =
        userData.data?.length === 0
          ? ["-", "No"]
          : [
              ipNum,
              myBed,
              userData.data?.total_advance,
              userData.data?.latest_estimated_amt,
            ];
      setPatientTypeChecking(billValues);
      console.log(patientTypeChecking);
      setBillProperties(billProps);
    } else {
      const billProps = [
        "IP Number",
        "Bed Number",
        "advance_paid",
        "approximate_bill",
        "estimated_amount",
        "due_amt",
      ];
      const billValues = [
        ipNum,
        myBed,
        userData.data?.total_advance || "--",
        userData.data?.app_bill_amount || "--",
        userData.data?.hims_estimated_amount || "--",
        userData.data?.balance_amt || "--",
      ];
      setPatientTypeChecking(billValues);
      setBillProperties(billProps);
    }
  };

  useEffect(() => {
    billData();
  }, [userData]);

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
              width: "100%",
              height: "50px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              marginTop: "-0.3%",
            }}
          >
            <p
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                marginLeft: "38%",
                textDecoration: "underline",
              }}
            >
              {t("my_bill")}
            </p>
            {/* <p
              onClick={Back}
              style={{
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#4A98CD",
                cursor: "pointer",
                marginLeft: '30%'
              }}
            >
              X
            </p> */}
          </div>
        </div>
        {/* <div className="mydischargeHeader">
          <span className="headerTitle" style={{ background: "#4A98CD" }}>
            {t('my_bill')}
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
            }}
          >
            {billProperties.map((item, index) => (
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
                    marginLeft: "20%",
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
              marginLeft: "-5%",
            }}
          >
            {patientTypeChecking.map((item, index) => (
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
                  : {item}
                </span>
              </Grid.Column>
            ))}
          </div>
        </div>
      </div>
      <BackgroundImage />
    </div>
  );
};

export default MyBillModal;
