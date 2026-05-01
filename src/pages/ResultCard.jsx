import React, { useState } from "react";
import { useSelector } from "react-redux";

const EXAMS = ["Mid Term", "Final Term", "Unit Test", "Annual"];

const getGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

const ResultCard = () => {
  const { students } = useSelector((state) => state.studentReducer);
  const { results } = useSelector((state) => state.marksReducer);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [exam, setExam] = useState("Mid Term");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const result = results.find(
    (r) => r.studentId == selectedStudent && r.exam === exam && r.year === year,
  );

  const student = students.find((s) => s.id == selectedStudent);

  const totalObtained = result
    ? result.subjects.reduce((sum, s) => sum + (Number(s.obtained) || 0), 0)
    : 0;
  const totalMarks = result
    ? result.subjects.reduce((sum, s) => sum + (Number(s.total) || 0), 0)
    : 0;
  const percentage =
    totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(1) : 0;
  const grade = getGrade(percentage);
  const pass = percentage >= 50;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 uppercase">Result Card</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <p className="text-sm text-base-content/60 mb-1">Student</p>
          <select
            className="select select-bordered w-56"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
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
            onChange={(e) => setExam(e.target.value)}
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
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>

      {/* Marksheet */}
      {result && student ? (
        <div className="border border-base-300 rounded-2xl overflow-hidden max-w-3xl">
          {/* Header */}
          <div className="bg-primary text-primary-content p-6 text-center">
            <h3 className="text-xl font-bold uppercase">
              Sindh Acedemy Umerkot
            </h3>
            <p className="text-sm opacity-80">School Management System</p>
            <p className="text-lg font-semibold mt-2">
              {exam} — {year}
            </p>
          </div>

          {/* Student Info */}
          <div className="bg-base-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-base-content/60">Name: </span>
              <span className="font-semibold">
                {student.FirstName} {student.lastName}
              </span>
            </div>
            <div>
              <span className="text-base-content/60">Class: </span>
              <span className="font-semibold">{student.class || "N/A"}</span>
            </div>
            <div>
              <span className="text-base-content/60">Course: </span>
              <span className="font-semibold">
                {student.coursename || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-base-content/60">Campus: </span>
              <span className="font-semibold">{student.campus || "N/A"}</span>
            </div>
            <div>
              <span className="text-base-content/60">Email: </span>
              <span className="font-semibold">{student.email || "N/A"}</span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="p-6">
            <table className="table w-full border border-base-300 rounded-xl overflow-hidden mb-6">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Obtained</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((s, i) => {
                  const pct =
                    s.total > 0 ? ((s.obtained / s.total) * 100).toFixed(1) : 0;
                  const g = getGrade(pct);
                  const subPass = pct >= 50;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="font-medium">{s.name}</td>
                      <td>{s.obtained}</td>
                      <td>{s.total}</td>
                      <td>{pct}%</td>
                      <td>
                        <span
                          className={`badge ${g === "F" ? "badge-error" : g.startsWith("A") ? "badge-success" : "badge-warning"}`}
                        >
                          {g}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${subPass ? "badge-success" : "badge-error"}`}
                        >
                          {subPass ? "Pass" : "Fail"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Final Result Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card bg-base-200 p-4 text-center">
                <p className="text-xs text-base-content/60">Total Marks</p>
                <p className="text-xl font-bold">
                  {totalObtained} / {totalMarks}
                </p>
              </div>
              <div className="card bg-base-200 p-4 text-center">
                <p className="text-xs text-base-content/60">Percentage</p>
                <p className="text-xl font-bold">{percentage}%</p>
              </div>
              <div className="card bg-base-200 p-4 text-center">
                <p className="text-xs text-base-content/60">Grade</p>
                <p className="text-xl font-bold">{grade}</p>
              </div>
              <div className="card bg-base-200 p-4 text-center">
                <p className="text-xs text-base-content/60">Result</p>
                <p
                  className={`text-xl font-bold ${pass ? "text-success" : "text-error"}`}
                >
                  {pass ? "PASS" : "FAIL"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-base-200 px-6 py-3 text-center text-xs text-base-content/50">
            Generated by School Management System - Sindh Acedemy Umerkot -
            farooq
          </div>
        </div>
      ) : selectedStudent ? (
        <div className="text-center text-base-content/50 py-16 border border-base-300 rounded-xl max-w-3xl">
          No result found for this student in {exam} {year}
        </div>
      ) : (
        <div className="text-center text-base-content/50 py-16 border border-base-300 rounded-xl max-w-3xl">
          Select a student to view their result card
        </div>
      )}
    </div>
  );
};

export default ResultCard;
