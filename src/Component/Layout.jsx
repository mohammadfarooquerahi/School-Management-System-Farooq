import { Link, Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Feature/AuthSlice";
import { useState, useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authReducer);

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300 sticky top-0 z-10">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          {/* Title */}
          <h1 className="px-4 text-lg font-semibold flex-1">
            Sindh Academy Umerkot
          </h1>

          {/* User Info and Logout */}
          <div className="flex items-center gap-3 mr-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-tight">
                {currentUser?.fullName}
              </p>
              <p className="text-xs text-base-content/50 capitalize">
                {currentUser?.role}
              </p>
            </div>
            <span
              className={`badge capitalize hidden sm:flex ${
                isAdmin
                  ? "badge-primary"
                  : isTeacher
                    ? "badge-success"
                    : "badge-info"
              }`}
            >
              {currentUser?.role}
            </span>
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <Outlet />
      </div>

      {/* ── Sidebar ── */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar User Badge */}
          <div className="w-full px-3 py-4 border-b border-base-300 is-drawer-close:hidden">
            <p className="text-xs text-base-content/50 uppercase tracking-widest mb-1">
              Logged in as
            </p>
            <p className="font-semibold text-sm">{currentUser?.fullName}</p>
            <span
              className={`badge badge-sm capitalize mt-1 ${
                isAdmin
                  ? "badge-primary"
                  : isTeacher
                    ? "badge-success"
                    : "badge-info"
              }`}
            >
              {currentUser?.role}
            </span>
          </div>

          <ul className="menu w-full grow">
            {/* ── Dashboard — All roles ── */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            {/* ── Admin & Teacher only ── */}
            {(isAdmin || isTeacher) && (
              <>
                <li className="is-drawer-close:hidden">
                  <span className="text-xs text-base-content/40 uppercase px-3 pt-3 pb-1 tracking-widest">
                    Students
                  </span>
                </li>
                <li>
                  <Link
                    to="/addStudent"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admission Form"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                    <span className="is-drawer-close:hidden">
                      Admission Form
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/studentRecord"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Student Records"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <circle cx="12" cy="7" r="3"></circle>
                      <path d="M5 20c0-4 3-6 7-6s7 2 7 6"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">
                      Students Record
                    </span>
                  </Link>
                </li>

                <li className="is-drawer-close:hidden">
                  <span className="text-xs text-base-content/40 uppercase px-3 pt-3 pb-1 tracking-widest">
                    Academics
                  </span>
                </li>
                <li>
                  <Link
                    to="/attendance"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Attendance"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <path d="M9 11l3 3l8-8" />
                      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                    </svg>
                    <span className="is-drawer-close:hidden">Attendance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marks"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Marks"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span className="is-drawer-close:hidden">Add Marks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/result"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Result Card"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="16 2 9 8 10 8" />
                      <line x1="8" y1="2" x2="16" y2="2" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                    <span className="is-drawer-close:hidden">Result Card</span>
                  </Link>
                </li>
              </>
            )}

            {/* ── Admin only ── */}
            {isAdmin && (
              <>
                <li className="is-drawer-close:hidden">
                  <span className="text-xs text-base-content/40 uppercase px-3 pt-3 pb-1 tracking-widest">
                    Teachers
                  </span>
                </li>
                <li>
                  <Link
                    to="/teacherForm"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Teacher"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <circle cx="12" cy="7" r="5"></circle>
                      <path d="M5 20c0-4 3-6 7-6s7 2 7 6"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Add Teacher</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teacherRecord"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Teacher Records"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <circle cx="12" cy="21" r="3"></circle>
                      <path d="M5 20c0-4 3-6 7-6s7 2 7 6"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">
                      Teacher Records
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* ── Student only ── */}
            {isStudent && (
              <>
                <li className="is-drawer-close:hidden">
                  <span className="text-xs text-base-content/40 uppercase px-3 pt-3 pb-1 tracking-widest">
                    My Academic
                  </span>
                </li>
                <li>
                  <Link
                    to="/result"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Result"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                    <span className="is-drawer-close:hidden">My Result</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/attendance"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Attendance"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="size-4 inline-block"
                    >
                      <path d="M9 11l3 3l8-8" />
                      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                    </svg>
                    <span className="is-drawer-close:hidden">
                      My Attendance
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* ── Settings — All roles ── */}
            <li className="mt-auto">
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right w-full"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>

            {/* ── Logout in sidebar too ── */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-error w-full"
                data-tip="Logout"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-4 inline-block"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
            {/* Theme Toggle Button */}
            <button
              className="btn btn-sm btn-ghost btn-circle"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                // Sun icon — click to go light
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                // Moon icon — click to go dark
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
