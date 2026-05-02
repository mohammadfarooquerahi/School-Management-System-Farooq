import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  //    editData: null
};

const AddstudentSlice = createSlice({
  name: "Addstudent",
  initialState,
  reducers: {
    addStudents: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((item, index) => {
        // index !== action.payload

        if (item.id !== action.payload) {
          return item;
        }
      });
    },

    updateStudent: (state, action) => {
      state.students = state.students.map((item) => {
        // item.id === action.payload.id ? action.payload : item

        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const { addStudents, deleteStudent, setEditData, updateStudent } =
  AddstudentSlice.actions;
export default AddstudentSlice.reducer;
