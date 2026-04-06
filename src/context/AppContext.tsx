import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppUser, WasteReport, ReportStatus } from "@/types/app";
import { toast } from "sonner";

interface AppContextType {
  user: AppUser | null;
  reports: WasteReport[];
  login: (name: string, role: "user" | "host") => void;
  logout: () => void;
  addReport: (report: Omit<WasteReport, "id" | "timestamp" | "status" | "userId">) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("cf_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [reports, setReports] = useState<WasteReport[]>(() => {
    const saved = localStorage.getItem("cf_reports");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("cf_user", JSON.stringify(user));
    else localStorage.removeItem("cf_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cf_reports", JSON.stringify(reports));
  }, [reports]);

  const login = (name: string, role: "user" | "host") => {
    setUser({ id: `${role}_${Date.now()}`, name, role, points: 0 });
  };

  const logout = () => setUser(null);

  const addReport = (report: Omit<WasteReport, "id" | "timestamp" | "status" | "userId">) => {
    if (!user) return;
    const newReport: WasteReport = {
      ...report,
      id: `rpt_${Date.now()}`,
      timestamp: Date.now(),
      status: "reported",
      userId: user.id,
    };
    setReports((prev) => [newReport, ...prev]);
    setUser((prev) => prev ? { ...prev, points: prev.points + 10 } : prev);
    toast.success("+10 Eco Points! 🌱", { description: "Thank you for reporting waste." });
  };

  const updateReportStatus = (reportId: string, status: ReportStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status } : r))
    );
    if (status === "cleaned") {
      toast.success("🎉 Spot Cleaned!", { description: "Thank you for making the world cleaner!" });
    }
  };

  return (
    <AppContext.Provider value={{ user, reports, login, logout, addReport, updateReportStatus }}>
      {children}
    </AppContext.Provider>
  );
};
