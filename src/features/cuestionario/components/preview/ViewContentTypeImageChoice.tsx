import React from 'react';

interface ViewContentTypeImageChoiceProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeImageChoice({ deviceType = 'desktop' }: ViewContentTypeImageChoiceProps) {
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
        🖼️ Selecciona una imagen
      </label>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="relative cursor-pointer">
            <input 
              type="radio" 
              name="image-choice-preview"
              className="absolute top-2 right-2 text-blue-500"
              disabled
            />
            <div className="border-2 border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">🖼️</span>
              </div>
              <span className="text-xs text-gray-600">Opción {item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewContentTypeImageChoice;