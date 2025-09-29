import React from 'react';
import { 
  BookmarkPlus, 
  Bookmark, 
  CreditCard as Edit, 
  Trash2 
} from 'lucide-react';

interface IdeaCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  trend: string;
  engagement: string;
  platform: string;
  tags: string[];
  saved: boolean;
  onSave: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddToPlanner: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  title,
  description,
  category,
  trend,
  engagement,
  platform,
  tags,
  saved,
  onSave,
  onDelete,
  onEdit,
  onAddToPlanner,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mudah': return 'bg-green-100 text-green-700';
      case 'Menengah': return 'bg-yellow-100 text-yellow-700';
      case 'Lanjutan': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Kategori di atas */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
          {category}
        </span>
        <button
          onClick={onSave}
          className={`p-1 rounded-lg transition-colors ${
            saved ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          {saved ? <Bookmark className="h-5 w-5 fill-current" /> : <BookmarkPlus className="h-5 w-5" />}
        </button>
      </div>

      {/* Judul & deskripsi */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
      </div>

      {/* Tag */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Engagement + tombol */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">{engagement}</span>
        <div className="flex space-x-2">
         
        </div>
      </div>

      {/* Tombol utama */}
      <button
        onClick={onAddToPlanner}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default IdeaCard;
