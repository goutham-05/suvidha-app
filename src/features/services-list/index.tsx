import { useNavigate } from "react-router-dom";
import { Card } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { SemanticICONS } from "semantic-ui-react/src/generic";
import Navbar from "../../components/nav-bar";
import ServiceCard from "../../components/service-card";

interface ServiceList {
  title: string;
  icon: SemanticICONS;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: ServiceList[] = [
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
    title: "Medical Staff",
    icon: "user md",
    path: "/bills",
  },
  {
    title: "Portor Service",
    icon: "wheelchair",
    path: "/bills",
  },
  {
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
    title: "Ambulance",
    icon: "ambulance",
    path: "/bills",
  },
  {
    title: "Contact Support",
    icon: "talk",
    path: "/bills",
  },
  {
    title: "Feedback",
    icon: "edit",
    path: "/bills",
  },
  {
    title: "Facilities",
    icon: "hospital",
    path: "/bills",
  },
];

function ServicesList() {
  
  const naviage = useNavigate();

  const onClick = (path: string) => {
    console.log("Clicked", path);
    naviage(path);
  };

  return (
    <>
      <Navbar />
      <Container fluid textAlign="justified">
        <Grid>
          {mockServicesList.map(({ icon, title, size = "huge", path }, index) => (
            <Grid.Column mobile={8} tablet={4} computer={4}>
              <ServiceCard
                onClick={() => onClick(path)}
                size={size}
                title={title}
                icon={icon}
                path={path}
                key={index}
              />{" "}
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ServicesList;
