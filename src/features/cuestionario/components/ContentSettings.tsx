import React, { useState } from "react";
import { QuestionConfigTab } from "./config";

const ContentSettings = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'theme'>('config');

  return (
    <div
      className="w-64 bg-white border-l border-gray-200 flex flex-col flex-1
    max-w-64 overflow-hidden relative"
    >
      {/* Tabs Header */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 px-3 py-2 text-sm font-medium text-center border-b-1 transition-colors `}
          >
            Configuración
          </button>
         
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'config' && <QuestionConfigTab />}
    
      </div>
    </div>
  );
};

export default ContentSettings;
