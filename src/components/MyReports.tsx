import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import StatusTimeline from "@/components/StatusTimeline";
import RewardCelebration from "@/components/RewardCelebration";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const MyReports = () => {
  const { user, reports } = useApp();
  const myReports = reports.filter((r) => r.userId === user?.id);
  const [showReward, setShowReward] = useState(false);
  const prevReportsRef = useRef(reports);

  // Watch for status changes to "cleaned" for user's reports
  useEffect(() => {
    const prev = prevReportsRef.current;
    myReports.forEach((report) => {
      const prevReport = prev.find((r) => r.id === report.id);
      if (prevReport && prevReport.status !== "cleaned" && report.status === "cleaned") {
        setShowReward(true);
      }
    });
    prevReportsRef.current = reports;
  }, [reports, myReports]);

  if (myReports.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <ClipboardList className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground">कोई report नहीं है। Waste upload करें!</p>
      </div>
    );
  }

  return (
    <div>
      <RewardCelebration
        show={showReward}
        points={50}
        userName={user?.name}
        onClose={() => setShowReward(false)}
      />

      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-semibold">My Reports</h2>
      </div>
      <div className="space-y-4">
        {myReports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`bg-card rounded-xl border p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow ${
              report.status === "cleaned" ? "border-primary/50 bg-primary/5" : "border-border"
            }`}
          >
            <img src={report.imageUrl} alt="Waste" className="w-full md:w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{report.wasteType} — {report.binSuggestion}</span>
                <span className="text-xs text-muted-foreground">{new Date(report.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 truncate">📍 {report.address}</p>
              <StatusTimeline status={report.status} />
              {report.status === "cleaned" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-primary font-semibold mt-2"
                >
                  ✅ Waste collected! +50 bonus points मिले
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;
