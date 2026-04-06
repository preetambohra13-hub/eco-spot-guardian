import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RewardCelebrationProps {
  show: boolean;
  points: number;
  onClose: () => void;
  userName?: string;
}

const RewardCelebration = ({ show, points, onClose, userName }: RewardCelebrationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-card rounded-3xl border border-border shadow-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated stars */}
            <div className="relative mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -left-2"
              >
                <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              </motion.div>

              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex"
              >
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-5 rounded-full">
                  <Trophy className="h-12 w-12 text-primary-foreground" />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartyPopper className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">बधाई हो! 🎉</h2>
                <PartyPopper className="h-6 w-6 text-primary" />
              </div>

              {userName && (
                <p className="text-primary font-semibold text-lg mb-2">{userName}</p>
              )}

              <p className="text-muted-foreground mb-4">
                आपकी report का waste successfully collect कर लिया गया है!
              </p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="bg-primary/10 rounded-2xl p-4 mb-6"
              >
                <p className="text-sm text-muted-foreground mb-1">Bonus Reward</p>
                <p className="font-display text-4xl font-bold text-primary">+{points}</p>
                <p className="text-sm text-primary font-medium">Eco Points!</p>
              </motion.div>

              <p className="text-xs text-muted-foreground mb-4">
                🌍 आपने environment को बचाने में मदद की। आगे भी waste report करते रहें!
              </p>

              <Button onClick={onClose} className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl">
                Continue 🚀
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardCelebration;
