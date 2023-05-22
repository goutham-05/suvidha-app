import {
  configureStore,
  Middleware,
  AnyAction,
  Dispatch,
  createSlice,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "../../features/login/authSlice";
import logger from "redux-logger";
//import serviceSlice from "../../features/services-list/serviceSlice";
import dbSlice from "../../features/login/dbSlice";
import myDetailsSlice from "../../reduxtoolkit/myDetailsSlice";
import unitSlice from "../../reduxtoolkit/unitSlice";
import qrCodeSlice from "../../reduxtoolkit/qrCodeSlice";
import myDischargeSlice from "../../reduxtoolkit/myDischargeSlice";
import myBillSlice from "../../reduxtoolkit/myBillSlice";
import MyFoodSlice from "../../reduxtoolkit/myFoodSlice";
import MyCartFood from "../../reduxtoolkit/myCartSlice";
import cartItems from "../../reduxtoolkit/myCartItemsSlice";
import getMyServingTimeSlice from "../../reduxtoolkit/getServingTimesSlice";
import getItemServiceTimeSlice from "../../reduxtoolkit/getItemServSlice";
import orderFood from "../../reduxtoolkit/orderFoodSlice";
import patienCheck from "../../reduxtoolkit/patientCheckSlice";

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    //services: serviceSlice.reducer,
    db: dbSlice.reducer,
    myDetails: myDetailsSlice.reducer,
    units: unitSlice.reducer,
    qrCode: qrCodeSlice.reducer,
    myDischarge: myDischargeSlice.reducer,
    myBill: myBillSlice.reducer,
    myFood: MyFoodSlice,
    cart: MyCartFood,
    cartItems: cartItems,
    getMyServingTime: getMyServingTimeSlice.reducer,
    getItemServiceTime: getItemServiceTimeSlice.reducer,
    order: orderFood.reducer,
    patientCheck: patienCheck.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      // you can also type middlewares manually
      ()
      // prepend and concat calls can be chained
      .concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
