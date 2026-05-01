import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addStudents, updateStudent } from "../Redux/Feature/AddstudentSlice";

const AddStudents = () => {
  const [Studentdata, setStudent] = useState({
    FirstName: "",
    lastName: "",
    dob: "",
    Gender: "",
    contact: "",
    CNIC: "",
    email: "",
    class: "",
    coursename: "",
    campus: "",
    currentAddress: "",
    city: "",
    id: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    if (id) {
      const editStd = students.find((s) => s.id == id);
      if (editStd) setStudent(editStd);
    }
  }, []);

  const onhandlestudentdata = (evt, propertyname) => {
    setStudent((prev) => ({ ...prev, [propertyname]: evt.target.value }));
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
    if (id) {
      dispatch(updateStudent(Studentdata));
    } else {
      dispatch(addStudents({ ...Studentdata, id: Date.now() }));
    }
    navigate("/studentRecord");
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold uppercase mb-6">
        {id ? "✏️ Edit Student" : "🎓 Student Admission Form"}
      </h1>

      <div className="bg-base-200 rounded-2xl p-6 shadow max-w-5xl">
        <form onSubmit={formSubmit}>
          {/* Section: Personal Info */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Personal Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                value={Studentdata.FirstName}
                onChange={(evt) => onhandlestudentdata(evt, "FirstName")}
                className="input input-bordered w-full"
                placeholder="Enter first name"
                type="text"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                value={Studentdata.lastName}
                onChange={(evt) => onhandlestudentdata(evt, "lastName")}
                className="input input-bordered w-full"
                placeholder="Enter last name"
                type="text"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                value={Studentdata.dob}
                onChange={(evt) => onhandlestudentdata(evt, "dob")}
                className="input input-bordered w-full"
                type="date"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={Studentdata.Gender}
                onChange={(evt) => onhandlestudentdata(evt, "Gender")}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact No</span>
              </label>
              <input
                value={Studentdata.contact}
                onChange={(evt) => onhandlestudentdata(evt, "contact")}
                className="input input-bordered w-full"
                placeholder="+92 3001234567"
                type="tel"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">CNIC No</span>
              </label>
              <input
                value={Studentdata.CNIC}
                onChange={(evt) => onhandlestudentdata(evt, "CNIC")}
                className="input input-bordered w-full"
                placeholder="41303-0000000-0"
                type="text"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                value={Studentdata.email}
                onChange={(evt) => onhandlestudentdata(evt, "email")}
                className="input input-bordered w-full"
                placeholder="example@email.com"
                type="email"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section: Academic Info */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Academic Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class</span>
              </label>
              <input
                value={Studentdata.class}
                onChange={(evt) => onhandlestudentdata(evt, "class")}
                className="input input-bordered w-full"
                placeholder="e.g. 10-A"
                type="text"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Name</span>
              </label>
              <select
                value={Studentdata.coursename}
                onChange={(evt) => onhandlestudentdata(evt, "coursename")}
                className="select select-bordered w-full"
              >
                <option value="">Select Course</option>
                <option value="web">Web Development</option>
                <option value="app">App Development</option>
                <option value="graphic">Graphic Design</option>
                <option value="ai">AI / Machine Learning</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Campus / Branch</span>
              </label>
              <select
                value={Studentdata.campus}
                onChange={(evt) => onhandlestudentdata(evt, "campus")}
                className="select select-bordered w-full"
              >
                <option value="">Select Campus</option>
                <option value="auto">Auto Ban</option>
                <option value="sadar">Sadar</option>
                <option value="sarfarz">Sarfarz Colony</option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section: Address */}
          <p className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
            Address Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Address</span>
              </label>
              <input
                value={Studentdata.currentAddress}
                onChange={(evt) => onhandlestudentdata(evt, "currentAddress")}
                className="input input-bordered w-full"
                placeholder="House no, Street, Area"
                type="text"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">District / City</span>
              </label>
              <input
                value={Studentdata.city}
                onChange={(evt) => onhandlestudentdata(evt, "city")}
                className="input input-bordered w-full"
                placeholder="e.g. Hyderabad"
                type="text"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary w-36">
              {id ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/studentRecord")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;
