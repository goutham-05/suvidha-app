import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../../common/drop-down";
import { languageOptions } from "../../config/languages";
import BrandLogo from "../../components/logo";
import BackgroundImage from "../../components/background";

function Home() {
  const navigate = useNavigate();
  const { param1, param2, param3, param4, param5, param6 } = useParams();
  console.log('unit::', param1);
  console.log('block::', param2);
  console.log('floor::', param3);
  console.log('ns::', param4);
  console.log('room::', param5);
  console.log('bed::', param6);
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

  useEffect(() => {
    // const url = "http://localhost:5173/1/block-1/floor-1/ns-1/room-1/bed-1";
    // window.history.replaceState(null, "New Page Title", url);
    // const urlParams = "/1/block-1/floor-1/ns-1/room-1/bed-1".split("/");
    
    // const myObject = {
    //   blockNO: urlParams[1],
    //   floorNO: urlParams[2],
    //   nsNO: urlParams[3],
    //   roomNO: urlParams[4],
    //   bedNO: urlParams[5],
    // };

    // localStorage.setItem("Data", JSON.stringify(myObject));
    // localStorage.setItem("FloorNo", JSON.stringify(myObject.floorNO));
  }, []);

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
