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
  servingtime_id: string | number;
}

export const getItemServiceTime = createAsyncThunk(
  "getItemServiceTime",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`get-items-by-servingtime`, payload);
      console.log('My Serving Time', response.data);
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

const getItemServiceTimeSlice = createSlice({
  name: "getItemServiceTime",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [getItemServiceTime.pending.type]: (state) => {
      state.status = "loading";
    },
    [getItemServiceTime.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [getItemServiceTime.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid Details";
    },
  },
});

export const { clearNotification } = getItemServiceTimeSlice.actions;

export default getItemServiceTimeSlice;
