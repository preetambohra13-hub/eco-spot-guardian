import { useState } from "react";
import { Recycle, User, Shield, ArrowLeft, Mail, Lock, UserCircle } from "lucide-react";
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
          {isSignup ? "Account बनाएं" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          {isSignup ? "CleanFuture Hub में join करें और environment बचाएं" : "अपने account में login करें"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="पूरा नाम (Full Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl py-5 pl-10"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Gmail / Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl py-5 pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder={isSignup ? "अपना password बनाएं" : "Password डालें"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-5 pl-10"
            />
            {isSignup && (
              <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                कम से कम 4 characters का password बनाएं
              </p>
            )}
          </div>

          {isSignup && (
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: "user" as const, label: "User / Reporter", icon: User, desc: "कूड़ा report करें, points कमाएं" },
                { value: "host" as const, label: "Host / Admin", icon: Shield, desc: "Reports manage करें, team भेजें" },
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
            {isSignup ? "Account बनाएं" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? "पहले से account है?" : "Account नहीं है?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold hover:underline">
            {isSignup ? "Sign In करें" : "Sign Up करें"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
