import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useRoutes,
  defer,
  Navigate,
  useOutlet,
  Router,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
//import { routes } from "./utilities/routes/routes";
import Home from "./features/home";
import Login from "./features/login";
import ServicesList from "./features/services-list";
import { AuthLayout } from "./components/AuthLayout";
import { useAuth } from "./hooks/useAuth";
import Admin from "./Admin/Login";
import AdminHome from "./Admin/AdminHome";
function App() {
  //const element = useRoutes(routes);

  // ideally this would be an API call to server to get logged in user data

  const getUserData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        const user = window.localStorage.getItem("user");
        resolve(user);
      }, 3000)
    );

  return (
    <div className="App">
      {/* {element} */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App;
