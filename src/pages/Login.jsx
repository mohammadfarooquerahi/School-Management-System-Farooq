import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Feature/AuthSlice";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.authReducer);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password,
    );
    if (found) {
      const { password, ...safeUser } = found;
      dispatch(login(safeUser));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold"> Sindh Academy</h1>
            <p className="text-base-content/50 text-sm mt-1">
              School Management System
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-2">Login to your account</h2>

          {/* Quick Login Badges */}
          <div className="mb-4">
            <p className="text-xs text-base-content/50 mb-2">Quick login:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                className="badge badge-primary badge-outline cursor-pointer p-3"
                onClick={() =>
                  setForm({ email: "admin@sindh.edu", password: "Admin@123" })
                }
              >
                Admin
              </button>
              <button
                className="badge badge-success badge-outline cursor-pointer p-3"
                onClick={() =>
                  setForm({
                    email: "teacher@sindh.edu",
                    password: "Teacher@123",
                  })
                }
              >
                Teacher Demo
              </button>
              <button
                className="badge badge-info badge-outline cursor-pointer p-3"
                onClick={() =>
                  setForm({
                    email: "student@sindh.edu",
                    password: "Student@123",
                  })
                }
              >
                Student Demo
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                value={form.password}
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
              Login
            </button>
          </form>

          <div className="divider text-xs">Don't have an account?</div>

          <Link to="/createAccount">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
