import { useState, useRef } from "react";
import { Upload, MapPin, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockClassify = (): { wasteType: "Dry" | "Wet"; binSuggestion: "Blue" | "Green" } => {
  const isDry = Math.random() > 0.5;
  return isDry
    ? { wasteType: "Dry", binSuggestion: "Blue" }
    : { wasteType: "Wet", binSuggestion: "Green" };
};

const MOCK_ADDRESSES = [
  "MG Road, Bengaluru",
  "Connaught Place, Delhi",
  "Marine Drive, Mumbai",
  "Park Street, Kolkata",
  "Anna Salai, Chennai",
];

const ReportForm = () => {
  const { addReport } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ wasteType: "Dry" | "Wet"; binSuggestion: "Blue" | "Green" } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
      setResult(null);
      // Mock AI analysis
      setAnalyzing(true);
      setTimeout(() => {
        setResult(mockClassify());
        setAnalyzing(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!preview || !result) return;
    // Mock geolocation
    const lat = 12.9716 + (Math.random() - 0.5) * 0.1;
    const lng = 77.5946 + (Math.random() - 0.5) * 0.1;
    const address = MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)];

    addReport({
      imageUrl: preview,
      wasteType: result.wasteType,
      binSuggestion: result.binSuggestion,
      lat,
      lng,
      address,
    });
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Trash2 className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Report Waste</h2>
        </div>

        {/* Upload zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="relative border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
        >
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.img
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={preview}
                alt="Waste preview"
                className="max-h-48 mx-auto rounded-lg object-cover"
              />
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Upload className="h-10 w-10 text-primary/50 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Click or tap to upload a waste photo</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Result */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-2 text-primary"
            >
              <Sparkles className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Analyzing waste type...</span>
            </motion.div>
          )}

          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Waste Type</p>
                <p className="font-display font-bold text-lg">{result.wasteType}</p>
              </div>
              <div
                className={`rounded-xl p-4 text-center text-primary-foreground ${
                  result.binSuggestion === "Blue"
                    ? "bg-blue-500"
                    : "bg-emerald-600"
                }`}
              >
                <p className="text-xs opacity-80 mb-1">Suggested Bin</p>
                <p className="font-display font-bold text-lg">{result.binSuggestion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {result && !analyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <Button onClick={handleSubmit} className="w-full gradient-bg text-primary-foreground font-semibold py-5 rounded-xl">
              <MapPin className="h-4 w-4 mr-2" />
              Submit Report & Earn Points
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ReportForm;
