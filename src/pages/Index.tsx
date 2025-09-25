import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Activity, 
  Shield, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  MapPin,
  Camera,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "IoT sensors track soil moisture, temperature, humidity, and leaf wetness 24/7"
    },
    {
      icon: Camera,
      title: "AI Pest Detection",
      description: "Upload crop images for instant pest identification and treatment recommendations"
    },
    {
      icon: MapPin,
      title: "Field Mapping",
      description: "Interactive farm boundaries with GPS positioning and field management"
    },
    {
      icon: Bell,
      title: "Smart Alerts", 
      description: "Automated notifications for irrigation needs, pest activity, and crop stress"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive data visualization and historical trend analysis"
    },
    {
      icon: Shield,
      title: "Crop Protection",
      description: "Proactive monitoring to prevent diseases and optimize growing conditions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">BeejMitra</span>
          </div>
          <Link to="/dashboard">
            <Button>
              Access Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Next-Generation Agriculture Technology
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Crop Health Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Monitor, analyze, and optimize your farm's health with advanced IoT sensors, 
              AI-powered pest detection, and real-time alerts. Transform your farming with precision agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Farm Monitoring</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to maintain healthy crops and maximize yields
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose BeejMitra?
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce crop losses by up to 40% with early detection",
                  "Optimize water usage and reduce irrigation costs", 
                  "Get instant alerts for pest activity and crop stress",
                  "Make data-driven decisions with comprehensive analytics",
                  "Easy setup with wireless IoT sensors",
                  "24/7 monitoring without manual intervention"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of farmers already using BeejMitra to protect and optimize their crops.
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="w-full">
                    Start Monitoring Your Farm
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">BeejMitra</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 BeejMitra. Transforming agriculture with smart technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
