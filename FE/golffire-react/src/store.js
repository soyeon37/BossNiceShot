import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './features/signupSlice';
import userInfoReducer from './features/userInfoSlice';

const store = configureStore({
  reducer: {
    signupFeature: signupReducer,
    userInfoFeatrue: userInfoReducer,
  }
});

export default store;
