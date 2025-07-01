import React from "react";

interface ChartData {
  value: number;
  color: string;
  label: string;
}

interface SimpleDonutChartProps {
  data: ChartData[];
  total: number;
}

export const SimpleDonutChart: React.FC<SimpleDonutChartProps> = ({ data, total }) => {
  let cumulativePercentage = 0;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke={item.color}
                strokeWidth="3"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{total.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 