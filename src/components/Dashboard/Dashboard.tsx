import React from 'react';
import { TrendingUp, Calendar, MessageCircle, Eye, Heart } from 'lucide-react';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';
import NotificationCard from './NotificationCard';

const Dashboard = () => {
  const userName = "Fathun"; // nanti bisa diambil dari props atau context auth

  const statsData = [
    { title: 'Konten Terjadwal', value: '24', icon: Calendar, color: 'blue', trend: '+12%' },
    { title: 'Total Engagement', value: '15.2K', icon: Heart, color: 'pink', trend: '+8.5%' },
    { title: 'Reach Minggu Ini', value: '89.3K', icon: Eye, color: 'green', trend: '+15.3%' },
    { title: 'Konsultasi Aktif', value: '3', icon: MessageCircle, color: 'purple', trend: '+1' },
  ];

  const chartData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        label: 'Engagement',
        data: [1200, 1900, 800, 2100, 1800, 2400, 2200],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Reach',
        data: [800, 1500, 600, 1800, 1400, 2000, 1900],
        borderColor: '#14B8A6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const trendingInsights = [
    { topic: 'Video Pendek', engagement: '89% ↑', platform: 'Instagram & TikTok' },
    { topic: 'Konten Edukasi', engagement: '76% ↑', platform: 'LinkedIn' },
    { topic: 'Behind The Scenes', engagement: '64% ↑', platform: 'Instagram Stories' },
  ];

  const notifications = [
    { type: 'consultation', title: 'Konsultasi dengan Pak Rudi', time: '14:00 hari ini', urgent: true },
    { type: 'campaign', title: 'Campaign "Summer Sale" berakhir besok', time: '2 jam lalu', urgent: false },
    { type: 'content', title: '5 konten siap dipublikasi', time: '1 jam lalu', urgent: false },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        {/* Kiri */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang di Dashboard
          </h1>
          <p className="text-gray-600">
            Kelola semua kampanye digital marketing Anda dalam satu tempat
          </p>
        </div>

        {/* Kanan - Profile User */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Hi, {userName}</span>
          <img
            src="https://ui-avatars.com/api/?name=User&background=3B82F6&color=fff"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Performa Campaign Mingguan" data={chartData} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Insight Tren Terkini
          </h3>
          <div className="space-y-4">
            {trendingInsights.map((insight, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{insight.topic}</p>
                  <p className="text-sm text-gray-600">{insight.platform}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{insight.engagement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
          Notifikasi & Reminder
        </h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} {...notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
