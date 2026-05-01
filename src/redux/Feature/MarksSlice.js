import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  // each result: { studentId, studentName, exam, year, subjects: [{name, obtained, total}] }
};

const MarksSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {
    saveMarks: (state, action) => {
      const { studentId, exam, year } = action.payload;
      const existing = state.results.findIndex(
        (r) => r.studentId === studentId && r.exam === exam && r.year === year,
      );
      if (existing >= 0) {
        state.results[existing] = action.payload;
      } else {
        state.results.push(action.payload);
      }
    },
    deleteMarks: (state, action) => {
      const { studentId, exam, year } = action.payload;
      state.results = state.results.filter(
        (r) =>
          !(r.studentId === studentId && r.exam === exam && r.year === year),
      );
    },
  },
});

export const { saveMarks, deleteMarks } = MarksSlice.actions;
export default MarksSlice.reducer;
