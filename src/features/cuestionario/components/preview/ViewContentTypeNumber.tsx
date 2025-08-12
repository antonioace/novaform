import React from 'react';

interface ViewContentTypeNumberProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeNumber({ deviceType = 'desktop' }: ViewContentTypeNumberProps) {
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        🔢 Ingresa un número
      </label>
      <input 
        type="number" 
        placeholder="123"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        readOnly
      />
      <p className="text-xs text-gray-500 mt-1">Solo números enteros o decimales</p>
    </div>
  );
}

export default ViewContentTypeNumber;