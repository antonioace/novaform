import React from "react";
import { IconType } from "react-icons";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: IconType;
  color: string;
  trend?: "up" | "down" | "neutral";
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  trend = "up" 
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {change}
          </span>
          <span className="text-gray-500 text-sm ml-1">últimos 7 días</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
); 