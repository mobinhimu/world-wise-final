import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_REACT_CITIES_URL;

const FAKE_USER = {
  name: "Mobin",
  email: "mobinhimu@example.com",
  password: "mobin123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  cities: [],
  currentCity: null,
  isLoading: false,
  isAuthenticated: false,
};

const cityReducer = createSlice({
  name: "city",
  initialState,
  reducers: {
    getCity(state, { payload }) {
      state.cities = payload;
      state.isLoading = false;
    },
    isLoading(state) {
      state.isLoading = true;
    },
    getCurrentCity(state, { payload }) {
      state.isLoading = false;
      state.currentCity = payload;
    },
    createCity(state, { payload }) {
      state.cities = [...state.cities, payload];
      state.isLoading = false;
      state.currentCity = payload;
    },
    deleteCity(state, { payload }) {
      state.cities = state.cities.filter((city) => city.id !== payload);
      state.isLoading = false;
    },
    isAuthenticated: {
      prepare: (email, password) => {
        return {
          payload: {
            email,
            password,
          },
        };
      },

      reducer(state, { payload }) {
        state.isAuthenticated =
          payload.email === FAKE_USER.email &&
          payload.password === FAKE_USER.password
            ? true
            : false;
      },
    },
    logOut(state) {
      console.log("hello");
      state.isAuthenticated = false;
    },
  },
});

export function getCity() {
  return async (dispatch) => {
    dispatch({ type: "city/isLoading" });

    const res = await fetch(`${BASE_URL}/cities`);
    const data = await res.json();

    dispatch({
      type: "city/getCity",
      payload: data,
    });
  };
}

export function getCurrentCity(id) {
  return async (dispatch) => {
    dispatch({ type: "city/isLoading" });

    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();

    dispatch({
      type: "city/getCurrentCity",
      payload: data,
    });
  };
}

export function createCity(city) {
  return async (dispatch) => {
    dispatch({ type: "city/isLoading" });

    const res = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(city),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: "city/createCity",
      payload: data,
    });
  };
}

export function deleteCity(id) {
  return async (dispatch) => {
    dispatch({ type: "city/isLoading" });
    const res = await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    const d = await res.json();
    console.log(d);
    dispatch({
      type: "city/deleteCity",
      payload: id,
    });
  };
}

export const { isLoading, isAuthenticated, logOut } = cityReducer.actions;

export default cityReducer.reducer;
