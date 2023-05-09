import React, { useState } from "react";
import { Button, Dimmer, Icon, Loader } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function ServiceDisabled() {

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/services')
  }
  return (
    <>
      <Dimmer active={true}>
      <div
              style={{
                background: "white",
                height: '60%',
                width: '320px',
                borderRadius: 30,
                marginBottom: '80%'
              }}
            >
              <div style={{ display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div
                  style={{
                    marginLeft: "18%",
                    marginTop: "8%",
                    width: "60%",
                    height:'36px',
                    background: "#007cb0",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ paddingTop: "3%", color: "white", fontSize: '16px', fontWeight: 'bold'}}>In Progress</p>
                </div>
                <div
                  style={{ flex: 1, marginTop: "11%", marginLeft: "6%" }}
                 onClick={goBack} 
                >
                  <Icon disabled name="close" color="black" size="large" />
                </div>
              </div>
              <div style={{ width: '90%', borderRadius: '10px', marginLeft: '5%', marginTop: '10%'}}>
        <span style={{fontSize: '18px', color: 'black'}}>
          We regret to inform you that the feature you have requested is
          currently undergoing development and is not yet available
        </span>
        </div>
            </div>
            </div>
      </Dimmer>
    </>
  );
}

export default ServiceDisabled;
