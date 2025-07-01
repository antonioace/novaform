import React from "react";
import { SimpleDonutChart } from "./SimpleDonutChart";
import { SimpleBarChart } from "./SimpleBarChart";

const regionData = [
  { value: 1230, color: '#10b981', label: 'Asia' },
  { value: 6790, color: '#3b82f6', label: 'Europa' },
  { value: 1010, color: '#8b5cf6', label: 'América' },
];

const chartData = [
  { label: 'Ene', value: 25, color: 'bg-blue-500' },
  { label: 'Feb', value: 35, color: 'bg-cyan-500' },
  { label: 'Mar', value: 30, color: 'bg-blue-500' },
  { label: 'Abr', value: 45, color: 'bg-orange-400' },
  { label: 'May', value: 55, color: 'bg-cyan-500' },
  { label: 'Jun', value: 40, color: 'bg-blue-500' },
  { label: 'Jul', value: 60, color: 'bg-cyan-500' },
  { label: 'Ago', value: 50, color: 'bg-orange-400' },
  { label: 'Sep', value: 45, color: 'bg-blue-500' },
  { label: 'Oct', value: 65, color: 'bg-cyan-500' },
  { label: 'Nov', value: 35, color: 'bg-orange-400' },
  { label: 'Dic', value: 40, color: 'bg-cyan-500' },
];

export const ChartsSection: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {/* Current Downloads Chart */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Descarga actual</h3>
          <p className="text-sm text-gray-600">Descargado por sistema operativo</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <SimpleDonutChart data={regionData} total={9030} />
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Mac</span>
            <span className="ml-auto text-sm font-medium">1.23k</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Windows</span>
            <span className="ml-auto text-sm font-medium">6.79k</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">iOS</span>
            <span className="ml-auto text-sm font-medium">1.01k</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Android</span>
            <span className="ml-auto text-sm font-medium">0.89k</span>
          </div>
        </div>
      </div>
    </div>

    {/* Area Installed Chart */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Área instalada</h3>
          <p className="text-sm text-gray-600">(+43%) que el año pasado</p>
        </div>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
            <span>Asia</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
            <span>Europa</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>América</span>
          </div>
        </div>
      </div>
      <SimpleBarChart data={chartData} />
    </div>
  </div>
); 