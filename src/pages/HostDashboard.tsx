import Navbar from "@/components/Navbar";
import HostReportCard from "@/components/HostReportCard";
import { useApp } from "@/context/AppContext";
import { LayoutDashboard, Inbox } from "lucide-react";
import { motion } from "framer-motion";

const HostDashboard = () => {
  const { reports } = useApp();

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status !== "cleaned").length,
    cleaned: reports.filter((r) => r.status === "cleaned").length,
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl md:text-3xl font-bold">Command Center</h1>
          </div>
          <p className="text-muted-foreground">Manage waste reports and dispatch cleaning teams</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          {[
            { label: "Total Reports", value: stats.total, color: "text-foreground" },
            { label: "Pending", value: stats.pending, color: "text-amber-500" },
            { label: "Cleaned", value: stats.cleaned, color: "text-primary" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-4 text-center"
            >
              <p className={`font-display text-2xl md:text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No reports yet. Waiting for user submissions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, idx) => (
              <HostReportCard key={report.id} report={report} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
