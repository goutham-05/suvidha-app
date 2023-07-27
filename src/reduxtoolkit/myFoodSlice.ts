import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface FoodItem {
  title: string;
  icon: string;
  path: string;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
  type: string;
  rate: number;
  image:string;
  qty: number;
}

const initialState = {
  foodItems: []as FoodItem[],
};
  
  const myFoodSlice = createSlice({
    name: 'myFood',
    initialState,
    reducers: {
      addMyFood: (state, action) => {
        state.foodItems = action.payload;
      },
      increaseQty(state, action) {
        let myindex = -1;
        state.foodItems.map((item,index) => {
          if (item.title === action.payload) {
            myindex === index;
          }
        });
        if(myindex === -1) {
          
        }else {
          state.foodItems[myindex].qty = state.foodItems[myindex].qty + 1;
        }
      }
    },
  });
  
  export const { addMyFood,increaseQty } = myFoodSlice.actions;
  export default myFoodSlice.reducer;