import React from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../common/drop-down";
import { languageOptions } from "../../config/languages";
import BrandLogo from "../../components/logo";

function Home() {
  const navigate = useNavigate();

  const onChangeLanguage = (
    _: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    navigate("/login", {
      state: {
        selectedLanguage: data.value,
      },
    });
  };

  return (
    <>
      <BrandLogo
        styles={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "50%",
          marginTop: "10%",
          marginBottom: "10%",
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
