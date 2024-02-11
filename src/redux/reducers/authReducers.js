import {createReducer} from '@reduxjs/toolkit';
export const authReducer = createReducer(
  {
    loginResponse: {},
    logoutResponse: {},
    userProfileResponse: {},
    forgotPasswordResponse: {},
    uploadTokenResponse: {},
  },
  {
    // login
    login: (state, action) => {
      state.loginResponse = action.payload;
    },

    // logout
    logout: (state, action) => {
      state.logoutResponse = action.payload;
    },

    // user profile
    user_profile: (state, action) => {
      state.userProfileResponse = action.payload;
    },

    // forgot password
    forgot_password: (state, action) => {
      state.forgotPasswordResponse = action.payload;
    },

    // upload fcm token
    upload_fcm_token: (state, action) => {
      state.uploadTokenResponse = action.payload;
    },
  },
);
