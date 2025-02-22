import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { usersReducer } from "../features/users/UserSlice.ts";
import { photosReducer } from '../features/photos/photosSlice.ts';

const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  photos: photosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
