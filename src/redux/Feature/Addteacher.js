import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
};

const Addteacher = createSlice({
  name: "Addteacher",
  initialState,
  reducers: {
    addteacher: (state, action) => {
      // state.push(action.payload);
      state.teachers.push(action.payload);
    },
    deleteTeacher: (state, action) => {
      // return state.filter((teacher) => teacher.id !== action.payload);

      state.teachers = state.teachers.filter((teacher, index) => {
        // index !== action.payload

        if (teacher.id !== action.payload) {
          return teacher;
        }
      });
    },

    updateTeacher: (state, action) => {
      state.teachers = state.teachers.map((teacher) => {
        // item.id === action.payload.id ? action.payload : item

        if (teacher.id == action.payload.id) {
          return action.payload;
        }
        return teacher;
      });
    },
  },
});
export const { addteacher, deleteTeacher, updateTeacher } = Addteacher.actions;
export default Addteacher.reducer;
