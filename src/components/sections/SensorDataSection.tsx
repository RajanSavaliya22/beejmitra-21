import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Leaf,
  Activity,
  MapPin
} from "lucide-react";

export const SensorDataSection = () => {
  const sensorData = [
    {
      id: "SENSOR_001",
      location: "Field A - North",
      status: "active",
      soilTemp: 24.5,
      soilMoisture: 68,
      humidity: 65,
      leafWetness: 45,
      lastUpdate: "2 min ago"
    },
    {
      id: "SENSOR_002", 
      location: "Field A - South",
      status: "active",
      soilTemp: 23.8,
      soilMoisture: 72,
      humidity: 62,
      leafWetness: 38,
      lastUpdate: "1 min ago"
    },
    {
      id: "SENSOR_003",
      location: "Field B - Center",
      status: "warning",
      soilTemp: 26.2,
      soilMoisture: 45,
      humidity: 58,
      leafWetness: 52,
      lastUpdate: "5 min ago"
    },
    {
      id: "SENSOR_004",
      location: "Field C - West",
      status: "offline",
      soilTemp: null,
      soilMoisture: null,
      humidity: null,
      leafWetness: null,
      lastUpdate: "2 hours ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "offline":
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getMoistureColor = (moisture: number | null) => {
    if (!moisture) return "bg-muted";
    if (moisture < 50) return "bg-destructive";
    if (moisture < 60) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">IoT Sensor Data</h2>
          <p className="text-muted-foreground">Real-time monitoring from field sensors</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Activity className="w-3 h-3 mr-1" />
          4 Sensors Connected
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Soil Temp</CardTitle>
            <Thermometer className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8°C</div>
            <p className="text-xs text-muted-foreground">Across all sensors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61.7%</div>
            <p className="text-xs text-muted-foreground">Need irrigation in Field B</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Humidity</CardTitle>
            <Wind className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61.7%</div>
            <p className="text-xs text-muted-foreground">Optimal conditions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Leaf Wetness</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">Normal levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensorData.map((sensor) => (
          <Card key={sensor.id} className={sensor.status === "offline" ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-lg">{sensor.location}</CardTitle>
                </div>
                {getStatusBadge(sensor.status)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{sensor.id}</span>
                <span>•</span>
                <span>Last update: {sensor.lastUpdate}</span>
              </div>
            </CardHeader>
            
            {sensor.status !== "offline" && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-warning" />
                        Soil Temperature
                      </span>
                      <span className="font-medium">{sensor.soilTemp}°C</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-primary" />
                          Soil Moisture
                        </span>
                        <span className="font-medium">{sensor.soilMoisture}%</span>
                      </div>
                      <Progress 
                        value={sensor.soilMoisture} 
                        className={`h-2 ${getMoistureColor(sensor.soilMoisture)}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Wind className="h-3 w-3 text-accent" />
                        Humidity
                      </span>
                      <span className="font-medium">{sensor.humidity}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Leaf className="h-3 w-3 text-primary" />
                        Leaf Wetness
                      </span>
                      <span className="font-medium">{sensor.leafWetness}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            {sensor.status === "offline" && (
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Sensor is offline. Check connection and power supply.
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};