import { useEffect, useState, FC } from "react";
import "./index.css";
import Logo from "../../assets/Logo.png";
interface Props {
  // define your props here
}
const Admin: React.FC<Props> = () => {
  return (
    <div className="container">
      <div className="">
        <img src={Logo} width={"30%"} />
        <form>
          <input type="text" id="name" placeholder="Enter ID" name="name" />
          <input
            type="email"
            id="email"
            placeholder="Enter Password"
            name="email"
          />
          <button type="submit" className="loginButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
