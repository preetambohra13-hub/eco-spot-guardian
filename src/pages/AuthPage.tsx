import { useState } from "react";
import { Leaf, User, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthPage = () => {
  const { login } = useApp();
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "host">("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 md:p-10 w-full max-w-md glow-primary"
      >
        <div className="flex justify-center mb-6">
          <div className="gradient-bg p-4 rounded-2xl">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-center mb-1">CleanFuture Hub</h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          Join the smart waste network
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary/50 border-border/50 rounded-xl py-5"
          />

          <div className="grid grid-cols-2 gap-3">
            {([
              { value: "user" as const, label: "Reporter", icon: User, desc: "Report & earn" },
              { value: "host" as const, label: "Host", icon: Shield, desc: "Manage & dispatch" },
            ]).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  role === opt.value
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <opt.icon className={`h-5 w-5 mb-2 ${role === opt.value ? "text-primary" : "text-muted-foreground"}`} />
                <p className="font-semibold text-sm">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </button>
            ))}
          </div>

          <Button type="submit" className="w-full gradient-bg text-primary-foreground font-semibold py-5 rounded-xl">
            Get Started
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
