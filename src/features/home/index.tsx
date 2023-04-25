import React,{useEffect, useState} from "react";
import { useNavigate , useParams} from "react-router-dom";
import DropDown from "../../common/drop-down";
import { languageOptions } from "../../config/languages";
import BrandLogo from "../../components/logo";
import { getOtp, patientData } from "../login/authSlice";
import { floor } from "lodash";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

function Home() {
  const {floorID, roomID} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {url} = useParams();
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

  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5173/1/block-1/floor-1/ns-1/room-1/bed-1';
    window.history.replaceState(null, "New Page Title", url)
    const urlParams = '/1/block-1/floor-1/ns-1/room-1/bed-1'.split('/');

    const myObject = { 
      blockNO: urlParams[1],
      floorNO: urlParams[2],
      nsNO: urlParams[3],
      roomNO: urlParams[4],
      bedNO: urlParams[5]
    };
    
    localStorage.setItem('Data', JSON.stringify(myObject));
    localStorage.setItem('FloorNo', JSON.stringify(myObject.floorNO));

  }, [])


  return (
    <>
      <BrandLogo
        styles={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "40%",
          marginTop: '-34px'
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
    </>
  );
}

export default Home;
