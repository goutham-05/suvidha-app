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
  admissionno: string;
}
export const getMyInsuranceStatus = createAsyncThunk(
  "getMyInsuranceStatus",
  async (payload: Payload, { dispatch, getState, rejectWithValue }) => {
    // const { user } = getState() as RootState;
    // const { data } = user;
    // const token = data.token;
    try {
      const response: any = await axiosPost(`my-insurance-status`, payload);
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

const myDetailsSlice = createSlice({
  name: "myDetails",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [getMyInsuranceStatus.pending.type]: (state) => {
      state.status = "loading";
    },
    [getMyInsuranceStatus.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [getMyInsuranceStatus.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid Details";
    },
  },
});

export const { clearNotification } = myDetailsSlice.actions;

// export default auth.reducer;

export default myDetailsSlice;
