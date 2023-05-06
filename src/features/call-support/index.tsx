import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import AmbulanceIcon from "../../assets/AmbulanceIcon.png";
import CallSuppport from "../../assets/Call-Support.png";
import Food from "../../assets/Food-and-Beverage.png";
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import { useTranslation } from "react-i18next";
import { Button, Header, Image, Modal, Icon, Label, Menu, Table} from "semantic-ui-react";
import Ambulance from "../../assets/AmbulanceIcon.png";
import "./index.css";

interface Services {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}


const callSupportList: Services[] = [
  {
    title: "Ambulance",
    icon: Ambulance,
    path: "/bills",
  },
  {
    title: "Call Support",
    icon: CallSuppport,
    path: "/bills",
  },
];

function CallSupport() {
  const [open, setOpen] = React.useState(false);
  const [sec, setSecondModel] = useState(false);
  const [dimmer, setDimmer] = useState(false);
  const naviage = useNavigate();

  const Back = () => {
    naviage("/services");
  };
  return (
    <>
      <Navbar />
      <div onClick={Back} style={{ marginBottom: "10%", marginRight: "390%" }}>
        <Icon disabled name="arrow left" size="large" /> {/* color="#6D6D70" */}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginLeft: "5%" }}
      >
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <div
              style={{
                background: "#6C6D70",
                height: 100,
                width: 140,
                borderRadius: 30,
                margin: "4%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 15,
                  flexDirection: "row",
                }}
              >
                <img src={Ambulance} width={50} height={50} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "90%",
                    textAlign: "center",
                    color: "white",
                    paddingBottom: "20%",
                    fontWeight: "bold",
                  }}
                >
                  Ambulance
                </h1>
              </div>
            </div>
          }
          style={{
            width: "80%",
            height: "35%",
            marginLeft: "10%",
            marginTop: "40%",
            borderRadius: "20px",
            background: '#b1dfdf'
          }}
        >
          <Modal.Description>
            <div style={{ display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <Header
                  style={{
                    marginLeft: "18%",
                    marginTop: "8%",
                    width: "60%",
                    height: "36px",
                    background: "#007cb0",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ paddingTop: "3%", color: "white" }}>Ambulance</p>
                </Header>
                <div
                  style={{ flex: 1, marginTop: "11%", marginLeft: "6%" }}
                  onClick={() => setOpen(false)}
                >
                  <Icon disabled name="close" color="black" size="large" />
                </div>
              </div>
            </div>
            <Modal.Actions>
              <div style={{ flexDirection: "column", marginLeft: '-6%' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "4%",
                  }}
                >
                  <div style={{ marginLeft: "20%", marginTop: "1%" }}>
                    <Icon
                      disabled
                      name="ambulance"
                      color="black"
                      size="large"
                    />
                  </div>
                  <p
                    style={{
                      paddingLeft: "2%",
                      fontSize: "140%",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Call Red Ambulance
                  </p>
                </div>
              </div>
              <Modal.Actions style={{ marginLeft: "35%", marginTop: "4%" }}>
                <Button color="red">
                  <Icon disabled name="call" size="small" />{/* color="white" */}
                  <a href="tel:555-555-5555">Call</a>
                </Button>
              </Modal.Actions> 
            </Modal.Actions>
          </Modal.Description>
        </Modal>
        <Modal
          onClose={() => setSecondModel(false)}
          onOpen={() => setSecondModel(true)}
          open={sec}
          trigger={
            <div
              style={{
                background: "#6C6D70",
                height: 100,
                width: 140,
                margin: "4%",
                borderRadius: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 15,
                  flexDirection: "row",
                }}
              >
                <img src={CallSuppport} width={50} height={50} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "90%",
                    textAlign: "center",
                    color: "white",
                    paddingBottom: "20%",
                    fontWeight: "bold",
                  }}
                >
                  Call Support
                </h1>
              </div>
            </div>
          }
          style={{
            width: "70%",
            height: "40%",
            marginLeft: "15%",
            marginTop: "40%",
            borderRadius: "20px",
            background: '#b1dfdf'
          }}
        >
          <Modal.Description>
            <div style={{ display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Header
                  style={{
                    marginLeft: "18%",
                    marginTop: "8%",
                    width: "60%",
                    height: "38px",
                    background: "#007cb0",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ paddingTop: "3%", color: "white", fontSize: '100%'}}>
                    Contact Support
                  </p>
                </Header>
                <div
                  style={{ flex: 1, marginTop: "11%", marginLeft: "6%" }}
                  onClick={() => setSecondModel(false)}
                >
                  <Icon disabled name="close" color="black" size="large" />
                </div>
              </div>
            </div>
            <Modal.Actions>

            <div className="Tablecontainer">
      <table>
        <tbody>
          <tr>
            <td>Floor Manager</td>
            <td><a href="tel:555-555-5555" style={{textDecoration: 'none', borderRadius: '10px', padding: '18%', background: '#E41B47', color: 'white'}}>
            <Icon disabled name="call"/>
              </a></td>
          </tr>
          <div style={{width: '128%', border: '1px solid black'}}></div>
          <tr>
            <td>Nerse In Charge</td>
            <td><a href="tel:555-555-5555" style={{textDecoration: 'none', borderRadius: '10px', padding: '18%', background: '#E41B47', color: 'white'}}>
            <Icon disabled name="call" />
            </a></td>
          </tr>
          <div style={{width: '128%', border: '1px solid black'}}></div>
          <tr>
            <td>Financial Counsellor</td>
            <td><a href="tel:555-555-5555" style={{textDecoration: 'none', borderRadius: '10px', padding: '18%', background: '#E41B47', color: 'white'}}>
            <Icon disabled name="call" />
              </a></td>
          </tr>
        </tbody>
      </table>
    </div>
            </Modal.Actions>
          </Modal.Description>
        </Modal>
      </div>
    </>
  );
}

export default CallSupport;
