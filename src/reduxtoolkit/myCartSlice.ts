import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { title } from "process";

interface CartItem {
  item: string,
  itemid: number;
  quantity: number;
  other_remark?: string;
  remarkid:[];
  price_att: number;
}

const myCartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addFoodToMyCart(state, action) {
      const { remarks, ...item } = action.payload;
      let myindex = -1;
      state.map((item, index) => {
        if (item.itemid == action.payload.itemid) {
          myindex = index;
        }
      });
      if (myindex == -1) {
        state.push({
          item:action.payload.item,
          itemid: action.payload.itemid,
          quantity: action.payload.quantity + 1,
          price_att:action.payload.price_att,
          other_remark: remarks || "",
          remarkid: [],
        });
      } else {
        state[myindex].quantity = state[myindex].quantity + 1;
      }
    },
    increaseQty(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if(item.itemid === action.payload) {
          myindex = index;
        }
      });
      if (myindex == -1) {

      }else {
        state[myindex].quantity = state[myindex].quantity + 1
      }
    },
    removeMyCartItem(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.itemid == action.payload.itemid) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].quantity = state[myindex].quantity - 1;
      }
    },
    deleteSingleCartItem(state, action) {
 return state.filter((item) => {
        return item.itemid !== action.payload;
      });
    },
    deleteMyCartItems(state, action) {
      return [];
      // return state.filter((item) => {
      //   return item.itemid !== action.payload;
      // });
    }
  },
});

export const { addFoodToMyCart, removeMyCartItem, deleteMyCartItems, increaseQty , deleteSingleCartItem} =
  myCartSlice.actions;
export default myCartSlice.reducer;
