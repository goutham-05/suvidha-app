import ServicesList from "../../features/services-list";
import Login from "../../features/login";
import Cart from "../../features/cart";
import Home from "../../features/home";
import Bills from "../../features/bills";
import { Link, RouteObject } from "react-router-dom";
import NoMatch from "../../components/not-found";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/services", element: <ServicesList /> },
  { path: "/bills", element: <Bills /> },
  { path: "/cart", element: <Cart /> },

  { path: "*", element: <NoMatch /> },
];
