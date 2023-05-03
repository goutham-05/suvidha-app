import React from "react";
import { Header, Label, Segment, Image } from "semantic-ui-react";
import BrandLogo from "../logo";
import { useNavigate, useNavigation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["serviceslist"]); 

  const patientLocation: string | null = localStorage.getItem('patientLocation');
  const floor = JSON.parse(patientLocation).floor;

  return (
    <div className="ui inverted segment" style={{ background: "#b1dfdf", height: 100, width:410, marginLeft: -30, marginTop: -30}}>
      <div className="ui inverted secondary menu">
        <div className="Logo-container">
          <img src={logo} style={{marginTop: '-12px', width: '100px', height: '100px'}}/>
        </div>
        <div className="data-container">
        <div className='patientData'>
                <p>Kumar<br/><p className='mobile-paragraph'>{t('IP')}: 123456789102</p>{t('Room')}: <span>{floor}</span></p>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
