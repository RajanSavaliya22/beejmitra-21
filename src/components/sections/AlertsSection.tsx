import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  AlertTriangle, 
  Bug, 
  Droplets,
  Thermometer,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

export const AlertsSection = () => {
  const alerts = [
    {
      id: "ALERT_001",
      type: "pest",
      severity: "high",
      title: "High Pest Activity Detected",
      description: "Unusual insect activity detected in Field A corn crop",
      location: "Field A - North Section",
      timestamp: "2 hours ago",
      status: "active",
      recommendations: ["Apply targeted pesticide", "Increase monitoring frequency", "Contact pest control specialist"]
    },
    {
      id: "ALERT_002", 
      type: "irrigation",
      severity: "medium",
      title: "Low Soil Moisture Level",
      description: "Soil moisture below optimal threshold for wheat growth",
      location: "Field C - West Section", 
      timestamp: "4 hours ago",
      status: "active",
      recommendations: ["Schedule irrigation within 6 hours", "Check irrigation system", "Monitor weather forecast"]
    },
    {
      id: "ALERT_003",
      type: "crop",
      severity: "medium", 
      title: "Leaf Wetness Above Normal",
      description: "Extended leaf wetness may increase disease risk",
      location: "Field B - Center",
      timestamp: "6 hours ago",
      status: "monitoring",
      recommendations: ["Monitor for fungal diseases", "Improve air circulation", "Consider fungicide application"]
    },
    {
      id: "ALERT_004",
      type: "system",
      severity: "low",
      title: "Sensor Communication Issue",
      description: "Intermittent connection with sensor SENSOR_003",
      location: "Field B - Center",
      timestamp: "1 day ago",
      status: "resolved",
      recommendations: ["Check sensor battery", "Verify network connectivity", "Contact support if issue persists"]
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Medium Priority</Badge>;
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Active</Badge>;
      case "monitoring":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Monitoring</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "pest":
        return <Bug className="h-4 w-4 text-destructive" />;
      case "irrigation":
        return <Droplets className="h-4 w-4 text-primary" />;
      case "crop":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "system":
        return <Settings className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === "active").length;
  const monitoringAlerts = alerts.filter(alert => alert.status === "monitoring").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Monitor and manage crop health alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            {activeAlerts} Active
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {monitoringAlerts} Monitoring
          </Badge>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{monitoringAlerts}</div>
            <p className="text-xs text-muted-foreground">Under observation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {alerts.filter(alert => alert.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={alert.status === "resolved" ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{alert.location}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSeverityBadge(alert.severity)}
                  {getStatusBadge(alert.status)}
                </div>
              </div>
            </CardHeader>

            {alert.status === "active" && (
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Recommended Actions:</h4>
                  <ul className="space-y-1">
                    {alert.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="default">
                      Mark as Addressed
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};