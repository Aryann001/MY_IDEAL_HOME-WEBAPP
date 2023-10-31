import { createReducer } from "@reduxjs/toolkit";

export const houseReducer = createReducer(
  { houses: [] },
  {
    HOME_HOUSES_REQUEST: (state, action) => {
      state.loading = true;
    },
    HOME_HOUSES_SUCCESS: (state, action) => {
      state.loading = false;
      state.houses = action.payload.houses;
      state.houseCount = action.payload.houseCount;
      state.filteredHouse = action.payload.filteredHouse;
      state.resultPerPage = action.payload.resultPerPage;
    },
    HOME_HOUSES_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const houseDetailsReducer = createReducer(
  { house: {} },
  {
    HOUSE_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    HOUSE_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.house = action.payload;
    },
    HOUSE_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const brokerHouseReducer = createReducer(
  {},
  {
    //CREATE
    CREATE_HOUSE_REQUEST: (state, action) => {
      state.loading = true;
    },
    CREATE_HOUSE_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    CREATE_HOUSE_RESET: (state, action) => {
      state.success = false;
    },
    CREATE_HOUSE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    //UPDATE
    UPDATE_HOUSE_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_HOUSE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_HOUSE_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_HOUSE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    //DELETE
    DELETE_HOUSE_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_HOUSE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_HOUSE_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_HOUSE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const getBrokerHouseReducer = createReducer(
  { houses: [] },
  {
    GET_BROKER_HOUSES_REQUEST: (state, action) => {
      state.loading = true;
    },
    GET_BROKER_HOUSES_SUCCESS: (state, action) => {
      state.loading = false;
      state.houses = action.payload;
    },
    GET_BROKER_HOUSES_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

