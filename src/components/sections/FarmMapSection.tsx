import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeoTaggingModal } from "@/components/farm-map/GeoTaggingModal";
import { FarmLocationsList } from "@/components/farm-map/FarmLocationsList";
import { 
  Map, 
  MapPin, 
  Layers,
  Maximize,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";

export const FarmMapSection = () => {
  const farmFields = [
    {
      id: "field_a",
      name: "Field A - Corn",
      area: "25.4 acres",
      status: "warning",
      coordinates: "40.7128°N, 74.0060°W",
      sensors: 2,
      alerts: 1
    },
    {
      id: "field_b", 
      name: "Field B - Wheat",
      area: "18.7 acres",
      status: "healthy",
      coordinates: "40.7589°N, 73.9851°W",
      sensors: 1,
      alerts: 0
    },
    {
      id: "field_c",
      name: "Field C - Soybeans", 
      area: "32.1 acres",
      status: "attention",
      coordinates: "40.6892°N, 74.0445°W",
      sensors: 1,
      alerts: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case "warning":
        return <Badge variant="destructive">Warning</Badge>;
      case "attention":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-success";
      case "warning":
        return "bg-destructive";
      case "attention":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Farm Boundary Map</h2>
          <p className="text-muted-foreground">Visualize your farm layout and field conditions</p>
        </div>
        <div className="flex items-center gap-2">
          <GeoTaggingModal />
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-1" />
            Layer Options
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Map Settings
          </Button>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Interactive Farm Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-muted via-background to-muted rounded-lg h-96 border-2 border-dashed border-border">
            {/* Map placeholder with field representations */}
            <div className="absolute inset-4 grid grid-cols-3 gap-4">
              {farmFields.map((field, index) => (
                <div 
                  key={field.id}
                  className={`relative rounded-lg border-2 border-primary/20 p-4 transition-all hover:shadow-lg cursor-pointer ${
                    field.status === "healthy" ? "bg-success/10" :
                    field.status === "warning" ? "bg-destructive/10" :
                    "bg-warning/10"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{field.name}</h4>
                      {getStatusBadge(field.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{field.area}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {field.sensors} sensors
                      </div>
                      {field.alerts > 0 && (
                        <div className="flex items-center gap-1 text-warning">
                          <AlertTriangle className="h-3 w-3" />
                          {field.alerts} alert{field.alerts > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(field.status)}`} />
                  
                  {/* Sensor positions */}
                  <div className="absolute bottom-2 left-2">
                    {Array.from({ length: field.sensors }).map((_, i) => (
                      <div key={i} className="inline-block w-2 h-2 bg-primary rounded-full mr-1" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Maximize className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 text-sm">
              <p className="font-medium mb-1">Total Farm Area</p>
              <p className="text-muted-foreground">76.2 acres</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Click on fields to view detailed information</span>
          </div>
        </CardContent>
      </Card>

      {/* Farm Locations List */}
      <FarmLocationsList />

      {/* Field Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {farmFields.map((field) => (
          <Card key={field.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{field.name}</CardTitle>
                {getStatusBadge(field.status)}
              </div>
              <p className="text-sm text-muted-foreground">Area: {field.area}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>GPS Coordinates</span>
                  <span className="font-mono text-xs">{field.coordinates}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Active Sensors
                  </span>
                  <span>{field.sensors}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Active Alerts
                  </span>
                  <span>{field.alerts}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Edit Boundary
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Field Status</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span>Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span>Needs Attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full" />
                  <span>Warning</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Sensors</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>Active Sensor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-3 w-3 text-primary" />
                  <span>Data Collection Point</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Alerts</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-warning" />
                  <span>Active Alert</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-success" />
                  <span>No Issues</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};