import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import Navbar from "../nav-bar";
import { Button, Form, Icon, Label } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./index.css";
import BackgroundImage from "../background";
import Rupee from "../../assets/fb/Indian_Rupee_symbol.svg.png";
import getMyOrderFoodSlice, {
  getMyOrderFood,
  resetStatus,
} from "../../reduxtoolkit/orderFoodSlice";
import { increaseQty } from "../../reduxtoolkit/myFoodSlice";
import { Dimmer, Loader } from "semantic-ui-react";
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
import vegIcon from "../../assets/fb/veg.png";
import nonVeg from "../../assets/fb/nonVeg.png";
import { getOtp } from "../../features/login/authSlice";
import CInput from "../../common/input";
import localForage from "localforage";
import { setDb } from "../../features/login/dbSlice";
import BrandLogo from "../../assets/Logo.png";
import MessageNotification from "../../common/notification";
import Footer from "../footer";
function MyCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["fb", "otp"]);

  const my_cart_items = useAppSelector((state) => state.cart);

  const cartItems: any = useAppSelector((state) => selectAllCartItems(state));
  const db = useAppSelector((state) => state.db.db);

  const {
    status: uStatus,
    message: uMessage,
    data: userData,
  } = useAppSelector((state: RootState) => state.user);

  console.log("DB-Data", db);

  const goBack = () => {
    navigate("/fnb");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  console.log("orderIds:", orderIds); // Check the value of orderIds

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [getstatus, setGetStatus] = useState<
    "idle" | "loading" | "failed" | "succeeded"
  >("idle");

  let unit_id = "";
  const unitCodeStr = localStorage.getItem("unit_code");
  const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
  if (unit_code) {
    unit_id = unit_code.unit;
  }

  useEffect(() => {
    if (userData) {
      openDatabase();
    }
  }, [userData]);

  const openDatabase = async () => {
    const config = {
      name: "ksuvidha",
      version: 1,
      storeName: "checkotp",
      description: "My store with auto-incrementing IDs",
      autoIncrement: true,
    };

    try {
      // Check if the database configuration is stored in local storage
      const storedConfig = localStorage.getItem("dbConfig");
      let database;

      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        database = await localForage.createInstance(parsedConfig);
      } else {
        database = await localForage.createInstance(config);
        // Store the database configuration in local storage
        localStorage.setItem("dbConfig", JSON.stringify(config));
      }

      dispatch(setDb(database));
    } catch (error) {
      console.error("Error creating database:", error);
    }
  };

  useEffect(() => {
    if (db && userData) {
      addData(userData);
    }
  }, [db, userData]);

  async function addData(userData: any) {
    console.log("USERDATA::", userData);
    try {
      await db.setItem(userData.ip_no, userData.otp);
      console.log("Data added to store");
    } catch (error) {
      console.log("Error adding data to store", error);
    }
  }

  const handleProceedToPay = async () => {
    setIsLoading(true); // Set isLoading to true
    await dispatch(
      getOtp({
        mobile_number: localStorage.getItem("mobile_number"),
        unit_id: unit_id,
      })
    );
    setGetStatus("succeeded");
    setOtpMessage("OTP sent successfully");
    setShowOtpInput(true);
  };

  const handleOtpValidation = async (data: any) => {
    setIsLoading(false)
    setGetStatus("idle");
    const otp = await db.getItem(userData.ip_no);
    console.log("OTP", otp);
    if (otp === null || otp != data.otp) {
      setGetStatus("failed");
      setOtpMessage("Invalid OTP");
      setIsLoading(true);
      setIsInvalidOtp(false);
    } else {
      setOtpMessage("Otp Sent");
      setGetStatus("succeeded");
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
      setOtpMessage("OTP sent successfully"); // Update otpMessage here
      setGetStatus("loading"); // Update getstatus here
      await dispatch(getMyOrderFood(selectedItems));
      dispatch(clearCart());
      navigate("/fnb");
      setIsLoading(false);
      setOtp("");
      setShowOtpInput(false);
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

  const resendOTP = async () => {
    setGetStatus("idle");
    await dispatch(
      getOtp({
        mobile_number: localStorage.getItem("mobile_number"),
        unit_id: unit_id,
      })
    );
    setGetStatus("succeeded");
    console.log("GET STATUS::", getstatus);
    setOtpMessage("OTP sent successfully");
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
          marginTop: "-10%",
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
      <div
        style={{
          minHeight: "10px",
          maxHeight: "300px",
          overflowY: "scroll",
          marginTop: "-5%",
        }}
      >
        {cartItems?.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              //width: "94%",
              height: "130px",
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
                        height={12}
                        style={{
                          marginTop: "-6%",
                          padding: "1%",
                          marginLeft: "22%",
                        }}
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
                    {/* <div style={{ marginTop: "10%"}}>
                      <input
                        placeholder="Enter Remarks"
                        style={{
                          width: "286px",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        type="text"
                        value={item.other_remark || ""}
                        onChange={(event) => onAddRemark(event, item.itemid)}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "25%", marginLeft: '-10%', width: '560px'}}>
                      <input
                        placeholder="Enter Remarks"
                        style={{
                          //width: "286px",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        type="text"
                        value={item.other_remark || ""}
                        onChange={(event) => onAddRemark(event, item.itemid)}
                      />
                    </div>
              <div
                style={{
                  marginTop: "50px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    background: "#0075AD",
                    padding: "10px",
                    width: "80px",
                    height: "25px",
                    borderRadius: "25px",
                    marginTop: "-32%",
                    marginLeft: "22%",
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
                    <div style={{ marginTop: "-15%", color: "white" }}>
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
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-5%",
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
          marginTop: "-2%",
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
      {/* <div
        style={{
          width: "98%",
          height: "34px",
          background: "#4A98CD",
          borderRadius: "6px",
          marginLeft: "2%",
        }}
        onClick={() => cartItems.length > 0 && handleProceedToPay()}
      > */}
        {isLoading ? (
           //<p style={{ padding: "2%", color: "white" }}>{t("add_to_my_bill")}</p>
    <Loader active={isLoading} inline="centered" />
  ) : (
    //<Loader active={isLoading} inline="centered" />
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
  )}
      {/* </div> */}
      {showOtpInput && (
        <Dimmer active style={{ height: "100%" }}>
          <div style={{ background: "white", borderRadius: "25px" }}>
            <div style={{ marginTop: "4%" }}>
              <img src={BrandLogo} width={150} height={150} />
            </div>
            <MessageNotification
              message={otpMessage}
              status={getstatus}
              theme="dark"
              autoClose={5000}
            />
            <Form
              onSubmit={handleSubmit(handleOtpValidation)}
              style={{
                fontSize: "1.2rem",
                maxWidth: "340px",
                width: "100%",
                margin: "0 auto",
                padding: "1rem",
              }}
            >
              <CInput
                placeholder={t("Enter OTP")}
                register={register}
                label="otp"
                required={true}
                size="large"
                error={errors["otp"] ? true : false}
                fluid={true}
                loading={false}
                type="number"
                minLength={6}
                maxLength={6}
              />
              {errors.otp?.type === "required" && (
                <Label color="orange" pointing prompt>
                  {t("otp:otp_is_required")}
                </Label>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25px",
                  padding: "3px",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  color: "#0075ad",
                }}
              >
                {t("otp:Dint_Receive_A_Otp")}
                <span
                  style={{
                    textDecoration: "underline",
                    padding: "5px",
                    fontWeight: "bold",
                    color: "#0075AD",
                  }}
                  onClick={resendOTP}
                >
                  {t("otp:Resend_Otp")}
                </span>
              </div>
              <div>
              {isLoading ? 
                         <Button
                         type="submit"
                         loading={false}
                         style={{
                           borderRadius: "100px",
                           textAlign: "center",
                           fontWeight: "lighter",
                           fontSize: "1.4rem",
                           background: "#0075ad",
                           width: "100%",
                           maxWidth: "300px", 
                           margin: "0 auto",
                         }}
                       >
                         <h1 style={{ color: "white", fontSize: "1.2rem" }}>
                           {t("otp:Submit")}
                         </h1>
                       </Button>
                
              : (
                <Loader active={isLoading} inline="centered" />
              )}
              </div>
            </Form>
          </div>
        </Dimmer>
      )}
      <div style={{marginTop: '-30%', position: 'fixed'}}>
      <Footer />
      </div>
      <BackgroundImage />
    </div>
  );
}

export default MyCart;
