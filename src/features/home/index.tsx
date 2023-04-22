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
    const unit = urlParams[0];
    const blockNO = urlParams[1];
    const  floorNO = urlParams[2];
    const  nsNO = urlParams[3];
    const  roomNO = urlParams[4];
    const  bedNO = urlParams[6];
    localStorage.setItem('Unit', unit);
    localStorage.setItem('blockNO', blockNO);
    localStorage.setItem('floorNO', floorNO);
    localStorage.setItem('nsNO', nsNO);
    localStorage.setItem('roomNO', roomNO);
    localStorage.setItem('bedNO', bedNO);
    console.log(blockNO, floorNO, nsNO, roomNO, bedNO);
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
