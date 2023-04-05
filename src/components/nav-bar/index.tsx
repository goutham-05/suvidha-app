import React from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import BrandLogo from "../logo";

const Navbar = () => {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Label as="a" color="blue">
          Sudha Kumar
        </Label>
        <br />
        <Label as="a" color="red">
          IP: 125487524468
        </Label>
        <br />
        <Label as="a" color="teal">
          Room: 9001-A
        </Label>
      </Header>
      <Header as="h2" floated="left">
        <BrandLogo size="large" />
      </Header>
    </Segment>
  );
};

export default Navbar;
