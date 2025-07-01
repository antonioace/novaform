import React from "react";
import { FiFolder, FiFileText, FiDownload, FiPlay } from "react-icons/fi";

interface FileManagerStatsProps {
  totalFiles: number;
}

export const FileManagerStats: React.FC<FileManagerStatsProps> = ({ totalFiles }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Gestor de archivos</h3>
        <FiFolder className="h-5 w-5 text-gray-400" />
      </div>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalFiles}</div>
          <div className="text-sm text-gray-600">Total archivos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">2.4GB</div>
          <div className="text-sm text-gray-600">Espacio usado</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <FiFileText className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm font-medium">Documentos</span>
          </div>
          <span className="text-sm text-gray-500">1.2GB</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <FiDownload className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Imágenes</span>
          </div>
          <span className="text-sm text-gray-500">800MB</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <FiPlay className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium">Videos</span>
          </div>
          <span className="text-sm text-gray-500">400MB</span>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>65% usado</span>
          <span>5GB total</span>
        </div>
      </div>
    </div>
  </div>
); 