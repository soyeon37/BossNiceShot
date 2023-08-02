import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './features/signupSlice';

const store = configureStore({
  reducer: {
    signupFeature: signupReducer,
  }
});

export default store;
