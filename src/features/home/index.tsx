import React from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../common/drop-down";
import { languageOptions } from "../../config/languages";

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
  const dropdownStyles = {
    borderRadius: '1rem', // change the value to adjust the radius
  };
  return (
    <>
      <div>Select Language</div>
      <DropDown
        fluid
        options={languageOptions}
        placeholder={"Select a language"}
        search
        selection
        style={dropdownStyles}
        onChange={onChangeLanguage}
      />
    </>
  );
}

export default Home;
