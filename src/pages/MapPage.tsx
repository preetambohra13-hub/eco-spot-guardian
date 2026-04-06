import { ArrowLeft, MapPin, Navigation, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

const RECYCLING_CENTERS = [
  { name: "Green Earth Recycling", address: "Sector 15, Noida", lat: 28.5850, lng: 77.3100, type: "All waste" },
  { name: "EcoHub Collection Point", address: "MG Road, Delhi", lat: 28.6320, lng: 77.2195, type: "Plastic & Paper" },
  { name: "Clean City E-Waste", address: "Gurgaon Sector 44", lat: 28.4595, lng: 77.0266, type: "E-Waste" },
  { name: "Bio Waste Solutions", address: "Dwarka, Delhi", lat: 28.5921, lng: 77.0460, type: "Organic" },
];

const MapPage = () => {
  const { user, reports } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to={user ? "/dashboard" : "/"}><ArrowLeft className="h-5 w-5" /></Link>
          <MapPin className="h-5 w-5" />
          <h1 className="font-display font-bold text-lg">Recycling Centers</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Map placeholder */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <iframe
            title="Map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=76.8,28.3,77.5,28.8&layer=mapnik`}
          />
        </div>

        {/* Report Locations */}
        {reports.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-lg mb-3">📍 Reported Waste Locations</h2>
            <div className="space-y-3">
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                  <img src={report.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{report.wasteType} — {report.status}</p>
                    <p className="text-xs text-muted-foreground">{report.address}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://www.google.com/maps?q=${report.lat},${report.lng}`, "_blank")}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Centers */}
        <div>
          <h2 className="font-display font-bold text-lg mb-3">♻️ Nearby Recycling Centers</h2>
          <div className="space-y-3">
            {RECYCLING_CENTERS.map((center) => (
              <div key={center.name} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Navigation className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{center.name}</p>
                  <p className="text-xs text-muted-foreground">{center.address} · {center.type}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`https://www.google.com/maps?q=${center.lat},${center.lng}`, "_blank")}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  Open
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
