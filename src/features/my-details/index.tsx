import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import MyDis from "../../assets/Discharge.png";
import MyIns from "../../assets/Insurance-Status-icon.png";
import MyBill from "../../assets/myBill.png";

interface Services {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: Services[] = [
  {
    title: "My Bill",
    icon: MyBill,
    path: "/mybills",
  },
  {
    title: "My Discharge",
    icon: MyDis,
    path: "/mydischarge",
  },
  {
    title: "Insurance Status",
    icon: MyIns,
    path: "/myinsurance",
  },
];

function MyDetails() {
  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();
  const { t } = useTranslation(["mydetails"]);

  const onClick = useCallback((title: string, path: string) => {
    const findService = serviceInfo.find((service) => service.title === title);
    if (!findService) {
      naviage(path);
    }
    if (findService?.element) {
      setModalContent(findService?.element);
      setModalStatus(true);
      setService(findService);
    }
  }, []);

  const setModalState = useCallback((status: boolean) => {
    setModalStatus(status);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const Back = () => {
    naviage("/services");
  };

  return (
    <>
      <Navbar />
      <div onClick={Back} style={{ marginBottom: "10%", marginRight: "100%" }}>
        <Icon disabled name="arrow left" size="large" /> {/* color="#6D6D70" */}
      </div>

      <Grid columns={2} rows={3} padded>
        {mockServicesList.map((item, index, path) => (
          <Grid.Column
            key={`col-${index}`}
            onClick={() => onClick(item.title, item.path)}
            className="grid-item"
            style={{
              marginLeft: "6%",
              background: "#4A98CD",
              width: "40%",
              height:'95px',
              borderRadius: "25px",
            }}
          >
                    <img src={item.icon} width={50} height={50} />
              <div>
                <h1
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "white",
                    paddingBottom: 20,
                  }}
                >
                  {t(item.title)}
                </h1>
              </div>
 
          </Grid.Column>
        ))}
      </Grid>      
      <BackgroundImage />
      <Footer />
    </>
  );
}

export default MyDetails;
