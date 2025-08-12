import React from 'react';

interface ViewContentTypeAddressProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeAddress({ deviceType = 'desktop' }: ViewContentTypeAddressProps) {
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
        📍 Dirección
      </label>
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Calle y número"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text" 
            placeholder="Ciudad"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <input 
            type="text" 
            placeholder="Código postal"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default ViewContentTypeAddress
