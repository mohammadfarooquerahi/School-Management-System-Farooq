import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteTeacher } from "../redux/Feature/Addteacher";

const TeacherTable = () => {
  const { teachers } = useSelector((state) => state.teacherReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Search & Filter state
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  // ✅ Get unique subjects for dropdown
  const uniqueSubjects = [
    ...new Set(teachers.map((t) => t.subject).filter(Boolean)),
  ];

  // ✅ Filtered list
  const filteredTeachers = teachers.filter((t) => {
    const matchName = t.fullName?.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter ? t.subject === subjectFilter : true;
    return matchName && matchSubject;
  });

  const handleDelete = (id) => dispatch(deleteTeacher(id));
  const handleEdit = (item) => navigate(`/TeacherForm/${item.id}`);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 uppercase">Teacher Records</h2>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full sm:w-48"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {uniqueSubjects.map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Clear button — only shows when filter is active */}
        {(search || subjectFilter) && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setSearch("");
              setSubjectFilter("");
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-base-content/50 mb-3">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </p>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((t, index) => (
                <tr key={t.id}>
                  <td>{index + 1}</td>
                  <td>{t.fullName}</td>
                  <td>{t.subject}</td>
                  <td>{t.email}</td>
                  <td>{t.qualification}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
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
                  colSpan={6}
                  className="text-center text-base-content/50 py-6"
                >
                  {search || subjectFilter
                    ? "No results found"
                    : "No teachers added yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
