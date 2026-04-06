import { Recycle, Upload, Trophy, MapPin, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useApp();
  const location = useLocation();

  const isLanding = !user;
  const isHost = user?.role === "host";

  const landingLinks = [
    { to: "/categories", label: "Categories" },
    { to: "/impact", label: "Impact" },
  ];

  const userLinks = [
    { to: "/upload", label: "Upload Waste", icon: Upload },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/map", label: "Centers", icon: MapPin },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Recycle className="h-6 w-6" />
          <span className="font-display font-bold text-xl">EcoSort</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          {isLanding && landingLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hidden md:inline-block text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors px-3 py-1"
            >
              {link.label}
            </Link>
          ))}

          {user && !isHost && userLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                location.pathname === link.to
                  ? "bg-primary-foreground/20"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          ))}

          {user && isHost && (
            <Link
              to="/host"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-primary-foreground/20"
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <Link to="/auth">
              <Button size="sm" variant="secondary" className="rounded-full font-semibold text-primary">
                <LogOut className="h-4 w-4 mr-1.5" />
                Get Started
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => { logout(); window.location.href = "/"; }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
