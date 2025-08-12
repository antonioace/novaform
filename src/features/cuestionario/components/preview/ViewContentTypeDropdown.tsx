import React from 'react';

interface ViewContentTypeDropdownProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeDropdown({ deviceType = 'desktop' }: ViewContentTypeDropdownProps) {
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
        📋 Selecciona una opción
      </label>
      <select 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        disabled
      >
        <option value="">Selecciona una opción...</option>
        <option value="option1">Opción 1</option>
        <option value="option2">Opción 2</option>
        <option value="option3">Opción 3</option>
        <option value="option4">Opción 4</option>
      </select>
    </div>
  );
}

export default ViewContentTypeDropdown;