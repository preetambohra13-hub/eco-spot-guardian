import { MapPin, Users, CheckCircle2, Clock } from "lucide-react";
import { WasteReport, ReportStatus } from "@/types/app";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import StatusTimeline from "@/components/StatusTimeline";
import { motion } from "framer-motion";

const nextStatus: Record<ReportStatus, ReportStatus | null> = {
  reported: "team_assigned",
  team_assigned: "cleaning",
  cleaning: "cleaned",
  cleaned: null,
};

const actionLabels: Record<ReportStatus, string> = {
  reported: "Assign Cleaning Team",
  team_assigned: "Start Cleaning",
  cleaning: "Mark as Cleaned",
  cleaned: "Completed ✓",
};

const HostReportCard = ({ report, index }: { report: WasteReport; index: number }) => {
  const { updateReportStatus } = useApp();
  const next = nextStatus[report.status];
  const mapsUrl = `https://www.google.com/maps?q=${report.lat},${report.lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover rounded-xl overflow-hidden group"
    >
      <div className="relative">
        <img src={report.imageUrl} alt="Waste" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <div className="text-primary-foreground text-xs">
            <p className="font-medium">{report.address}</p>
            <p className="opacity-80">
              {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
            </p>
          </div>
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-primary-foreground ${
          report.binSuggestion === "Blue" ? "bg-blue-500" : "bg-emerald-600"
        }`}>
          {report.wasteType}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {new Date(report.timestamp).toLocaleString()}
          </div>
        </div>

        <div className="mb-4">
          <StatusTimeline status={report.status} />
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={() => window.open(mapsUrl, "_blank")}
          >
            <MapPin className="h-3 w-3 mr-1" />
            View on Maps
          </Button>
          {next && (
            <Button
              size="sm"
              className="flex-1 text-xs gradient-bg text-primary-foreground"
              onClick={() => updateReportStatus(report.id, next)}
            >
              {report.status === "reported" && <Users className="h-3 w-3 mr-1" />}
              {report.status === "cleaning" && <CheckCircle2 className="h-3 w-3 mr-1" />}
              {actionLabels[report.status]}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HostReportCard;
