import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import Navbar from "../../components/nav-bar";
import ServiceModal from "../../components/service-modal";
import { ServiceInfo, serviceInfo } from "../../config/services";
import AmbulanceIcon from "../../assets/AmbulanceIcon.png";
import HouseKeep from "../../assets/House-keeping-icon.png";
import Food from "../../assets/Food-and-Beverage.png";
import Facilities from "../../assets/Facilities.png";
import BackgroundImage from "../../components/background";
import Footer from "../../components/footer";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

import veg from "../../assets/fb/vegbiryani.webp";
import juice from "../../assets/fb/orangejuice.jfif";
import coffee from "../../assets/fb/coffee.jfif";
import chicken from "../../assets/fb/chibiryani.jfif";
import Cart from "../../assets/fb/shopping-bag.png";
import Idly from "../../assets/fb/87ea2e127a2e58e7c08e4a13d857879f.avif";
import Rupee from "../../assets/fb/Indian_Rupee_symbol.svg.png";
import Dosa from "../../assets/fb/istockphoto-909906350-612x612.jpg";
import { addMyFood } from "../../reduxtoolkit/myFoodSlice";

interface Services {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const mockServicesList: Services[] = [
  {
    title: "House Keeping",
    icon: HouseKeep,
    path: "/services",
  },
  {
    title: "Food & Beverages",
    icon: Food,
    path: "/food&Beverages",
  },
  {
    title: "Facilities",
    icon: Facilities,
    path: "/services",
  },
];

const foodData = [
  {
    title: "Veg Biryani",
    rate: "120.00",
    image: veg,
    category: "Veg",
    type: "Lunch",
    qty: 0,
  },
  {
    title: "Orange Juice",
    rate: "85.00",
    image: juice,
    category: "Veg",
    type: "Pre BreakFast",
    qty: 0,
  },
  {
    title: "Coffe",
    rate: "40.00",
    image: coffee,
    category: "Veg",
    type: "Pre BreakFast",
    qty: 0,
  },
  {
    title: "Chicken Biryani",
    rate: "120.00",
    image: chicken,
    category: "Non Veg",
    type: "Dinner",
    qty: 0,
  },
  {
    title: "Idly",
    rate: "50.00",
    image: Idly,
    category: "Veg",
    type: "BreakFast",
    qty: 0,
  },
  {
    title: "Dosa",
    rate: "50.00",
    image: Dosa,
    category: "Veg",
    type: "BreakFast",
    qty: 0,
  },
];

function Services() {

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(addMyFood(foodData));
  // }, [dispatch]);

  // useEffect(() => {
  //   const foodDatacopy = [...foodData];
  //   foodDatacopy.map((item) => {
  //     dispatch(addMyFood(item));
  //   });
  // }, []);

  
  const [modalStatus, setModalStatus] = React.useState(false);

  const [modalConent, setModalContent] = React.useState<JSX.Element>();

  const [service, setService] = useState<ServiceInfo>();

  const naviage = useNavigate();
  const { t } = useTranslation(["servicerequest"]);

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
      <div style={{marginTop: '8%'}}>
      <div onClick={Back} style={{ marginBottom: "10%", marginRight: "190%" }}>
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
      </div>
      <BackgroundImage />
      <Footer />
      
    </>
  );
}

export default Services;
