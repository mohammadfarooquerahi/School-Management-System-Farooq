import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Layout from "./Component/Layout";
import Attendance from "./pages/Attendance";
import {
  Dashboard,
  AddStudents,
  Login,
  CreateAccountPage,
} from "./Pages/index";
import StdRecord from "./Pages/StdRecord";
import AddTeacher from "./pages/AddTeacher";
import TeacherTable from "./pages/TeacherTable";
import AddMarks from "./pages/AddMarks";
import ResultCard from "./pages/ResultCard";

// ── Protected Route Component ──────────────────────
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.authReducer);

  if (!currentUser) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/Dashboard" />;
  }

  return children;
};

// ── App ────────────────────────────────────────────
const App = () => {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />

      {/* ── Redirect root to login ── */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* ── Protected Layout Routes ── */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* All roles */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin & Teacher only */}

        <Route
          path="/addStudent/:id?"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <AddStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentRecord"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <StdRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marks"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <AddMarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <ResultCard />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/TeacherForm/:id?"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherRecord"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TeacherTable />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
