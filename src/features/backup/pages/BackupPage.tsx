import React, { useEffect, useState } from "react";
import { useGetProjects } from "@/features/project/hooks";
import { useGetMyFiles } from "@/features/file-user/hooks";
import { 
  FiFolder, 
  FiTrendingUp, 
  FiFileText,
  FiDatabase
} from "react-icons/fi";
import {
  MetricCard,
  WelcomeCards,
  ChartsSection,
  FileManagerStats,
  RecentEventsSection
} from "../components";

export const BackupPage: React.FC = () => {
  const { projects, getProjects } = useGetProjects();
  const { getMyFiles, myFiles } = useGetMyFiles();
  
  // Estados para las métricas
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    totalFiles: 0,
    totalSubmits: 1542,
    totalViews: 8934
  });

  useEffect(() => {
    getProjects();
    getMyFiles();
  }, []);

  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      totalProjects: projects.length,
      totalFiles: myFiles.length
    }));
  }, [projects, myFiles]);

  const userName = "Usuario";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Cards */}
      <WelcomeCards userName={userName} />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total proyectos activos"
          value={metrics.totalProjects.toLocaleString()}
          change="+2.5%"
          icon={FiFolder}
          color="bg-green-500"
          trend="up"
        />
        <MetricCard
          title="Total archivos"
          value={metrics.totalFiles.toLocaleString()}
          change="+0.2%"
          icon={FiFileText}
          color="bg-cyan-500"
          trend="up"
        />
        <MetricCard
          title="Total envíos"
          value={metrics.totalSubmits.toLocaleString()}
          change="-0.1%"
          icon={FiDatabase}
          color="bg-orange-500"
          trend="down"
        />
        <MetricCard
          title="Total visualizaciones"
          value={metrics.totalViews.toLocaleString()}
          change="+1.8%"
          icon={FiTrendingUp}
          color="bg-purple-500"
          trend="up"
        />
      </div>

      {/* Charts and Tables Section */}
      <ChartsSection />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <RecentEventsSection />

        {/* File Manager Stats */}
        <FileManagerStats totalFiles={metrics.totalFiles} />
      </div>
    </div>
  );
}; 