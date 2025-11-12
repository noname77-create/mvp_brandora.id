import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Sidebar from "./components/Layout/Sidebar";
import MobileNav from "./components/Layout/MobileNav";
import Dashboard from "./components/Dashboard/Dashboard";
import SocialMediaKit from "./components/SocialMediaKit/SocialMediaKit";
import TemplateEditor from "./components/Editor/TemplateEditor";
import BankIdeation from "./components/BankIdeation/BankIdeation";
import ContentPlanning from "./components/ContentPlanning/ContentPlanning";
import PerformanceReport from "./components/PerformanceReport/PerformanceReport";
import ConsultationExpert from "./components/ConsultationExpert/ConsultationExpert";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

function AppContent() {
  const { user, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!isMobile && <Sidebar />}

        <div className={`${!isMobile ? "ml-64" : ""} ${isMobile ? "pb-16" : ""}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/social-media-kit" element={<SocialMediaKit />} />
            <Route path="/editor/:templateId?" element={<TemplateEditor />} />
            <Route path="/bank-ideation" element={<BankIdeation />} />
            <Route path="/content-planning" element={<ContentPlanning />} />
            <Route path="/performance-report" element={<PerformanceReport />} />
            <Route path="/consultation-expert" element={<ConsultationExpert />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

        {isMobile && <MobileNav />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
