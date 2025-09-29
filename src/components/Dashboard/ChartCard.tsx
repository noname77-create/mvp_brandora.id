import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ChartCardProps {
  title: string;
  data: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
        {title}
      </h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.labels.map((label: string, index: number) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full space-y-1 mb-2">
              <div
                className="bg-blue-500 rounded-t"
                style={{ height: `${(data.datasets[0].data[index] / 2500) * 100}%` }}
              />
              <div
                className="bg-teal-500 rounded-t"
                style={{ height: `${(data.datasets[1].data[index] / 2500) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Engagement</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Reach</span>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;