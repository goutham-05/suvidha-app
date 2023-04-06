import Ambulance from "../../components/ambulance-modal";
import ContactModal from "../../components/contact-modal";
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
    title: "House Keeping",
  },
  {
    title: "Facilities",
  },
  {
    title: "Ambulance",
    element: <Ambulance />,
  },
  {
    title: "Contact Support",
    element: <ContactModal />,
  },
];
