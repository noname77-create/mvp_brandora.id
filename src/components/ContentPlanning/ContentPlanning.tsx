import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Calendar from './Calendar';
import EventModal from './EventModal';

const ContentPlanning = () => {
  const { profile } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const platforms = ['all', 'Instagram', 'TikTok', 'Facebook', 'LinkedIn'];

  useEffect(() => {
    if (profile) {
      fetchSchedules();
    }
  }, [profile]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewMode('week');
      } else {
        setViewMode('month');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('content_schedules')
        .select('*')
        .eq('user_id', profile?.id)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;

      const formattedEvents = (data || []).map((schedule: any) => ({
        id: schedule.id,
        title: schedule.title,
        date: new Date(schedule.scheduled_date),
        platform: schedule.platform,
        type: schedule.content_type,
        time: schedule.scheduled_time,
        status: schedule.status,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    selectedPlatform === 'all' || event.platform === selectedPlatform
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleSaveEvent = async (eventData: any) => {
    try {
      const { error } = await supabase.from('content_schedules').insert({
        user_id: profile?.id,
        title: eventData.title,
        description: eventData.description,
        platform: eventData.platform,
        content_type: eventData.type,
        scheduled_date: eventData.date,
        scheduled_time: eventData.time,
        status: eventData.status,
      });

      if (error) throw error;
      await fetchSchedules();
      setShowEventModal(false);
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm('Hapus jadwal ini?')) return;

    try {
      const { error } = await supabase
        .from('content_schedules')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      await fetchSchedules();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  const todayEvents = events.filter(event =>
    event.date.toDateString() === new Date().toDateString()
  );

  const monthEvents = events.filter(event =>
    event.date.getMonth() === currentDate.getMonth() &&
    event.date.getFullYear() === currentDate.getFullYear()
  );

  const stats = {
    total: monthEvents.length,
    draft: monthEvents.filter(e => e.status === 'draft').length,
    scheduled: monthEvents.filter(e => e.status === 'scheduled').length,
    published: monthEvents.filter(e => e.status === 'published').length,
  };

  const platformDistribution = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn'].map(p => ({
    platform: p,
    count: monthEvents.filter(e => e.platform === p).length
  }));

  const upcomingEvents = events
    .filter(e => e.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading schedules...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <CalendarIcon className="h-8 w-8 mr-3 text-blue-600" />
          Content Planning
        </h1>
        <p className="text-gray-600">
          Atur jadwal posting konten Anda dengan kalender interaktif
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 min-w-48 text-center">
              {formatMonthYear(currentDate)}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform === 'all' ? 'Semua Platform' : platform}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {mode === 'month' ? 'Bulan' : mode === 'week' ? 'Minggu' : 'Hari'}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleDateClick(new Date())}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-600 transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Buat Jadwal</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Calendar
              currentDate={currentDate}
              events={filteredEvents}
              viewMode={viewMode}
              onDateClick={handleDateClick}
              onEventDelete={handleDeleteEvent}
            />
          </div>

          {upcomingEvents.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Konten Mendatang</h3>
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 border-b">
                  <tr>
                    <th className="py-2">Judul</th>
                    <th className="py-2">Platform</th>
                    <th className="py-2">Tanggal & Waktu</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map(ev => (
                    <tr key={ev.id} className="border-b last:border-0">
                      <td className="py-2">{ev.title}</td>
                      <td className="py-2">{ev.platform}</td>
                      <td className="py-2">{ev.date.toLocaleDateString('id-ID')} {ev.time}</td>
                      <td className="py-2 capitalize">{ev.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-3">Jadwal Hari Ini</h3>
            {todayEvents.length > 0 ? (
              <ul className="space-y-2">
                {todayEvents.map(ev => (
                  <li key={ev.id} className="text-sm">
                    <span className="font-medium">{ev.time}</span> - {ev.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Tidak ada jadwal hari ini</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-3">Statistik Bulan Ini</h3>
            <ul className="text-sm space-y-1">
              <li>Total: {stats.total}</li>
              <li>Draft: {stats.draft}</li>
              <li>Terjadwal: {stats.scheduled}</li>
              <li>Dipublikasi: {stats.published}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-3">Distribusi Platform</h3>
            <ul className="text-sm space-y-1">
              {platformDistribution.map(p => (
                <li key={p.platform}>
                  {p.platform}: {p.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showEventModal && (
        <EventModal
          date={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
};

export default ContentPlanning;
