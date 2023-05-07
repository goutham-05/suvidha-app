import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosGet, axiosPost } from "../services/baseService";
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
interface Payload {}
export const getUnits = createAsyncThunk(
  "getUnits",
  async (payload: Payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const response: any = await axiosGet(`get-units`);
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
const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [getUnits.pending.type]: (state) => {
      state.status = "loading";
    },
    [getUnits.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "";
    },
    [getUnits.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Some thing went wrong, Please try again after some time";
    },
  },
});

export const { clearNotification } = unitSlice.actions;
export default unitSlice;
