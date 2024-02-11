import {createReducer} from '@reduxjs/toolkit';
export const utilReducer = createReducer(
  {
    portraitStatus: false,
    currentTheme: true,
  },
  {
    // portrait
    set_portrait_mode_on: state => {
      state.portraitStatus = true;
    },
    set_portrait_mode_off: state => {
      state.portraitStatus = false;
    },
    current_theme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
);
