import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveMarks } from "../redux/Feature/MarksSlice";

const PRESET_SUBJECTS = [
  "Mathematics",
  "English",
  "Urdu",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Islamiat",
];

const EXAMS = ["Mid Term", "Final Term", "Unit Test", "Annual"];

const getGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

const AddMarks = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentReducer);
  const { results } = useSelector((state) => state.marksReducer);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [exam, setExam] = useState("Mid Term");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", obtained: "", total: "100" },
    { name: "English", obtained: "", total: "100" },
  ]);
  const [customSubject, setCustomSubject] = useState("");
  const [saved, setSaved] = useState(false);

  // Load existing marks when student/exam/year changes
  const loadExisting = (stdId, ex, yr) => {
    const found = results.find(
      (r) => r.studentId == stdId && r.exam === ex && r.year === yr,
    );
    if (found) {
      setSubjects(found.subjects.map((s) => ({ ...s })));
    } else {
      setSubjects([
        { name: "Mathematics", obtained: "", total: "100" },
        { name: "English", obtained: "", total: "100" },
      ]);
    }
    setSaved(false);
  };

  const handleStudentChange = (id) => {
    setSelectedStudent(id);
    loadExisting(id, exam, year);
  };

  const handleExamChange = (ex) => {
    setExam(ex);
    loadExisting(selectedStudent, ex, year);
  };

  const handleYearChange = (yr) => {
    setYear(yr);
    loadExisting(selectedStudent, exam, yr);
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
    setSaved(false);
  };

  const addSubjectFromDropdown = (name) => {
    if (!name || subjects.find((s) => s.name === name)) return;
    setSubjects([...subjects, { name, obtained: "", total: "100" }]);
  };

  const addCustomSubject = () => {
    if (!customSubject.trim()) return;
    if (subjects.find((s) => s.name === customSubject.trim())) return;
    setSubjects([
      ...subjects,
      { name: customSubject.trim(), obtained: "", total: "100" },
    ]);
    setCustomSubject("");
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!selectedStudent) return alert("Please select a student first!");
    const student = students.find((s) => s.id == selectedStudent);
    const studentName = `${student.FirstName} ${student.lastName}`;
    dispatch(
      saveMarks({
        studentId: selectedStudent,
        studentName,
        exam,
        year,
        subjects,
      }),
    );
    setSaved(true);
  };

  // Live summary
  const totalObtained = subjects.reduce(
    (sum, s) => sum + (Number(s.obtained) || 0),
    0,
  );
  const totalMarks = subjects.reduce(
    (sum, s) => sum + (Number(s.total) || 0),
    0,
  );
  const percentage =
    totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(1) : 0;
  const grade = getGrade(percentage);
  const pass = percentage >= 50;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 uppercase">Add / Edit Marks</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <p className="text-sm text-base-content/60 mb-1">Select Student</p>
          <select
            className="select select-bordered w-56"
            value={selectedStudent}
            onChange={(e) => handleStudentChange(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.FirstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-base-content/60 mb-1">Exam</p>
          <select
            className="select select-bordered"
            value={exam}
            onChange={(e) => handleExamChange(e.target.value)}
          >
            {EXAMS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-base-content/60 mb-1">Year</p>
          <input
            type="number"
            className="input input-bordered w-28"
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
          />
        </div>
      </div>

      {/* Add Subject Row */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div>
          <p className="text-sm text-base-content/60 mb-1">Add from list</p>
          <select
            className="select select-bordered"
            onChange={(e) => addSubjectFromDropdown(e.target.value)}
            value=""
          >
            <option value="">-- Add Subject --</option>
            {PRESET_SUBJECTS.filter(
              (ps) => !subjects.find((s) => s.name === ps),
            ).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm text-base-content/60 mb-1">Or type custom</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered w-44"
              placeholder="e.g. Fine Arts"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomSubject()}
            />
            <button
              className="btn btn-primary px-6 mr-3"
              onClick={addCustomSubject}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="overflow-x-auto rounded-xl border border-base-300 mb-6">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Obtained Marks</th>
              <th>Total Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => {
              const pct =
                s.total > 0 ? ((s.obtained / s.total) * 100).toFixed(1) : 0;
              const g = getGrade(pct);
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="font-medium">{s.name}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-24"
                      value={s.obtained}
                      min={0}
                      max={s.total}
                      onChange={(e) =>
                        handleSubjectChange(i, "obtained", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-24"
                      value={s.total}
                      onChange={(e) =>
                        handleSubjectChange(i, "total", e.target.value)
                      }
                    />
                  </td>
                  <td>{s.obtained ? `${pct}%` : "-"}</td>
                  <td>
                    <span
                      className={`badge ${g === "F" ? "badge-error" : g.startsWith("A") ? "badge-success" : "badge-warning"}`}
                    >
                      {s.obtained ? g : "-"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error btn-ghost"
                      onClick={() => removeSubject(i)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Summary */}
      {subjects.some((s) => s.obtained) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="card bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">Total Obtained</p>
            <p className="text-2xl font-bold">
              {totalObtained} / {totalMarks}
            </p>
          </div>
          <div className="card bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">Percentage</p>
            <p className="text-2xl font-bold">{percentage}%</p>
          </div>
          <div className="card bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">Grade</p>
            <p className="text-2xl font-bold">{grade}</p>
          </div>
          <div className="card bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">Result</p>
            <p
              className={`text-2xl font-bold ${pass ? "text-success" : "text-error"}`}
            >
              {pass ? "PASS" : "FAIL"}
            </p>
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          className="btn btn-primary w-40 border border-blue-900"
          onClick={handleSave}
        >
          Save Marks
        </button>
        {saved && (
          <span className="text-success font-medium">
            Marks saved successfully.
          </span>
        )}
      </div>
    </div>
  );
};

export default AddMarks;
