import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Lightbulb, MessageSquare, Target, Flame } from 'lucide-react';
import IdeaCard from './IdeaCard';

const BankIdeation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Tips Packaging Produk UMKM yang Menarik',
      description: 'Ide konten untuk menampilkan packaging produk dengan cara yang menarik dan profesional',
      category: 'Ide Content',
      trend: 'Stable',
      engagement: '12.5K views',
      platform: 'Instagram',
      tags: ['packaging', 'produk', 'visual'],
      saved: false,
    },
    {
      id: 2,
      title: 'Caption untuk Promo Akhir Bulan',
      description: 'Koleksi caption yang engaging untuk promosi produk di akhir bulan',
      category: 'Inspirasi Caption',
      trend: 'Hot',
      engagement: '8.9K likes',
      platform: 'Facebook',
      tags: ['promo', 'caption', 'marketing'],
      saved: false,
    },
    {
      id: 3,
      title: 'Strategi Content Pillars untuk UMKM',
      description: 'Panduan lengkap membuat content pillars yang efektif untuk bisnis UMKM',
      category: 'Strategi Marketing',
      trend: 'Rising',
      engagement: '15.2K shares',
      platform: 'LinkedIn',
      tags: ['strategi', 'planning', 'brand'],
      saved: false,
    },
    {
      id: 4,
      title: 'Memanfaatkan Trending Audio TikTok',
      description: 'Tips menggunakan audio trending di TikTok untuk meningkatkan reach konten',
      category: 'Trending Topic',
      trend: 'Hot',
      engagement: '25.8K views',
      platform: 'TikTok',
      tags: ['tiktok', 'trending', 'audio'],
      saved: false,
    },
  ]);

  const categories = [
    { key: 'all', label: 'All Categories', icon: <TrendingUp className="h-4 w-4" /> },
    { key: 'Ide Content', label: 'Ide Content', icon: <Lightbulb className="h-4 w-4" /> },
    { key: 'Inspirasi Caption', label: 'Inspirasi Caption', icon: <MessageSquare className="h-4 w-4" /> },
    { key: 'Strategi Marketing', label: 'Strategi Marketing', icon: <Target className="h-4 w-4" /> },
    { key: 'Trending Topic', label: 'Trending Topic', icon: <Flame className="h-4 w-4" /> },
  ];

  const sectors = ['all', 'Kuliner', 'Fashion', 'Jasa', 'Teknologi', 'Kesehatan'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || idea.tags.includes(selectedSector.toLowerCase());

    return matchesSearch && matchesCategory && matchesSector;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
          Bank Ideation UMKM
        </h1>
        <p className="text-gray-600">
          Temukan ide konten terkini berdasarkan kategori & tren
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari ide konten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'Filter Lanjutan' : sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full border flex items-center space-x-2 transition ${
              selectedCategory === cat.key
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            {...idea}
            onSave={() =>
              setIdeas(ideas.map((i) => (i.id === idea.id ? { ...i, saved: !i.saved } : i)))
            }
            onDelete={() => setIdeas(ideas.filter((i) => i.id !== idea.id))}
            onEdit={() => alert(`Edit idea ${idea.id}`)}
            onAddToPlanner={() => alert(`Ide ditambahkan ke Content Planner!`)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada ide yang ditemukan</p>
          <p className="text-gray-400">Coba ubah kata kunci, kategori, atau filter</p>
        </div>
      )}

      {/* Populer Minggu Ini */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🔥 Populer Minggu Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ideas.slice(0, 3).map((idea) => (
            <IdeaCard
              key={idea.id}
              {...idea}
              onSave={() =>
                setIdeas(ideas.map((i) => (i.id === idea.id ? { ...i, saved: !i.saved } : i)))
              }
              onDelete={() => setIdeas(ideas.filter((i) => i.id !== idea.id))}
              onEdit={() => alert(`Edit idea ${idea.id}`)}
              onAddToPlanner={() => alert(`Ide ditambahkan ke Content Planner!`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankIdeation;
