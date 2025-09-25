import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { SensorDataSection } from "@/components/sections/SensorDataSection";
import { AlertsSection } from "@/components/sections/AlertsSection";
import { ImageUploadSection } from "@/components/sections/ImageUploadSection";
import { FarmMapSection } from "@/components/sections/FarmMapSection";
import { FarmRegistrationSection } from "@/components/sections/FarmRegistrationSection";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("overview");

  const renderSection = () => {
    switch (currentSection) {
      case "overview":
        return <OverviewSection />;
      case "map":
        return <FarmMapSection />;
      case "sensors":
        return <SensorDataSection />;
      case "pest":
        return <div>Pest Detection Section - Coming Soon</div>;
      case "alerts":
        return <AlertsSection />;
      case "upload":
        return <ImageUploadSection />;
      case "registration":
        return <FarmRegistrationSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <DashboardLayout 
      currentSection={currentSection} 
      onSectionChange={setCurrentSection}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Dashboard;