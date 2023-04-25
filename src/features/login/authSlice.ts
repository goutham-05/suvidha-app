import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import axios from "axios";
import { useEffect } from "react";

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
  mobile_number: number;
  admissionno: string;
}

export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    // dispatch and rejectWithValue are from thunkAPI which are destructured here
    console.log(payload);
    try {
      const response = await axios.post(
        `http://10.20.100.179:4000/api/patient-login`,payload
      );
      console.log(response.data);
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
  async (payload: Payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://10.20.100.179:4000/api/validate-otp`, payload
      );

      return response.data;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue({
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
      state.data = action.payload.data;
      state.message = "OTP sent successfully";
    },
    [getOtp.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = action.payload.message;
    },
  },
});

export const { clearNotification } = authSlice.actions;

// export default auth.reducer;

export default authSlice;
