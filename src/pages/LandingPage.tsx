import { Recycle, ArrowRight, Leaf, BarChart3, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary to-accent overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Leaf className="h-4 w-4" />
              AI-Powered Recycling
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Smart Waste{" "}
              <span className="text-emerald-200">Segregation</span>
            </h1>

            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Identify, classify, and properly dispose of waste using our AI-powered classification system. 
              Earn points, track your impact, and find recycling centers nearby.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="rounded-full font-semibold text-primary px-8 py-6 text-base">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="ghost" className="rounded-full font-semibold text-primary-foreground border border-primary-foreground/30 px-8 py-6 text-base hover:bg-primary-foreground/10">
                  Try Classifier
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Plastic", desc: "Bottles, containers, wrappers", bin: "Blue Bin", color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
            { name: "Organic", desc: "Food scraps, yard waste", bin: "Green Bin", color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600" },
            { name: "Paper", desc: "Newspaper, cardboard", bin: "Blue Bin", color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
            { name: "Glass", desc: "Bottles, jars, containers", bin: "Glass Bin", color: "bg-teal-50 border-teal-200", iconColor: "text-teal-600" },
          ].map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-5 ${cat.color} hover:shadow-lg transition-shadow`}
            >
              <Recycle className={`h-8 w-8 mb-3 ${cat.iconColor}`} />
              <h3 className="font-display font-bold text-lg text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cat.desc}</p>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                {cat.bin}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Our Impact</h2>
          <p className="text-primary-foreground/70 mb-12">Together, we're making a measurable difference for the planet.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Recycle, value: "12,400+", unit: "items", label: "Waste Classified" },
              { icon: BarChart3, value: "8.2", unit: "tonnes", label: "CO₂ Saved" },
              { icon: Leaf, value: "45K", unit: "", label: "Trees Saved" },
              { icon: MapPin, value: "94", unit: "%", label: "Accuracy Rate" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <stat.icon className="h-8 w-8 text-emerald-200 mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-primary-foreground">
                  {stat.value}<span className="text-lg font-normal">{stat.unit}</span>
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground/80 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Recycle className="h-5 w-5" />
            <span className="font-display font-bold text-lg text-primary-foreground">EcoSort</span>
          </div>
          <p className="text-sm">Making waste management smarter, one classification at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
