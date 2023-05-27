import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosGet, axiosPost } from "../services/baseService";
import axios from "axios";

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
  dietorder_id: string[]; // Assuming `dietorder_id` should be an array of strings
}

export const orderHistoryList = createAsyncThunk(
  "orderHistoryList",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`get-my-pending-orders`, payload);
      console.log('items', response.data);
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

const orderHistorySlice = createSlice({
  name: "orderHistoryList",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [orderHistoryList.pending.type]: (state) => {
      state.status = "loading";
    },
    [orderHistoryList.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [orderHistoryList.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid Details";
    },
  },
});

export const { clearNotification } = orderHistorySlice.actions;

export default orderHistorySlice;