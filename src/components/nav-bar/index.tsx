import React, { useEffect } from "react";
import { Header, Label, Segment, Grid} from "semantic-ui-react";
import { Input, Menu } from 'semantic-ui-react'
import BrandLogo from "../logo";
import { useNavigate, useNavigation,useParams } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";
import "./index.css";
import Logout from '../../assets/logout-Icon.png'

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["serviceslist", "mydetails"]);

  const unit_code: string | null = localStorage.getItem("unit_code");
  let roomNo = '';
  if (unit_code !== null) {
    const roomNo = JSON.parse(unit_code).room;
  }

  const patientName = localStorage.getItem("patient_name");
  const ipNumber = localStorage.getItem("admissionno");
  const blockNo = localStorage.getItem("patient_block");
  const floorNo = localStorage.getItem("patient_floor");
  const wardName = localStorage.getItem("patient_wardName");

  const userLogout = () => {
    let redirectUrl = '/';
    let unit_id = '';
    const unitCodeStr = localStorage.getItem('unit_code');
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }
    localStorage.removeItem('patient_name');
    localStorage.removeItem('i18nextLng');
    localStorage.removeItem('admissionno');
    localStorage.removeItem('mobile_number');
    localStorage.removeItem('token');
    localStorage.removeItem('patient_wardName');
    localStorage.removeItem('patient_block');
    localStorage.removeItem('patient_floor');
    navigate(redirectUrl+''+unit_id);
  }


  return (
    <Segment clearing style={{marginTop: '-10%', width: '119%',height: '130px', marginLeft: '-9%',}}>
      <div className="data-container" style={{float: 'right', whiteSpace: 'nowrap'}}>
      <div className="patientData">
      <p> {patientName}</p>
      <p><strong> {t("IP")}:</strong> {ipNumber}</p>
          <p><strong>{t('Room')}:</strong> {blockNo}</p>
          <p><strong>{t('mydetails:Floor')}:</strong> {floorNo}</p>
          <p><strong>{t('mydetails:WardName')}:</strong> {wardName}</p>
          <p style={{padding: '2px 10px', borderRadius: '5px', border: 'none', color: '#fff', cursor: 'pointer',   transition: 'all 0.3s ease'}} onClick={userLogout}>
            <img src={Logout} width={22} height={22} color="white"/>
          </p>
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
