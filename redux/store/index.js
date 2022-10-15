import { createWrapper } from "next-redux-wrapper";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userSlice } from "../reducers/user";
import { partySlice } from "../reducers/party";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const rootPersistConfig = {
//   key: "root",
//   storage,
// };

// const userPersistConfig = {
//   key: "user",
//   storage,
// };

// const rootReducer = combineReducers({
//   [userSlice.name]: persistReducer(userPersistConfig, userSlice.reducer),
// });

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [partySlice.name]: partySlice.reducer,
    },
    // reducer: persistedReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
