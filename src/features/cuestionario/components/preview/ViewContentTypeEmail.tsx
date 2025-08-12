import React from 'react';
import { FiMail } from 'react-icons/fi';

interface ViewContentTypeEmailProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeEmail({ deviceType = 'desktop' }: ViewContentTypeEmailProps) {
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
        <FiMail className="inline mr-2" />
        Correo electrónico
      </label>
      <input 
        type="email" 
        placeholder="ejemplo@correo.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        readOnly
      />
      <p className="text-xs text-gray-500 mt-1">Ingresa una dirección de correo válida</p>
    </div>
  );
}

export default ViewContentTypeEmail;