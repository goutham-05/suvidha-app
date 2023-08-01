import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../nav-bar';
import { Icon, Input } from 'semantic-ui-react';
import './index.css';
import { useFetcher, useNavigate } from 'react-router-dom';
import veg from '../../assets/FandB.svg';
import cart from '../../assets/fb/shopping-bag.png';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../config/redux-store';
import {
  decrementCartItem,
  incrementCartItem,
  updateCartItem,
} from '../../reduxtoolkit/myCartSlice';
import { getMyServingTime } from '../../reduxtoolkit/getServingTimesSlice';
import { getItemServiceTime } from '../../reduxtoolkit/getItemServSlice';
import { clearCart } from '../../reduxtoolkit/myCartSlice';
import { useTranslation } from 'react-i18next';
import MessageNotification from '../../common/notification';
import order from '../../reduxtoolkit/orderFoodSlice';
import { getItemsList } from '../../reduxtoolkit/getItemsListSlice';
import { orderHistoryList } from '../../reduxtoolkit/orderHistorySlice';
import Footer from '../footer';
import BackgroundImage from '../background';
import localForage from 'localforage';
import { setorderDb } from './orderDBSlice';
import { useLocation } from 'react-router-dom';

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
    id: 1,
    mealtime: 'Pre Breakfast',
    Fromtime: '06:00:00',
    Totime: '07:30:00',
    status: 1,
  },
  {
    id: 2,
    mealtime: 'Breakfast',
    Fromtime: '07:30:00',
    Totime: '08:19:00',
    status: 1,
  },
  {
    id: 3,
    mealtime: 'Post Dinner',
    Fromtime: '21:30:00',
    Totime: '09:00:00',
    status: 1,
  },
  {
    id: 4,
    mealtime: 'Lunch',
    Fromtime: '12:30:00',
    Totime: '14:00:00',
    status: 1,
  },
  {
    id: 5,
    mealtime: 'Snacks',
    Fromtime: '15:30:00',
    Totime: '16:30:00',
    status: 1,
  },
  {
    id: 6,
    mealtime: 'Dinner',
    Fromtime: '19:30:00',
    Totime: '20:00:00',
    status: 1,
  },
  {
    id: 7,
    mealtime: 'Soup Service',
    Fromtime: '17:30:00',
    Totime: '22:30:00',
    status: 1,
  },
];
/**
 *
 * @param time - Eg: '07:30:00'
 * @param minutesToAdd - Hours in minutes 2Hr*60=120
 * @returns
 */
const addTime = (time: string, minutesToAdd: number) => {
  const splitedTime = time.split(':');
  const converteddate = new Date(
    0,
    0,
    0,
    +splitedTime[0],
    +splitedTime[1],
    +splitedTime[2]
  );
  const updatedDate = converteddate.setTime(
    converteddate.getTime() + minutesToAdd * 60 * 1000
  );

  const resultDate = new Date(updatedDate);

  return `${resultDate.getHours()}:${resultDate.getMinutes()}:${resultDate.getSeconds()}`;
};

// const updatedServingTypeData = servingTypeData.map((item) => {
//   return {
//     ...item,
//     Totime: addTime(item.Totime, 120),
//   };
// });
const data = [
  {
    itemId: 1,
    title: 'all',
    category: 'All',
    status: false,
  },
  {
    itemId: 2,

    title: 'veg',
    category: 'Veg',
    status: false,
  },
  {
    itemId: 3,

    title: 'non_veg',
    category: 'Non Veg',
    status: false,
  },
  {
    itemId: 4,

    title: 'drinks_juices',
    category: 'Drinks',
    status: false,
  },
  {
    itemId: 5,
    title: 'Best Seller',
    category: 'Best Seller',
    status: false,
  },
];

