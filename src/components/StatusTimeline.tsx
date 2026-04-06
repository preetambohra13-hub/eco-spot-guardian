import { CheckCircle2, Circle, Truck, Users, Sparkles } from "lucide-react";
import { ReportStatus } from "@/types/app";

const steps: { key: ReportStatus; label: string; icon: React.ElementType }[] = [
  { key: "reported", label: "Reported", icon: Circle },
  { key: "team_assigned", label: "Team Assigned", icon: Users },
  { key: "cleaning", label: "Cleaning", icon: Truck },
  { key: "cleaned", label: "Cleaned", icon: Sparkles },
];

const statusOrder: ReportStatus[] = ["reported", "team_assigned", "cleaning", "cleaned"];

const StatusTimeline = ({ status }: { status: ReportStatus }) => {
  const currentIdx = statusOrder.indexOf(status);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, idx) => {
        const done = idx <= currentIdx;
        const Icon = done ? CheckCircle2 : step.icon;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <Icon
                className={`h-5 w-5 ${
                  done ? "text-primary" : "text-muted-foreground/40"
                }`}
              />
              <span className={`text-[10px] mt-1 ${done ? "text-primary font-medium" : "text-muted-foreground/50"}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-6 md:w-10 h-0.5 mx-1 mt-[-12px] ${
                  idx < currentIdx ? "bg-primary" : "bg-muted-foreground/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
