import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signupStep: 1,
    email: '',
    password: '',
    nickname: '',
    // 다른 정보들
}

const signupSlice = createSlice({
    name: 'signup',
    initialState: initialState,
    reducers: {
        setEmail2: (state, action) => {
            console.log("뭐니??", action.payload)
            state.email = action.payload;
            console.log("state: ", state);
            console.log("action: ", action);
            console.log("email: ", initialState.email);
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
    },
});

export const {
    setEmail2,
    setPassword,
    setNickname,
    setCurrentStep
} = signupSlice.actions;

export default signupSlice.reducer;
