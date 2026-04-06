import { Leaf, Recycle, TreePine, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = ({ onScrollToReport }: { onScrollToReport: () => void }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="gradient-bg p-5 rounded-2xl glow-primary">
              <Leaf className="h-10 w-10 text-primary-foreground" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Recycle className="h-5 w-5 text-primary/60" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Make Your City{" "}
          <span className="gradient-text">Cleaner</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Report waste, earn eco-points, and watch your community transform.
          Every report makes a difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-10"
        >
          {[
            { icon: Leaf, text: "AI Waste Detection" },
            { icon: TreePine, text: "Eco Rewards" },
            { icon: Recycle, text: "Real-time Tracking" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onScrollToReport}
          className="animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
