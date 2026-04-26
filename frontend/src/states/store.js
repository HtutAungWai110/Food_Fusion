import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserState"
import myCookbookReducer from "./MyCookbookState"

export const store = configureStore({
  reducer: {
    user: userReducer,
    myCookbook: myCookbookReducer,
  },
});