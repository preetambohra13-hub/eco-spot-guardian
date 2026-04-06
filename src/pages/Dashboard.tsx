import { Recycle, Trophy, BarChart3, Leaf, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import MyReports from "@/components/MyReports";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const { user, reports } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
    if (user?.role === "host") navigate("/host");
  }, [user, navigate]);

  if (!user) return null;

  const myReports = reports.filter((r) => r.userId === user.id);

  // Weekly activity mock data
  const weeklyData = [
    { day: "Mon", count: myReports.filter(() => Math.random() > 0.5).length || 1 },
    { day: "Tue", count: Math.floor(Math.random() * 4) + 1 },
    { day: "Wed", count: Math.floor(Math.random() * 3) },
    { day: "Thu", count: Math.floor(Math.random() * 5) + 1 },
    { day: "Fri", count: myReports.length },
    { day: "Sat", count: Math.floor(Math.random() * 2) },
    { day: "Sun", count: Math.floor(Math.random() * 3) },
  ];

  // Waste breakdown
  const wasteBreakdown = myReports.reduce((acc, r) => {
    acc[r.wasteType] = (acc[r.wasteType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(wasteBreakdown).map(([name, value]) => ({ name, value }));
  const COLORS = ["hsl(152, 58%, 38%)", "hsl(200, 70%, 50%)", "hsl(40, 80%, 50%)", "hsl(0, 70%, 50%)", "hsl(280, 60%, 50%)"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-primary">{user.name}</span>
          </h1>
          <p className="text-muted-foreground">Here's your environmental impact dashboard.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Recycle, value: user.totalItems, label: "Items Recycled", color: "text-primary" },
            { icon: Trophy, value: user.points, label: "Points Earned", color: "text-amber-500" },
            { icon: BarChart3, value: user.co2Saved, label: "CO₂ Saved (kg)", color: "text-teal-500" },
            { icon: Leaf, value: (user.co2Saved * 0.05).toFixed(1), label: "Trees Saved", color: "text-emerald-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
            >
              <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Weekly Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(152, 58%, 38%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Waste Breakdown</h3>
            </div>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name }) => name}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                No data yet. Upload waste to see breakdown.
              </div>
            )}
          </div>
        </div>

        {/* My Reports */}
        <MyReports />
      </div>
    </div>
  );
};

export default Dashboard;
