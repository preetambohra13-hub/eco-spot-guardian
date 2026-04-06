import { Recycle, Leaf, Trash2, Zap, AlertTriangle, Package } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const categories = [
  { name: "Plastic", desc: "Bottles, containers, wrappers, bags", bin: "Blue Bin", icon: Recycle, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600", binColor: "bg-blue-100 text-blue-700" },
  { name: "Organic", desc: "Food scraps, yard waste, paper towels", bin: "Green Bin", icon: Leaf, color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600", binColor: "bg-emerald-100 text-emerald-700" },
  { name: "Paper", desc: "Newspaper, cardboard, magazines", bin: "Blue Bin", icon: Package, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600", binColor: "bg-blue-100 text-blue-700" },
  { name: "Glass", desc: "Bottles, jars, containers", bin: "Glass Bin", icon: Trash2, color: "bg-teal-50 border-teal-200", iconColor: "text-teal-600", binColor: "bg-teal-100 text-teal-700" },
  { name: "E-Waste", desc: "Electronics, batteries, cables", bin: "E-Waste Point", icon: Zap, color: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-600", binColor: "bg-yellow-100 text-yellow-700" },
  { name: "Hazardous", desc: "Chemicals, paints, medical waste", bin: "Special Facility", icon: AlertTriangle, color: "bg-red-50 border-red-200", iconColor: "text-red-600", binColor: "bg-red-100 text-red-700" },
];

const CategoriesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-center mb-2">Waste Categories</h1>
      <p className="text-muted-foreground text-center mb-10">Learn how to properly sort and dispose of different types of waste</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`rounded-2xl border p-6 ${cat.color} hover:shadow-lg transition-shadow`}
          >
            <cat.icon className={`h-10 w-10 mb-4 ${cat.iconColor}`} />
            <h3 className="font-display text-xl font-bold text-foreground mb-1">{cat.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${cat.binColor}`}>{cat.bin}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default CategoriesPage;
