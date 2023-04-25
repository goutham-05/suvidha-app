import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import { SemanticICONS } from "semantic-ui-react/src/generic";
import Navbar from "../../components/nav-bar";
import ServiceCard from "../../components/service-card";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import hospitasServices from "../../assets/HospitalServices.png";
import AmbulanceIcon from "../../assets/AmbulanceIcon.png";
import FeedBack from "../../assets/Feedback-icon.png";
import MyBills from "../../assets/Grievince.png";
import PortorService from "../../assets/wheel-chair-icon.png";
import Food from '../../assets/Order-food-icon.png';
import Discharge from '../../assets/Discharge.png';
import Facilities from '../../assets/Facilities.png';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import axios from "axios";
import { setServers } from "dns";

interface ServiceList {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: ServiceList[] = [
  {
    title: "My Bills",
    icon: MyBills,
    path: '/bills',
  },
  {
    title: "My Requests",
    icon: MyBills,
    path: "/bills",
  },
  {
    title: "My Discharge",
    icon: Discharge,
    path: "/bills",
  },
  {
    title: "Portor Service",
    icon: PortorService,
    path: "/bills",
  },
  {
    title: "Order Food",
    icon: Food,
    path: "/food-menu",
  },
  {
    title: "House Keeping",
    icon: AmbulanceIcon,
    path: "/bills",
  },
  {
    title: "Facilities",
    icon: Facilities,
    path: "/bills",
  },
  {
    title: "Facilities",
    icon: AmbulanceIcon,
    path: "/bills",
  },
  {
    title: "Feedback",
    icon: FeedBack,
    path: "/bills",
  },
  {
    title: "Facilities",
    icon: AmbulanceIcon,
    path: "/bills",
  },
];

function ServicesList() {

  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();

  // const getServices = async () => {
  //   var response = await axios.post('http://10.20.100.179:4000/api/get-service-data-bytype', {
  //     "service_type":"1",
  //   }, {
  //     headers: {
  //       'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVfbnVtYmVyIjoiOTAzMDc4OTY0MCIsImFkbWlzc2lvbm5vIjoiSVAyMzI0MDAyMDQ0IiwiaWF0IjoxNjgyMzIzMTQ0LCJleHAiOjE2ODIzMjY3NDR9.fGzOXxlWL6_VtR5mCxu_xBYDxc_mERkIpxZqZ5xmOBo'}` 
  //      } 
  //   })
    
  //   console.log('services-available', response.data);
  // }

  // useEffect(() => {
  //   getServices();
  // })

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

  return (
    <>
      <Navbar />
      <Container fluid textAlign="justified">
        <Grid>
          {mockServicesList.map(
            ({ icon, title, size = "huge", path }, index) => (
              <Grid.Column mobile={8} tablet={4} computer={4} key={index} onClick={() => onClick(title, path)}>
                <div style={{ background: '#238fb8', height: 100, width: 150, borderRadius: 30}} >
                  <div style={{display: "flex", justifyContent: 'center', paddingTop: 10, flexDirection: "row"}}>
                    <img src={icon} width={50} height={50} />
                  </div>
                  <div>
                  <h1 style={{fontSize: 12, textAlign: "center", color: 'white', paddingBottom: 20}}>{title}</h1>
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
       
    </>
  );
}

export default ServicesList;
