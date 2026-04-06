import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppUser, WasteReport, ReportStatus, WasteCategory } from "@/types/app";
import { toast } from "sonner";

interface AppContextType {
  user: AppUser | null;
  reports: WasteReport[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: "user" | "host") => boolean;
  logout: () => void;
  addReport: (report: Omit<WasteReport, "id" | "timestamp" | "status" | "userId" | "userName" | "co2Saved">) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
  allUsers: AppUser[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

interface StoredUser extends AppUser {
  password: string;
}

const CO2_MAP: Record<WasteCategory, number> = {
  Plastic: 0.5,
  Organic: 0.3,
  Paper: 0.4,
  Glass: 0.6,
  "E-Waste": 1.2,
  Hazardous: 0.8,
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("eco_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [reports, setReports] = useState<WasteReport[]>(() => {
    const saved = localStorage.getItem("eco_reports");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("eco_user", JSON.stringify(user));
    else localStorage.removeItem("eco_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("eco_reports", JSON.stringify(reports));
  }, [reports]);

  const getUsers = (): StoredUser[] => {
    const saved = localStorage.getItem("eco_all_users");
    return saved ? JSON.parse(saved) : [];
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem("eco_all_users", JSON.stringify(users));
  };

  const signup = (name: string, email: string, password: string, role: "user" | "host"): boolean => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      toast.error("इस email से पहले से account है");
      return false;
    }
    if (password.length < 4) {
      toast.error("Password कम से कम 4 characters का होना चाहिए");
      return false;
    }
    const newUser: StoredUser = {
      id: `${role}_${Date.now()}`,
      name,
      email,
      role,
      points: 0,
      totalItems: 0,
      co2Saved: 0,
      joinedAt: Date.now(),
      password,
    };
    saveUsers([...users, newUser]);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    toast.success(`Welcome to CleanFuture Hub, ${name}! 🌱`);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      toast.error("Email या password गलत है");
      return false;
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    toast.success(`Welcome back, ${found.name}! 🌿`);
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info("Logout हो गया");
  };

  const addReport = (report: Omit<WasteReport, "id" | "timestamp" | "status" | "userId" | "userName" | "co2Saved">) => {
    if (!user) return;
    const co2Saved = CO2_MAP[report.wasteType] || 0.3;
    const newReport: WasteReport = {
      ...report,
      id: `rpt_${Date.now()}`,
      timestamp: Date.now(),
      status: "reported",
      userId: user.id,
      userName: user.name,
      co2Saved,
    };
    setReports((prev) => [newReport, ...prev]);
    const updatedUser = {
      ...user,
      points: user.points + 15,
      totalItems: user.totalItems + 1,
      co2Saved: +(user.co2Saved + co2Saved).toFixed(1),
    };
    setUser(updatedUser);
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...updatedUser };
      saveUsers(users);
    }
    toast.success("+15 Eco Points! 🌱", { description: "Waste classify और save हो गया।" });
  };

  const updateReportStatus = (reportId: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status } : r)));
    if (status === "cleaned") {
      // Award bonus points to the reporter
      const report = reports.find((r) => r.id === reportId);
      if (report) {
        const users = getUsers();
        const reporterIdx = users.findIndex((u) => u.id === report.userId);
        if (reporterIdx >= 0) {
          users[reporterIdx].points += 50;
          saveUsers(users);
        }
        // If the current user is the reporter, update their state too
        if (user && user.id === report.userId) {
          setUser({ ...user, points: user.points + 50 });
        }
      }
      toast.success("🎉 Area Cleaned!", { description: "Reporter को 50 bonus points मिले!" });
    }
  };

  const allUsers: AppUser[] = getUsers().map(({ password: _, ...u }) => u);

  return (
    <AppContext.Provider value={{ user, reports, login, signup, logout, addReport, updateReportStatus, allUsers }}>
      {children}
    </AppContext.Provider>
  );
};
