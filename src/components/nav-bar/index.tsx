import React from "react";
import { Header, Label, Segment, Image } from "semantic-ui-react";
import BrandLogo from "../logo";
import { useNavigate, useNavigation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const patientLocation = JSON.parse(localStorage.getItem('patientLocation'));
  console.log('PatientLocation', patientLocation.floor);
  // const patientName: string | null = localStorage.getItem('patient-data');
  // const patientname = JSON.parse(patientName).data.patientname;

  return (
    <div className="ui inverted segment" style={{ background: "#b1dfdf", height: 100, width:410, marginLeft: -30, marginTop: -30}}>
      <div className="ui inverted secondary menu">
        <div className="Logo-container">
          <img src={logo} style={{marginTop: '-12px', width: '100px', height: '100px'}}/>
        </div>
        <div className="data-container">
        <div className='patientData'>
                <p>Kumar<br/><p className='mobile-paragraph'>IP: 123456789102</p>Room: <span>{patientLocation.floor}</span></p>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
