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
  reported: "Assign Team",
  team_assigned: "Start Cleaning",
  cleaning: "Mark Cleaned",
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
      className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        <img src={report.imageUrl} alt="Waste" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <div className="text-primary-foreground text-xs">
            <p className="font-medium">{report.address}</p>
            <p className="opacity-80">{report.lat.toFixed(4)}, {report.lng.toFixed(4)}</p>
          </div>
        </div>
        <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
          {report.wasteType}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <Clock className="h-3 w-3" />
          {new Date(report.timestamp).toLocaleString()}
          <span className="ml-auto text-xs">by {report.userName}</span>
        </div>

        <div className="mb-4">
          <StatusTimeline status={report.status} />
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => window.open(mapsUrl, "_blank")}>
            <MapPin className="h-3 w-3 mr-1" /> Maps
          </Button>
          {next && (
            <Button
              size="sm"
              className="flex-1 text-xs bg-primary text-primary-foreground"
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
