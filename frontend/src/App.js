import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { AdminContextProvider } from "./contexts/AdminContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <AdminContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/Home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AdminContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
