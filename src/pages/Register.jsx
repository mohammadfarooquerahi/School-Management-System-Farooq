import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/Feature/AuthSlice";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.authReducer);
  const { students } = useSelector((state) => state.studentReducer);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    studentId: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters!");
    }
    if (users.find((u) => u.email === form.email)) {
      return setError("Email already registered!");
    }
    if (form.role === "student" && !form.studentId) {
      return setError("Please select your student record!");
    }

    const { confirmPassword, ...userData } = form;
    dispatch(register(userData));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">🏫 Sindh Academy</h1>
            <p className="text-base-content/50 text-sm mt-1">
              School Management System
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Create Account</h2>

          <form onSubmit={handleRegister}>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                name="fullName"
                type="text"
                className="input input-bordered w-full"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                className="select select-bordered w-full"
                value={form.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Show student dropdown only if role is student */}
            {form.role === "student" && (
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Select Your Student Record</span>
                </label>
                <select
                  name="studentId"
                  className="select select-bordered w-full"
                  value={form.studentId}
                  onChange={handleChange}
                >
                  <option value="">-- Select your name --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.FirstName} {s.lastName} — {s.class}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="input input-bordered w-full"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error mb-4 py-2 text-sm">
                ❌ {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="divider text-xs">Already have an account?</div>

          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
