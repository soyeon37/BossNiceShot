import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './features/signupSlice';
import userInfoReducer from './features/userInfoSlice';

// 브라우저 종료 후 사라지는 값
const store = configureStore({
  reducer: {
    signupFeature: signupReducer,
    userInfoFeatrue: userInfoReducer,
  }
});

export default store;
