import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";


export default function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/habits"
        element={
          <ProtectedRoute>
            <Habits />
          </ProtectedRoute>
        }
      /> */}

       <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
