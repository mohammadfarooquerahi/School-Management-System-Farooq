import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  // each record: { date, type(student/teacher), personId, personName, status }
};

const AttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    saveAttendance: (state, action) => {
      // action.payload = { date, type, entries: [{personId, personName, status}] }
      const { date, type, entries } = action.payload;

      // Remove existing records for same date + type
      state.records = state.records.filter(
        (r) => !(r.date === date && r.type === type),
      );

      // Add new records
      entries.forEach((entry) => {
        state.records.push({ date, type, ...entry });
      });
    },
  },
});

export const { saveAttendance } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;
