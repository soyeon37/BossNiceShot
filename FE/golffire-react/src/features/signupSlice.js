import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  email: "",
  password: "",
  profile: "", // delete
  nickname: "",
  is_kakao: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setStateStep: (state, action) => {
      state.step = action.payload;
    },
    setStateEmail: (state, action) => {
      state.email = action.payload;
      console.log("action.payload: ", action.payload);
      console.log("state: ", state);
      console.log("action: ", action);
      console.log("changed email: ", state.email);
    },
    setStatePassword: (state, action) => {
      state.password = action.payload;
    },
    setStateNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setStateIsKakao: (state, action) => {
      state.is_kakao = action.payload;
    },
  },
});

export const {
  setStateStep,
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateIsKakao,
} = signupSlice.actions;

export default signupSlice.reducer;
