import React, { useState } from "react";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Sari Makmur",
    email: "sari.makmur@email.com",
    phone: "+62 812-3456-7890",
    businessName: "Toko Kue Sari",
    address:
      "Jl. Mawar Indah No. 123, Kelurahan Bunga, Kecamatan Indah, Jakarta Selatan",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saved profile:", profile);
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Informasi Profil */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Informasi Profil</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 border rounded text-orange-600 border-orange-400 hover:bg-orange-50 text-sm"
          >
            {isEditing ? "Batal" : "Edit Profil"}
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium">{profile.name}</h3>
            <p className="text-sm text-gray-500">Pemilik {profile.businessName}</p>
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
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded px-3 py-2"
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
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nama Bisnis</label>
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded px-3 py-2"
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
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {isEditing && (
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Sidebar kanan */}
      <div className="space-y-6">
        {/* Statistik Bisnis */}
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
              <span>Member Since</span> <span className="font-medium">Jan 2024</span>
            </li>
          </ul>
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-4">Subscription</h2>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
              <span className="text-orange-600">📱</span>
            </div>
            <p className="font-medium">Premium Plan</p>
            <p className="text-sm text-gray-500">Berlaku hingga 15 Jan 2025</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Kontak Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Kontak Info</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📍 Jakarta Selatan, Indonesia</li>
            <li>🏷️ Makanan & Minuman</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
