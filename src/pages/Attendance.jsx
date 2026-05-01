import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAttendance } from "../redux/Feature/AttendanceSlice";

const Attendance = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentReducer);
  const { teachers } = useSelector((state) => state.teacherReducer);
  const { records } = useSelector((state) => state.attendanceReducer);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [type, setType] = useState("student"); // "student" or "teacher"
  const [saved, setSaved] = useState(false);

  // Get list based on type
  const list = type === "student" ? students : teachers;

  // Build initial attendance map from existing records
  const existingRecords = records.filter(
    (r) => r.date === date && r.type === type,
  );

  const buildInitialStatus = () => {
    const map = {};
    list.forEach((person) => {
      const found = existingRecords.find((r) => r.personId === person.id);
      map[person.id] = found ? found.status : "Present";
    });
    return map;
  };

  const [attendance, setAttendance] = useState(() => buildInitialStatus());

  // Reset when date or type changes
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSaved(false);
    const map = {};
    list.forEach((p) => {
      const found = records.find(
        (r) => r.date === newDate && r.type === type && r.personId === p.id,
      );
      map[p.id] = found ? found.status : "Present";
    });
    setAttendance(map);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setSaved(false);
    const newList = newType === "student" ? students : teachers;
    const map = {};
    newList.forEach((p) => {
      const found = records.find(
        (r) => r.date === date && r.type === newType && r.personId === p.id,
      );
      map[p.id] = found ? found.status : "Present";
    });
    setAttendance(map);
  };

  const handleStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  // Mark all at once
  const markAll = (status) => {
    const map = {};
    list.forEach((p) => (map[p.id] = status));
    setAttendance(map);
    setSaved(false);
  };

  const handleSave = () => {
    const entries = list.map((p) => ({
      personId: p.id,
      personName:
        type === "student" ? `${p.FirstName} ${p.lastName}` : p.fullName,
      status: attendance[p.id] || "Present",
    }));
    dispatch(saveAttendance({ date, type, entries }));
    setSaved(true);
  };

  // Summary counts
  const presentCount = Object.values(attendance).filter(
    (s) => s === "Present",
  ).length;
  const absentCount = Object.values(attendance).filter(
    (s) => s === "Absent",
  ).length;
  const leaveCount = Object.values(attendance).filter(
    (s) => s === "Leave",
  ).length;

  const statusColor = (status) => {
    if (status === "Present") return "btn-success";
    if (status === "Absent") return "btn-error";
    if (status === "Leave") return "btn-warning";
  };

  const badgeColor = (status) => {
    if (status === "Present") return "badge-success";
    if (status === "Absent") return "badge-error";
    if (status === "Leave") return "badge-warning";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 uppercase">Attendance</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        {/* Date picker */}
        <div>
          <p className="text-sm text-base-content/60 mb-1">Date</p>
          <input
            type="date"
            className="input input-bordered"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

        {/* Type toggle */}
        <div>
          <p className="text-sm text-base-content/60 mb-1">Type</p>
          <div className="join">
            <button
              className={`btn join-item ${type === "student" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => handleTypeChange("student")}
            >
              Students
            </button>
            <button
              className={`btn join-item ${type === "teacher" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => handleTypeChange("teacher")}
            >
              Teachers
            </button>
          </div>
        </div>

        {/* Mark all buttons */}
        <div>
          <p className="text-sm text-base-content/60 mb-1">Mark All</p>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => markAll("Present")}
            >
              All Present
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => markAll("Absent")}
            >
              All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-200 p-4 text-center">
          <p className="text-sm text-base-content/60">Present</p>
          <p className="text-3xl font-bold text-success">{presentCount}</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <p className="text-sm text-base-content/60">Absent</p>
          <p className="text-3xl font-bold text-error">{absentCount}</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <p className="text-sm text-base-content/60">Leave</p>
          <p className="text-3xl font-bold text-warning">{leaveCount}</p>
        </div>
      </div>

      {/* Attendance Table */}
      {list.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-xl border border-base-300 mb-6">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  {type === "student" && <th>Class</th>}
                  {type === "teacher" && <th>Subject</th>}
                  <th>Status</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {list.map((person, index) => (
                  <tr key={person.id}>
                    <td>{index + 1}</td>
                    <td>
                      {type === "student"
                        ? `${person.FirstName} ${person.lastName}`
                        : person.fullName}
                    </td>
                    <td>
                      {type === "student"
                        ? person.class || "N/A"
                        : person.subject || "N/A"}
                    </td>
                    <td>
                      <span
                        className={`badge ${badgeColor(attendance[person.id] || "Present")}`}
                      >
                        {attendance[person.id] || "Present"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {["Present", "Absent", "Leave"].map((status) => (
                          <button
                            key={status}
                            className={`btn btn-xs ${
                              attendance[person.id] === status
                                ? statusColor(status)
                                : "btn-ghost border border-base-300"
                            }`}
                            onClick={() => handleStatus(person.id, status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button className="btn btn-primary w-40" onClick={handleSave}>
              Save Attendance
            </button>
            {saved && (
              <span className="text-success font-medium">
                ✅ Attendance saved for {date}!
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-base-content/50 py-16 border border-base-300 rounded-xl">
          No {type === "student" ? "students" : "teachers"} found. Add some
          first!
        </div>
      )}
    </div>
  );
};

export default Attendance;
