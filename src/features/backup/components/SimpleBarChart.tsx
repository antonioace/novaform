import React from "react";

interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface SimpleBarChartProps {
  data: BarChartData[];
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="flex items-end space-x-2 h-48">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center justify-end h-40">
              <div
                className={`w-full ${item.color} rounded-t transition-all duration-500 ease-out`}
                style={{ height: `${height}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}; 