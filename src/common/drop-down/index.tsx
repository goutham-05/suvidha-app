import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Icon } from 'semantic-ui-react';

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
  onChange,
  search,
}) => {
  // customed drawer
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { i18n} = useTranslation();
  const options = ['English', 'తెలుగు', 'हिन्दी', 'मराठी'];
  //, 'मराठी','தமிழ்','ಕನ', 'اردو', 'ଓଡିଆ', 'മലയാളം'
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: any) => {
    console.log(option);
    setSelectedOption(option);
    i18next.changeLanguage(option);
    console.log('selected', option);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="dropdown">
          <div className="dropdown-btn">
      <div className="dropdown-header" onClick={toggleDropdown} style={{marginLeft: '12%'}}>
        {selectedOption || 'Select language'}
        {
          isOpen ? (
            <Icon disabled name='caret up'  size="large" color="black" style={{marginLeft: '8%'}}/>
          ): (
      <Icon disabled name='caret down'  size="large" color="black" style={{marginLeft: '5%'}}/>
          )
        }
      </div>
      {isOpen && (
        <ul className="dropdown-content" style={{background: 'transparent', marginTop: '8%', width: '100%', marginLeft: '-14%'}}>
          {options.map((option, index) => (
            <li
              key={index}
              style={{padding: '5%'}}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
              <div className="border-line" />
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default DropDown;
