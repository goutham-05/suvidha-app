import React, { useEffect, useState } from "react";
import { Header, Label, Segment, Grid, Icon } from "semantic-ui-react";
import { Input, Menu } from "semantic-ui-react";
import BrandLogo from "../logo";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";
import "./index.css";
import Logout from "../../assets/logout-Icon.png";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["serviceslist", "mydetails"]);

  const unit_code: string | null = localStorage.getItem("unit_code");

  const patientName = localStorage.getItem("patient_name");
  const ipNumber = localStorage.getItem("admissionno");
  const bedNo = localStorage.getItem("patient_bed");
  const myBed = bedNo === "null" ? "--" : bedNo;
  const roomno = localStorage.getItem("patient_room");
  const myRoom = roomno === "null" ? "--" : roomno;
  const floorNo = localStorage.getItem("patient_floor");
  const wardName = localStorage.getItem("patient_wardName");

  const userLogout = () => {
    let redirectUrl = "/";
    let unit_id = "";
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      unit_id = unit_code.unit;
    }
    localStorage.removeItem("patient_name");
    localStorage.removeItem("i18nextLng");
    localStorage.removeItem("admissionno");
    localStorage.removeItem("mobile_number");
    localStorage.removeItem("token");
    localStorage.removeItem("patient_wardName");
    localStorage.removeItem("patient_block");
    localStorage.removeItem("patient_floor");
    localStorage.removeItem("patient_bed");
    localStorage.removeItem("patient_room");
    localStorage.removeItem("serving time");
    localStorage.removeItem("servingType");
    navigate(redirectUrl + "" + unit_id);
  };

  return (
    <div
      style={{
        marginTop: "-10%",
        width: "119%",
        height: "130px",
        marginLeft: "-9%",
        display: "flex",
        background: "white",
        boxShadow: "0px 2px 4px grey",
      }}
    >
      <img
        src={logo}
        width={110}
        height={110}
        style={{ marginTop: "3%", marginLeft: "0%" }}
      />
      <div
        className="data-container"
        style={{ whiteSpace: "nowrap", marginLeft: "36%", marginTop: "2%" }}
      >
        <div className="patientData">
          <p> {patientName}</p>
          <p>
            <strong> {t("mydetails:ip")}:</strong> {ipNumber}
          </p>
          <p>
            <strong>{t("mydetails:bed")}: </strong>
            {myBed}
          </p>
          <p>
            <strong>
              {t("mydetails:room")}/{t("mydetails:floor")}:{" "}
            </strong>
            {myRoom}/{floorNo}
          </p>
          <p>
            <strong>{t("mydetails:ward_name")}:</strong> {wardName}
          </p>
          <p
            style={{
              padding: "2px 10px",
              borderRadius: "5px",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={userLogout}
          >
            <img src={Logout} width={22} height={22} color="white" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
