import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/auth/AuthContext";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Help from "@/pages/Help";
import Services from "@/pages/Services";
import RenewPassport from "@/pages/RenewPassport";
import MyApplications from "@/pages/MyApplications";
import TrackStatus from "@/pages/TrackStatus";
import Support from "@/pages/Support";
import Placeholder from "@/pages/Placeholder";
import NotFound from "@/pages/NotFound";

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />

        {/* Protected — no page content is shown unless signed in */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/renew" element={<RenewPassport />} />
          <Route path="/services/issue" element={<Placeholder titleKey="new_passport" />} />
          <Route path="/services/lost" element={<Placeholder titleKey="report_lost" />} />
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/track" element={<TrackStatus />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<Placeholder titleKey="footer_about_name" />} />
          <Route path="/sitemap" element={<Placeholder titleKey="footer_sitemap" />} />
          <Route path="/terms" element={<Placeholder titleKey="footer_terms" />} />
          <Route path="/privacy" element={<Placeholder titleKey="footer_privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
