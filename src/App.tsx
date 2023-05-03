import { useEffect, useState } from "react";
import { Route, Routes, useRoutes, defer, Navigate, useOutlet} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import { routes } from "./utilities/routes/routes";
import BackgroundImage from "./components/background";
import Home from "./features/home";
import Login from "./features/login";
import ServicesList from "./features/services-list";
import OtpForm from "./components/otp-form";
import { AuthLayout } from "./components/AuthLayout";
import { useAuth } from "./hooks/useAuth";
import { HomeLayout } from "./components/HomeLayout";

function App() {
  const isLoggedIn = localStorage.getItem('patientLocation');
  const routing = useRoutes(
    routes.map((route) => {
      const { isProtected, ...rest } = route;
      return {
        ...rest,
        element: isProtected && !isLoggedIn ? (
          <Navigate to="/login" replace />
        ) : (
          route.element
        ),
      };
    })
  );

  return <>{routing}</>;
}

export default App;
