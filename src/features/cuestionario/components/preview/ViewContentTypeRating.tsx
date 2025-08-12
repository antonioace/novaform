import React from 'react';

interface ViewContentTypeRatingProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeRating({ deviceType = 'desktop' }: ViewContentTypeRatingProps) {
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
        ⭐ Califica tu experiencia
      </label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
            disabled
          >
            ⭐
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-500">0 de 5 estrellas</span>
      </div>
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>Muy malo</span>
        <span>Excelente</span>
      </div>
    </div>
  );
}

export default ViewContentTypeRating;