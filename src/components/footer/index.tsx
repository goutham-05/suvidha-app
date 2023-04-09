import React from "react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";

const Footer = () => {
  return (
    <Message
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "lightgrey",
        padding: "10px",
        textAlign: "center",
        left: "0",
      }}
      content="&copy; Copyright Reserved"
    />
  );
};

export default Footer;
