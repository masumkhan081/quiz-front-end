import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    username: "",
    email: "",
    user_id: "",
    role: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action) => {
      console.log("---" + JSON.stringify(action.payload) + "----");
      return {
        value: {
          isAuth: action.payload.isAuth,
          username: action.payload.username,
          email: action.payload.email,
          user_id: action.payload.user_id,
          role: action.payload.role,
        },
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
