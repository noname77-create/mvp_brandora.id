import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save, Download, ArrowLeft, Type, Image, Square,
  Layers, Palette, Undo, Redo, ZoomIn, ZoomOut,
  Move, RotateCcw, Trash2, Copy
} from 'lucide-react';

const TemplateEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [selectedTool, setSelectedTool] = useState('move');
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const [layers, setLayers] = useState<any[]>([
    { id: 1, type: 'background', color: '#f3f4f6', zIndex: 1 },
    { id: 2, type: 'text', content: 'Your Title Here', x: 80, y: 120, fontSize: 32, fontWeight: 'bold', color: '#1f2937', zIndex: 2 },
    { id: 3, type: 'text', content: 'Subtitle or description', x: 80, y: 170, fontSize: 18, color: '#6b7280', zIndex: 3 },
  ]);

  const tools = [
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'shape', icon: Square, label: 'Shape' },
    { id: 'background', icon: Palette, label: 'Background' },
  ];

  const handleSave = () => {
    alert('Design berhasil disimpan!');
  };

  const handleDownload = () => {
    alert('Design berhasil diunduh!');
  };

  const handleAddText = () => {
    const newText = {
      id: Date.now(),
      type: 'text',
      content: 'New Text',
      x: 100,
      y: 200,
      fontSize: 20,
      color: '#000000',
      zIndex: layers.length + 1,
    };
    setLayers([...layers, newText]);
  };

  const handleAddImage = () => {
    const newImage = {
      id: Date.now(),
      type: 'image',
      src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      x: 150,
      y: 250,
      width: 150,
      height: 150,
      zIndex: layers.length + 1,
    };
    setLayers([...layers, newImage]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/social-media-kit')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-gray-800 text-lg">
            {templateId ? `Template ${templateId}` : 'New Design'}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Undo className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Redo className="h-5 w-5" />
          </button>
          <div className="border-l border-gray-300 mx-2 h-6"></div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar kiri */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-4 shadow-sm">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool.id);
                  if (tool.id === 'text') handleAddText();
                  if (tool.id === 'image') handleAddImage();
                }}
                className={`p-3 rounded-xl transition-all ${
                  selectedTool === tool.id
                    ? 'bg-blue-100 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={tool.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>

        {/* Canvas tengah */}
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div
              ref={canvasRef}
              className="relative w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-gray-200"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`absolute cursor-move ${
                    selectedLayer === layer.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    left: `${layer.x || 0}px`,
                    top: `${layer.y || 0}px`,
                    zIndex: layer.zIndex,
                  }}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  {layer.type === 'text' && (
                    <div
                      style={{
                        fontSize: `${layer.fontSize}px`,
                        color: layer.color,
                        fontWeight: layer.fontWeight || 'normal',
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      className="px-1"
                    >
                      {layer.content}
                    </div>
                  )}
                  {layer.type === 'image' && (
                    <img
                      src={layer.src}
                      alt=""
                      style={{
                        width: `${layer.width}px`,
                        height: `${layer.height}px`,
                      }}
                      className="object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel kanan */}
        <div className="w-72 bg-white border-l border-gray-200 p-6 space-y-6 overflow-y-auto shadow-sm">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </h3>

          <div className="space-y-2">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center ${
                  selectedLayer === layer.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedLayer(layer.id)}
              >
                <span className="text-sm font-medium">
                  {layer.type === 'text'
                    ? 'Text Layer'
                    : layer.type === 'image'
                    ? 'Image Layer'
                    : 'Background'}
                </span>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="h-3 w-3" />
                  </button>
                  <button className="p-1 hover:bg-red-100 rounded text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 mb-3">Zoom</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
