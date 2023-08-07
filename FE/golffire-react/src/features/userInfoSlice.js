import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    userNickname: "",
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
    }
  },
});

export const {
    setUserId,
    setUserNickname,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
