import React from 'react';

interface TemplateCardProps {
  id: number;
  type: string;
  title: string;
  preview: string;
  onUseTemplate: () => void;
  onPreviewTemplate: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ type, title, preview, onUseTemplate, onPreviewTemplate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={preview}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2">
          <button
            onClick={onPreviewTemplate}
            className="bg-white text-gray-800 px-3 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Preview
          </button>
          <button
            onClick={onUseTemplate}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Gunakan
          </button>
        </div>
      </div>
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
          {type}
        </span>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      </div>
    </div>
  );
};

export default TemplateCard;
