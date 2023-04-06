import Ambulance from "../../components/ambulance-modal";
import ContactModal from "../../components/contact-modal";
import FacilitiesModal from "../../components/facilities-modal";
import HouseKeepingModal from "../../components/house-keeping-modal";
import MedicalStaff from "../../components/medical-staff";

export interface ServiceInfo {
  title: string;
  element?: JSX.Element;
}

export const serviceInfo: ServiceInfo[] = [
  {
    title: "Medical Staff",
    element: <MedicalStaff />,
  },
  {
    title: "Facilities",
    element: <FacilitiesModal />,
  },
  {
    title: "Ambulance",
    element: <Ambulance />,
  },
  {
    title: "Contact Support",
    element: <ContactModal />,
  },
  {
    title: "House Keeping",
    element: <HouseKeepingModal />,
  },
];
