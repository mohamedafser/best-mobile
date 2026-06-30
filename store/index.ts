import AsyncStorage from "@react-native-async-storage/async-storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { createMigrate, persistReducer, persistStore } from "redux-persist";

import authReducer from "./slice/authSlice";
import countriesReducer from "./slice/countries-slice";
import onboardingReducer from "./slice/onboarding-slice";
import referralsReducer from "./slice/referrals.slice";
import reservationReducer from "./slice/reservation.slice";
import updateUserReducer from "./slice/update-user.slice";
import userProfileReducer from "./slice/user-profile.slice";
import walletReducer from "./slice/wallet.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  countries: countriesReducer,
  onboarding: onboardingReducer,
  updateUser: updateUserReducer,
  userProfile: userProfileReducer,
  wallet: walletReducer,
  referrals: referralsReducer,
  reservation: reservationReducer,
});

const migrations: any = {
  1: (state: any) => {
    if (state) {
      const { signin, ...rest } = state;
      return rest;
    }
    return state;
  },
};

const persistConfig = {
  key: "root",

  version: 1,

  storage: AsyncStorage,

  migrate: createMigrate(migrations, { debug: false }),

  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
