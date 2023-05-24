import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../nav-bar";
import { Icon, Input } from "semantic-ui-react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import veg from "../../assets/fb/vegbiryani.webp";
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

  const getMyServicesTypes = useAppSelector((state) => state.getMyServingTime);
  const getItemsServingTime = useAppSelector(
    (state) => state.getItemServiceTime
  );
  const cartItems = useAppSelector((state) => state.cart);
  console.log('CartItems', cartItems);

  const [isOpen, setIsOpen] = useState(false);
  const [remarksList, setRemarksList] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [unitId, setUnitId] = useState("");

  const [selectedServingType, setSelectedServingType] = useState(() => {
    const servingType = localStorage.getItem("servingType");
    return servingType ? servingType : "Serving Type";
  });

  // useEffect(() => {
  //     if (getItemsServingTime.data) {
  //       console.log('items call');
  //       setMenuItems(getItemsServingTime.data);
  //     }
  // }, [getItemsServingTime])

  console.log('Menu Items', menuItems?.length);

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

  useEffect(() => {
    if (unitId) {
      dispatch(
        getItemServiceTime({
          unit_id: unitId,
          servingtime_id: "2",
        })
      );
    }
  }, [unitId, dispatch]);

  useEffect(() => {
    const hasQuantity = cartItems?.some((item) => item.quantity > 0);
    const updatedItems = hasQuantity ? menuItems?.map((item) => {
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
    }) : []

    console.log('hasQuantity',hasQuantity);
    
    if (updatedItems?.length > 0) {
      setMenuItems(updatedItems);
      console.log("am here in items")
    } else {
      console.log('itemms');
      setMenuItems(
        getItemsServingTime?.data?.map((item: any) => ({
          ...item,
          quantity: 0,
        }))
      );
    }
    console.log("in here");
  }, [cartItems, getItemsServingTime]);


  const goBack = () => {
    navigate("/services");
    localStorage.removeItem("servingType");
    localStorage.removeItem("serving time");
  };

  const goCart = () => {
    navigate("/cart");
  };

  const handleServingTypeSelection = useCallback(
    (selectedType: string, selectedServingType: string) => {
      if (selectedType && unitId) {
        console.log(selectedType);
        dispatch(clearCart());
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

  const handleSearchInputChange = useCallback((event: any) => {
    setSearchInput(event.target.value);
  }, []);

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
        const filteredItems = getItemsServingTime?.data.filter((item: any) =>
          item.item.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredItems);

        setMenuItems(filteredItems);
      } else {
        setMenuItems(getItemsServingTime?.data);
      }
    },
    [menuItems, getItemsServingTime]
  );

  const onSelectCategory = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      const filterValue =
        category === "Non Veg"
          ? 1
          : category === "Veg"
          ? 0
          : category === "Drinks"
          ? 2
          : "All";
      const filteredItems = getItemsServingTime?.data.filter(
        (item: any) => item.item_type === filterValue
      );
      console.log(filteredItems);

      if (category === "All") {
        setMenuItems(getItemsServingTime?.data);
        setSearchInput("");
      } else {
        setMenuItems(filteredItems);
      }
    },
    [getItemsServingTime]
  );

  const onAddRemark = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, itemId: any) => {
      const value = e.target.value;

      const updatedMenu = menuItems.map((menuItem) =>
        menuItem.itemid === itemId
          ? { ...menuItem, other_remark: value, remarkId: undefined }
          : {
              ...menuItem,
              remarkId: undefined,
            }
      );

      const updatedCartItem = updatedMenu?.find(
        (item) => item.itemid === itemId
      );

      setMenuItems(updatedMenu);
      dispatch(updateCartItem(updatedCartItem));
    },
    [menuItems]
  );

  const showViewCartOption = menuItems?.some((item) => item.quantity > 0);

  return (
    <>
      <Navbar />
      <div
        onClick={goBack}
        style={{ marginBottom: "5%", marginRight: "190%", marginTop: "6%" }}
      >
        <Icon disabled name="arrow left" size="large" />
      </div>
      <input
        placeholder="Search Menu..."
        style={{ marginBottom: "10px", height: "40px" }}
        value={searchInput}
        onChange={onSearchMenuItems}
      />
      <div>
        <div style={{ display: "flex", marginTop: "4%" }}>
          <div
            style={{
              marginRight: "20px",
              width: "22%",
              height: "20px",
              padding: "3px",
              fontSize: "10px",
              background: "white",
              boxShadow: "0px 2px 4px grey",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              marginLeft: "4%",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>
              {selectedServingType}
              {isOpen ? <Icon name="caret up" /> : <Icon name="caret down" />}
            </p>
          </div>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                marginRight: "20px",
                width: "30%",
                padding: "1%",
                fontSize: "10px",
                background: "white",
                boxShadow: "0px 2px 4px grey",
                borderRadius: "10px",
                whiteSpace: "nowrap",
                backgroundColor:
                  selectedCategory === item.category ? "#7bb5d2" : "",
              }}
              onClick={() => onSelectCategory(item.category)}
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
          marginTop: "2%",
        }}
      >
        {localStorage.getItem("serving time") ? (
          <div>
            {Array.isArray(menuItems) ? (
              menuItems.length > 0 ? (
                menuItems?.map((item: any, index: any) => (
                  <div
                    style={{
                      width: "92%",
                      height: "120px",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "5%",
                      border: "1px solid grey",
                      boxShadow: "0px 2px 4px grey",
                      background: "white",
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
                            fontSize: "10px",
                            float: "left",
                            color: "black",
                          }}
                        >
                          {item.item}
                        </p>
                        <div style={{ float: "left", display: "flex" }}>
                          <Icon color="black" name="rupee" />
                          <p
                            style={{
                              color: "black",
                            }}
                          >
                            {item.price_att}
                          </p>
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
                            value={item.other_remark || ""}
                            onChange={(event) =>
                              onAddRemark(event, item.itemid)
                            }
                          />
                        </div>
                      </div>
                      <div style={{ marginLeft: "54%", position: "relative" }}>
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
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "80%",
                              height: "20px",
                              background: "white",
                              borderRadius: "6px",
                              boxShadow: "0px 2px 4px grey",
                              zIndex: 1,
                              justifyContent: "space-between",
                            }}
                          >
                            {item.quantity === 0 ? (
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color: "black",
                                  pointerEvents: "auto",
                                }}
                                onClick={() =>
                                  onAddCartItem(index, {
                                    ...item,
                                    quantity: item.quantity + 1,
                                  })
                                }
                              >
                                ADD
                              </span>
                            ) : (
                              <div style={{marginTop: '-2%'}}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "20px",
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
                                <span style={{ fontWeight: "bold" }}>
                                  {item.quantity}
                                </span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "20px",
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
                  Item not available
                </p>
              )
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
      {/* {myCartItems.length > 0 ? ( */}
      {showViewCartOption && (
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
              <div>{`${cartItems.length} ITEM${
                cartItems.length === 1 ? "" : "S"
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
      )}
      {/* ) : null} */}
    </>
  );
}

export default FoodBeverages;
