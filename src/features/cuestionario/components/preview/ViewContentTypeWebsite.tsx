import React from 'react';

interface ViewContentTypeWebsiteProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeWebsite({ deviceType = 'desktop' }: ViewContentTypeWebsiteProps) {
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
        🌐 Sitio web
      </label>
      <input 
        type="url" 
        placeholder="https://ejemplo.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        readOnly
      />
      <p className="text-xs text-gray-500 mt-1">Incluye http:// o https://</p>
    </div>
  );
}

export default ViewContentTypeWebsite;