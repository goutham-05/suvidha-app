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
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: ServiceList[] = [
  {
    title: "My Bills",
    icon: "clipboard list",
  },
  {
    title: "My Requests",
    icon: "users",
  },
  {
    title: "Medical Staff",
    icon: "user md",
  },
  {
    title: "Portor Service",
    icon: "wheelchair",
  },
  {
    title: "Order Food",
    icon: "food",
  },
  {
    title: "House Keeping",
    icon: "bed",
  },
  {
    title: "Ambulance",
    icon: "ambulance",
  },
  {
    title: "Contact Support",
    icon: "talk",
  },
  {
    title: "Feedback",
    icon: "edit",
  },
  {
    title: "Facilities",
    icon: "hospital",
  },
];

function ServicesList() {
  return (
    <>
      <Navbar />
      <Container fluid textAlign="justified">
        <Grid>
          {mockServicesList.map(({ icon, title, size = "huge" }) => (
            <Grid.Column mobile={8} tablet={4} computer={4}>
              <ServiceCard size={size} title={title} icon={icon} />{" "}
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ServicesList;
