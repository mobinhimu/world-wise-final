import { configureStore } from "@reduxjs/toolkit";
import CityReducer from "./components/features/citySlice/citySlice";

const store = configureStore({
  reducer: {
    city: CityReducer,
  },
});

export default store;
