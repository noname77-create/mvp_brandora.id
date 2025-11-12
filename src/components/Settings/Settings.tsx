import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications_email: true,
    notifications_push: false,
    notifications_marketing: true,
    notifications_updates: true,
    theme: 'light',
    language: 'id',
    integration_instagram: false,
    integration_facebook: false,
    integration_tiktok: false,
    integration_linkedin: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<typeof settings>) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          id: user?.id,
          ...settings,
          ...updates,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setSettings({ ...settings, ...updates });
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleNotification = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  const toggleIntegration = (platform: string) => {
    const key = `integration_${platform}` as keyof typeof settings;
    updateSettings({ [key]: !settings[key] });
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notifikasi</h2>
          {[
            { key: 'notifications_email', label: 'Email Notifications' },
            { key: 'notifications_push', label: 'Push Notifications' },
            { key: 'notifications_marketing', label: 'Marketing Updates' },
            { key: 'notifications_updates', label: 'Product Updates' },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span>{label}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key as keyof typeof settings] as boolean}
                  onChange={() => toggleNotification(key as keyof typeof settings)}
                  className="sr-only"
                  disabled={saving}
                />
                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${
                    settings[key as keyof typeof settings]
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      settings[key as keyof typeof settings]
                        ? "translate-x-5"
                        : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tampilan</h2>
          <div className="mb-4">
            <p className="font-medium mb-2">Theme</p>
            <div className="space-y-2">
              {['light', 'dark', 'system'].map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={opt}
                    checked={settings.theme === opt}
                    onChange={() => updateSettings({ theme: opt })}
                    disabled={saving}
                  />
                  <span className="capitalize">
                    {opt === 'light' ? 'Light Mode' : opt === 'dark' ? 'Dark Mode' : 'System Default'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Language</p>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="w-full border rounded p-2"
              disabled={saving}
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Privasi & Keamanan</h2>
          <div className="p-4 rounded bg-green-50 border border-green-300">
            <p className="text-sm font-medium text-green-700">
              Two-Factor Authentication Aktif
            </p>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded">
              Kelola 2FA
            </button>
          </div>
          <button className="w-full py-2 border rounded text-orange-600 border-orange-400 hover:bg-orange-50">
            Ubah Password
          </button>
          <button className="w-full py-2 border rounded text-orange-600 border-orange-400 hover:bg-orange-50">
            Sesi Aktif
          </button>
          <button className="w-full py-2 border rounded text-orange-600 border-orange-400 hover:bg-orange-50">
            Download Data
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Aksi Akun</h2>
          <div className="p-4 border rounded bg-yellow-50">
            <p className="font-medium text-yellow-800">Export Data</p>
            <button className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded">
              Export
            </button>
          </div>
          <div className="p-4 border rounded bg-red-50">
            <p className="font-medium text-red-800">Hapus Akun</p>
            <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded">
              Hapus Akun
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Integrasi Platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['instagram', 'facebook', 'tiktok', 'linkedin'].map((platform) => {
            const connected = settings[`integration_${platform}` as keyof typeof settings] as boolean;
            return (
              <div
                key={platform}
                className="border rounded-lg p-4 flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 ${
                    platform === 'instagram'
                      ? 'bg-pink-500'
                      : platform === 'facebook'
                      ? 'bg-blue-600'
                      : platform === 'tiktok'
                      ? 'bg-black'
                      : 'bg-blue-700'
                  }`}
                >
                  {platform.substring(0, 2).toUpperCase()}
                </div>
                <p className="capitalize font-medium mb-2">{platform}</p>
                <button
                  onClick={() => toggleIntegration(platform)}
                  disabled={saving}
                  className={`px-3 py-1 text-sm rounded disabled:opacity-50 ${
                    connected
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
