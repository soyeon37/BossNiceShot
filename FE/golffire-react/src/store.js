import { configureStore } from '@reduxjs/toolkit';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './utils/localStorage';

import signupReducer from './features/signupSlice';
import userInfoReducer from './features/userInfoSlice';

const preloadedState = loadStateFromLocalStorage();

// 브라우저 종료 후 사라지는 값
const store = configureStore({
  reducer: {
    signupFeature: signupReducer,
    userInfoFeature: userInfoReducer,
  },
  preloadedState,
});

store.dispatch({
  type: '@@redux/INIT',
  // type: 'userInfoSlice/initializeState',
  payload: preloadedState,
})

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
