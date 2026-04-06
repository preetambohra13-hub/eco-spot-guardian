import { Trophy, Medal, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

const LeaderboardPage = () => {
  const { user } = useApp();

  // Mock leaderboard data
  const leaderboard = [
    { name: user?.name || "You", points: user?.points || 0, items: user?.totalItems || 0, isYou: true },
    { name: "Aarav Sharma", points: 240, items: 16, isYou: false },
    { name: "Priya Patel", points: 195, items: 13, isYou: false },
    { name: "Rohit Kumar", points: 150, items: 10, isYou: false },
    { name: "Sneha Gupta", points: 120, items: 8, isYou: false },
    { name: "Vikram Singh", points: 90, items: 6, isYou: false },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
          <Trophy className="h-5 w-5" />
          <h1 className="font-display font-bold text-lg">Leaderboard</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-3">
        {leaderboard.map((entry, idx) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${
              entry.isYou ? "bg-primary/5 border-primary" : "bg-card border-border"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              idx === 0 ? "bg-amber-100 text-amber-700" :
              idx === 1 ? "bg-gray-100 text-gray-600" :
              idx === 2 ? "bg-orange-100 text-orange-700" :
              "bg-muted text-muted-foreground"
            }`}>
              {idx < 3 ? <Medal className="h-5 w-5" /> : idx + 1}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{entry.name} {entry.isYou && <span className="text-primary">(You)</span>}</p>
              <p className="text-xs text-muted-foreground">{entry.items} items recycled</p>
            </div>
            <p className="font-display font-bold text-primary">{entry.points} pts</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
