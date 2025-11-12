import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Calendar, Clock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const ConsultationExpert = () => {
  const { profile } = useAuth();
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
    if (profile) {
      fetchBookings();
    }
  }, [profile]);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setExperts(data || []);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*, experts(*)')
        .eq('user_id', profile?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBookConsultation = (expertId: string) => {
    setSelectedExpert(expertId);
    setShowBookingModal(true);
  };

  const handleSaveBooking = async (bookingData: any) => {
    try {
      const { error } = await supabase.from('consultations').insert({
        user_id: profile?.id,
        expert_id: selectedExpert,
        date: bookingData.date,
        time: bookingData.time,
        type: bookingData.type,
        status: 'confirmed',
      });

      if (error) throw error;
      await fetchBookings();
      setShowBookingModal(false);
      alert('Konsultasi berhasil dijadwalkan!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Batalkan jadwal konsultasi ini?')) return;

    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      await fetchBookings();
      alert('Jadwal konsultasi berhasil dibatalkan!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading experts...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
          Consultation Expert
        </h1>
        <p className="text-gray-600">
          Konsultasi dengan pakar digital marketing untuk mengoptimalkan strategi Anda
        </p>
      </div>

      {bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Jadwal Konsultasi Saya</h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{booking.experts?.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.date).toLocaleDateString('id-ID')} - {booking.time} ({booking.type})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {booking.status === 'confirmed' ? 'Terkonfirmasi' : booking.status}
                  </span>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full hover:bg-red-200 transition-colors"
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={expert.avatar_url}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{expert.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{expert.title}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({expert.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{expert.experience} pengalaman</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {expert.specialties?.map((specialty: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-800">{expert.price}</p>
                <p className={`text-sm ${expert.available ? 'text-green-600' : 'text-red-600'}`}>
                  {expert.available ? 'Tersedia' : 'Tidak Tersedia'}
                </p>
              </div>
              <button
                onClick={() => handleBookConsultation(expert.id)}
                disabled={!expert.available}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  expert.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Konsultasi
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingModal && (
        <BookingModal
          onSave={handleSaveBooking}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

const BookingModal: React.FC<{ onSave: (data: any) => void; onClose: () => void }> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Video Call',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Book Konsultasi</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waktu
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Konsultasi
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Video Call">Video Call</option>
              <option value="Phone Call">Phone Call</option>
              <option value="In Person">Tatap Muka</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Konfirmasi Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationExpert;
