import React, { useState, useEffect } from "react";
import Navbar from "../nav-bar";
import { Icon, Input } from "semantic-ui-react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import veg from "../../assets/fb/vegbiryani.webp";
import Rupee from "../../assets/fb/Indian_Rupee_symbol.svg.png";
import Dosa from "../../assets/fb/istockphoto-909906350-612x612.jpg";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { addFoodToMyCart } from "../../reduxtoolkit/myCartSlice";
import { getMyServingTime } from "../../reduxtoolkit/getServingTimesSlice";
import { getItemServiceTime } from "../../reduxtoolkit/getItemServSlice";

interface Item {
  title: string;
  type: string;
  rate: number;
  image: string;
  qty: number;
  category: string;
  selectedServingType: string;
}

const data = [
  {
    itemId: 1,
    title: "All",
    category: "All",
    status: false,
  },
  {
    itemId: 2,
    title: "Veg",
    category: "Veg",
    status: false,
  },
  {
    itemId: 3,
    title: "Non Veg",
    category: "Non Veg",
    status: false,
  },
  {
    itemId: 4,
    title: "Drinks & Juices",
    category: "Drinks",
    status: false,
  },
];

function FoodBeverages() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const myCartItems = useAppSelector((state) => state.cart);

  const quantity = myCartItems[0]?.quantity ?? 0;

  console.log("CartItems", quantity);

  const getMyServicesTypes = useAppSelector((state) => state.getMyServingTime);
  const incrementItems = useAppSelector(state => state.myFood)
  const getItemsServingTime = useAppSelector(
    (state) => state.getItemServiceTime
  );

  const [servingTimeData, setServingTimeData] = useState(getItemsServingTime.data);


  // ...

  useEffect(() => {
    // Update the servingTimeData state when getItemsServingTime.data changes
    setServingTimeData(getItemsServingTime.data);
  }, [getItemsServingTime.data]);
  
  console.log("servingItems:::::::", getItemsServingTime);

  const goBack = () => {
    navigate("/service");
  };

  const goCart = () => {
    navigate("/cart");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [servingListData, setServingListData] = useState(false);
  const [selectedServingType, setSelectedServingType] =
    useState("Serving Type");

  const handleServingTypeSelection = (
    selectedType: string,
    selectedServingType: string,
  ) => {
    if (selectedType) {
      dispatch(
        getItemServiceTime({
          unit_id: unit_id,
          servingtime_id: selectedType.toString(),
        })
      );
    }
    setSelectedServingType(selectedServingType);
    localStorage.setItem('serving time',selectedType);
    setServingListData(true);
    setIsOpen(!isOpen);
    //setSelectedItem(null); // Reset selected item
  };

  let unit_id = "";
  const unitCodeStr = localStorage.getItem("unit_code");
  const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
  if (unit_code) {
    unit_id = unit_code.unit;
  }

  useEffect(() => {
    dispatch(
      getMyServingTime({
        unit_id: unit_id,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getItemServiceTime({
        unit_id: unit_id,
        servingtime_id: "1",
      })
    );
  }, []);

  const [remarksList, setRemarksList] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // const handleAddToCart = (item: any, remarks: any) => {
  //   dispatch(addFoodToMyCart({ ...item, remarks }));
  // };

  return (
    <>
      <Navbar />
      <div
        onClick={goBack}
        style={{ marginBottom: "5%", marginRight: "190%", marginTop: "6%" }}
      >
        <Icon disabled name="arrow left" size="large" />
      </div>
      <div>
        <div style={{ display: "flex", marginTop: "4%" }}>
          <div
            style={{
              marginRight: "20px",
              width: "20%",
              height: "20px",
              padding: "3px",
              fontSize: "10px",
              background: "white",
              boxShadow: "0px 2px 4px grey",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              marginLeft: "6%",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>{selectedServingType}</p>{" "}
            <Icon disabled name="angle down" inverted color="grey" />
          </div>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                marginRight: "20px",
                width: "20%",
                height: "20px",
                padding: "3px",
                fontSize: "10px",
                background: "white",
                boxShadow: "0px 2px 4px grey",
                borderRadius: "10px",
                whiteSpace: "nowrap",
              }}
            >
              <div>{item.title}</div>
            </div>
          ))}
        </div>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              background: "white",
              boxShadow: "0px 2px 4px grey",
              borderRadius: "10px",
              marginTop: "5px",
              width: "45%",
              height: "250px",
              padding: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {Array.isArray(getItemsServingTime.data) ? (
                getMyServicesTypes.data?.map((item: any, index: any) => (
                  <div
                    onClick={() => {
                      handleServingTypeSelection(item.id, item.mealtime);
                    }}
                  >
                    {item.mealtime}
                  </div>
                ))
              ) : (
                <p style={{ marginTop: "50%" }}>Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          minHeight: "10px",
          maxHeight: "400px",
          overflowY: "scroll",
          marginTop: "10%",
        }}
      >
        {servingListData ? (
          <div>
            {Array.isArray(getItemsServingTime.data) ? (
              servingTimeData.map((item: any, index: any) => (
                <div
                  style={{
                    width: "92%",
                    height: "120px",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "5%",
                    border: "1px solid grey",
                    boxShadow: "0px 2px 4px grey",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "10%",
                        height: "80px",
                        whiteSpace: "nowrap",
                      }}
                      key={item.itemid}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          float: "left",
                        }}
                      >
                        {item.item}
                      </p>
                      <div style={{ float: "left", display: "flex" }}>
                        <img
                          src={Rupee}
                          width={5}
                          height={10}
                          style={{ marginTop: "5px" }}
                        />
                        <p>{item.price_att}</p>
                      </div>
                      <div
                        style={{
                          marginTop: "60px",
                          borderRadius: "10px  ",
                        }}
                      >
                        <input
                          placeholder="Add Remarks"
                          style={{
                            width: "120px",
                            height: "40px",
                            borderRadius: "5px",
                          }}
                          type="text"
                          value={remarksList[index] || ""}
                          onChange={(event) => {
                            const updatedRemarksList = [...remarksList];
                            updatedRemarksList[index] = event.target.value;
                            setRemarksList(updatedRemarksList);
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ marginLeft: "56%", position: "relative" }}>
                      <img
                        src={veg}
                        width={100}
                        height={70}
                        style={{ borderRadius: "10px" }}
                      />
                      <div>
                        <div
                          style={{
                            position: "absolute",
                            top: "90%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50%",
                            height: "20px",
                            background: selectedItems.includes(index) ? "red" : "white",
                            borderRadius: "6px",
                            boxShadow: "0px 2px 4px grey",
                            zIndex: 1,
                          }}
                        >
                          {
                            item.quantity === 0 ? (
                              <span style={{ fontWeight: "bold" }}
                              onClick={() => {
                                dispatch(
                                  addFoodToMyCart({
                                    ...item,
                                    remarks: remarksList[index],
                                  })
                                );
                                
                                setSelectedItems((prevSelectedItems) => [...prevSelectedItems, index]);
                              }}
                              
                              >ADD</span>
                            ) : null
                          }
                          {
                            item.quantity === 0 ? null : (
                              <span style={{ fontWeight: "bold" }}
                              >-</span>
                            ) 
                          }
                          {
                             item.quantity === 0 ? null : (
                              <span style={{ fontWeight: "bold" }}
                              >{quantity}</span>
                            ) 
                          }
                          {
                             item.quantity === 0 ? null : (
                              <span style={{ fontWeight: "bold" }}
                            >+</span>
                            ) 
                          }


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#4A98CD",
              marginTop: "10% ",
            }}
          >
            Please Select Serving Type
          </p>
        )}
      </div>
      {myCartItems.length > 0 ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "60px",
            marginTop: "8%",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px grey",
            marginLeft: "1%",
          }}
        >
          <div style={{ marginLeft: "10%", marginTop: "6%" }}>
            <p style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>
              <div>{`${myCartItems.length} ITEM${
                myCartItems.length === 1 ? "" : "S"
              } ADDED`}</div>
            </p>
          </div>
          <div
            style={{
              marginLeft: "22%",
              marginTop: "5%",
              height: "26px",
              width: "30%",
              borderRadius: "5px",
              background: "#4A98CD",
            }}
            onClick={goCart}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10%",
                color: "white",
              }}
            >
              View Cart
            </span>
            <Icon name="caret right" inverted color="grey" />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default FoodBeverages;

