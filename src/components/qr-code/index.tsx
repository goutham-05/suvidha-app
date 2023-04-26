import React from "react";
import KLogo from "../../assets/kimslogo.png";
import QRCODE from "../../assets/qr.jpg";
import './index.css';

function QrCode() {
  return (
    <div>
    <nav className="navbar">
      <img src={KLogo} alt="Logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><a href="#">Room No: 90001</a></li>
        <li><a href="#">Bed No: 90001-A</a></li>
      </ul>
    </nav>
    <div style={{width: '100%'}}>
        <p style={{fontSize: '12px', fontWeight: 900}}>PLEASE SCAN THIS QR CODE FOR FEEDBACK / SERVICES / COMPLAINTS</p>
    </div>
    <div>
        <img src={QRCODE} style={{marginTop: '30px'}}/>
        <div style={{width: '100%'}}>
        <p style={{fontSize: '12px', fontWeight: 'bold', marginTop: '20px'}}>फीडबैक/सेवाओं/शिकायतों के लिए कृपया इस क्यूआर कोड को स्कैन करें</p>
    </div>
    </div>
    </div>
  );
}

export default QrCode;
