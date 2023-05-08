import React, { useEffect } from "react";
import { Header, Label, Segment, Table} from "semantic-ui-react";
import { Input, Menu } from 'semantic-ui-react'
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

    <Segment clearing style={{marginTop: '-10%', width: '119%',height: '100px', marginLeft: '-9%',}}>
         <div className="data-container" style={{float: 'right', whiteSpace: 'nowrap'}}>
           <div className="patientData">
             <p style={{fontSize: '80%'}}>
              {patientName}
             <br />
               <p>
                 {t("IP")}: {ipNumber}
              </p>
              <br/>
              <span style={{float: 'right'}}>
              {t("Room")}: <span>Floor-1</span>
              </span>
            </p>
            <div className="logout-button" onClick={userLogout}><p>Logout</p></div>
          </div>
         </div>
    <Header as='h2' floated='left'>
    <img
            src={logo}
            style={{ marginTop: "-10%", width: "100%", height: "100px"}}/>
    </Header>
  </Segment>
  );
};

export default Navbar;
