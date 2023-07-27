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
}
export const patientCheck = createAsyncThunk(
  "patientCheck",
  async (payload: Payload, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await axiosPost(`check-patient-in-dk`, payload);
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

const patientCheckSlice = createSlice({
  name: "patientCheck",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: {
    [patientCheck.pending.type]: (state) => {
      state.status = "loading";
    },
    [patientCheck.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = "OTP sent successfully";
    },
    [patientCheck.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message = "Invalid Details";
    },
  },
});

export const { clearNotification } = patientCheckSlice.actions;

// export default auth.reducer;

export default patientCheckSlice;