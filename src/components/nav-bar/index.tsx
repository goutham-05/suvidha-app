import React, { useEffect } from "react";
import { Header, Label, Segment, Image } from "semantic-ui-react";
import BrandLogo from "../logo";
import { useNavigate, useNavigation,useParams } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["serviceslist"]);

  const patientLocation: string | null = localStorage.getItem("patientLocation");
  let roomNo = '';
  if (patientLocation !== null) {
    const roomNo = JSON.parse(patientLocation).room;
  }

  const patientName = localStorage.getItem("patient_name");
  const ipNumber = localStorage.getItem("admissionno");

  const userLogout = () => {
    let redirectUrl = '/';
    const patientLocation: string | null = localStorage.getItem("patientLocation");
    if (patientLocation !== null) {
      let redirectUrl = '/'+JSON.parse(patientLocation).unit+'/'+JSON.parse(patientLocation).block+'/'+JSON.parse(patientLocation).floor+'/'+JSON.parse(patientLocation).ns+'/'+JSON.parse(patientLocation).room+'/'+JSON.parse(patientLocation).bed;
    }
    localStorage.removeItem('patient_name');
    localStorage.removeItem('i18nextLng');
    localStorage.removeItem('admissionno');
    localStorage.removeItem('mobile_number');
    localStorage.removeItem('token');
    //localStorage.getItem("patientLocation");
    navigate(redirectUrl);
  }


  return (
    <div
      className="ui inverted segment"
      style={{
        background: "white",
        height: 120,
        width: 410,
        marginLeft: -30,
        marginTop: -30,
        boxShadow: "1px 2px 9px grey",
      }}
    >
      <div className="ui inverted secondary menu">
        <div className="Logo-container">
          <img
            src={logo}
            style={{ marginTop: "-12px", width: "100px", height: "100px" }}
          />
        </div>
        <div className="data-container">
          <div className="patientData">
            <p>
              {patientName}
              <br />
              <p className="mobile-paragraph">
                {t("IP")}: {ipNumber}
              </p>
              {t("Room")}: <span>{roomNo}</span>
            </p>
          </div>
          <div style={{background: '#6C6D70', width: '34%', borderRadius: '20px', marginLeft: '60%', marginTop: '3%'}} onClick={userLogout}>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
