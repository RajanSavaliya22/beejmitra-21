import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plus, Pentagon, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Location {
  lat: number;
  lng: number;
}

interface AOIPoint {
  lat: number;
  lng: number;
}

interface FarmData {
  name: string;
  description: string;
  location: Location | null;
  aoiBoundary: AOIPoint[];
  area: number;
}

export const GeoTaggingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [farmData, setFarmData] = useState<FarmData>({
    name: "",
    description: "",
    location: null,
    aoiBoundary: [],
    area: 0
  });
  const [mode, setMode] = useState<'location' | 'aoi'>('location');
  const { toast } = useToast();

  const handleMapClick = (lat: number, lng: number) => {
    if (mode === 'location') {
      setFarmData(prev => ({
        ...prev,
        location: { lat, lng }
      }));
    } else if (mode === 'aoi') {
      setFarmData(prev => ({
        ...prev,
        aoiBoundary: [...prev.aoiBoundary, { lat, lng }]
      }));
    }
  };

  const clearAOI = () => {
    setFarmData(prev => ({
      ...prev,
      aoiBoundary: [],
      area: 0
    }));
  };

  const calculateArea = () => {
    if (farmData.aoiBoundary.length < 3) return 0;
    // Simple polygon area calculation (shoelace formula)
    let area = 0;
    const points = farmData.aoiBoundary;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].lat * points[j].lng;
      area -= points[j].lat * points[i].lng;
    }
    area = Math.abs(area) / 2;
    // Convert to acres (rough approximation)
    return (area * 247.105).toFixed(2);
  };

  const saveFarm = () => {
    if (!farmData.name || !farmData.location) {
      toast({
        title: "Missing Information",
        description: "Please provide farm name and location",
        variant: "destructive"
      });
      return;
    }

    const area = calculateArea();
    // Here you would save to Supabase
    console.log("Saving farm data:", {
      ...farmData,
      area: area ? parseFloat(area) : 0
    });

    toast({
      title: "Farm Created",
      description: `${farmData.name} has been saved with ${area} acres`,
    });

    setIsOpen(false);
    setFarmData({
      name: "",
      description: "",
      location: null,
      aoiBoundary: [],
      area: 0
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Farm
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Farm with Geo-tagging & AOI</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Farm Details Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                id="farmName"
                value={farmData.name}
                onChange={(e) => setFarmData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter farm name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="farmDescription">Description</Label>
              <Textarea
                id="farmDescription"
                value={farmData.description}
                onChange={(e) => setFarmData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your farm"
                rows={3}
              />
            </div>

            {/* Mode Selection */}
            <div className="space-y-2">
              <Label>Map Mode</Label>
              <div className="flex gap-2">
                <Button 
                  variant={mode === 'location' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('location')}
                  className="flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  Set Location
                </Button>
                <Button 
                  variant={mode === 'aoi' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('aoi')}
                  className="flex items-center gap-1"
                >
                  <Pentagon className="h-3 w-3" />
                  Draw AOI
                </Button>
              </div>
            </div>

            {/* Location Info */}
            {farmData.location && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Farm Location</span>
                    </div>
                    <p className="text-sm font-mono text-muted-foreground">
                      {farmData.location.lat.toFixed(6)}°N, {farmData.location.lng.toFixed(6)}°W
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AOI Info */}
            {farmData.aoiBoundary.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pentagon className="h-4 w-4 text-primary" />
                        <span className="font-medium">AOI Boundary</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={clearAOI}
                        className="flex items-center gap-1"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Clear
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {farmData.aoiBoundary.length} points
                      </Badge>
                      {farmData.aoiBoundary.length >= 3 && (
                        <Badge variant="outline">
                          ~{calculateArea()} acres
                        </Badge>
                      )}
                    </div>
                    {farmData.aoiBoundary.length >= 3 ? (
                      <p className="text-sm text-success">AOI boundary complete</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click {3 - farmData.aoiBoundary.length} more points to complete boundary
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button onClick={saveFarm} className="flex-1">
                Save Farm
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Interactive Map</Label>
              <div className="text-sm text-muted-foreground">
                {mode === 'location' ? 
                  'Click on the map to set farm location' : 
                  'Click points to draw AOI boundary'
                }
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div 
                  className="relative bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 h-96 rounded-lg border cursor-crosshair"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // Convert to mock coordinates
                    const lat = 40.7 + (y / rect.height - 0.5) * 0.1;
                    const lng = -74.0 + (x / rect.width - 0.5) * 0.1;
                    handleMapClick(lat, lng);
                  }}
                >
                  {/* Grid pattern to simulate map */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-8 h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-primary/20" />
                      ))}
                    </div>
                  </div>

                  {/* Farm Location Marker */}
                  {farmData.location && (
                    <div 
                      className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: `${((farmData.location.lng + 74.05) / 0.1) * 100}%`,
                        top: `${(1 - (farmData.location.lat - 40.65) / 0.1) * 100}%`
                      }}
                    >
                      <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse" />
                      <MapPin className="absolute top-0 left-0 w-6 h-6 text-primary-foreground" />
                    </div>
                  )}

                  {/* AOI Boundary Points */}
                  {farmData.aoiBoundary.map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: `${((point.lng + 74.05) / 0.1) * 100}%`,
                        top: `${(1 - (point.lat - 40.65) / 0.1) * 100}%`
                      }}
                    >
                      <div className="w-3 h-3 bg-warning rounded-full border-2 border-background shadow-md" />
                      <span className="absolute -top-6 -left-1 text-xs font-bold text-warning">
                        {index + 1}
                      </span>
                    </div>
                  ))}

                  {/* AOI Boundary Lines */}
                  {farmData.aoiBoundary.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path
                        d={`M ${farmData.aoiBoundary.map((point, index) => {
                          const x = ((point.lng + 74.05) / 0.1) * 100;
                          const y = (1 - (point.lat - 40.65) / 0.1) * 100;
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} ${farmData.aoiBoundary.length >= 3 ? 'Z' : ''}`}
                        fill={farmData.aoiBoundary.length >= 3 ? "rgba(234, 179, 8, 0.2)" : "none"}
                        stroke="rgb(234, 179, 8)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  )}

                  {/* Instructions overlay */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 text-sm max-w-xs">
                    {mode === 'location' ? (
                      <p>Click anywhere to set the farm's main location</p>
                    ) : (
                      <p>Click points to create an Area of Interest (AOI) boundary. Minimum 3 points required.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};