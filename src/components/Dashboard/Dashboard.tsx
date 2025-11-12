import React, { useEffect, useState } from 'react';
import { TrendingUp, Calendar, MessageCircle, Eye, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';
import NotificationCard from './NotificationCard';

const Dashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    scheduledContent: 0,
    totalEngagement: '0',
    weeklyReach: '0',
    activeConsultations: 0,
  });
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      const [schedulesRes, campaignsRes, consultationsRes] = await Promise.all([
        supabase
          .from('content_schedules')
          .select('*')
          .eq('user_id', profile?.id),
        supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', profile?.id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('consultations')
          .select('*, experts(*)')
          .eq('user_id', profile?.id)
          .eq('status', 'confirmed')
          .order('date', { ascending: true }),
      ]);

      const schedules = schedulesRes.data || [];
      const campaignsData = campaignsRes.data || [];
      const consultationsData = consultationsRes.data || [];

      let totalEngagement = 0;
      let totalReach = 0;

      campaignsData.forEach((campaign: any) => {
        const engagement = parseInt(campaign.engagement?.replace(/[^0-9]/g, '') || '0');
        const reach = parseInt(campaign.reach?.replace(/[^0-9]/g, '') || '0');
        totalEngagement += engagement;
        totalReach += reach;
      });

      setStats({
        scheduledContent: schedules.length,
        totalEngagement: totalEngagement >= 1000 ? `${(totalEngagement / 1000).toFixed(1)}K` : totalEngagement.toString(),
        weeklyReach: totalReach >= 1000 ? `${(totalReach / 1000).toFixed(1)}K` : totalReach.toString(),
        activeConsultations: consultationsData.length,
      });

      setCampaigns(campaignsData);
      setConsultations(consultationsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { title: 'Konten Terjadwal', value: stats.scheduledContent.toString(), icon: Calendar, color: 'blue' as const, trend: '+12%' },
    { title: 'Total Engagement', value: stats.totalEngagement, icon: Heart, color: 'pink' as const, trend: '+8.5%' },
    { title: 'Reach Minggu Ini', value: stats.weeklyReach, icon: Eye, color: 'green' as const, trend: '+15.3%' },
    { title: 'Konsultasi Aktif', value: stats.activeConsultations.toString(), icon: MessageCircle, color: 'purple' as const, trend: '+1' },
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

  const notifications = consultations.slice(0, 3).map((consultation: any) => ({
    type: 'consultation' as const,
    title: `Konsultasi dengan ${consultation.experts?.name || 'Expert'}`,
    time: `${new Date(consultation.date).toLocaleDateString('id-ID')} - ${consultation.time}`,
    urgent: new Date(consultation.date).toDateString() === new Date().toDateString(),
  }));

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang di Dashboard
          </h1>
          <p className="text-gray-600">
            Kelola semua kampanye digital marketing Anda dalam satu tempat
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Hi, {profile?.name || 'User'}</span>
          <img
            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.name}&background=3B82F6&color=fff`}
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

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

      {notifications.length > 0 && (
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
      )}

      {campaigns.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Terbaru</h3>
          <div className="space-y-3">
            {campaigns.map((campaign: any) => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Reach: {campaign.reach}</p>
                    <p className="text-sm text-gray-600">Engagement: {campaign.engagement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
