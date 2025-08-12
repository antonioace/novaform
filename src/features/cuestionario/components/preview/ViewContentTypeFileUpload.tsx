import React from 'react';

interface ViewContentTypeFileUploadProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeFileUpload({ deviceType = 'desktop' }: ViewContentTypeFileUploadProps) {
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
        📎 Adjunta un archivo
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl">📁</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Arrastra y suelta archivos aquí</p>
            <p className="text-xs text-gray-500">o</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm" disabled>
              Seleccionar archivo
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Formatos permitidos: PDF, DOC, JPG, PNG (máx. 10MB)</p>
    </div>
  );
}

export default ViewContentTypeFileUpload;