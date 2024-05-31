import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import ProtectedRoute from "./auth/ProtectedRoute";
import GeneralRoute from "./auth/GeneralRoute";
import Dashboard from "./pages/Dashboard";
import VoterLogin from "./pages/VoterLogin";
import VoterRegistration from "./pages/VoterRegistration";
import ElectionCommissionLogin from "./pages/ElectionCommissionLogin";

import "./reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="election-wrapper">
        <Menu />

        <Routes>
          <Route
            path="login"
            element={<GeneralRoute component={VoterLogin} />}
          />
          <Route
            path="register"
            element={<GeneralRoute component={VoterRegistration} />}
          />
          <Route
            path="election/login"
            element={<GeneralRoute component={ElectionCommissionLogin} />}
          />
          <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="*" element={<ProtectedRoute component={Dashboard} />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
