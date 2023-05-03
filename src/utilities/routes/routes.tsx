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
import AdminHome from "../../Admin/AdminHome";
import QrCodeGeneration from "../../Admin/components/QrCodeForm";
import Services from "../../features/Services";
import Board from "../../features/board";
import MyDetails from "../../features/my-details";
type ProtectedRoute = RouteObject & { isProtected?: boolean };
export const routes: ProtectedRoute[] = [
  {
    path: "/:param1?/:param2?/:param3?/:param4?/:param5?/:param6?",
    element: <Home />,
  },
  {
    path: "/Qrcode",
    element: <QrCode />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/services",
    element: <ServicesList />,
    isProtected: true,
    children: [{ path: "/services/bills", element: <Bills /> }],
  },
  {
    path: "/service",
    element: <Services />,
    isProtected: true
  },
  {
    path: "/bills",
    element: <Bills />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/food-menu",
    element: <FoodMenu />,
  },
  {
    path: "*",
    element: <NoMatch />
  },
  {
    path: "/Admin",
    element: <Admin />
  },
  {
    path: "/AdminHome",
    element: <AdminHome />
  },
  {
    path: "/qr-code-generation",
    element: <QrCodeGeneration />
  },
  {
    path: "/portalservices",
    element: <Services />,
  },
  {
    path: '/board',
    element: <Board />,
  },
  {
    path: '/mydetails',
    element: <MyDetails />
  }
];
