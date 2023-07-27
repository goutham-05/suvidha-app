import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosPost } from "../services/baseService";
import { RootState } from "../config/redux-store";

interface State {
  data: any;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string;
  message: string;
}

const initialState: State = {
  data: null,
  status: "idle",
  error: "",
  message: "",
};

interface Payload {
  unit_id: string | null;
  patient_ipno:string | null;
  delivery_address:string | null;
  servingtime_id: string | number | null;
  my_cart_items: {};
}
export const getMyOrderFood = createAsyncThunk(
  "getMyOrderFood",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`order-food`, payload);
      return response.data;
    } catch (error: Error | any) {
      return rejectWithValue({
        message: error.message,
      });
    } finally {
      delay(() => {
        dispatch(clearNotification());
      }, 1000);
    }
  }
);

const getMyOrderFoodSlice = createSlice({
  name: "orderFood",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: {
    [getMyOrderFood.pending.type]: (state) => {
      state.status = "loading";
    },
    [getMyOrderFood.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "Order Placed Successfully";
    },
    [getMyOrderFood.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Server Down";
    },
  },
});

export const { clearNotification, resetStatus } = getMyOrderFoodSlice.actions;

// export default auth.reducer;

export default getMyOrderFoodSlice;