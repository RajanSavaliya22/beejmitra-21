import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Crop,
  User,
  Phone,
  Mail,
  Calendar,
  Plus,
  Trash2,
  Save,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FarmRegistrationSection = () => {
  const [farmData, setFarmData] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    totalArea: "",
    establishedYear: "",
    description: "",
    fields: [
      {
        id: 1,
        name: "",
        cropType: "",
        area: "",
        coordinates: "",
        soilType: "",
        irrigationType: ""
      }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const addField = () => {
    const newField = {
      id: Date.now(),
      name: "",
      cropType: "",
      area: "",
      coordinates: "",
      soilType: "",
      irrigationType: ""
    };
    setFarmData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const removeField = (fieldId: number) => {
    setFarmData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const updateField = (fieldId: number, fieldData: Partial<typeof farmData.fields[0]>) => {
    setFarmData(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...fieldData } : field
      )
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Farm Registered Successfully",
        description: "Your farm information has been saved and is now being processed.",
      });
    }, 2000);
  };

  const cropTypes = [
    "Corn", "Wheat", "Rice", "Soybeans", "Cotton", "Barley", "Oats", "Sorghum", "Sunflower", "Canola", "Other"
  ];

  const soilTypes = [
    "Clay", "Sandy", "Loam", "Silt", "Peat", "Chalk", "Sandy Loam", "Clay Loam", "Silty Clay", "Other"
  ];

  const irrigationTypes = [
    "Drip Irrigation", "Sprinkler", "Surface Irrigation", "Subsurface", "Micro-Sprinkler", "Rain-fed", "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Farm Registration</h2>
          <p className="text-muted-foreground">Register your farm and define field boundaries</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Calendar className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Farm Data
            </>
          )}
        </Button>
      </div>

      {/* Farm Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Farm Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name *</Label>
              <Input
                id="farmName"
                value={farmData.farmName}
                onChange={(e) => setFarmData(prev => ({ ...prev, farmName: e.target.value }))}
                placeholder="Enter farm name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                value={farmData.ownerName}
                onChange={(e) => setFarmData(prev => ({ ...prev, ownerName: e.target.value }))}
                placeholder="Enter owner name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={farmData.email}
                onChange={(e) => setFarmData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={farmData.phone}
                onChange={(e) => setFarmData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalArea">Total Farm Area (acres) *</Label>
              <Input
                id="totalArea"
                value={farmData.totalArea}
                onChange={(e) => setFarmData(prev => ({ ...prev, totalArea: e.target.value }))}
                placeholder="Enter total area"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="establishedYear">Established Year</Label>
              <Input
                id="establishedYear"
                value={farmData.establishedYear}
                onChange={(e) => setFarmData(prev => ({ ...prev, establishedYear: e.target.value }))}
                placeholder="Enter year established"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Farm Address *</Label>
            <Textarea
              id="address"
              value={farmData.address}
              onChange={(e) => setFarmData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter complete farm address"
              className="resize-none"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Farm Description</Label>
            <Textarea
              id="description"
              value={farmData.description}
              onChange={(e) => setFarmData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your farm, crops, and farming practices"
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Field Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Field Information & Boundary Mapping
            </CardTitle>
            <Button onClick={addField} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Field
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {farmData.fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Field {index + 1}</Badge>
                {farmData.fields.length > 1 && (
                  <Button 
                    onClick={() => removeField(field.id)}
                    variant="ghost" 
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Field Name *</Label>
                  <Input
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    placeholder="e.g., North Field"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Crop Type *</Label>
                  <Select onValueChange={(value) => updateField(field.id, { cropType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Field Area (acres) *</Label>
                  <Input
                    value={field.area}
                    onChange={(e) => updateField(field.id, { area: e.target.value })}
                    placeholder="Enter area"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>GPS Coordinates</Label>
                  <Input
                    value={field.coordinates}
                    onChange={(e) => updateField(field.id, { coordinates: e.target.value })}
                    placeholder="Lat, Long"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Soil Type</Label>
                  <Select onValueChange={(value) => updateField(field.id, { soilType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map(soil => (
                        <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Irrigation Type</Label>
                  <Select onValueChange={(value) => updateField(field.id, { irrigationType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation" />
                    </SelectTrigger>
                    <SelectContent>
                      {irrigationTypes.map(irrigation => (
                        <SelectItem key={irrigation} value={irrigation}>{irrigation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Use the map tool to define precise field boundaries</span>
                <Button variant="outline" size="sm">
                  Define Boundary
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Registration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            Registration Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{farmData.fields.length}</div>
              <p className="text-sm text-muted-foreground">Fields Defined</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {farmData.fields.reduce((sum, field) => sum + (parseFloat(field.area) || 0), 0).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Total Field Area (acres)</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {farmData.fields.filter(field => field.cropType).length}
              </div>
              <p className="text-sm text-muted-foreground">Crops Specified</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Deploy IoT sensors in registered fields</li>
              <li>• Configure monitoring schedules and alert thresholds</li>
              <li>• Begin automated crop health monitoring</li>
              <li>• Access real-time data through the dashboard</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};