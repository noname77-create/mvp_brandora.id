import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

const Profile: React.FC = () => {
  const { profile: authProfile, refreshProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authProfile) {
      setProfile({
        name: authProfile.name || '',
        email: authProfile.email || '',
        phone: authProfile.phone || '',
        business_name: authProfile.business_name || '',
        address: authProfile.address || '',
      });
    }
  }, [authProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          business_name: profile.business_name,
          address: profile.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', authProfile?.id);

      if (error) throw error;

      await refreshProfile();
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Informasi Profil</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 border rounded text-orange-600 border-orange-400 hover:bg-orange-50 text-sm"
          >
            {isEditing ? 'Batal' : 'Edit Profil'}
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium">{profile.name}</h3>
            <p className="text-sm text-gray-500">
              {profile.business_name ? `Pemilik ${profile.business_name}` : 'Business Owner'}
            </p>
            <p className="text-sm text-gray-500">{profile.email} | {profile.phone}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. Telepon</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nama Bisnis</label>
              <input
                type="text"
                name="business_name"
                value={profile.business_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          {isEditing && (
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Statistik Bisnis</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Total Followers</span> <span className="font-medium">13.8K</span>
            </li>
            <li className="flex justify-between">
              <span>Posts Published</span> <span className="font-medium">156</span>
            </li>
            <li className="flex justify-between">
              <span>Engagement Rate</span> <span className="font-medium">8.7%</span>
            </li>
            <li className="flex justify-between">
              <span>Member Since</span> <span className="font-medium">
                {authProfile?.created_at ? new Date(authProfile.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : '-'}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-4">Subscription</h2>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 text-2xl">
              📱
            </div>
            <p className="font-medium">Premium Plan</p>
            <p className="text-sm text-gray-500">Berlaku hingga 15 Jan 2025</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
