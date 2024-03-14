import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import designReducer from "./user/designSlice";
import partReducer from "./user/partSlice";
import blueprintReducer from "./user/blueprintSlice";
import selectedMaterialsReducer from "./user/materialSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  design: designReducer,
  part: partReducer,
  blueprint: blueprintReducer,
  selectedMaterials: selectedMaterialsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by Redux Toolkit to support object serialization
    }),
});

export const persistor = persistStore(store);
