import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Lightbulb, MessageSquare, Target, Flame, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import IdeaCard from './IdeaCard';

const BankIdeation = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { key: 'all', label: 'All Categories', icon: <TrendingUp className="h-4 w-4" /> },
    { key: 'Ide Content', label: 'Ide Content', icon: <Lightbulb className="h-4 w-4" /> },
    { key: 'Inspirasi Caption', label: 'Inspirasi Caption', icon: <MessageSquare className="h-4 w-4" /> },
    { key: 'Strategi Marketing', label: 'Strategi Marketing', icon: <Target className="h-4 w-4" /> },
    { key: 'Trending Topic', label: 'Trending Topic', icon: <Flame className="h-4 w-4" /> },
  ];

  const sectors = ['all', 'Kuliner', 'Fashion', 'Jasa', 'Teknologi', 'Kesehatan'];

  useEffect(() => {
    if (profile) {
      fetchIdeas();
    }
  }, [profile]);

  const fetchIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIdea = async (ideaData: any) => {
    try {
      const { error } = await supabase.from('ideas').insert({
        ...ideaData,
        user_id: profile?.id,
      });

      if (error) throw error;
      await fetchIdeas();
      setShowAddModal(false);
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleToggleSave = async (id: string, saved: boolean) => {
    try {
      const { error } = await supabase
        .from('ideas')
        .update({ saved: !saved })
        .eq('id', id);

      if (error) throw error;
      await fetchIdeas();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteIdea = async (id: string) => {
    if (!confirm('Hapus ide ini?')) return;

    try {
      const { error } = await supabase.from('ideas').delete().eq('id', id);
      if (error) throw error;
      await fetchIdeas();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || idea.tags?.includes(selectedSector.toLowerCase());

    return matchesSearch && matchesCategory && matchesSector;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading ideas...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
            Bank Ideation UMKM
          </h1>
          <p className="text-gray-600">
            Temukan ide konten terkini berdasarkan kategori & tren
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-600 transition-all flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Ide</span>
        </button>
      </div>

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

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full border flex items-center space-x-2 transition ${
              selectedCategory === cat.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            {...idea}
            onSave={() => handleToggleSave(idea.id, idea.saved)}
            onDelete={() => handleDeleteIdea(idea.id)}
            onEdit={() => alert('Edit feature coming soon')}
            onAddToPlanner={() => alert('Ide ditambahkan ke Content Planner!')}
          />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada ide yang ditemukan</p>
          <p className="text-gray-400">Coba ubah kata kunci, kategori, atau filter</p>
        </div>
      )}

      {showAddModal && (
        <AddIdeaModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddIdea}
        />
      )}
    </div>
  );
};

const AddIdeaModal: React.FC<{ onClose: () => void; onSave: (data: any) => void }> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Ide Content',
    trend: 'Stable',
    engagement: '',
    platform: 'Instagram',
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      saved: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Tambah Ide Baru</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Ide Content">Ide Content</option>
                <option value="Inspirasi Caption">Inspirasi Caption</option>
                <option value="Strategi Marketing">Strategi Marketing</option>
                <option value="Trending Topic">Trending Topic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (pisahkan dengan koma)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="contoh: kuliner, promo, video"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankIdeation;
