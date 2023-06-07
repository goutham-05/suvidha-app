import React from "react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";

const Footer = () => {
  return (
    <div style={{marginTop: '40%',color: 'black', position: 'fixed', left: "0", textAlign: "center",width: "100%",padding: "10px", fontSize: '15px'}}>
      <div className="footer-text">
        &copy;  KIMS HOSPITALS<span style={{fontSize: '10px', verticalAlign: 'top', }}>TM</span>
      </div>
      <div>ALL RIGHTS RESERVED</div>
    </div>
  );
};

export default Footer;
