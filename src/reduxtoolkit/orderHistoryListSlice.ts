import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosGet, axiosPost } from "../services/baseService";
import axios from "axios";

interface Order {
    // Define the properties of your Order type here
    id: string;
    // ...
  }
  
  const orderHistoryListSlice = createSlice({
    name: 'pendingOrderHistoryList',
    initialState: [] as Order[],
    reducers: {
        setOrders: (state, action) => {
            const payload = action.payload;
            if (payload && Symbol.iterator in Object(payload)) {
              state.push(...payload);
              console.log('STATE', payload);
            }
        }
    },
  });
  
  export const { setOrders } = orderHistoryListSlice.actions;
  export default orderHistoryListSlice.reducer;