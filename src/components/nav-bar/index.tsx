import React from "react";
import { Header, Label, Segment, Image } from "semantic-ui-react";
import BrandLogo from "../logo";
import { useNavigate, useNavigation } from "react-router-dom";
import logo from "../../assets/brandLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
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
        <Label onClick={() => navigate("/")} as="a" color="green">
          Logout
        </Label>
      </Header>
      <Header as="h2" floated="left">
        <Image size="massive" src={logo} circular />
      </Header>
    </Segment>
  );
};

export default Navbar;
