import React from 'react';

interface ViewContentTypeMultipleChoiceProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeMultipleChoice({ deviceType = 'desktop' }: ViewContentTypeMultipleChoiceProps) {
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

  const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];

  return (
    <div style={getStyles()}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        🔘 Selecciona una opción
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input 
              type="radio" 
              name="multiple-choice-preview"
              className="mr-3 text-blue-500 focus:ring-blue-500"
              disabled
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ViewContentTypeMultipleChoice;