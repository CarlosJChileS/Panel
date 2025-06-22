import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AccessibilityPanel />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
