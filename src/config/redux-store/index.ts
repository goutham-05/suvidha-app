import {
  configureStore,
  Middleware,
  AnyAction,
  Dispatch,
  createSlice,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "../../features/login/authSlice";
import logger from "redux-logger";
import serviceSlice from "../../features/services-list/serviceSlice";

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    services: serviceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      // you can also type middlewares manually
      ()
      // prepend and concat calls can be chained
      .concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
