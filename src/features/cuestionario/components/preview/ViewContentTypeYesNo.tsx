import React from 'react';

interface ViewContentTypeYesNoProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeYesNo({ deviceType = 'desktop' }: ViewContentTypeYesNoProps) {
  const getStyles = () => {
    const baseStyles = {
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
    };

    switch (deviceType) {
      case 'mobile':
        return { ...baseStyles, fontSize: '16px' };
      case 'tablet':
        return { ...baseStyles, fontSize: '15px' };
      default:
        return { ...baseStyles, fontSize: '14px' };
    }
  };

  return (
    <div style={getStyles()}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        ❓ ¿Tu respuesta es?
      </label>
      <div className="flex space-x-4">
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="yes-no-preview"
            className="mr-2 text-green-500 focus:ring-green-500"
            disabled
          />
          <span className="text-sm text-gray-700 bg-green-100 px-4 py-2 rounded-full">✅ Sí</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="yes-no-preview"
            className="mr-2 text-red-500 focus:ring-red-500"
            disabled
          />
          <span className="text-sm text-gray-700 bg-red-100 px-4 py-2 rounded-full">❌ No</span>
        </label>
      </div>
    </div>
  );
}

export default ViewContentTypeYesNo;