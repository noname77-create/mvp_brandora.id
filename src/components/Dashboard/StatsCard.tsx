import React from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'pink' | 'green' | 'purple';
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-700 bg-blue-50',
    pink: 'bg-pink-500 text-pink-700 bg-pink-50',
    green: 'bg-green-500 text-green-700 bg-green-50',
    purple: 'bg-purple-500 text-purple-700 bg-purple-50',
  };

  const [bgColor, textColor, cardBg] = colorClasses[color].split(' ');

  return (
    <div className={`${cardBg} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className={`text-sm font-medium ${textColor} bg-white px-2 py-1 rounded-full`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;