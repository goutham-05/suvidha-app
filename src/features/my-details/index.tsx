import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import AmbulanceIcon from "../../assets/AmbulanceIcon.png";
import PortorService from "../../assets/wheel-chair-icon.png";
import Food from '../../assets/Order-food-icon.png';
import Discharge from '../../assets/Discharge.png';
import HospitalServices from '../../assets/HospitalServices.png'
import Facilities from '../../assets/Facilities.png';
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import { Icon } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";
import MyDis from '../../assets/Discharge.png';
import MyIns from '../../assets/My Insurance.png'
import MyBill from '../../assets/My-Bills.png';

interface Services {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: Services[] = [
  {
    title: "My Bill",
    icon: MyBill,
    path: '/mybills',
  },
  {
    title: "My Discharge",
    icon: MyDis,
    path: '/mydischarge',
  },
  {
    title: "Insurance Status",
    icon: MyIns,
    path: '/myinsurance',
  },
];

function MyDetails() {

  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();
  const { t } = useTranslation(["mydetails"]); 


  const onClick =  useCallback((title: string, path: string) => {
    const findService = serviceInfo.find((service) => service.title === title);
    if (!findService) {
      naviage(path);
    }
    if (findService?.element) {
      setModalContent(findService?.element);
      setModalStatus(true);
      setService(findService);
    }
  }, []);

  const setModalState = useCallback((status: boolean) => {
    setModalStatus(status);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const Back = () => {
    naviage("/services")
  }

  return (
    <>
      <Navbar />
      <div onClick={Back} style={{marginBottom: '10px', marginRight: '390px'}}>
      <Icon disabled name='arrow left'  size="large"/> {/* color="#6D6D70" */}
    </div>
      <Container fluid textAlign="justified">
        <Grid>
          {mockServicesList.map(
            ({ icon, title, size = "huge", path }, index) => (
              <Grid.Column mobile={8} tablet={4} computer={4} key={index} onClick={() => onClick(title, path)}>
                <div style={{ background: '#6C6D70', height: 100, width: 140, borderRadius: 30}} >
                  <div style={{display: "flex", justifyContent: 'center', paddingTop: 15, flexDirection: "row"}}>
                    <img src={icon} width={50} height={50} />
                  </div>
                  <div>
                  <h1 style={{fontSize: 12, textAlign: "center", color: 'white', paddingBottom: 20}}>{t(title)}</h1>
                  </div>
                </div>
              </Grid.Column>
            )
          )}
        </Grid>
        <ServiceModal
          status={modalStatus}
          title={service?.title || ""}
          setModalState={setModalState}
        >
          {modalConent}
        </ServiceModal>
      </Container>
      <div>
        {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <div style={{ width: '80%',position: 'absolute', top: '50%', left: '50%', transform: 'translate(50%, 50%)', backgroundColor: '#b1dfdf', padding: '20px', borderRadius: '30px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1px'}}>
            <div style={{background: '#007cb0', width: '70%', borderRadius: '10px', marginLeft: '45px'}}> 
            <h2 style={{color: 'white', marginTop: '8px', fontSize: '20px'}}>Ambulance</h2>
            </div>
            <div>
            <h1 style={{marginBottom: '5px'}}>x</h1>
            </div>
            </div>
            <div style={{width: '100%', height: '50px', marginTop: '20px',  display: 'flex', justifyContent: 'space-around'}}>
                <img src={AmbulanceIcon} style={{width: '40px', height: '40px', color: 'black'}}/>
                <div style={{marginTop: '5px'}}>
                  <h2 style={{color: 'black'}}>Call Red Ambulance</h2>
                </div>
            </div>
            <div style={{width: '15%', height: '30px', background: '#e31a47', marginLeft: '120px', borderRadius: '10px'}}>
              <h1 style={{fontSize: '15px', color: 'white', paddingTop: '5px'}}>Call</h1>
            </div>
          </div>
        </div>
      )}
        </div>
       <BackgroundImage />
       <Footer />
    </>
  );
}

export default MyDetails;