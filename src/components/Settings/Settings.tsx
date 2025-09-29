import React, { useState } from "react";

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true,
  });

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("id");
  const [integrations, setIntegrations] = useState({
    instagram: true,
    facebook: false,
    tiktok: true,
    linkedin: false,
  });

  const toggleIntegration = (platform: keyof typeof integrations) => {
    setIntegrations((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Notifikasi & Tampilan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifikasi */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notifikasi</h2>
          {Object.keys(notifications).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span className="capitalize">
                {key === "email"
                  ? "Email Notifications"
                  : key === "push"
                  ? "Push Notifications"
                  : key === "marketing"
                  ? "Marketing Updates"
                  : "Product Updates"}
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof notifications],
                    }))
                  }
                  className="sr-only"
                />
                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${
                    notifications[key as keyof typeof notifications]
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      notifications[key as keyof typeof notifications]
                        ? "translate-x-5"
                        : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Tampilan */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tampilan</h2>
          <div className="mb-4">
            <p className="font-medium mb-2">Theme</p>
            <div className="space-y-2">
              {["light", "dark", "system"].map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={opt}
                    checked={theme === opt}
                    onChange={() => setTheme(opt)}
                  />
                  <span className="capitalize">
                    {opt === "light"
                      ? "Light Mode"
                      : opt === "dark"
                      ? "Dark Mode"
                      : "System Default"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privasi & Aksi Akun */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privasi */}
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

        {/* Aksi Akun */}
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

      {/* Integrasi Platform */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Integrasi Platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(integrations).map(([platform, connected]) => (
            <div
              key={platform}
              className="border rounded-lg p-4 flex flex-col items-center justify-center text-center"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 ${
                  platform === "instagram"
                    ? "bg-pink-500"
                    : platform === "facebook"
                    ? "bg-blue-600"
                    : platform === "tiktok"
                    ? "bg-black"
                    : "bg-blue-700"
                }`}
              >
                {platform.substring(0, 2).toUpperCase()}
              </div>
              <p className="capitalize font-medium mb-2">{platform}</p>
              <button
                onClick={() => toggleIntegration(platform as keyof typeof integrations)}
                className={`px-3 py-1 text-sm rounded ${
                  connected
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
