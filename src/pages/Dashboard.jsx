import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // ✅ Get data directly from Redux store
  const { students } = useSelector((state) => state.studentReducer);
  const { teachers } = useSelector((state) => state.teacherReducer);

  const recentStudents = students.slice(-5).reverse();
  const recentTeachers = teachers.slice(-5).reverse();

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 uppercase">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card bg-base-200 shadow">
          <div className="card-body flex flex-row justify-between items-center p-4">
            <div>
              <p className="text-sm text-base-content/60">Total Students</p>
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <div className="text-3xl bg-blue-900 p-3 rounded-xl">🎓</div>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body flex flex-row justify-between items-center p-4">
            <div>
              <p className="text-sm text-base-content/60">Total Teachers</p>
              <p className="text-3xl font-bold">{teachers.length}</p>
            </div>
            <div className="text-3xl bg-green-900 p-3 rounded-xl">👨‍🏫</div>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body flex flex-row justify-between items-center p-4">
            <div>
              <p className="text-sm text-base-content/60">Present Today</p>
              <p className="text-3xl font-bold">
                {Math.floor(students.length * 0.85)}
              </p>
            </div>
            <div className="text-3xl bg-yellow-900 p-3 rounded-xl">✅</div>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body flex flex-row justify-between items-center p-4">
            <div>
              <p className="text-sm text-base-content/60">New This Month</p>
              <p className="text-3xl font-bold">
                {Math.floor(students.length * 0.2)}
              </p>
            </div>
            <div className="text-3xl bg-pink-900 p-3 rounded-xl">➕</div>
          </div>
        </div>
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🎓 Recent Students</h3>
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.length > 0 ? (
                  recentStudents.map((s, i) => (
                    <tr key={i}>
                      <td>
                        {s.FirstName} {s.lastName}
                      </td>
                      <td>{s.class || s.className || "N/A"}</td>
                      <td>
                        <span className="badge badge-success badge-sm">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center text-base-content/50 py-4"
                    >
                      No students added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Teachers */}
        <div>
          <h3 className="text-lg font-semibold mb-3">👨‍🏫 Recent Teachers</h3>
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTeachers.length > 0 ? (
                  recentTeachers.map((t, i) => (
                    <tr key={i}>
                      <td>{t.fullName}</td>
                      <td>{t.subject || "N/A"}</td>
                      <td>
                        <span className="badge badge-info badge-sm">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center text-base-content/50 py-4"
                    >
                      No teachers added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
