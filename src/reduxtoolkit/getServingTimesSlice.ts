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
}

export const getMyServingTime = createAsyncThunk(
  "getMyServingTime",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`get-servingtimes`, payload);
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

const getMyServingTimeSlice = createSlice({
  name: "getMyServingTime",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [getMyServingTime.pending.type]: (state) => {
      state.status = "loading";
    },
    [getMyServingTime.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [getMyServingTime.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid Details";
    },
  },
});

export const { clearNotification } = getMyServingTimeSlice.actions;

export default getMyServingTimeSlice;



