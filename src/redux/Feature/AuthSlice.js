import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: [
    {
      id: 1,
      fullName: "Admin",
      email: "admin@sindh.edu",
      password: "Admin@123",
      role: "admin",
    },
    // ✅ Add these two
    {
      id: 2,
      fullName: "Teacher Demo",
      email: "teacher@sindh.edu",
      password: "Teacher@123",
      role: "teacher",
    },
    {
      id: 3,
      fullName: "Student Demo",
      email: "student@sindh.edu",
      password: "Student@123",
      role: "student",
    },
  ],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push({ ...action.payload, id: Date.now() });
    },
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { register, login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
