import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SavedBusinessesReducer from "./reducers/savedBusinesses";

const configPersist = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(configPersist, SavedBusinessesReducer);

export const store = configureStore({
  reducer: {
    savedBusinesses: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);