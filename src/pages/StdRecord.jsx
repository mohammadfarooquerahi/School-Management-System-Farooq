import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../redux/Feature/AddstudentSlice";

const StudentTable = () => {
  const { students } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // Unique classes and courses from actual data
  const uniqueClasses = [
    ...new Set(students.map((s) => s.class).filter(Boolean)),
  ];
  const uniqueCourses = [
    ...new Set(students.map((s) => s.coursename).filter(Boolean)),
  ];

  //  Filter using FirstName + lastName
  const filteredStudents = students.filter((s) => {
    const fullName = `${s.FirstName} ${s.lastName}`.toLowerCase();
    const matchName = fullName.includes(search.toLowerCase());
    const matchClass = classFilter ? s.class === classFilter : true;
    const matchCourse = courseFilter ? s.coursename === courseFilter : true;
    return matchName && matchClass && matchCourse;
  });

  const handleDelete = (id) => dispatch(deleteStudent(id));
  // const handleEdit = (item) => navigate(`/StudentForm/${item.id}`);
  const handleEdit = (item) => navigate(`/addStudent/${item.id}`);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 uppercase">Student Records</h2>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full sm:w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full sm:w-44"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((cls, i) => (
            <option key={i} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full sm:w-48"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="web">Web Development</option>
          <option value="app">App Development</option>
          <option value="graphic">Graphic Design</option>
          <option value="ai">AI / Machine Learning</option>
        </select>

        {(search || classFilter || courseFilter) && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setSearch("");
              setClassFilter("");
              setCourseFilter("");
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-base-content/50 mb-3">
        Showing {filteredStudents.length} of {students.length} students
      </p>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Course</th>
              <th>Campus</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>
                    {s.FirstName} {s.lastName}
                  </td>
                  <td>{s.class || "N/A"}</td>
                  <td>{s.coursename || "N/A"}</td>
                  <td>{s.campus || "N/A"}</td>
                  <td>{s.contact || "N/A"}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-base-content/50 py-6"
                >
                  {search || classFilter || courseFilter
                    ? "No students match your search"
                    : "No students added yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
