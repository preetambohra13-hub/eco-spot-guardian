import { Recycle, BarChart3, Leaf, MapPin, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const stats = [
  { icon: Recycle, value: "12,400+", unit: "items", label: "Waste Classified" },
  { icon: BarChart3, value: "8.2", unit: "tonnes", label: "CO₂ Saved" },
  { icon: Leaf, value: "45K", unit: "", label: "Trees Saved" },
  { icon: MapPin, value: "94", unit: "%", label: "Accuracy Rate" },
  { icon: Users, value: "2,100+", unit: "", label: "Active Users" },
  { icon: TrendingUp, value: "150+", unit: "", label: "Cities Covered" },
];

const ImpactPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="bg-gradient-to-br from-primary via-primary to-accent py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">Our Impact</h1>
        <p className="text-primary-foreground/70 mb-14 text-lg">Together, we're making a measurable difference for the planet.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <stat.icon className="h-8 w-8 text-emerald-200 mx-auto mb-3" />
              <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                {stat.value}<span className="text-lg font-normal">{stat.unit}</span>
              </p>
              <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ImpactPage;
