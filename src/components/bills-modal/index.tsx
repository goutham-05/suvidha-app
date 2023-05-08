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
import { getOtp } from "../../features/login/authSlice";

const MyBillModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetails"]);
  useEffect(() => {
    let unit_id = '';
    const unitCodeStr = localStorage.getItem('unit_code');
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }
    dispatch(
      getOtp({
        admissionno: localStorage.getItem("admissionno"),
        unit_id: unit_id
      })
    );
  }, []);
  const userData = useAppSelector((state) => state.user);
  const [patientTypeChecking, setPatientTypeChecking] = useState([]);

  const billValues = [
    userData.data?.total_advance,
    userData.data?.app_bill_amount,
    userData.data?.latest_esitmated_amt,
    userData.data?.balance_amt,
  ];

  // useEffect(() => {
  //   if (userData.data.patient_type === "GENERAL") {
      // const billValues = [
      //   userData.data?.total_advance,
      //   userData.data?.app_bill_amount,
      //   userData.data?.latest_esitmated_amt,
      //   userData.data?.balance_amt,
      // ];
  //     setPatientTypeChecking(billValues);
  //     console.log('BIlls values', patientTypeChecking);
  //   }
  // }, [])


  

  const Back = () => {
    navigate("/mydetails");
  };


  return (
    <div>
      <Navbar />
      <div className="mydischargeContainer">
        <div className="mydischargeHeader">
          <span className="headerTitle" style={{background: '#4A98CD'}}>My Bill</span>
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
      "Advance Paid",
      "Approximate Bill",
      "Estimated Amount",
      "Due Amt",
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
            whiteSpace: 'nowrap'
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
      {billValues.map((item, index) => (
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
    style={{ marginTop: "30px", marginLeft: "-70px" }}
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

export default MyBillModal;


{/* <div style={{ display: "flex" }}>
<Grid>
  <div
    style={{
      marginTop: "45px",
      marginLeft: "10px",
      textAlign: "left",
    }}
  >
    {[
      "Advance Paid",
      "Approximate Bill",
      "Initial Estimated Amount",
      "Due Amt",
    ].map((item, index) => (
      <Grid.Column
        width={8}
        textAlign="justified"
        style={{ marginBottom: "10px" }}
      >
        <span
          style={{
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            color: "black",
            marginLeft: "10px",
          }}
        >
          {item}
        </span>
      </Grid.Column>
    ))}
  </div>
</Grid>
<Grid>
  <div
    style={{
      marginTop: "10px",
      marginLeft: "20px",
      textAlign: "left",
    }}
  >
    {billValues.map((item, index) => (
      <Grid.Column
        width={8}
        textAlign="justified"
        style={{ marginBottom: "10px" }}
      >
        <span
          style={{
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            color: "black",
            marginLeft: "10px",
          }}
        >
          {item}
        </span>
      </Grid.Column>
    ))}
  </div>
  <div
    className="payBillButton"
    style={{ marginTop: "30px", marginLeft: "-72px" }}
  >
    <span
      style={{
        marginLeft: "6px",
        color: "white",
        marginTop: "200px",
      }}
    >
      Pay Bill
    </span>
  </div>
</Grid>
</div> */}