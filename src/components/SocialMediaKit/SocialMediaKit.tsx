import React, { useState } from 'react';
import { Plus, Upload, Palette, FileText, Type, Image as ImageIcon, Star, Share2, Bold } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from './TemplateCard';

const SocialMediaKit = () => {
  const navigate = useNavigate();
  const [brandAssets, setBrandAssets] = useState([
    { id: 1, name: 'Logo', type: 'image', file: null },
    { id: 2, name: 'Brand Guideline', type: 'pdf', file: null },
    { id: 3, name: 'Color Palette', type: 'color', file: null },
    { id: 4, name: 'Typography', type: 'font', file: null },
  ]);

  const templates = [
    { id: 1, type: 'Feed Post', title: 'Promo Product', preview: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { id: 2, type: 'Stories', title: 'Behind The Scenes', preview: 'https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop' },
    { id: 3, type: 'Reels', title: 'Tutorial Quick', preview: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop' },
    { id: 4, type: 'Carousel', title: 'Tips Marketing', preview: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
  ];

  const handleUpload = (id: number, file: File) => {
    setBrandAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, file } : asset
      )
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Brand Assets & Templates
        </h1>
        <p className="text-gray-600">
          Kelola aset brand Anda, lihat panduan brand, dan gunakan template desain untuk membuat konten yang konsisten
        </p>
      </div>

      {/* Brand Assets */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Aset Brand</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {brandAssets.map(asset => (
            <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                {asset.file ? (
                  asset.type === 'image' ? (
                    <img src={URL.createObjectURL(asset.file)} alt={asset.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs text-gray-600 text-center px-1">{asset.file.name}</span>
                  )
                ) : (
                  asset.name
                )}
              </div>
              <label className="cursor-pointer bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && handleUpload(asset.id, e.target.files[0])}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Panduan Brand */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Panduan Brand</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Color Palette */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold text-gray-800">Color Palette</h3>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-md bg-orange-500"></div>
              <div className="w-10 h-10 rounded-md bg-white border"></div>
              <div className="w-10 h-10 rounded-md bg-black"></div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Typography</h3>
            </div>
            <p className="text-gray-800 font-bold text-lg">Inter Bold</p>
            <p className="text-gray-600 italic">Inter Regular</p>
          </div>

          {/* Logo Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 w-full">
              <ImageIcon className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-800">Logo Usage</h3>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Logo Example" className="h-16 object-contain mb-2" />
            <p className="text-xs text-gray-500 text-center">Gunakan logo dengan background putih atau transparan</p>
          </div>
        </div>
      </div>

      {/* Statistik Penggunaan */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistik Penggunaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-medium text-gray-700">Template Favorit</h3>
            <p className="text-gray-800 font-semibold">Instagram Post Template</p>
            <p className="text-sm text-gray-500">89 uses</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center">
            <Share2 className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-700">Paling Dibagikan</h3>
            <p className="text-gray-800 font-semibold">Brand Guideline PDF</p>
            <p className="text-sm text-gray-500">256 shares</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center">
            <Bold className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-700">Font Terpopuler</h3>
            <p className="text-gray-800 font-semibold">Inter Bold</p>
            <p className="text-sm text-gray-500">124 uses</p>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Template Desain</h2>
          <button
            onClick={() => navigate('/editor')}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-600 transition-all flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Your Own
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              {...template}
              onUseTemplate={() => navigate(`/editor/${template.id}`)}
              onPreviewTemplate={() => window.open(template.preview, '_blank')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaKit;
