import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import ApiKeyModal from "./components/ApiKeyModal";
import DeviceDashboard from "./components/DeviceDashboard";
import "./App.css";
import AuthRoute from './components/AuthRoute';

function App() {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleRegistrationSuccess = (key) => {
    setApiKey(key);
    setShowApiKeyModal(true);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<RegistrationForm onSuccess={handleRegistrationSuccess} />}
          />

          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <DeviceDashboard />
              </AuthRoute>
            }
          />
        </Routes>

        {showApiKeyModal && localStorage.getItem("token") && (
            <ApiKeyModal
              apiKey={apiKey}
              onClose={() => setShowApiKeyModal(false)}
            />
        )}
      </div>
    </Router>
  );
}

export default App;
