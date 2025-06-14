import React, { useState } from "react";
import { BaseElementProps } from "./types";

const InputSubirImagenElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Aquí manejarías la subida del archivo
    console.log("Archivo dropeado");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2" style={styles} {...eventHandlers}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <div className="space-y-2">
            <img
              src={selectedImage}
              alt="Vista previa"
              className="max-w-full h-32 object-cover rounded mx-auto"
            />
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setSelectedImage(null)}
            >
              Cambiar imagen
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <label
                htmlFor={`file-upload-${block.id}`}
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
              >
                Subir archivo
              </label>
              <span className="text-gray-500"> o arrastra aquí</span>
            </div>
            <input
              id={`file-upload-${block.id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
          </div>
        )}
      </div>

      {block.description && (
        <p className="text-sm text-gray-600">{block.description}</p>
      )}
    </div>
  );
};

export default InputSubirImagenElement;
