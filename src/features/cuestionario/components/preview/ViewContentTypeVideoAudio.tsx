import React from 'react';

interface ViewContentTypeVideoAudioProps {
  config?: unknown;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

function ViewContentTypeVideoAudio({ deviceType = 'desktop' }: ViewContentTypeVideoAudioProps) {
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
        🎥 Graba tu respuesta
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎬</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Haz clic para grabar video o audio</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm" disabled>
                📹 Video
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm" disabled>
                🎤 Audio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContentTypeVideoAudio;