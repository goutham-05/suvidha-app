import ServicesList from "../../features/services-list";
import Login from "../../features/login";
import Cart from "../../features/cart";
import Home from "../../features/home";
import Bills from "../../features/bills";
import { Link, RouteObject } from "react-router-dom";
import NoMatch from "../../components/not-found";
import FoodMenu from "../../features/food-menu";
import QrCode from '../../components/qr-code';
import Admin from "../../Admin/Login";
import AdminHome from "../../Admin/Home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {path: "/Qrcode", element: <QrCode /> },
  { path: "/login", element: <Login /> },
  {
    path: "/services",
    element: <ServicesList />,
    children: [{ path: "/services/bills", element: <Bills /> }],
  },
  { path: "/bills", element: <Bills /> },
  { path: "/cart", element: <Cart /> },
  {
    path: "/food-menu",
    element: <FoodMenu />,
  },
  { path: "*", element: <NoMatch /> },
  {
    path: "/Admin",
    element: <Admin />
  },
  {
    path: "/AdminHome",
    element: <AdminHome />
  }
];
