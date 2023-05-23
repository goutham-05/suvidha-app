import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import food from '../../assets/food.png';
import myBill from "../../assets/bills.png";
import myDischarge from "../../assets/discharge.png";
import insurance from "../../assets/insurance.png";
import houseKepping from '../../assets/HK.png';
import facilities from '../../assets/facility.png';
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import porter from '../../assets/porter.png';
import ambulance from '../../assets/AmbulanceIcon (2).png';
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import "./index.css";
import { Grid, Icon, Image } from "semantic-ui-react";
import { patientCheck } from '../../reduxtoolkit/patientCheckSlice';

interface ServiceList {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const myDetailsList: ServiceList[] = [
  {
    title: "My Bill",
    icon: myBill,
    path: "/mybills",
  },
  {
    title: "My Discharge",
    icon: myDischarge,
    path: "/mydischarge",
  },
  {
    title: "Insurance Status",
    icon: insurance,
    path: "/myinsurance",
  },
  // {
  //   title: "Grievance/Feedback",
  //   icon: FeedBack,
  //   path: "/servicedisabled",  
  // },
  // {
  //   title: "Call Support",
  //   icon: CallSup,
  //   path: "/callsupport",
  // },
];

const ServiceRequestList: ServiceList[] = [
  // {
  //   title: "House Keeping",
  //   icon: houseKepping,
  //   path: "/servicedisabled",
  // },
  {
    title: "Food & Beverages",
    icon: food,
    path: "/fnb",
  },
  // {
  //   title: "Facilities",
  //   icon: facilities,
  //   path: "/servicedisabled",
  // },
];

const othersList: ServiceList[] = [
  {
    title: "Porter Services",
    icon: porter,
    path: "/portalservices",
  },
  {
    title: "Ambulance",
    icon: ambulance,
    path: "/ambulance",
  },
];

function ServicesList() {
  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();

  const userData = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();


  const patientCheckInDK = useAppSelector((state) => state.patientCheck);

  useEffect(() => {
    const unitIdString = localStorage.getItem("unit_code");
    const unitIdObject = unitIdString ? JSON.parse(unitIdString) : null;
    const unitId = unitIdObject.unit;
    dispatch(patientCheck({
      unit_id: unitId,
      patient_ipno: localStorage.getItem('admissionno')
    }))
  }, [])

  const filteredServicesList = patientCheckInDK.data?.length > 0
  ? ServiceRequestList
  : ServiceRequestList.filter(item => item.title !== "Food & Beverages");


  const { t } = useTranslation(["serviceslist"]);
  const onClick = useCallback((title: string, path: string) => {
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

  return (
    <div>
      <Navbar />
      <Grid
        columns={3}
        style={{ marginTop: "10%", width: "105%", marginLeft: "2%"}}
      >
        <Grid.Row
          style={{
            background: "white",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px grey",
            marginBottom: '5%'
          }}
        >
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              textAlign: "left",
            }}
          >
            My Details
          </h1>
          {myDetailsList.map((item, index) => (
            <Grid.Column key={`col-${index}`}
            onClick={() => onClick(item.title, item.path)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "auto",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <img src={item.icon} width={50} height={50} />
                <p
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "11px",
                    fontWeight: "500",
                    paddingTop: "10%",
                  }}
                >
                  {t(item.title)}
                </p>
              </div>
            </Grid.Column>
          ))}
        </Grid.Row>

        <Grid.Row
          style={{
            background: "white",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px grey",
            marginBottom: '5%'
          }}
        >
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              textAlign: "left",
            }}
          >
            Service Request
          </h1>
          {filteredServicesList.map((item, index) => (
            <Grid.Column onClick={() => onClick(item.title, item.path)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "auto",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <img src={item.icon} width={50} height={50} />
                <p
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "11px",
                    fontWeight: "500",
                    paddingTop: "10%",
                  }}
                >
                  {t(item.title)}
                </p>
              </div>
            </Grid.Column>
          ))}
        </Grid.Row>

        <Grid.Row
          style={{
            background: "white",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px grey",
            marginBottom: '5%'
          }}
        >
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              textAlign: "left",
            }}
          >
            Others
          </h1>
          {othersList.map((item, index) => (
            <Grid.Column onClick={() => onClick(item.title, item.path)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "auto",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <img src={item.icon} width={50} height={50} />
                <p
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "11px",
                    fontWeight: "500",
                    paddingTop: "10%",
                  }}
                >
                  {t(item.title)}
                </p>
              </div>
            </Grid.Column>
          ))}
        </Grid.Row>

      </Grid>
      {/* <Grid columns={3} style={{ marginTop: "10%" }}>
        <Grid.Row>
          <div className="detailsContainer">
            <h1
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                float: "left",
                marginTop: "4%",
                marginLeft: "4%",
              }}
            >
              My Details
            </h1>

            <Grid columns={3} style={{ width: "90%" }}>
              <Grid.Row style={{ marginTop: "-2%" }}>
                {mockServicesList.map((item, index) => (
                  <Grid.Column
                    key={`col-${index}`}
                    onClick={() => onClick(item.title, item.path)}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "70%",
                        marginRight: "auto",
                        width: "fit-content",
                      }}
                    >
                      <img src={item.icon} width={50} height={50} />
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                          fontWeight: "500",
                          paddingTop: "10%",
                        }}
                      >
                        {t(item.title)}
                      </p>
                    </div>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Row>

        <Grid.Row>
          <div className="detailsContainer">
            <h1
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                float: "left",
                marginTop: "4%",
                marginLeft: "4%",
              }}
            >
              My Details
            </h1>

            <Grid columns={3} style={{ width: "90%" }}>
              <Grid.Row style={{ marginTop: "-2%" }}>
                {mockServicesList.map((item, index) => (
                  <Grid.Column
                    key={`col-${index}`}
                    onClick={() => onClick(item.title, item.path)}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "70%",
                        marginRight: "auto",
                        width: "fit-content",
                      }}
                    >
                      <img src={item.icon} width={50} height={50} />
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                          fontWeight: "500",
                          paddingTop: "10%",
                        }}
                      >
                        {t(item.title)}
                      </p>
                    </div>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Row>

        <Grid.Row>
          <div className="detailsContainer">
            <h1
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                float: "left",
                marginTop: "4%",
                marginLeft: "4%",
              }}
            >
              My Details
            </h1>

            <Grid columns={3} style={{ width: "90%" }}>
              <Grid.Row style={{ marginTop: "-2%" }}>
                {mockServicesList.map((item, index) => (
                  <Grid.Column
                    key={`col-${index}`}
                    onClick={() => onClick(item.title, item.path)}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "70%",
                        marginRight: "auto",
                        width: "fit-content",
                      }}
                    >
                      <img src={item.icon} width={50} height={50} />
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                          fontWeight: "500",
                          paddingTop: "10%",
                        }}
                      >
                        {t(item.title)}
                      </p>
                    </div>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Row>

      </Grid> */}
      <BackgroundImage />
      <Footer />
    </div>
  );
}

export default ServicesList;

{
  /* <div className="dashboardContainer">
        <div className="detailsContainer">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              marginTop: "4%",
              marginLeft: "4%",
            }}
          >
            My Details
          </h1>

          <Grid columns={3} style={{width: '90%'}}>
  <Grid.Row style={{marginTop: '-2%'}}>
    {mockServicesList.map((item, index) => (
      <Grid.Column
        key={`col-${index}`}
        onClick={() => onClick(item.title, item.path)}
      >
         <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "70%",
            marginRight: "auto",
            width: "fit-content",
          }}
        >
          <img src={item.icon} width={50} height={50} />
          <p style={{ whiteSpace: "nowrap", fontSize: '11px', fontWeight: '500', paddingTop: '10%'}}>{t(item.title)}</p>
        </div>
      </Grid.Column>
    ))}
  </Grid.Row>
</Grid>
        </div>
        <div className="detailsContainer">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              marginTop: "4%",
              marginLeft: "4%",
            }}
          >
            Service Request
          </h1>
        </div>
        <div className="detailsContainer">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              float: "left",
              marginTop: "4%",
              marginLeft: "4%",
            }}
          >
            Others
          </h1>
        </div>
      </div> */
}
