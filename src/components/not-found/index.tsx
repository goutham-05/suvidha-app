import React, { useState , useRef, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { getUnits } from "../../reduxtoolkit/unitSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import Logo from '../../assets/Logo.png';
import { Icon } from 'semantic-ui-react';
import './index.css';
import BackgroundImage from '../background';
import BrandLogo from '../logo';

function NoMatch() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUnits({}));
  }, []);

  const {data} = useAppSelector((state) => state.units);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionId: any) => {
    setSelectedOption(optionId);
    setIsOpen(false);
    let redirectUrl = '/';
    const unit_code = optionId;
    navigate(redirectUrl + '' + unit_code);
  };

    return (
      
      <div>
        {/* <BrandLogo styles={{
          width: "25%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "25%",
        }} /> */}
       <img src={Logo} width={150} height={150} />
          <div className="dropdown">
          <div className="dropdown-btn">
      <div className="dropdown-header" onClick={toggleDropdown} style={{marginLeft: '12%'}}>
        {selectedOption || 'Select Your Location'}
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
       {data.map((unit: any) => (
         <li
           key={unit.unit_admin_id}
           style={{padding: '5%'}}
           onClick={() => handleOptionSelect(unit.unit_admin_id)}
         >
           {unit.unitname}
           <div className="border-line" />
         </li>
       ))}
     </ul>
      )}
    </div>
    <BackgroundImage />
        </div>
        </div>
      );
}

export default NoMatch