import { useApp } from "@/context/AppContext";
import AuthPage from "@/pages/AuthPage";
import UserDashboard from "@/pages/UserDashboard";
import HostDashboard from "@/pages/HostDashboard";

const Index = () => {
  const { user } = useApp();

  if (!user) return <AuthPage />;
  if (user.role === "host") return <HostDashboard />;
  return <UserDashboard />;
};

export default Index;
