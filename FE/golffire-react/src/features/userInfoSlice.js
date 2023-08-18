import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userNickname: "",
  userLevel: "",
  userTee: "",
  userImage: "",
  userAccessToken: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserNickname: (state, action) => {
      state.userNickname = action.payload;
    },
    setUserLevel: (state, action) => {
      state.userLevel = action.payload;
    },
    setUserTee: (state, action) => {
      state.userTee = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setUserAccessToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
    resetUserState: (state, action) => {
      state.userId = "";
      state.userNickname = "";
      state.userLevel = "";
      state.userTee = "";
      state.userImage = "";
      state.userAccessToken = "";
    },
  },
});

export const {
  setUserId,
  setUserNickname,
  setUserLevel,
  setUserTee,
  setUserImage,
  setUserAccessToken,
  resetUserState,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
