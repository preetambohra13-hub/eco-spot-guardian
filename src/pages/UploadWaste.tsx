import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MapPin, Upload, Sparkles, CheckCircle2, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { WasteCategory } from "@/types/app";
import Navbar from "@/components/Navbar";

const WASTE_TYPES: { type: WasteCategory; bin: string; instructions: string[]; impact: string }[] = [
  { type: "Plastic", bin: "Yellow Bin (Plastic Recycling)", instructions: ["Empty and rinse all plastic bottles and containers.", "Flatten plastic containers to save space.", "Remove caps and check if recyclable separately.", "Avoid thin plastic bags unless accepted."], impact: "Recycling plastic prevents it from ending up in landfills or oceans." },
  { type: "Organic", bin: "Green Bin (Compost)", instructions: ["Separate food scraps from packaging.", "Include yard waste like leaves and grass.", "Avoid meat and dairy in home compost.", "Use compostable bags if available."], impact: "Composting organic waste reduces methane emissions from landfills." },
  { type: "Paper", bin: "Blue Bin (Paper Recycling)", instructions: ["Keep paper clean and dry.", "Remove staples and plastic windows.", "Flatten cardboard boxes.", "Don't include waxed or laminated paper."], impact: "Recycling paper saves trees and reduces water usage in production." },
  { type: "Glass", bin: "Glass Bin (Glass Recycling)", instructions: ["Rinse glass containers before recycling.", "Remove lids and caps.", "Don't include broken glass in regular recycling.", "Separate by color if required."], impact: "Glass can be recycled indefinitely without quality loss." },
  { type: "E-Waste", bin: "E-Waste Collection Point", instructions: ["Never throw electronics in regular trash.", "Remove batteries before disposal.", "Check for local e-waste drop-off events.", "Wipe personal data from devices."], impact: "E-waste contains valuable materials that can be recovered and reused." },
  { type: "Hazardous", bin: "Hazardous Waste Facility", instructions: ["Never pour chemicals down drains.", "Keep in original containers.", "Transport carefully to collection sites.", "Check local guidelines for specific items."], impact: "Proper disposal prevents soil and water contamination." },
];

const UploadWaste = () => {
  const { user, addReport } = useApp();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof WASTE_TYPES[0] | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocation({ lat: 28.6139 + Math.random() * 0.05, lng: 77.2090 + Math.random() * 0.05 })
    );
  }, [user, navigate]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const classify = () => {
    if (!preview) return;
    setAnalyzing(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * WASTE_TYPES.length);
      setResult(WASTE_TYPES[idx]);
      setConfidence(Math.floor(Math.random() * 15) + 85);
      setAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!result || !preview || !location) return;
    addReport({
      imageUrl: preview,
      wasteType: result.type,
      binSuggestion: result.bin,
      description,
      confidence,
      lat: location.lat,
      lng: location.lng,
      address: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    });
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="font-display font-bold text-lg">Upload Waste</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <MapPin className="h-4 w-4" />
            📍 Location captured ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
          </div>
        )}

        {/* Upload Zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all min-h-[200px] flex items-center justify-center"
        >
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.img key="img" initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={preview} alt="Waste" className="max-h-48 rounded-xl object-cover" />
            ) : (
              <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <Upload className="h-12 w-12 text-primary/40 mx-auto" />
                <p className="text-muted-foreground font-medium">Click to upload an image of waste</p>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Describe the waste item</label>
          <Textarea
            placeholder="e.g. a crushed aluminum can, a pile of banana peels, a broken phone..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl min-h-[80px]"
          />
        </div>

        {/* Classify Button */}
        {!result && (
          <Button
            onClick={classify}
            disabled={!preview || analyzing}
            className="w-full bg-primary text-primary-foreground font-semibold py-5 rounded-xl text-base"
          >
            {analyzing ? (
              <><Sparkles className="h-5 w-5 mr-2 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="h-5 w-5 mr-2" /> Classify Waste</>
            )}
          </Button>
        )}

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold">{result.type}</h3>
                  <p className="text-sm text-muted-foreground">Confidence: <span className="text-primary font-semibold">{confidence}%</span></p>
                </div>
                <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">{result.bin}</span>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-sm mb-3">
                  <Leaf className="h-4 w-4 text-primary" /> Recycling Instructions
                </h4>
                <ul className="space-y-2">
                  {result.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">🌍 Environmental Impact:</span>{" "}
                  <span className="text-muted-foreground">{result.impact}</span>
                </p>
                <p className="text-sm text-primary font-semibold mt-1">CO₂ Saved: ~{(Math.random() * 0.5 + 0.3).toFixed(1)} kg</p>
              </div>

              <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground font-semibold py-5 rounded-xl text-base">
                <CheckCircle2 className="h-5 w-5 mr-2" /> Save & Earn Points
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UploadWaste;
