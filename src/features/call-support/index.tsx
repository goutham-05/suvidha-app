import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import CallSuppport from "../../assets/callsupport.png";
import { Header, Modal, Icon} from "semantic-ui-react";
import Ambulance from "../../assets/AmbulanceIcon.png";
import AmbulanceIcon from "../../assets/ambulance.png";
import Call from '../../assets/phone-call.png';
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
    title: "Contact Support",
    icon: CallSuppport,
    path: "/bills",
  },
];

function CallSupport() {
  const [open, setOpen] = React.useState(false);
  const [sec, setSecondModel] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/services");
  };

  return (
    <>
      <Navbar />
      <div onClick={goBack} style={{ marginBottom: "10%", marginRight: "390%" }}>
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
                background: "#4A98CD",
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
            width: "86%",
            height: "24%",
            marginLeft: "7%",
            marginTop: "60%",
            borderRadius: "20px",
            background: 'white'
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
                    height:'36px',
                    background: "#007cb0",
                    borderRadius: "10px",
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
                   <img src={AmbulanceIcon} width={40} height={40}/>
                  </div>
                  <p
                    style={{
                      paddingLeft: "2%",
                      fontSize: "150%",
                      color: "black",
                      fontWeight: "bold",
                      paddingTop: '4%'
                    }}
                  >
                    Call Red Ambulance
                  </p>
                </div>
              </div>
              <Modal.Actions style={{ marginLeft: "35%", marginTop: "4%" }}>
                <div style={{background: '#E41B47', width: '40%', height: '40px' , borderRadius: '10px', display: 'flex'}}>
                <img src={Call} width={22} height={22} style={{marginLeft: '16%', marginTop: '10%'}}/>
                <div style={{marginTop: '12%'}}>
                <a href="tel:9618478765" style={{textDecoration: 'none', color: 'white', padding:'20%', fontSize: '18px'}}>Call</a>
                </div>
              </div>
              </Modal.Actions> 
            </Modal.Actions>
          </Modal.Description>
        </Modal>
        <Modal
          onOpen={() => navigate('/servicedisabled')}
          open={sec}
          trigger={
            <div
              style={{
                background: "#4A98CD",
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
                  Contact Support
                </h1>
              </div>
            </div>
          }
          style={{
            width: "70%",
            height: "35%",
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
                  style={{ flex: 1, marginTop: "10%", marginLeft: "6%" }}
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
            <td>Nursing Incharge</td>
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
