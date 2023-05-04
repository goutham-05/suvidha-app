import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "semantic-ui-react";
import Navbar from "../nav-bar";
import './index.css';
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
    dispatch(getOtp({
      'mobile_number' : localStorage.getItem('mobile_number'),
      'admissionno' : localStorage.getItem('admissionno')
    }));
  }, [])
  const userData = useAppSelector((state) => state.user);
  const billValues = [
    userData.data?.total_advance,
    userData.data?.app_bill_amount,
    userData.data?.latest_esitmated_amt,
    userData.data?.balance_amt,
  ]

  const Back = () => {
    navigate("/mydetails");
  };
  return (
    <div>
        <Navbar />
        <div className="mydischargeContainer">
            <div className="mydischargeHeader">
                <span className="headerTitle">My Bills</span>
                <div onClick={Back}>
                <Icon disabled name='close'  size="large" color="black" style={{marginTop: '10px', marginLeft: '20px'}}/>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <Grid>
        <div style={{marginTop: '45px', marginLeft: '10px', textAlign: 'left'}}>
          {[
            "Advance Paid",
            "Approximate Bill",
            "Initial Estimated Amount",
            "Due Amt",
          ].map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {item}
                {/* <div style={{border: '1px solid #6C6D70'}} /> */}
              </span>
            </Grid.Column>
          ))}
        </div>
      </Grid>
      <Grid>
        <div style={{marginTop: '10px', marginLeft: '20px', textAlign: 'left'}}>
          {billValues.map((item, index) => (
            <Grid.Column width={8} textAlign="justified" style={{marginBottom: '10px'}}>
              <span
                style={{
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {item}
                {/* <div style={{border: '1px solid #6C6D70'}} /> */}
              </span>
            </Grid.Column>
          ))}
        </div>
        <div
           className="payBillButton" style={{marginTop: '30px', marginLeft: '-72px'}}>
            <span style={{ marginLeft: "6px", color: "white", marginTop: '200px'}}>Pay Bill</span>
          </div>
      </Grid> 
 
            </div>
        </div>
        <BackgroundImage />
    </div>
  );
};

export default MyBillModal;