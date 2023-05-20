import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartItem {
  itemid: number;
  mealtype_id: number;
  price_att: number;
  item_type:number;
  item: string;
  counts: number;
  quantity: number;
  }

const initialState = {
    selectedItems: [] as CartItem[],
    grandTotal: 0,
  };

  const myCartItemsSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const { my_cart_items, grandTotal } = action.payload;
        my_cart_items.forEach((item: any) => {
          const existingItem = state.selectedItems.find(
            (selectedItem) => selectedItem.itemid === item.itemid
          );
          if (!existingItem) {
            state.selectedItems.push(item);
          }
        });
        state.grandTotal = grandTotal;
      },
      clearCart: (state) => {
        state.selectedItems = [];
        state.grandTotal = 0;
      },
    },
  });
  
  export const { addToCart, clearCart} = myCartItemsSlice.actions;
export default myCartItemsSlice.reducer;