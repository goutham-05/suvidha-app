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

import getMyOrderFoodSlice, {
  getMyOrderFood,
  resetStatus,
} from "../../reduxtoolkit/orderFoodSlice";
import { increaseQty } from "../../reduxtoolkit/myFoodSlice";
import { Dimmer } from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";
import order from "../../../src/assets/fb/orderplaced.png";
import { clearCart } from "../../reduxtoolkit/myCartSlice";
import {
  decrementCartItem,
  incrementCartItem,
  selectAllCartItems,
  updateCartItem,
} from "../../reduxtoolkit/myCartSlice";
import { useTranslation } from "react-i18next";
import { Loader } from "semantic-ui-react";
import vegIcon from "../../assets/fb/veg.png";
import nonVeg from "../../assets/fb/nonVeg.png";

function MyCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["fb"]);

  const my_cart_items = useAppSelector((state) => state.cart);

  const cartItems: any = useAppSelector((state) => selectAllCartItems(state));

  console.log("Item TYpe", cartItems.item_type);

  const goBack = () => {
    navigate("/fnb");
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

  const {
    data: orderIds,
    status,
    error,
    message,
  } = useAppSelector((state) => state.order);

  const handleProceedToPay = async () => {
    const unitIdString = localStorage.getItem("unit_code");
    const unitIdObject = unitIdString ? JSON.parse(unitIdString) : null;
    const unitId = unitIdObject?.unit;

    const selectedItems = {
      unit_id: unitId,
      patient_ipno: localStorage.getItem("admissionno"),
      delivery_address: "",
      serving_time: localStorage.getItem("serving time"),
      my_cart_items: cartItems.map((item: any) => ({
        itemid: item.itemid,
        remarkid: [],
        other_remark: item.other_remark || "",
        quantity: item.quantity,
      })),
    };
    // console.log(selectedItems);
    // return;

    try {
      const response = await dispatch(getMyOrderFood(selectedItems));
      //const orderIds = response.data; // Replace with the actual property containing the order ID from the response

      // Retrieve existing order history from local storage
      const existingArrayString = localStorage.getItem("orderHistory");
      const existingArray = existingArrayString
        ? JSON.parse(existingArrayString)
        : [];

      // Add new order data to the existing array
      const updatedArray = [...existingArray, orderIds];

      // Store the updated array in local storage
      localStorage.setItem("orderHistory", JSON.stringify(updatedArray));

      setTimeout(() => {
        dispatch(clearCart());
        localStorage.removeItem("serving time");
        localStorage.removeItem("servingType");
      }, 120000);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddRemark = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, itemId: any) => {
      const value = e.target.value;

      const updatedMenu = cartItems.map((cartItems: any) =>
        cartItems.itemid === itemId
          ? { ...cartItems, other_remark: value, remarkId: undefined }
          : {
              ...cartItems,
              remarkId: undefined,
            }
      );

      const updatedCartItem = updatedMenu?.find(
        (item: any) => item.itemid === itemId
      );
      dispatch(updateCartItem(updatedCartItem));
    },
    [cartItems]
  );

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(clearCart());
      localStorage.removeItem("serving time");
      localStorage.removeItem("servingType");
      navigate("/fnb");
    }
  }, [status, dispatch]);

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
          {t("item(s)_added")}
        </div>
        <div style={{ width: "35%", border: "1px solid black" }} />
      </div>
      {cartItems?.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            width: "94%",
            height: "124px",
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
                marginLeft: "10px",
                marginTop: "5%",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {item.item_type === 0 || item.item_type === 2 ? (
                  <img src={vegIcon} width={30} height={30} />
                ) : (
                  <img src={nonVeg} width={20} height={20} />
                )}
                {item.item}
                <div>
                  <div>
                    <img
                      src={Rupee}
                      width={8}
                      height={10}
                      style={{ marginTop: "1px", padding: "1%" }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        marginTop: "10%",
                        marginBottom: "1%",
                      }}
                    >
                      {item.price_att}
                    </span>
                  </div>
                  <div style={{ marginTop: "10%" }}>
                    <input
                      placeholder="Enter Remarks"
                      style={{
                        width: "302px",
                        height: "40px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      value={item.other_remark || ""}
                      onChange={(event) => onAddRemark(event, item.itemid)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "56%" }}>
              <div>
                <div
                  style={{
                    width: "20%",
                    height: "23px",
                    background: "white",
                    borderRadius: "6px",
                    position: "absolute",
                    marginTop: "5%",
                    boxShadow: "0px 2px 4px grey",
                    border: "1px solid black",
                  }}
                >
                  {item.quantity === 0 ? (
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        pointerEvents: "auto",
                      }}
                      onClick={() => dispatch(incrementCartItem(item))}
                    >
                      {t("add")}
                    </span>
                  ) : (
                    <div>
                      <span
                        style={{ fontWeight: "bold", marginRight: "20%" }}
                        onClick={() => dispatch(decrementCartItem(item))}
                      >
                        -
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {item.quantity}
                      </span>
                      <span
                        style={{ fontWeight: "bold", marginLeft: "20%" }}
                        onClick={() => dispatch(incrementCartItem(item))}
                      >
                        +
                      </span>
                    </div>
                  )}
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
          {t("bill_summary")}
        </div>
        <div style={{ width: "35%", border: "1px solid black" }} />
      </div>

      <div
        style={{
          width: "94%",
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
              whiteSpace: "nowrap",
              marginLeft: "5%",
              marginTop: "2%",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                float: "left",
                marginTop: "20%",
              }}
            >
              {t("grand_total")}
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
        onClick={() => cartItems.length > 0 && handleProceedToPay()}
      >
        <p style={{ padding: "2%", color: "white" }}>{t("add_to_my_bill")}</p>
      </div>
      {status === "loading" && (
        <div>
          <Dimmer active>
            <p style={{ marginTop: "10%", fontSize: "20px" }}>Loading</p>
            <Loader />
          </Dimmer>
        </div>
      )}
      {status === "succeeded" && (
        <Dimmer active>
          <div>
            <img src={order} width={60} height={60} />
            <p style={{ marginTop: "10%", fontSize: "20px" }}>Order Placed</p>
          </div>
        </Dimmer>
      )}
      {status === "failed" && (
        <div>
          <Dimmer active>
            <p style={{ marginTop: "10%", fontSize: "20px" }}>Error</p>
          </Dimmer>
        </div>
      )}
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
