import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Inbox, MapPin, Image, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import HostReportCard from "@/components/HostReportCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const HostDashboard = () => {
  const { user, reports } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
    if (user && user.role !== "host") navigate("/dashboard");
  }, [user, navigate]);

  if (!user) return null;

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status !== "cleaned").length,
    cleaned: reports.filter((r) => r.status === "cleaned").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl md:text-3xl font-bold">Command Center</h1>
          </div>
          <p className="text-muted-foreground">Manage waste reports and dispatch cleaning teams</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Reports", value: stats.total, color: "text-foreground" },
            { label: "Pending", value: stats.pending, color: "text-amber-500" },
            { label: "Cleaned", value: stats.cleaned, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 text-center">
              <p className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="reports">
          <TabsList className="mb-6">
            <TabsTrigger value="reports">📋 Reports</TabsTrigger>
            <TabsTrigger value="uploads">📸 Uploads</TabsTrigger>
            <TabsTrigger value="map">🗺️ Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            {reports.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Inbox className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No reports yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report, idx) => (
                  <HostReportCard key={report.id} report={report} index={idx} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="uploads">
            <div className="space-y-4">
              {reports.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No uploads yet.</p>
                </div>
              ) : (
                reports.map((r) => (
                  <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex gap-4">
                    <img src={r.imageUrl} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{r.userName} — {r.wasteType}</p>
                      <p className="text-xs text-muted-foreground mt-1">📍 {r.address}</p>
                      <p className="text-xs text-muted-foreground">Confidence: {r.confidence}% · {new Date(r.timestamp).toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/maps?q=${r.lat},${r.lng}`, "_blank")}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <iframe
                title="Reports Map"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=76.8,28.3,77.5,28.8&layer=mapnik`}
              />
            </div>
            <div className="mt-4 space-y-2">
              {reports.map((r) => (
                <div key={r.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{r.wasteType}</span>
                  <span className="text-muted-foreground">— {r.address}</span>
                  <span className={`ml-auto text-xs font-medium ${r.status === "cleaned" ? "text-primary" : "text-amber-500"}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostDashboard;
