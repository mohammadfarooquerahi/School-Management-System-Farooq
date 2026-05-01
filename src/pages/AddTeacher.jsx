import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addteacher, updateTeacher } from "../redux/Feature/Addteacher";
import { useParams, useNavigate } from "react-router";

const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    qualification: "",
    experience: "",
    salary: "",
    id: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers } = useSelector((state) => state.teacherReducer);

  useEffect(() => {
    if (id) {
      const editTeacher = teachers.find((t) => t.id == id);
      if (editTeacher) setTeacherData(editTeacher);
    }
  }, []);

  const onHandleTeacherData = (event, propertyName) => {
    setTeacherData((prev) => ({ ...prev, [propertyName]: event.target.value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(updateTeacher(teacherData));
    } else {
      dispatch(addteacher({ ...teacherData, id: Date.now() }));
    }
    navigate("/teacherRecord");
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold uppercase mb-6">
        {id ? " Edit Teacher" : " Add Teacher"}
      </h1>

      <div className="bg-base-200 rounded-2xl p-6 shadow max-w-5xl">
        <form onSubmit={onFormSubmit}>
          {/* Section: Personal Info */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Personal Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                value={teacherData.fullName}
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter full name"
                onChange={(e) => onHandleTeacherData(e, "fullName")}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                value={teacherData.dob}
                type="date"
                className="input input-bordered w-full"
                onChange={(e) => onHandleTeacherData(e, "dob")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={teacherData.gender}
                className="select select-bordered w-full"
                onChange={(e) => onHandleTeacherData(e, "gender")}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                value={teacherData.email}
                type="email"
                className="input input-bordered w-full"
                placeholder="example@email.com"
                onChange={(e) => onHandleTeacherData(e, "email")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                value={teacherData.phone}
                type="tel"
                className="input input-bordered w-full"
                placeholder="+92 3001234567"
                onChange={(e) => onHandleTeacherData(e, "phone")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                value={teacherData.address}
                type="text"
                className="input input-bordered w-full"
                placeholder="House no, Street, Area"
                onChange={(e) => onHandleTeacherData(e, "address")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section: Professional Info */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Professional Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                value={teacherData.subject}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Mathematics"
                onChange={(e) => onHandleTeacherData(e, "subject")}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Qualification</span>
              </label>
              <input
                value={teacherData.qualification}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. M.Sc, B.Ed"
                onChange={(e) => onHandleTeacherData(e, "qualification")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Experience</span>
              </label>
              <input
                value={teacherData.experience}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. 5 years"
                onChange={(e) => onHandleTeacherData(e, "experience")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section: Salary */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Salary Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Monthly Salary (PKR)</span>
              </label>
              <input
                value={teacherData.salary}
                type="number"
                className="input input-bordered w-full"
                placeholder="e.g. 25000"
                onChange={(e) => onHandleTeacherData(e, "salary")}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary w-36">
              {id ? "Update" : "Add Teacher"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/teacherRecord")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
