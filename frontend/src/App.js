import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import AirQuality from "./components/AirQuality";
import AirQualityDashboard from "./components/AirQualityDashboard";
import Extras from "./components/Extras";
import MapPage from "./components/MapPage";
import Alerts from "./components/Alerts";
import Stats from "./components/Stats";
import ContactoAyuda from "./components/ContactoAyuda";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthContext";
import { WeatherProvider } from "./hooks/useWeather";
import UserHistoryDashboard from "./components/UserHistoryDashboard";

function App() {
  return (
    <AuthProvider>
      <WeatherProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <AccessibilityPanel />
          <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/aire"
            element={
              <PrivateRoute>
                <AirQuality />
              </PrivateRoute>
            }
          />
          <Route
            path="/aire-dashboard"
            element={
              <PrivateRoute>
                <AirQualityDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/extras"
            element={
              <PrivateRoute>
                <Extras />
              </PrivateRoute>
            }
          />
          <Route
            path="/mapa"
            element={
              <PrivateRoute>
                <MapPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/alertas"
            element={
              <PrivateRoute>
                <Alerts />
              </PrivateRoute>
            }
          />
          <Route
            path="/estadisticas"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacto"
            element={
              <PrivateRoute>
                <ContactoAyuda />
              </PrivateRoute>
            }
          />
          <Route
            path="/historial"
            element={
              <PrivateRoute>
                <UserHistoryDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        </Router>
      </WeatherProvider>
    </AuthProvider>
  );
}

export default App;
