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
interface Payload {
    unit_name: string;
    unit_code: string;
    ks_url: string;
    qr_code: string;
}
export const storQRCode = createAsyncThunk(
  "storQRCode",
  async (payload: Payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`store-qr-code`, payload);
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
const qrCodeSlice = createSlice({
  name: "QRCode",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [storQRCode.pending.type]: (state) => {
      state.status = "loading";
    },
    [storQRCode.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "QR Code Generated Successfully";
    },
    [storQRCode.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Something went wrong, Please try again after some time!";
    },
  },
});

export const { clearNotification } = qrCodeSlice.actions;
export default qrCodeSlice;
