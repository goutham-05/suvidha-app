import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosGet } from "../../services/baseService";
import servicesList from ".";
import { RootState } from "../../config/redux-store";

interface State {
  ids: string[];
  entities: any;
  data: any;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string;
  message: string;
}

const serviceAdaptor = createEntityAdapter({});

const initialState: State = serviceAdaptor.getInitialState({
  ids: [],
  entities: {},
  data: null,
  status: "idle",
  error: "",
  message: "",
});

export const getServicesList = createAsyncThunk(
  "auth/validateOtp",
  async (_, thunkAPI) => {
    try {
      const response = await axiosGet<any>(
        "http://10.20.100.179:4000/api/get-services"
      );
      //   return response.data; // return actual response from the api
      return servicesList;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
      });
    }
  }
);

export const getServicesListById = createAsyncThunk(
  "auth/validateOtp",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosGet<any>(
        "http://10.20.100.179:4000/api/get-services-by-type"
      );
      //   return response.data; // return actual response from the api
      return servicesList;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue({
        message: error.message,
      });
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServicesList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getServicesList.fulfilled,
      (state: State, { payload }: any) => {
        state.status = "succeeded";
        serviceAdaptor.upsertMany(state, payload);
      }
    );
    builder.addCase(getServicesList.rejected, (state, { payload }: any) => {
      state.status = "failed";
      state.error = payload.message;
    });

    builder.addCase(getServicesListById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getServicesListById.fulfilled,
      (state, { payload }: any) => {
        state.status = "succeeded";
        serviceAdaptor.upsertMany(state, payload);
      }
    );
    builder.addCase(getServicesListById.rejected, (state, { payload }: any) => {
      state.status = "failed";
      state.error = payload.message;
    });
  },
});

export const { selectAll: selectAllServices, selectEntities } =
  serviceAdaptor.getSelectors((state: RootState) => state.services);

export default serviceSlice;
