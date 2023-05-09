import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delay } from "lodash";
import { axiosPost } from "../services/baseService";

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
    admissionno: string | null;
    unit_id: string | null;
  }

  export const getMyDischarge = createAsyncThunk(
    "getMyDischarge",
    async (payload: Payload, { dispatch, rejectWithValue }) => {
      try {
        const response: any = await axiosPost(`my-discharge`, payload);
        console.log('Discharge', response.data);
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

  const myDischargeSlice = createSlice({
    name: "myDischarge",
    initialState,
    reducers: {
      clearNotification(state) {
        state.message = "";
        state.error = "";
        state.status = "idle";
      },
    },
    extraReducers: {
      [getMyDischarge.pending.type]: (state) => {
        state.status = "loading";
      },
      [getMyDischarge.fulfilled.type]: (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.message = "OTP sent successfully";
      },
      [getMyDischarge.rejected.type]: (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.message = "Invalid Details";
      },
    },
  });
  
  export const { clearNotification } = myDischargeSlice.actions;
  
  // export default auth.reducer;
  
  export default myDischargeSlice;