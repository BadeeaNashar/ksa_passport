import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Services from "@/pages/Services";
import RenewPassport from "@/pages/RenewPassport";
import Placeholder from "@/pages/Placeholder";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/renew" element={<RenewPassport />} />
        <Route path="/services/issue" element={<Placeholder titleKey="new_passport" />} />
        <Route path="/services/lost" element={<Placeholder titleKey="report_lost" />} />
        <Route path="/applications" element={<Placeholder titleKey="nav_apps" />} />
        <Route path="/track" element={<Placeholder titleKey="nav_track" />} />
        <Route path="/support" element={<Placeholder titleKey="nav_support" />} />
        <Route path="/about" element={<Placeholder titleKey="footer_about_name" />} />
        <Route path="/sitemap" element={<Placeholder titleKey="footer_sitemap" />} />
        <Route path="/terms" element={<Placeholder titleKey="footer_terms" />} />
        <Route path="/privacy" element={<Placeholder titleKey="footer_privacy" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
