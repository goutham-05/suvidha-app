import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import Navbar from "../nav-bar";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import BackgroundImage from "../background";
import Rupee from "../../assets/fb/Indian_Rupee_symbol.svg.png";
import { addToCart, clearCart } from "../../reduxtoolkit/myCartItemsSlice";
import myCartSlice, {
  addFoodToMyCart,
  deleteMyCartItems,
  deleteSingleCartItem,
  removeMyCartItem,
} from "../../reduxtoolkit/myCartSlice";
import getMyOrderFoodSlice, {
  getMyOrderFood,
} from "../../reduxtoolkit/orderFoodSlice";
import { increaseQty } from "../../reduxtoolkit/myFoodSlice";
import { Dimmer } from "semantic-ui-react";
import { useEffect, useState } from "react";
import order from "../../../src/assets/fb/orderplaced.png";

interface Item {
  itemid: number;
  mealtype_id: number;
  price_att: number;
  item_type: number;
  item: string;
  counts: number;
  quantity: number;
  unit_id: string | null;
  type:number;
  //patient_ipno:string;
  delivery_address:string | null;
  //serving_time: string | number;
  my_cart_items: object;
  selectedItems: object;
}
function MyCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const my_cart_items = useAppSelector((state) => state.cart);
  const foodData = useAppSelector((state) => state.order);

  const goBack = () => {
    navigate("/food&Beverages");
  };

  const subTotal = () => {
    let subTotalValue = 0;
    my_cart_items.map((item) => {
      subTotalValue = subTotalValue + item.quantity * item.price_att;
    });
    return subTotalValue;
  };

  const grandTotal = () => {
    let subTotalValue = 0;

    my_cart_items.map((item) => {
      subTotalValue = subTotalValue + item.quantity * item.price_att;
    });
    if (subTotalValue > 0) {
      return subTotalValue;
    } else {
      return subTotalValue;
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const foodOrderModal = () => {
        setModalOpen(false);
    
    const timeout = setTimeout(() => {
      setModalOpen(false);
      navigate("/food&Beverages");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }


  const handleProceedToPay = () => {
    const unitIdString = localStorage.getItem("unit_code");
    const unitIdObject = unitIdString ? JSON.parse(unitIdString) : null;
    const unitId = unitIdObject.unit;

    const selectedItems = {
      unit_id: unitId,
      patient_ipno: localStorage.getItem("admissionno"),
      delivery_address: "",
      serving_time: localStorage.getItem("serving time"),
      my_cart_items,
    };
    console.log('selectedItems',selectedItems);
    dispatch(getMyOrderFood(selectedItems));
    dispatch(deleteMyCartItems(selectedItems));
    foodOrderModal();
    setModalOpen(true);
    localStorage.removeItem('serving time');
  };

  return (
    <div>
      <Navbar />
      <div
        onClick={goBack}
        style={{ marginBottom: "5%", marginRight: "190%", marginTop: "6%" }}
      >
        <Icon disabled name="arrow left" size="large" />
        <div style={{ display: "flex", alignItems: "center" }}></div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "32%", border: "1px solid black" }} />
        <div
          style={{
            padding: "15px",
            whiteSpace: "nowrap",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ITEM(S) ADDED
        </div>
        <div style={{ width: "35%", border: "1px solid black" }} />
      </div>
      {my_cart_items.map((item, index) => (
        <div
          key={index}
          style={{
            width: "94%",
            height: "70px",
            borderRadius: "10px",
            margin: "5%",
            border: "1px solid grey",
            boxShadow: "0px 2px 4px grey",
            marginLeft: "4%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "10%",
                height: "80px",
                whiteSpace: "nowrap",
                marginLeft: "20px",
                marginTop: "5%",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  float: "left",
                }}
              >
                {item.item}
                <div style={{ float: "left", display: "flex" }}>
                  <img
                    src={Rupee}
                    width={8}
                    height={10}
                    style={{ marginTop: "7px", padding: "1%" }}
                  />
                  <span style={{ fontSize: "14px", marginTop: "4%" }}>
                    {item.price_att}
                  </span>
                </div>
              </p>
            </div>
            <div style={{ marginLeft: "56%" }}>
              <div>
                <div
                  style={{
                    width: "20%",
                    height: "20px",
                    background: "white",
                    borderRadius: "6px",
                    position: "absolute",
                    marginTop: "5%",
                    boxShadow: "0px 2px 4px grey",
                    border: "1px solid black",
                  }}
                >
                  {item.quantity == 0 ? (
                    <span style={{ fontWeight: "bold" }}>ADD</span>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "-4%",
                    }}
                  >
                    {item.quantity == 0 ? null : (
                      <span
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(removeMyCartItem(item));
                          } else {
                            dispatch(deleteSingleCartItem(item.itemid));
                          }
                        }}
                      >
                        -
                      </span>
                    )}
                    {item.quantity == 0 ? null : (
                      <span style={{ fontWeight: "bold" }}>
                        {item.quantity}
                      </span>
                    )}
                    {item.quantity == 0 ? null : (
                      <span
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                          dispatch(addFoodToMyCart(item));
                          dispatch(increaseQty(item.itemid));
                        }}
                      >
                        +
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "32%", border: "1px solid black" }} />
        <div
          style={{
            padding: "15px",
            whiteSpace: "nowrap",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          BILL SUMMARY
        </div>
        <div style={{ width: "35%", border: "1px solid black" }} />
      </div>

      <div
        style={{
          width: "94%",
          height: "100px",
          borderRadius: "10px",
          margin: "5%",
          border: "1px solid grey",
          boxShadow: "0px 2px 4px grey",
          marginLeft: "4%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "10%",
              height: "56px",
              whiteSpace: "nowrap",
              marginLeft: "20px",
              marginTop: "3%",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                float: "left",
              }}
            >
              Subtotal
            </p>
          </div>
          <div style={{ marginLeft: "66%", marginTop: "2%" }}>
            <div>
              <img
                src={Rupee}
                width={10}
                height={14}
                style={{ padding: "2%" }}
              />
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {subTotal()}
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "-4%",
                }}
              >
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", border: "0.9px solid grey" }}></div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "10%",
              height: "60px",
              whiteSpace: "nowrap",
              marginLeft: "5%",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                float: "left",
              }}
            >
              Grand Total
            </p>
            <div style={{ marginLeft: "56%" }}>
              <div>
                <div
                  style={{
                    width: "20%",
                    height: "20px",
                    borderRadius: "6px",
                    position: "absolute",
                    marginTop: "1%",
                    marginLeft: "52%",
                  }}
                >
                  <img
                    src={Rupee}
                    width={10}
                    height={14}
                    style={{ marginTop: "-5%", padding: "1%" }}
                  />
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {grandTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "98%",
          height: "34px",
          background: "#4A98CD",
          borderRadius: "6px",
          marginLeft: "2%",
        }}
        onClick={handleProceedToPay}
      >
        <p style={{ padding: "2%", color: "white" }}>Proceed to Pay</p>
      </div>
      <Dimmer active={modalOpen}>
        <img src={order} width={60} height={60} />
        <p style={{marginTop: '10%', fontSize: '20px'}}>Order Placed</p>
      </Dimmer>
      <BackgroundImage />
    </div>
  );
}

export default MyCart;



  //  const handleProceedToPay = () => {

  //   const selectedItems = {
  //     "unit_id": localStorage.getItem('unit_code'),
  //     "patient_ipno": localStorage.getItem('admissionno'),
  //     "delivery_address": "",
  //     "serving_time": localStorage.getItem('serving time'),
  //   my_cart_items,
  //   };

  //   console.log("selected items:::",selectedItems);

  //   dispatch(addToCart(selectedItems));
  //   console.log(selectedItems);
  // };