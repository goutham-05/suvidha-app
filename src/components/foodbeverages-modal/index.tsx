import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../nav-bar";
import { Icon, Input } from "semantic-ui-react";
import "./index.css";
import { useFetcher, useNavigate } from "react-router-dom";
import veg from "../../assets/FandB.svg";
import cart from "../../assets/fb/shopping-bag.png";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import {
  decrementCartItem,
  incrementCartItem,
  updateCartItem,
} from "../../reduxtoolkit/myCartSlice";
import { getMyServingTime } from "../../reduxtoolkit/getServingTimesSlice";
import { getItemServiceTime } from "../../reduxtoolkit/getItemServSlice";
import { clearCart } from "../../reduxtoolkit/myCartSlice";
import { useTranslation } from "react-i18next";
import MessageNotification from "../../common/notification";
import order from "../../reduxtoolkit/orderFoodSlice";
import { getItemsList } from "../../reduxtoolkit/getItemsListSlice";
import { orderHistoryList } from "../../reduxtoolkit/orderHistorySlice";
import Footer from "../footer";
import BackgroundImage from "../background";
import localForage from "localforage";
import { setorderDb } from "./orderDBSlice";
import { useLocation } from "react-router-dom";


interface Item {
  title: string;
  type: string;
  rate: number;
  image: string;
  qty: number;
  category: string;
  selectedServingType: string;
}

const servingTypeData = [
  {
      "id": 1,
      "mealtime": "Pre Breakfast",
      "Fromtime": "06:00:00",
      "Totime": "07:30:00",
      "status": 1
  },
  {
      "id": 2,
      "mealtime": "Breakfast",
      "Fromtime": "07:30:00",
      "Totime": "08:19:00",
      "status": 1
  },
  {
      "id": 3,
      "mealtime": "Post Dinner",
      "Fromtime": "21:30:00",
      "Totime": "09:00:00",
      "status": 1
  },
  {
      "id": 4,
      "mealtime": "Lunch",
      "Fromtime": "12:30:00",
      "Totime": "13:00:00",
      "status": 1
  },
  {
      "id": 5,
      "mealtime": "Snacks",
      "Fromtime": "15:30:00",
      "Totime": "16:30:00",
      "status": 1
  },
  {
      "id": 6,
      "mealtime": "Dinner",
      "Fromtime": "19:30:00",
      "Totime": "20:00:00",
      "status": 1
  },
  {
      "id": 7,
      "mealtime": "Soup Service",
      "Fromtime": "17:30:00",
      "Totime": "22:30:00",
      "status": 1
  }
]

const data = [
  {
    itemId: 1,
    title: "all",
    category: "All",
    status: false,
  },
  {
    itemId: 2,
    title: "veg",
    category: "Veg",
    status: false,
  },
  {
    itemId: 3,
    title: "non_veg",
    category: "Non Veg",
    status: false,
  },
  {
    itemId: 4,
    title: "drinks_juices",
    category: "Drinks",
    status: false,
  },
  {
    itemId: 5,
    title: "Best Seller",
    category: "Best Seller",
    status: false,
  },
];

