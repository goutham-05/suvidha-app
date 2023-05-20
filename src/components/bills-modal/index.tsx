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
import { getOtp} from "../../features/login/authSlice";
import { getMyBill } from "../../reduxtoolkit/myBillSlice";

const MyBillModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetails"]);
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

  const userData = useAppSelector((state) => state.user);

  const [patientTypeChecking, setPatientTypeChecking] = useState<any[]>([]);
  const [billProperties, setBillProperties] = useState([
    "Advance Paid",
              "Approximate Bill",
              "Estimated Amount",
              "Due Amt",
  ]);

 

  const billData = () => {
    if (userData.data?.patient_type !== "GENERAL") {
      const billProps = ["Advance Paid", "Estimated Amount"];
      const billValues = userData.data?.length === 0 ? ["No Data", "No"] : [userData.data?.total_advance, userData.data?.latest_estimated_amt];
      setPatientTypeChecking(billValues);
      console.log(billValues)
      setBillProperties(billProps);
    } else {
      const billProps = ["Advance Paid", "Approximate Bill", "Estimated Amount", "Due Amt"];
      const billValues = [
        userData.data?.app_bill_amount || "No Data",
        userData.data?.balance_amt || "No Data",
        userData.data?.app_bill_amount || "No Data",
        userData.data?.balance_amt || "No Data"
      ];
      setPatientTypeChecking(billValues);
      setBillProperties(billProps);
    }
  };

  useEffect(() => {
    billData();
  }, []);

  const Back = () => {
    navigate("/mydetails");
  };

  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle" style={{ background: "#4A98CD" }}>
            {t('My Bill')}
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
                    marginLeft: "2%",
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
              marginLeft: "10%",
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
                    marginLeft: "10px",
                  }}
                >
                  :  {item}
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