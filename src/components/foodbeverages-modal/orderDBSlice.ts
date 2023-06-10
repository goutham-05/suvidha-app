import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DbState {
  orderID: any;
}

const initialState: DbState = {
    orderID: null,
};

const orderdbSlice = createSlice({
  name: 'orderdb',
  initialState,
  reducers: {
    setorderDb(state, action: PayloadAction<any>) {
      state.orderID = action.payload;
    },
  },
});

export const { setorderDb } = orderdbSlice.actions;

export default orderdbSlice;