import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import AmbulanceIcon from "../../assets/AmbulanceIcon.png";
import FeedBack from "../../assets/Feedback.png";
import CallSup from "../../assets/callsupport.png";
import MyDetails from "../../assets/My-details.png";
import ServiceReq from "../../assets/Service-Request.png";
import PortalSer from "../../assets/Porter-services.png";
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import "./index.css";
import { Grid, Icon } from "semantic-ui-react";
interface ServiceList {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: ServiceList[] = [
  {
    title: "My Details",
    icon: MyDetails,
    path: "/mydetails",
  },
  {
    title: "Service Request",
    icon: ServiceReq,
    path: "/service",
  },
  {
    title: "Porter Services",
    icon: PortalSer,
    path: "/bills",
  },
  {
    title: "Grievance/Feedback",
    icon: FeedBack,
    path: "/board",
  },
  {
    title: "Call Support",
    icon: CallSup,
    path: "/callsupport",
  },
];

function ServicesList() {
  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();

  const userData = useAppSelector((state) => state.user);

  console.log("dashboard", userData);

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

  const setModalState = useCallback((status: boolean) => {
    setModalStatus(status);
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <Grid columns={2} rows={3} padded >
        {mockServicesList.map((item, index, path) => (
          <Grid.Column
            key={`col-${index}`}
            onClick={() => onClick(item.title, item.path)}
            className="grid-item"
            style={{
              marginLeft: "6%",
              background: "#4A98CD",
              width: "40%",
              height:'95px',
              borderRadius: "25px",
            }}
          >
                    <img src={item.icon} width={50} height={50} />
              <div>
                <h1
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "white",
                    paddingBottom: 20,
                  }}
                >
                  {t(item.title)}
                </h1>
              </div>
 
          </Grid.Column>
        ))}
      </Grid>
      <BackgroundImage />
      <Footer />
    </>
  );
}

export default ServicesList;
