
import { HomeIcon, Users, MessageSquare, Settings, Shield, Code, Award, FileText, Scale, BookOpen } from "lucide-react";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SmartAudit from "./pages/SmartAudit.jsx";
import AiIde from "./pages/AiIde.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Badges from "./pages/Badges.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AuditLab from "./pages/AuditLab";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    icon: <Users className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Smart Audit",
    to: "/smart-audit",
    icon: <Shield className="h-4 w-4" />,
    page: <SmartAudit />,
  },
  {
    title: "AI IDE",
    to: "/ai-ide",
    icon: <Code className="h-4 w-4" />,
    page: <AiIde />,
  },
  {
    title: "AuditLab",
    to: "/auditlab",
    icon: <BookOpen className="h-4 w-4" />,
    page: <AuditLab />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <Settings className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <Settings className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Badges",
    to: "/badges",
    icon: <Award className="h-4 w-4" />,
    page: <Badges />,
  },
  {
    title: "Privacy Policy",
    to: "/privacy-policy",
    icon: <FileText className="h-4 w-4" />,
    page: <PrivacyPolicy />,
  },
  {
    title: "Terms of Service",
    to: "/terms-of-service",
    icon: <Scale className="h-4 w-4" />,
    page: <TermsOfService />,
  },
];
