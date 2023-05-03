import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../../common/drop-down";
import { languageOptions } from "../../config/languages";
import BrandLogo from "../../components/logo";
import BackgroundImage from "../../components/background";

function Home() {
  const navigate = useNavigate();
  const { param1, param2, param3, param4, param5, param6 } = useParams();

  const patientLocation = {
      unit: param1,
      block: param2,
      floor: param3,
      ns: param4,
      room: param5,
      bed: param6,
    };
    localStorage.setItem("patientLocation", JSON.stringify(patientLocation));
  const onChangeLanguage = (
    _: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    navigate("/login", {
      state: {
        selectedLanguage: data.value,
        patientData: data.blockNo,
      },
    });
  };

  return (
    <>
      <BrandLogo
        styles={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "40%",
          marginTop: "-34px",
        }}
      />
      <DropDown
        fluid
        options={languageOptions}
        placeholder={"Select a language"}
        search
        selection
        onChange={onChangeLanguage}
      />
      <BackgroundImage />
    </>
  );
}

export default Home;
