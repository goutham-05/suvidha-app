import ServicesList from "../../features/services-list";
import Login from "../../features/login";
// import Cart from "../../features/cart";
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
import MyDischargeModal from "../../components/discharge-modal";
import MyBillModal from "../../components/bills-modal";
import MyInsuranceModal from "../../components/insurance-model";
import HouseKeepingModal from "../../components/house-keeping-modal";
import CallSupport from "../../features/call-support";
import ServiceDisabled from "../../common/service-disabled";
import FoodBeverages from "../../components/foodbeverages-modal";
import PortalService from "../../features/PortalServices";
import MyCart from "../../components/my-cart";
import Ambulance from "../../components/ambulance-modal";

type ProtectedRoute = RouteObject & { isProtected?: boolean };
export const routes: ProtectedRoute[] = [
  {
    path: "/:param1", 
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
    element: <Bills />,
    isProtected: true
  },
  // {
  //   path: "/cart",
  //   element: <Cart />,
  //   isProtected: true
  // },
  {
    path: "/food-menu",
    element: <FoodMenu />,
    isProtected: true
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
    element: <PortalService />,
    isProtected: true,
  },
  {
    path: '/board',
    element: <Board />,
    isProtected: true,
  },
  {
    path: '/mydetails',
    element: <MyDetails />,
    isProtected: true,
  },
  {
    path:'/mydischarge',
    element: <MyDischargeModal />,
    isProtected: true,
  },
  {
    path:'/mybills',
    element: <MyBillModal />,
    isProtected: true,
  },
  {
    path:'/myinsurance',
    element: <MyInsuranceModal />,
    isProtected: true,
  },
  // {
  //   path:'/housekeeping',
  //   element: <HouseKeepingModal />,
  //   isProtected: true,
  // },
  {
    path: '/callsupport',
    element: <CallSupport />,
    isProtected: true,
  },
  {
    path: '/servicedisabled',
    element: <ServiceDisabled />,
    isProtected: true,
  },
  {
    path:'/fnb',
    element: <FoodBeverages />,
    isProtected: true,
  },
  {
    path:'/cart',
    element: <MyCart />,
    isProtected: true,
  },
  {
    path:'/ambulance',
    element:<Ambulance />,
    isProtected: true,
  }
];
