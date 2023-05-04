import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useRoutes, defer, Navigate, useOutlet} from "react-router-dom";
import "./App.css";
import { routes } from "./utilities/routes/routes";

function App() {
  const isLoggedIn = localStorage.getItem('token');
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

  return <Suspense>{routing}</Suspense>;
}

export default App;
