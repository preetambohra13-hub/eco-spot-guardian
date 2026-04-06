import { useState } from "react";
import { Recycle, User, Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { login, signup, user } = useApp();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "host">("user");

  // If already logged in, redirect
  if (user) {
    navigate(user.role === "host" ? "/host" : "/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    let success: boolean;
    if (isSignup) {
      if (!name.trim()) return;
      success = signup(name.trim(), email.trim(), password, role);
    } else {
      success = login(email.trim(), password);
    }

    if (success) {
      // After login, we need to check role from context - will redirect on re-render
      setTimeout(() => {
        navigate(role === "host" ? "/host" : "/dashboard");
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-3xl border border-border shadow-2xl p-8 md:p-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-4 rounded-2xl">
            <Recycle className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-center mb-1">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          {isSignup ? "Join EcoSort and start making a difference" : "Login to your EcoSort account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl py-5"
            />
          )}

          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl py-5"
          />

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-5"
            />
            {isSignup && (
              <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                User password: <strong>user@2026</strong> | Host password: <strong>host@2026</strong>
              </p>
            )}
          </div>

          {isSignup && (
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: "user" as const, label: "Reporter", icon: User, desc: "Classify & earn points" },
                { value: "host" as const, label: "Host/Admin", icon: Shield, desc: "Manage reports" },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    role === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <opt.icon className={`h-5 w-5 mb-2 ${role === opt.value ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-sm">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-5 rounded-xl text-base">
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold hover:underline">
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