function FoodBeverages() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['fb']);

  const {
    data: foodItemsList,
    status: foodItemsStatus,
    error,
    message: foodItemsMsg,
  } = useAppSelector((state) => state.getItemServiceTime);

  const getItemsServingTime = useAppSelector((state) => state.getMyServingTime);

  useEffect(() => {
    const unitCodeStr = localStorage.getItem('unit_code');
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    const updatedServingTypeData = servingTypeData.map((item) => {
      return {
        ...item,
        Totime: addTime(item.Totime, 120),
      };
    });
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
  console.log('CartItems', cartItems);

  const { status, message } = useAppSelector((state) => state.order);

  const { status: userStatus, data: userData } = useAppSelector(
    (state: RootState) => state.user
  );
  function refreshPage(): void {
    window.location.reload();
  }

  const [isOpen, setIsOpen] = useState(false);
  const [remarksList, setRemarksList] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [unitId, setUnitId] = useState('');

  console.log('Menu Items', menuItems?.length);

  useEffect(() => {
    setInterval(() => {
      let dt = new Date();
      dt.setHours(dt.getHours() + 2);
    }, 1000);

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

    console.log('hasQuantity', hasQuantity);

    if (updatedItems?.length > 0) {
      setMenuItems(updatedItems);
      console.log('am here in items');
    } else {
      console.log('itemms');
      setMenuItems(
        foodItemsList?.map((item: any) => ({
          ...item,
          quantity: 0,
        }))
      );
    }
    console.log('in here');
  }, [cartItems, foodItemsList]);

  const goBack = () => {
    dispatch(clearCart());
    navigate('/services');
    localStorage.removeItem('servingType');
    localStorage.removeItem('serving time');
  };

  const goCart = () => {
    navigate('/cart');
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
  const [bestItems, setBestItems] = useState<any[]>([]);

  useEffect(() => {
    setAllItems(foodItemsList || []);
  }, [foodItemsList]);

  useEffect(() => {
    // Update the menu items based on the selected category
    let updatedItems;
    switch (selectedCategory) {
      case 'All':
        updatedItems = allItems.map((item: any) => ({
          ...item,
          quantity:
            cartItems.find((cartItem) => cartItem.itemid === item.itemid)
              ?.quantity || 0,
        }));
        break;
      case 'Veg':
        updatedItems = vegItems;
        break;
      case 'Non Veg':
        updatedItems = nonVegItems;
        break;
      case 'Drinks':
        updatedItems = drinksItems;
        break;
      case 'Best Seller':
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
    setSearchInput('');
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
    console.log('sortedItems', sortedItems);
    const bestItems = sortedItems.slice(0, 84);

    setBestItems((prevItems) =>
      bestItems.map((item) => ({
        ...item,
        quantity:
          cartItems.find((cartItem) => cartItem.itemid === item.itemid)
            ?.quantity || 0,
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
    console.log('orderIdArray', orderIdArray);
  };

  /////////////////////////////////////////

  const orderDB = useAppSelector((state) => state.orderdb);

  async function openDatabase() {
    const config = {
      name: 'ksuvidha-orders',
      version: 1,
      storeName: 'checkorders',
      description: 'My store with auto-incrementing orderIDs',
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
      console.log('existingOrderIds', existingOrderIds);

      let updatedOrderIds = [];
      if (orderIds !== null) {
        if (existingOrderIds) {
          updatedOrderIds = existingOrderIds.concat([orderIds]);
        } else {
          updatedOrderIds = [orderIds];
        }
      } else {
        // Skip adding null values to the database
        console.log('Null values not added to store');
        return;
      }

      await orderDB.orderID.setItem(userData.ip_no, updatedOrderIds);
      console.log('Data added to store');
    } catch (error) {
      console.log('Error adding data to store', error);
    }
  }

  const orderHistoryButton = () => {
    navigate('/order-history');
  };

  ////////////////////////////////////////////////////
  // const [selectedServingType, setSelectedServingType] = useState(() => {
  //   const servingType = localStorage.getItem("servingType");
  //   return servingType ? servingType : "Serving Type";
  // });
  // ...

  const [selectedServingType, setSelectedServingType] = useState(() => {
    const servingType = localStorage.getItem('servingType');
    const isPageReloaded = performance.navigation.type === 1; // Check if page is reloaded

    return isPageReloaded ? 'Serving Type' : servingType || 'Serving Type';
  });

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
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
      localStorage.setItem('serving time', selectedType);
      localStorage.setItem('servingType', selectedServingType);
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
          marginTop: '6%',
          display: 'flex',
          marginBottom: '5%',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => goBack()}
        >
          <Icon disabled name="arrow left" size="large" />
        </div>
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => orderHistoryButton()}
        >
          <p
            style={{
              whiteSpace: 'nowrap',
              color: '#0075AD',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              //textDecoration: "underline",
            }}
          >
            {t('order_history')}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', marginLeft: '4%', cursor: 'pointer' }}>
        <input
          placeholder={t('search_menu...')}
          style={{ marginBottom: '10px', height: '40px', width: '80%' }}
          value={searchInput}
          onChange={onSearchMenuItems}
        />
        <div
          style={{
            width: '60px',
            height: '40px',
            border: '1px solid #0075ad',
            background: '#0075ad',
            borderRadius: '10px',
            marginLeft: '4%',
            cursor: 'pointer',
          }}
          onClick={() => cartItems.length > 0 && goCart()}
        >
          <img src={cart} width={26} height={26} style={{ marginTop: '8%' }} />
          {cartItems.length > 0 ? (
            <div
              style={{
                width: '6%',
                height: '20px',
                borderRadius: '10px',
                marginLeft: '8%',
                background: 'white',
                position: 'absolute',
                marginTop: '-8%',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              <p>{cartItems.length}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '4%',
          width: '100%',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            minWidth: '20%',
            padding: '2%',
            fontSize: '12px',
            background: 'white',
            boxShadow: '0px 2px 4px grey',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
            marginBottom: '4%',
            backgroundColor: '#0075ad',
            cursor: 'pointer',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p style={{ color: 'white', cursor: 'pointer' }}>
            {selectedServingType}
            {isOpen ? <Icon name="caret up" /> : <Icon name="caret down" />}
          </p>
        </div>
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              background: 'white',
              boxShadow: '0px 2px 4px grey',
              borderRadius: '10px',
              marginTop: '35px',
              width: '45%',
              height: '250px',
              padding: '20px',
              marginLeft: '-35%',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              {Array.isArray(getItemsServingTime.data) ? (
                getItemsServingTime.data?.map((item: any, _index: any) => {
                  //  const disabled =
                  //  item.Totime.localeCompare(currentTime, undefined, {
                  //    numeric: true,
                  //  }) < 0
                  //  ||
                  //  item.Totime.localeCompare(currentTime, undefined, {
                  //    numeric: true,
                  //  }) < 0 && item.Fromtime.localeCompare(currentTime, undefined, {
                  //    numeric: true,
                  //  }) > 0;

                  // const disabled =
                  // item.Totime.localeCompare(currentTime, undefined, {
                  //   numeric: true,
                  // }) < 0 ||
                  // (item.Totime.localeCompare(currentTime, undefined, {
                  //   numeric: true,
                  // }) > 0 &&
                  //   item.Fromtime.localeCompare(currentTime, undefined, {
                  //     numeric: true,
                  //   }) > 0);

                  // const currentTime = new Date(); // Get current date and time

                  // const isPastMidnight =
                  //   currentTime.getHours() === 0 &&
                  //   currentTime.getMinutes() === 0 &&
                  //   currentTime.getSeconds() === 0;

                  // const toTime = new Date();
                  // toTime.setHours(...item.Totime.split(':'), 0, 0, 0);

                  // const disabled =
                  //   isPastMidnight ||
                  //   currentTime > toTime; // Disable serving types after the Totime
                  const currentTime = new Date(); // Get current date and time
                  const [hour, minute, second] =
                    item.Totime.split(':').map(Number);
                  let mlToTime = new Date();
                  mlToTime.setHours(hour, minute, second);
                  mlToTime.setHours(mlToTime.getHours() + 2);
                  console.log('mlToTime:', mlToTime);
                  // Convert the current time to a string in "hh:mm:ss" format
                  const hours = String(currentTime.getHours()).padStart(2, '0');
                  const minutes = String(currentTime.getMinutes()).padStart(
                    2,
                    '0'
                  );
                  const seconds = String(currentTime.getSeconds()).padStart(
                    2,
                    '0'
                  );
                  const timeString = `${hours}:${minutes}:${seconds}`;

                  const isPastMidnight =
                    currentTime.getHours() === 0 &&
                    currentTime.getMinutes() === 0 &&
                    currentTime.getSeconds() === 0;

                  const toTimeComponents = item.Totime.split(':');

                  const toTime = new Date();
                  toTime.setHours(toTime.getHours() + 2);
                  // console.log(toTime, 'disable');
                  toTime.setHours(
                    parseInt(toTimeComponents[0]),
                    parseInt(toTimeComponents[1]),
                    parseInt(toTimeComponents[2]),
                    0
                  );

                  const disabled = currentTime > mlToTime; // Disable serving types after the Totime
                  console.log(currentTime, 'Current');
                  const optionStyle = {
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    color: disabled ? 'grey' : 'inherit',
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
                <p style={{ marginTop: '50%', cursor: 'pointer' }}>
                  Loading...
                </p>
              )}
            </div>
          </div>
        )}
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: '20%',
              padding: '2%',
              fontSize: '12px',
              background: 'white',
              boxShadow: '0px 2px 4px grey',
              borderRadius: '10px',
              whiteSpace: 'nowrap',
              marginBottom: '4%',
              cursor: 'pointer',
              backgroundColor:
                selectedCategory === item.category
                  ? item.category === 'Veg'
                    ? 'green'
                    : item.category === 'Non Veg'
                    ? '#9d380c'
                    : item.category === 'Drinks'
                    ? '#e53e6c'
                    : item.category === 'All'
                    ? '#0075AD'
                    : item.category === 'Best Seller'
                    ? '#0075AD'
                    : ''
                  : '',
              color: selectedCategory === item.category ? 'white' : 'black',
            }}
            onClick={() => onSelectCategory(item.category)}
          >
            <div>{t(item.title)}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          minHeight: '10px',
          maxHeight: '384px',
          overflowY: 'scroll',

          marginTop: '2%',
          cursor: 'pointer',
        }}
      >
        {localStorage.getItem('serving time') ? (
          <div>
            {Array.isArray(menuItems) ? (
              menuItems.length > 0 ? (
                menuItems?.map((item: any, index: any) => (
                  <div
                    key={index}
                    style={{
                      width: '91%',
                      height: '140px',
                      padding: '10px',
                      borderRadius: '10px',
                      marginBottom: '4%',
                      // margin: "5%",
                      // border: '1px solid grey',
                      boxShadow: '0px 2px 4px grey',
                      background: 'white',
                      marginLeft: '2%',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '10%',
                          height: '80px',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                        }}
                        key={item.itemid}
                      >
                        <p
                          style={{
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: 'black',
                            width: '187px',
                            whiteSpace: 'normal',
                            textAlign: 'left',
                            cursor: 'pointer',
                          }}
                        >
                          {item.item}
                        </p>

                        <Icon
                          color="black"
                          name="rupee"
                          style={{
                            float: 'left',
                            display: 'flex',
                            marginTop: '-5%',
                            cursor: 'pointer',
                          }}
                        />
                        <p
                          style={{
                            color: 'black',
                            marginLeft: '-10%',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          {item.price_att}
                        </p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        {item.image ? (
                          <div
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                            }}
                          >
                            <img
                              src={item.image}
                              width={100}
                              height={96}
                              style={{
                                display: 'block',
                                marginLeft: '161%',
                                marginTop: '-69px',
                                cursor: 'pointer',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              src={veg}
                              width={100}
                              height={90}
                              style={{
                                borderRadius: '10px',
                                cursor: 'pointer',
                                marginLeft: '169px',
                                marginTop: '-91px',
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          position: 'relative',
                          bottom: '10px', // Adjust the distance from the bottom of the image
                          right: '1px', // Ad
                          background: '#0075AD',
                          padding: '10px',
                          width: '85px',
                          height: '30px',
                          borderRadius: '10px',
                          marginTop: '-57%',
                          cursor: 'pointer',
                          marginLeft: '169px',
                          zIndex: 10,
                        }}
                      >
                        {item.quantity === 0 ? (
                          <p
                            style={{
                              marginTop: '-5%',
                              fontWeight: 'bold',
                              color: 'white',
                              pointerEvents: 'auto',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              onAddCartItem(index, {
                                ...item,
                                quantity: item.quantity + 1,
                              })
                            }
                          >
                            {t('ADD')}
                          </p>
                        ) : (
                          <div style={{ marginTop: '-8%' }}>
                            <span
                              style={{
                                fontWeight: 'bold',
                                marginRight: '20px',
                                color: 'white',
                                cursor: 'pointer',
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
                              style={{
                                fontWeight: 'bold',
                                color: 'white',
                                cursor: 'pointer',
                              }}
                            >
                              {item.quantity}
                            </span>

                            <span
                              style={{
                                fontWeight: 'bold',
                                marginLeft: '20px',
                                color: 'white',
                                cursor: 'pointer',
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
                ))
              ) : (
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#4A98CD',
                    marginTop: '10%',
                    cursor: 'pointer',
                  }}
                >
                  Please Select Serving Type
                </p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#4A98CD',
              marginTop: '10%',
              cursor: 'pointer',
            }}
          >
            Please Select Serving Type
          </p>
        )}
      </div>
      {/* <div style={{ marginTop: "-45%", position: "sticky" }}>
        <Footer />
      </div> */}
      <BackgroundImage />
      <div style={{ marginTop: '-48%', position: 'sticky', cursor: 'pointer' }}>
        <Footer />
      </div>
    </>
  );
}

export default FoodBeverages;
