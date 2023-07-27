import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosPost } from "../../services/baseService";
import { RootState } from "../../config/redux-store";

interface State {
  data: any;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string;
  message: string;
  otpSuccess: boolean;
}

const initialState: State = {
  data: null,
  status: "idle",
  error: "",
  message: "",
  otpSuccess: false,
};

interface Payload {
  mobile_number: string | null;
  unit_id: string | null
}

interface OtpPayload extends Payload {
  mobile_number: string | null;
  otp: string | null;
}

export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    // dispatch and rejectWithValue are from thunkAPI which are destructured here
    try {
      const response: any = await axiosPost(`patient-login`, payload);
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

export const validateOtp = createAsyncThunk(
  "auth/validateOtp",
  async (otpPayload: OtpPayload, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;
    const { data } = user;
    const token = data.token;
    try {
      const response: any = await axiosPost(`validate-otp`, otpPayload, token);

      return response.data;
    } catch (error: Error | any) {
      return rejectWithValue({
        message: error.message,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [getOtp.pending.type]: (state) => {
      state.status = "loading";
    },
    [getOtp.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [getOtp.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =  "Please enter registered mobile number";
    },
    [validateOtp.pending.type]: (state) => {
      state.status = "loading";
    },
    [validateOtp.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.otpSuccess = true;
      state.message = "OTP verified successfully";
    },
    [validateOtp.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid OTP";
    },
  },
});

export const { clearNotification } = authSlice.actions;

// export default auth.reducer;

export default authSlice;
