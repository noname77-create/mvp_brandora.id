import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MousePointer,
  DollarSign,
  Download,
  Share2,
  Calendar,
  Filter,
  Crown,
} from "lucide-react";

// Dummy data mingguan (0–100%)
const weeklyData = {
  Instagram: [60, 85, 70, 90, 65, 80, 75],
  TikTok: [50, 75, 60, 95, 70, 95, 80],
  Facebook: [40, 60, 55, 70, 50, 65, 60],
  LinkedIn: [30, 50, 45, 55, 40, 60, 50],
};

const PerformanceReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  const periods = [
    { value: "7days", label: "7 Hari Terakhir" },
    { value: "30days", label: "30 Hari Terakhir" },
    { value: "90days", label: "3 Bulan Terakhir" },
    { value: "custom", label: "Custom Range" },
  ];

  const platforms = ["all", "Instagram", "TikTok", "Facebook", "LinkedIn"];

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const metrics = [
    { title: "Total Reach", value: "125.4K", change: "+15.3%", icon: Eye, color: "blue" },
    { title: "Engagement", value: "18.2K", change: "+8.7%", icon: Heart, color: "pink" },
    { title: "Click-Through Rate", value: "3.4%", change: "+12.1%", icon: MousePointer, color: "green" },
    { title: "Conversion", value: "2.1%", change: "+5.2%", icon: DollarSign, color: "purple" },
  ];

  const campaignData = [
    { name: "Summer Sale Campaign", reach: "45.2K", engagement: "6.8K", ctr: "4.2%", conversion: "3.1%", platform: "Instagram" },
    { name: "Product Launch Video", reach: "32.1K", engagement: "5.4K", ctr: "3.8%", conversion: "2.8%", platform: "TikTok" },
    { name: "Brand Awareness", reach: "28.7K", engagement: "4.2K", ctr: "2.9%", conversion: "1.8%", platform: "Facebook" },
    { name: "Professional Content", reach: "19.4K", engagement: "2.8K", ctr: "3.5%", conversion: "2.4%", platform: "LinkedIn" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 text-blue-700 bg-blue-50",
      pink: "bg-pink-500 text-pink-700 bg-pink-50",
      green: "bg-green-500 text-green-700 bg-green-50",
      purple: "bg-purple-500 text-purple-700 bg-purple-50",
    };
    return colors[color as keyof typeof colors].split(" ");
  };

  const handleExportPDF = () => alert("Laporan berhasil diekspor ke PDF!");
  const handleExportCSV = () => alert("Data berhasil diekspor ke CSV!");
  const handleShareReport = () => alert("Laporan berhasil dibagikan ke tim!");

  // Cari highlight konten ter-ramai
  const highlight = useMemo(() => {
    let maxVal = -1;
    let bestPlatform = "";
    let bestDay = "";
    Object.entries(weeklyData).forEach(([platform, values]) => {
      values.forEach((val, idx) => {
        if (val > maxVal) {
          maxVal = val;
          bestPlatform = platform;
          bestDay = days[idx];
        }
      });
    });
    return { platform: bestPlatform, day: bestDay, value: maxVal };
  }, []);

  // Render chart per platform
  const renderChart = (platform: string, data: number[]) => (
    <div key={platform} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
        {platform} - Tren Performa Mingguan
      </h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full space-y-1 mb-2">
              <div
                className="bg-blue-500 rounded-t"
                style={{ height: `${data[index]}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
          Performance Report
        </h1>
        <p className="text-gray-600">
          Analisis performa kampanye digital marketing Anda secara mendalam
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {selectedPeriod === "custom" && (
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={customRange.start}
                onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600">s/d</span>
              <input
                type="date"
                value={customRange.end}
                onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform === "all" ? "Semua Platform" : platform}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Export & Share */}
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleShareReport}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share to Team</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const [bgColor, textColor, cardBg] = getColorClasses(metric.color);
          return (
            <div key={index} className={`${cardBg} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${bgColor} rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${textColor} bg-white px-2 py-1 rounded-full`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</p>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Highlight Konten Ter-Ramai */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg flex items-center space-x-3 shadow-sm">
        <Crown className="h-6 w-6 text-yellow-600" />
        <p className="text-gray-800 font-medium">
          Konten ter-ramai minggu ini ada di{" "}
          <span className="font-bold">{highlight.platform}</span> pada hari{" "}
          <span className="font-bold">{highlight.day}</span> dengan performa{" "}
          <span className="font-bold">{highlight.value}%</span>.
        </p>
      </div>

      {/* Charts per platform */}
      {selectedPlatform === "all"
        ? Object.keys(weeklyData).map((platform) =>
            renderChart(platform, weeklyData[platform as keyof typeof weeklyData])
          )
        : renderChart(selectedPlatform, weeklyData[selectedPlatform as keyof typeof weeklyData])}

      {/* Campaign Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detail Performa Campaign</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignData.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{campaign.platform}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.reach}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.engagement}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.ctr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;
