import { Leaf, LogOut, Coins, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useApp();
  if (!user) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card border-b border-border/50 px-4 md:px-8 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="gradient-bg p-2 rounded-lg">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg gradient-text">CleanFuture Hub</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {user.role === "user" && (
            <div className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-full">
              <Coins className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">{user.points}</span>
            </div>
          )}
          {user.role === "host" && (
            <div className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-full">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Host</span>
            </div>
          )}
          <span className="text-sm text-muted-foreground hidden md:block">
            Hi, {user.name}
          </span>
          <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
