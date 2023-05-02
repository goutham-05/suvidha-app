import React, { useState } from 'react';
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea";
import Navbar from '../../components/nav-bar';
import './index.css';
import { Icon } from 'semantic-ui-react'
import BackgroundImage from '../../components/background';
import { useNavigate } from "react-router-dom";

const TopBarList = [
  {
    status: "Grievance",
  },
  {
    status: "Feedback",
  },
];

const Feedback = () => {
  return(
    <div className='grievance-container'>
      <TextArea style={{
          resize: 'none',
          width: '320px',
          height: '180px',
          marginTop: '10px',
          border: '1px solid grey',
          borderRadius: '6px',
          textalign: 'center',
        }} placeholder="Tell us more" />
        <div style={{width: '70px',height: '23px', background:'#E31A47', borderRadius: '4px', color: 'white', marginLeft: '140px'}}>
          submit
        </div>
    </div>
  )
}

const Grievance = () => {
  const Attach = () => {
    console.log('Attach clicked');
  }
  return(
    <div className='grievance-container'>
      <div className='attach-button' onClick={Attach}>
        <h6><Icon disabled name='attach' color='white' size='large'/>Attach</h6>
      </div>
      <TextArea style={{
          resize: 'none',
          width: '320px',
          height: '180px',
          marginTop: '10px',
          border: '1px solid grey',
          borderRadius: '6px',
          textalign: 'center',
        }} placeholder="Tell us more" />
        <div style={{width: '70px',height: '23px', background:'#E31A47', borderRadius: '4px', color: 'white', marginLeft: '140px'}}>
          submit
        </div>
    </div>
  )
}
function Board(props) {
  const [state, setState] = useState(false);
  const [status, setStatus] = useState("Grievance");
  const naviage = useNavigate();

  const onChangeScreen = () => {
    if ( status === "Grievance") {
      setState(!state);
    }
    else {
      setState(false);
    }
  }

  const Back = () => {
    naviage("/services")
  }
    return (
        <>
      <Navbar />
      <div className='board-container'>
      <div onClick={Back} style={{marginBottom: '10px', marginRight: '390px'}}>
      <Icon disabled name='arrow left'  size="large" color="#6D6D70"/>
    </div>
      <div className="main" >
        {
          TopBarList.map((item) => {
            return(
              <div onClick={onChangeScreen} className='left-div' >
                <h5 style={{marginTop: '-4px'}}>{item.status}</h5>
              </div>
            )
          })
        }
    </div>
    <div className='screens-div'>
        {
          state ? <Grievance /> : <Feedback />
        }
      </div>
      </div>
      <BackgroundImage />
    </>
    );
}

export default Board;