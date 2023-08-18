import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  email: "",
  password: "",
  nickname: "",
  profile: "",
  introduce: "",
  averageScore: "",
  topScore: "",
  teeBox: "",
  isKakao: false,
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
    },
    setStatePassword: (state, action) => {
      state.password = action.payload;
    },
    setStateNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setStateProfile: (state, action) => {
      state.profile = action.payload;
    },
    setStateIntroduce: (state, action) => {
      state.introduce = action.payload;
    },
    setStateAverageScore: (state, action) => {
      state.averageScore = action.payload;
    },
    setStateTopScore: (state, action) => {
      state.topScore = action.payload;
    },
    setStateTeeBox: (state, action) => {
      state.teeBox = action.payload;
    },
    setStateIsKakao: (state, action) => {
      state.isKakao = action.payload;
    },
  },
});

export const {
  setStateStep,
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateProfile,
  setStateIntroduce,
  setStateAverageScore,
  setStateTopScore,
  setStateTeeBox,
  setStateIsKakao,
} = signupSlice.actions;

export default signupSlice.reducer;
