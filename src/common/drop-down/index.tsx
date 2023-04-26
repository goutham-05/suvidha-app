import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

const languagesData = [
  { id: 1, value: "English", selected: false },
  { id: 2, value: "తెలుగు", selected: false },
  { id: 3, value: "हिन्दी", selected: false },
  { id: 4, value: "मराठी", selected: false },
  { id: 5, value: "ಕನ", selected: false },
  { id: 6, value: "தமிழ்", selected: false },
  { id: 7, value: "اردو", selected: false },
  { id: 8, value: "ଓଡିଆ", selected: false },
  { id: 9, value: "മലയാളം", selected: false },
];

interface Props {
  placeholder: string;
  fluid: boolean;
  search: boolean;
  selection: boolean;
  options: any;
  onChange?: (event: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

const DropDown: React.FC<Props> = ({
  placeholder,
  fluid,
  selection,
  options,
  onChange,
  search,
}) => {
  const navigate = useNavigate();
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [languageSelected, setLanguageSelected] = useState("Select Language");

  const onSubmit = () => {
    setIsDropDownClicked(!isDropDownClicked);
    if (isDropDownClicked) {
      navigate("/login", {
        state: {
          selectedLanguage: languageSelected,
        },
      });
    }
  };

  return (
    <div className="dropdown" onClick={onSubmit}>
      <div className="dropdown-btn">
        {languageSelected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isDropDownClicked && (
        <div className="dropdown-content">
          {languagesData.map((item: any) => {
            return (
              <div
                className="dropdown-item"
                onClick={(e) => {
                  setLanguageSelected(item.value);
                  setIsDropDownClicked(false);
                }}
              >
                {item.value}
                <div className="border-line" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
