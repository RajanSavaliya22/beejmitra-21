import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Edit, Trash2, Navigation } from "lucide-react";

interface FarmLocation {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  aoiArea: number;
  status: "active" | "inactive" | "planned";
  createdAt: string;
}

// Mock data - in real app this would come from Supabase
const farmLocations: FarmLocation[] = [
  {
    id: "1",
    name: "North Field Farm",
    description: "Primary corn cultivation area",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    aoiArea: 25.4,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    name: "South Valley Farm",
    description: "Wheat and soybean rotation field",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    aoiArea: 18.7,
    status: "active",
    createdAt: "2024-02-03"
  },
  {
    id: "3",
    name: "East Expansion",
    description: "Planned expansion area for next season",
    coordinates: { lat: 40.6892, lng: -74.0445 },
    aoiArea: 32.1,
    status: "planned",
    createdAt: "2024-03-10"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "planned":
      return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Planned</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const FarmLocationsList = () => {
  const handleCenterOnFarm = (coordinates: { lat: number; lng: number }) => {
    console.log("Centering map on:", coordinates);
    // In real implementation, this would pan the map to the farm location
  };

  const handleEditFarm = (farmId: string) => {
    console.log("Edit farm:", farmId);
    // Open edit modal
  };

  const handleDeleteFarm = (farmId: string) => {
    console.log("Delete farm:", farmId);
    // Confirm and delete farm
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Farm Locations & AOI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farmLocations.map((farm) => (
            <div key={farm.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{farm.name}</h4>
                  <p className="text-sm text-muted-foreground">{farm.description}</p>
                </div>
                {getStatusBadge(farm.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Coordinates:</span>
                  <p className="font-mono text-xs">
                    {farm.coordinates.lat.toFixed(4)}°N, {Math.abs(farm.coordinates.lng).toFixed(4)}°W
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">AOI Area:</span>
                  <p className="font-medium">{farm.aoiArea} acres</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCenterOnFarm(farm.coordinates)}
                  className="flex items-center gap-1"
                >
                  <Navigation className="h-3 w-3" />
                  Center Map
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditFarm(farm.id)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteFarm(farm.id)}
                  className="flex items-center gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                Created: {new Date(farm.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};