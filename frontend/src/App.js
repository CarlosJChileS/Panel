import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Placeholder from "./components/Placeholder";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AccessibilityPanel />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/aire" element={<Placeholder title="Calidad del Aire" />} />
          <Route path="/extras" element={<Placeholder title="Condiciones Extra" />} />
          <Route path="/mapa" element={<Placeholder title="Mapa de Ubicación" />} />
          <Route path="/alertas" element={<Placeholder title="Alertas" />} />
          <Route path="/estadisticas" element={<Placeholder title="Estadísticas" />} />
          <Route path="/contacto" element={<Placeholder title="Contacto" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
