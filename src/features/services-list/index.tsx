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

interface ServiceList {
  title: string;
  icon: SemanticICONS;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: ServiceList[] = [
  {
    title: "Medical Staff",
    icon: "user md",
    path: "/bills",
  },{
    title: "Order Food",
    icon: "food",
    path: "/food-menu",
  },
  {
    title: "House Keeping",
    icon: "bed",
    path: "/bills",
  },
  {
    title: "Contact Support",
    icon: "talk",
    path: "/bills",
  },
  {
    title: "Portor Service",
    icon: "wheelchair",
    path: "/bills",
  },
  {
    title: "Ambulance",
    icon: "ambulance",
    path: "/bills",
  },
  {
    title: "Facilities",
    icon: "hospital",
    path: "/bills",
  },
  {
    title: "My Bills",
    icon: "clipboard list",
    path: "/bills",
  },
  {
    title: "My Requests",
    icon: "users",
    path: "/bills",
  },
  {
    title: "Feedback",
    icon: "edit",
    path: "/bills",
  }
];

function ServicesList() {
  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();

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

  return (
    <>
      <Navbar />
      <Container fluid textAlign="justified">
        <Grid>
          {mockServicesList.map(
            ({ icon, title, size = "huge", path }, index) => (
              <Grid.Column mobile={8} tablet={4} computer={4} key={index}>
                <ServiceCard
                  onClick={() => onClick(title, path)}
                  size={size}
                  title={title}
                  icon={icon}
                  key={index}
                />
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
    </>
  );
}

export default ServicesList;
