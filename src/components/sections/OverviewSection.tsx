import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Leaf, 
  Bug, 
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

export const OverviewSection = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className="relative rounded-xl h-64 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 p-8 text-primary-foreground">
          <h1 className="text-4xl font-bold mb-2">Crop Health Management System</h1>
          <p className="text-lg opacity-90 mb-4">
            Monitor, analyze, and optimize your farm's health with advanced IoT sensors and AI detection
          </p>
          <Button size="lg" variant="secondary">
            View Full Report
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="border-warning bg-warning/5">
        <CardContent className="flex items-center gap-4 pt-6">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div className="flex-1">
            <p className="font-medium text-warning-foreground">
              2 fields require immediate attention
            </p>
            <p className="text-sm text-muted-foreground">
              High pest activity detected in Field A, Low soil moisture in Field C
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5°C</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-success" />
              +2.1°C from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Optimal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Wind className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <CheckCircle className="h-3 w-3" />
              Normal levels
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaf Wetness</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-success" />
              Decreasing
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-destructive" />
              Pest Detection Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Field A - Corn</span>
              <Badge variant="destructive">High Risk</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Field B - Wheat</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">Low Risk</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Field C - Soybeans</span>
              <Badge variant="secondary">Monitoring</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Pest Activity Detected</p>
                  <p className="text-xs text-muted-foreground">Field A - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Low Soil Moisture</p>
                  <p className="text-xs text-muted-foreground">Field C - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Irrigation Completed</p>
                  <p className="text-xs text-muted-foreground">Field B - 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};