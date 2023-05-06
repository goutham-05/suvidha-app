import React, { useState } from "react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea";
import Navbar from "../../components/nav-bar";
import "./index.css";
import { Icon } from "semantic-ui-react";
import BackgroundImage from "../../components/background";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Feedback = () => {
  const { t } = useTranslation(["serviceslist"]);
  return (
    <div className="grievance-container">
      <TextArea
        style={{
          resize: "none",
          width: "320px",
          height: "180px",
          marginTop: "10px",
          border: "1px solid grey",
          borderRadius: "6px",
          textalign: "center",
        }}
        placeholder={t("EnterText")}
      />
      <div
        style={{
          width: "70px",
          height: "23px",
          background: "#E31A47",
          borderRadius: "4px",
          color: "white",
          marginLeft: "140px",
        }}
      >
        {t("Submit")}
      </div>
    </div>
  );
};

const Grievance = () => {
  const { t } = useTranslation(["serviceslist"]);
  const Attach = () => {
    console.log("Attach clicked");
  };
  return (
    <div className="grievance-container">
      <div className="attach-button" onClick={Attach}>
        <h6>
          <Icon disabled name="attach" size="large" />  {/* color="white" */}
          {t("Attach")}{" "}
        </h6>
      </div>
      <TextArea
        style={{
          resize: "none",
          width: "320px",
          height: "180px",
          marginTop: "10px",
          border: "1px solid grey",
          borderRadius: "6px",
          textalign: "center",
        }}
        placeholder={t("EnterText")}
      />
      <div
        style={{
          width: "70px",
          height: "23px",
          background: "#E31A47",
          borderRadius: "4px",
          color: "white",
          marginLeft: "140px",
        }}
      >
        {t("Submit")}
      </div>
    </div>
  );
};
function Board() {
  const [state, setState] = useState(false);
  const [status, setStatus] = useState("Grievance");
  const naviage = useNavigate();
  const { t } = useTranslation(["serviceslist"]);

  const onChangeScreen = () => {
    if (status === "Grievance") {
      setState((prev) => !prev);
    } 
  };

  const Back = () => {
    naviage("/services");
  };
  return (
    <>
      <Navbar />
      <div className="board-container">
        <div
          onClick={Back}
          style={{ marginBottom: "10px", marginRight: "390px" }}
        >
          <Icon disabled name="arrow left" size="large" /> {/* color="#6D6D70" */}
        </div>
        <div className="main" style={{justifyContent: 'center'}}>
          <div className="left-div" style={{padding: '10px', background: state? '#6c6d70' : '#ececec'}} onClick={onChangeScreen}>
          <h5 style={{ marginTop: "-4px", color: state? 'white' : 'black'}}>Grievance</h5>
          </div>
          <div className="left-div" style={{padding: '10px', background: state? '#ececec' : '#6c6d70'}} onClick={onChangeScreen}>
          <h5 style={{ marginTop: "-4px", color: state? 'black' : 'white'}}>Feedback</h5>
          </div>
        </div>
        <div className="screens-div">
          {state ? <Grievance /> : <Feedback />}
        </div>
      </div>
      <BackgroundImage />
    </>
  );
}

export default Board;
