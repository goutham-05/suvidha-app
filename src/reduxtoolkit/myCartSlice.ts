import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { title } from "process";

interface CartItem {
  item: string;
  itemid: number;
  quantity: number;
  other_remark?: string;
  remarkid: [];
  price_att: number;
  //selectedItems: string | null;
}

const initialState: CartItem[] = [];

const myCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCartItem: (state, action) => {
      const item = action.payload;
      const findIndex = state.findIndex((value) => value.itemid === item.itemid);

      if (findIndex === -1) {
        state.push(item);
      } else {
        state[findIndex].quantity += 1;
      }
    },
    decrementCartItem: (state, action) => {
      const item = action.payload;
      const findIndex = state.findIndex((value) => value.itemid === item.itemid);

      if (findIndex === -1) {
        state.push(item);
      } else {
        state[findIndex].quantity -= 1;
      }
    },
    updateCartItem: (state, action) => {
      const item = action.payload;
      const findIndex = state.findIndex((value) => value.itemid === item.itemid);
      state[findIndex] = item;
    },
    clearCart: () => initialState, // Set state to initialState
  },
});

export const selectAllCartItems = (state: any) =>
  state.cart.filter((item: any) => item.quantity !== 0);

export const { incrementCartItem, decrementCartItem, updateCartItem, clearCart } =
  myCartSlice.actions;
export default myCartSlice.reducer;
