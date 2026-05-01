import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Feature/AddstudentSlice";
import teacherReducer from "./Feature/Addteacher";
import attendanceReducer from "./Feature/AttendanceSlice";
import marksReducer from "./Feature/MarksSlice";
import authReducer from "./Feature/AuthSlice";

const store = configureStore({
  reducer: {
    studentReducer,
    teacherReducer,
    attendanceReducer,
    marksReducer,
    authReducer,
  },
});
export default store;
