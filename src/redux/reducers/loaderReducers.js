import {createReducer} from '@reduxjs/toolkit';
export const loaderReducer = createReducer(
  {
    loaderStatus: false,
  },
  {
    // loader
    set_loading_on: state => {
      state.loaderStatus = true;
    },
    set_loading_off: state => {
      state.loaderStatus = false;
    },
  },
);