function FoodBeverages() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation(["fb"]);

  const {
    data: foodItemsList,
    status: foodItemsStatus,
    error,
    message: foodItemsMsg,
  } = useAppSelector((state) => state.getItemServiceTime);

  const getItemsServingTime = useAppSelector(
    (state) => state.getMyServingTime
  );

  useEffect(() => {
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      setUnitId(unit_code.unit);

      dispatch(
        getMyServingTime({
          unit_id: unit_code.unit,
        })
      );
    }
  }, [dispatch]);

  const cartItems = useAppSelector((state) => state.cart);
  console.log("CartItems", cartItems);

  const { status, message } = useAppSelector((state) => state.order);

  const { status: userStatus, data: userData } = useAppSelector(
    (state: RootState) => state.user
  );

  const [isOpen, setIsOpen] = useState(false);
  const [remarksList, setRemarksList] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [unitId, setUnitId] = useState("");

  console.log("Menu Items", menuItems?.length);

  useEffect(() => {
    const hasQuantity = cartItems?.some((item) => item.quantity > 0);
    const updatedItems = hasQuantity
      ? menuItems?.map((item: any) => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem.itemid === item.itemid
          );
          console.log(cartItem);

          if (cartItem) {
            return {
              ...item,
              quantity: cartItem.quantity,
              other_remark: cartItem.other_remark,
              remarkId: undefined,
            };
          }
          return item;
        })
      : [];

    console.log("hasQuantity", hasQuantity);

    if (updatedItems?.length > 0) {
      setMenuItems(updatedItems);
      console.log("am here in items");
    } else {
      console.log("itemms");
      setMenuItems(
        foodItemsList?.map((item: any) => ({
          ...item,
          quantity: 0,
        }))
      );
    }
    console.log("in here");
  }, [cartItems, foodItemsList]);

  const goBack = () => {
    dispatch(clearCart());
    navigate("/services");
    localStorage.removeItem("servingType");
    localStorage.removeItem("serving time");
  };

  const goCart = () => {
    navigate("/cart");
  };

  const onAddCartItem = useCallback(
    (index: number, newItem: any) => {
      const updatedItems = [...menuItems];
      updatedItems[index] = newItem;

      setMenuItems(updatedItems);
      dispatch(incrementCartItem(newItem));
    },
    [dispatch, menuItems]
  );

  const onRemoveCartItem = useCallback(
    (index: number, newItem: any) => {
      const updatedItems = [...menuItems];
      updatedItems[index] = newItem;
      setMenuItems(updatedItems);
      dispatch(decrementCartItem(newItem));
    },
    [dispatch, menuItems]
  );

  const onSearchMenuItems = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      console.log(value);

      if (value) {
        const filteredItems = foodItemsList?.filter((item: any) =>
          item.item.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredItems);

        setMenuItems(filteredItems);
      } else {
        setMenuItems(foodItemsList);
      }
    },
    [menuItems, foodItemsList]
  );

  
  ////////////////////////////////////
  const [allItems, setAllItems] = useState<any[]>([]);
  const [vegItems, setVegItems] = useState<any[]>([]);
  const [nonVegItems, setNonVegItems] = useState<any[]>([]);
  const [drinksItems, setDrinksItems] = useState<any[]>([]);
  const [bestItems,setBestItems] = useState<any[]>([]);

  useEffect(() => {
    setAllItems(foodItemsList || []);
  }, [foodItemsList]);


  useEffect(() => {
    // Update the menu items based on the selected category
    let updatedItems;
    switch (selectedCategory) {
      case "All":
        updatedItems = allItems.map((item: any) => ({
          ...item,
          quantity:
            cartItems.find((cartItem) => cartItem.itemid === item.itemid)
              ?.quantity || 0,
        }));
        break;
      case "Veg":
        updatedItems = vegItems;
        break;
      case "Non Veg":
        updatedItems = nonVegItems;
        break;
      case "Drinks":
        updatedItems = drinksItems;
        break;
      case "Best Seller":
        updatedItems = bestItems;
        break;
      default:
        updatedItems = allItems;
        break;
    }
    setMenuItems(updatedItems);
  }, [
    selectedCategory,
    allItems,
    vegItems,
    nonVegItems,
    drinksItems,
    cartItems,
  ]);

  const onSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchInput("");
  }, []);
  

  useEffect(() => {
    const filteredItems = foodItemsList?.filter(
      (item: any) => item.item_type === 0
    );

    setVegItems((_prevItems) =>
      filteredItems?.map((item: any) => ({
        ...item,
        quantity:
          cartItems.find((cartItem) => cartItem.itemid === item.itemid)
            ?.quantity || 0,
      }))
    );

    const nonVegfilteredItems = foodItemsList?.filter(
      (item: any) => item.item_type === 1
    );

    setNonVegItems((_prevItems) =>
      nonVegfilteredItems?.map((item: any) => ({
        ...item,
        quantity:
          cartItems.find((cartItem) => cartItem.itemid === item.itemid)
            ?.quantity || 0,
      }))
    );

    const drinksfilteredItems = foodItemsList?.filter(
      (item: any) => item.item_type === 2
    );

    setDrinksItems((_prevItems) =>
      drinksfilteredItems?.map((item: any) => ({
        ...item,
        quantity:
          cartItems.find((cartItem) => cartItem.itemid === item.itemid)
            ?.quantity || 0,
      }))
    );


    if (!foodItemsList || !Array.isArray(foodItemsList)) {
      return;
    }
    
    const sortedItems = [...foodItemsList].sort((a, b) => b.counts - a.counts);
    console.log('sortedItems', sortedItems)
    const bestItems = sortedItems.slice(0, 84);
    
    setBestItems((prevItems) =>
      bestItems.map((item) => ({
        ...item,
        quantity: cartItems.find((cartItem) => cartItem.itemid === item.itemid)?.quantity || 0,
      }))
    );
    


  }, [foodItemsList, cartItems]);

  const orderList = useAppSelector((state) => state.orderHistory);

  const [orderIdArray, setOrderIdArray] = useState<string[]>([]);

  const {
    data: orderIds,
    status: orderStatus,
    message: orderMessage,
  } = useAppSelector((state) => state.order);

  useEffect(() => {
    // Step 4: Update the array whenever orderIds data changes
    setOrderIdArray(orderIds);
  }, [orderIds]);

  const addNewOrderId = (newOrderId: any) => {
    // Step 5: Add new orderId to the array
    setOrderIdArray([...orderIdArray, newOrderId]);
    console.log("orderIdArray", orderIdArray);
  };



  /////////////////////////////////////////

  const orderDB = useAppSelector((state) => state.orderdb);

  async function openDatabase() {
    const config = {
      name: "ksuvidha-orders",
      version: 1,
      storeName: "checkorders",
      description: "My store with auto-incrementing orderIDs",
      autoIncrement: true,
    };
    const database = await localForage.createInstance(config);
    dispatch(setorderDb(database));
  }



  useEffect(() => {
    openDatabase();
  }, []);

  useEffect(() => {
    if (userData) {
      openDatabase();
    }
  }, [status]);

  useEffect(() => {
    addData(userData);
  }, [orderDB, userData]);

  async function addData(userData: any) {
    try {
      const existingOrderIds = await orderDB.orderID.getItem(userData.ip_no);
      console.log("existingOrderIds", existingOrderIds);

      let updatedOrderIds = [];
      if (orderIds !== null) {
        if (existingOrderIds) {
          updatedOrderIds = existingOrderIds.concat([orderIds]);
        } else {
          updatedOrderIds = [orderIds];
        }
      } else {
        // Skip adding null values to the database
        console.log("Null values not added to store");
        return;
      }

      await orderDB.orderID.setItem(userData.ip_no, updatedOrderIds);
      console.log("Data added to store");
    } catch (error) {
      console.log("Error adding data to store", error);
    }
  }



  const orderHistoryButton = () => {
    navigate("/order-history");
  };

  ////////////////////////////////////////////////////
  // const [selectedServingType, setSelectedServingType] = useState(() => {
  //   const servingType = localStorage.getItem("servingType");
  //   return servingType ? servingType : "Serving Type";
  // });
  // ...
  
  const [selectedServingType, setSelectedServingType] = useState(() => {
    const servingType = localStorage.getItem("servingType");
    const isPageReloaded = performance.navigation.type === 1; // Check if page is reloaded
  
    return isPageReloaded ? "Serving Type" : servingType;
  });
  
  
  

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleServingTypeSelection = useCallback(
    (selectedType: string, selectedServingType: string) => {
      if (selectedType && unitId) {
        console.log(selectedType);

        dispatch(
          getItemServiceTime({
            unit_id: unitId,
            servingtime_id: selectedType.toString(),
          })
        );
      }
      
      setSelectedServingType(selectedServingType);
      localStorage.setItem("serving time", selectedType);
      localStorage.setItem("servingType", selectedServingType);
      setIsOpen((prev) => !prev);
    },
    [unitId, dispatch, setIsOpen, setSelectedServingType]
  );

  return (
    <>
      <MessageNotification
        message={message}
        status={status}
        theme="dark"
        autoClose={5000}
      />
      <Navbar />
      <div
        style={{
          marginTop: "6%",
          display: "flex",
          marginBottom: "5%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => goBack()}
        >
          <Icon disabled name="arrow left" size="large" />
        </div>
        <div
          style={{ marginLeft: "auto" }}
          onClick={() => orderHistoryButton()}
        >
          <p
            style={{
              whiteSpace: "nowrap",
              color: "#0075AD",
              fontSize: "16px",
              fontWeight: "bold",
              //textDecoration: "underline",
            }}
          >
            {t("order_history")}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "4%" }}>
        <input
          placeholder={t("search_menu...")}
          style={{ marginBottom: "10px", height: "40px", width: "80%" }}
          value={searchInput}
          onChange={onSearchMenuItems}
        />
        <div
          style={{
            width: "60px",
            height: "40px",
            border: "1px solid #0075ad",
            background: "#0075ad",
            borderRadius: "25px",
            marginLeft: "4%",
          }}
          onClick={() => cartItems.length > 0 && goCart()}
        >
          <img src={cart} width={26} height={26} style={{ marginTop: "8%" }} />
          {cartItems.length > 0 ? (
            <div
              style={{
                width: "6%",
                height: "20px",
                borderRadius: "20px",
                marginLeft: "8%",
                background: "white",
                position: "absolute",
                marginTop: "-8%",
                color: "black",
              }}
            >
              <p>{cartItems.length}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "4%",
          width: "100%",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
          <div
            style={{
              minWidth: "20%",
              padding: "2%",
              fontSize: "12px",
              background: "white",
              boxShadow: "0px 2px 4px grey",
              borderRadius: "25px",
              whiteSpace: "nowrap",
              marginBottom: "4%",
              backgroundColor:'#0075ad'
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <p style={{color: 'white'}}>
              {selectedServingType}
              {isOpen ? <Icon name="caret up" /> : <Icon name="caret down" />}
            </p>
          </div>
          {isOpen && (
             <div
             style={{
               position: "absolute",
               zIndex: 1,
               background: "white",
               boxShadow: "0px 2px 4px grey",
               borderRadius: "10px",
               marginTop: "35px",
               width: "45%",
               height: "250px",
               padding: "20px",
               marginLeft: '-35%'
             }}
           >
             <div
               style={{ display: "flex", flexDirection: "column", gap: "10px" }}
             >
               {Array.isArray(getItemsServingTime.data) ? (
                 getItemsServingTime.data?.map((item: any, _index: any) => {
                   const disabled =
                   item.Totime.localeCompare(currentTime, undefined, {
                     numeric: true,
                   }) < 0
                   ||
                   item.Totime.localeCompare(currentTime, undefined, {
                     numeric: true,
                   }) > 0 && item.Fromtime.localeCompare(currentTime, undefined, {
                     numeric: true,
                   }) < 0;
                 
 
                     const optionStyle = {
                       cursor: disabled ? "not-allowed" : "pointer",
                       color: disabled ? "grey" : "inherit",
                     };
 
                   return (
                     <div
                       onClick={() => {
                         if (!disabled) {
                           handleServingTypeSelection(item.id, item.mealtime);
                         }
                       }}
                       key={item.id}
                       style={optionStyle}
                     >
                       {item.mealtime}
                     </div>
                   );
                 })
               ) : (
                 <p style={{ marginTop: "50%" }}>Loading...</p>
               )}
             </div>
           </div>
          )}
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: "20%",
              padding: "2%",
              fontSize: "12px",
              background: "white",
              boxShadow: "0px 2px 4px grey",
              borderRadius: "25px",
              whiteSpace: "nowrap",
              marginBottom: "4%",
              backgroundColor:
                selectedCategory === item.category
                  ? item.category === "Veg"
                    ? "green"
                    : item.category === "Non Veg"
                    ? "#9d380c"
                    : item.category === "Drinks"
                    ? "#e53e6c"
                    : item.category === "All"
                    ? "#0075AD"
                    : item.category === "Best Seller"
                    ? "#0075AD"
                    :""
                  : "",
              color: selectedCategory === item.category ? "white" : "black",
            }}
            onClick={() => onSelectCategory(item.category)}
          >
            <div>{t(item.title)}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          minHeight: "10px",
          maxHeight: "384px",
          overflowY: "scroll",
          marginTop: "2%",
        }}
      >
        {localStorage.getItem("serving time") ? (
        <div>
          {Array.isArray(menuItems) ? (
            menuItems.length > 0 ? (
              menuItems?.map((item: any, index: any) => (
                <div
                  key={index}
                  style={{
                    width: "91%",
                    height: "115px",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "4%",
                    // margin: "5%",
                    border: "1px solid grey",
                    boxShadow: "0px 2px 4px grey",
                    background: "white",
                    marginLeft: "2%",
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
                          fontSize: "12px",
                          color: "black",
                          width: "200px",
                          whiteSpace: "normal",
                          textAlign: "left",
                        }}
                      >
                        {item.item}
                      </p>
                      <div
                        style={{
                          float: "left",
                          display: "flex",
                          marginTop: "-30%",
                        }}
                      >
                        <Icon color="black" name="rupee" />
                        <p
                          style={{
                            color: "black",
                            marginLeft: "-10%",
                            fontWeight: "bold",
                          }}
                        >
                          {item.price_att}
                        </p>
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
                            width: "100px",
                            height: "30px",
                            borderRadius: "25px",
                            marginTop: "-50%",
                          }}
                        >
                          {item.quantity === 0 ? (
                            <p
                              style={{
                                marginTop: "-5%",
                                fontWeight: "bold",
                                color: "white",
                                pointerEvents: "auto",
                              }}
                              onClick={() =>
                                onAddCartItem(index, {
                                  ...item,
                                  quantity: item.quantity + 1,
                                })
                              }
                            >
                              {t("add")}
                            </p>
                          ) : (
                            <div style={{ marginTop: "-8%" }}>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  marginRight: "20px",
                                  color: "white",
                                }}
                                onClick={() =>
                                  onRemoveCartItem(index, {
                                    ...item,
                                    quantity: item.quantity - 1,
                                  })
                                }
                              >
                                -
                              </span>
                              <span
                                style={{ fontWeight: "bold", color: "white" }}
                              >
                                {item.quantity}
                              </span>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: "20px",
                                  color: "white",
                                }}
                                onClick={() =>
                                  onAddCartItem(index, {
                                    ...item,
                                    quantity: item.quantity + 1,
                                  })
                                }
                              >
                                +
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "57%",
                        position: "relative",
                        marginTop: "0.5%",
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          width={100}
                          height={90}
                          style={{ marginLeft: "-26%" }}
                        />
                      ) : (
                        <img
                          src={veg}
                          width={100}
                          height={90}
                          style={{
                            borderRadius: "10px",
                          }}
                        />
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#4A98CD",
                  marginTop: "10%",
                }}
              >
                Please Select Serving Type
              </p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>) :  (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#4A98CD",
                  marginTop: "10%",
                }}
              >
                Please Select Serving Type
              </p>
            )
}
      </div>
      {/* <div style={{ marginTop: "-45%", position: "sticky" }}>
        <Footer />
      </div> */}
      <BackgroundImage />
      <div style={{ marginTop: "-48%", position: "sticky" }}>
        <Footer />
      </div>
    </>
    
  );
}

export default FoodBeverages;
