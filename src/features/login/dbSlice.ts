import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DbState {
  db: any;
}

const initialState: DbState = {
  db: null,
};

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    setDb(state, action: PayloadAction<any>) {
      state.db = action.payload;
    },
  },
});

export const { setDb } = dbSlice.actions;

export default dbSlice;