import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button } from '../../components/common';
import { SparkleIcon, ReachIcon, MoneyIcon, BillboardIcon } from '../../components/icons/CustomIcons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Filter, Download } from 'lucide-react';
import clsx from 'clsx';

// Mock analytics data
const performanceTrendData = [
  { month: 'Jul', reach: 3200000, impressions: 4100000, spent: 3500000 },
  { month: 'Aug', reach: 3800000, impressions: 4900000, spent: 4200000 },
  { month: 'Sep', reach: 4200000, impressions: 5500000, spent: 4800000 },
  { month: 'Oct', reach: 5100000, impressions: 6700000, spent: 5500000 },
  { month: 'Nov', reach: 5800000, impressions: 7400000, spent: 6200000 },
  { month: 'Dec', reach: 6700000, impressions: 8200000, spent: 7100000 },
];

const campaignPerformanceData = [
  { name: 'Safaricom Year End', reach: 2500000, cost: 4500000, roi: 285 },
  { name: 'EABL Tusker Launch', reach: 4200000, cost: 7200000, roi: 310 },
  { name: 'Equity Digital Banking', reach: 3200000, cost: 5500000, roi: 265 },
  { name: 'Naivas Grand Opening', reach: 1800000, cost: 2200000, roi: 240 },
];

const categoryDistributionData = [
  { name: 'Telecom', value: 35, color: '#3b82f6' },
  { name: 'Banking', value: 28, color: '#10b981' },
  { name: 'FMCG', value: 18, color: '#f59e0b' },
  { name: 'Alcohol', value: 12, color: '#8b5cf6' },
  { name: 'Other', value: 7, color: '#6b7280' },
];

const locationPerformanceData = [
  { location: 'Nairobi CBD', campaigns: 28, reach: 8500000, spent: 12000000 },
  { location: 'Westlands', campaigns: 22, reach: 6200000, spent: 9500000 },
  { location: 'Mombasa', campaigns: 15, reach: 4100000, spent: 6200000 },
  { location: 'Kisumu', campaigns: 12, reach: 3200000, spent: 4800000 },
  { location: 'Nakuru', campaigns: 8, reach: 2400000, spent: 3100000 },
];

type TimeRange = '7d' | '30d' | '90d' | '6m' | '1y';

export function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('6m');

  const stats = {
    totalReach: 6700000,
    reachGrowth: 15.5,
    totalSpent: 7100000,
    spentGrowth: 14.5,
    avgROI: 275,
    roiGrowth: 8.2,
    activeCampaigns: 12,
    campaignsGrowth: 20,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      <Header
        title="Campaign Analytics"
        subtitle="Comprehensive performance insights and metrics"
      />

      <div className="p-8 max-w-[1800px] mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <SparkleIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold tracking-wide">PERFORMANCE ANALYTICS</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Data-Driven Insights</h2>
              <p className="text-emerald-100 text-lg">
                Track campaign performance, ROI, and audience engagement across all your LED digital campaigns
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Time Range Filter */}
        <Card className="bg-white border-0 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Time Period</h3>
              </div>
              <div className="flex gap-2">
                {(['7d', '30d', '90d', '6m', '1y'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={clsx(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      timeRange === range
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {range === '7d' ? 'Last 7 Days' :
                     range === '30d' ? 'Last 30 Days' :
                     range === '90d' ? 'Last 90 Days' :
                     range === '6m' ? 'Last 6 Months' : 'Last Year'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                    <ReachIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{stats.reachGrowth}%</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Total Reach</p>
                <p className="text-4xl font-bold text-gray-900">{(stats.totalReach / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-gray-500 mt-2">Impressions this period</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                    <MoneyIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{stats.spentGrowth}%</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Total Spend</p>
                <p className="text-4xl font-bold text-gray-900">{(stats.totalSpent / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-gray-500 mt-2">KES spent this period</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{stats.roiGrowth}%</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Average ROI</p>
                <p className="text-4xl font-bold text-gray-900">{stats.avgROI}%</p>
                <p className="text-xs text-gray-500 mt-2">Return on investment</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <BillboardIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{stats.campaignsGrowth}%</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Active Campaigns</p>
                <p className="text-4xl font-bold text-gray-900">{stats.activeCampaigns}</p>
                <p className="text-xs text-gray-500 mt-2">Currently running</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-50 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Performance Trend</h3>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => `${(value / 1000000).toFixed(2)}M`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="reach" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} name="Reach" />
                    <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} name="Impressions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-50 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Campaign Categories</h3>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Filter className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Campaign ROI Comparison */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Campaign ROI Comparison</h3>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignPerformanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={150} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => `${value}%`}
                    />
                    <Bar dataKey="roi" fill="#3b82f6" name="ROI %" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Location Performance */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Top Performing Locations</h3>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <BillboardIcon className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="location" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any, name?: string) => {
                        if (name === 'campaigns') return value;
                        return `${(value / 1000000).toFixed(2)}M`;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="reach" fill="#10b981" name="Reach" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="campaigns" fill="#f59e0b" name="Campaigns" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        {/* Insights Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-900">Top Insight</h4>
              </div>
              <p className="text-sm text-green-800 leading-relaxed">
                Your campaigns in Nairobi CBD are performing 35% better than average, with the highest reach-to-cost ratio.
                Consider increasing investment in this location.
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <SparkleIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-blue-900">Recommendation</h4>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                Banking category campaigns show consistent high ROI (avg 285%). LED digital screens in financial districts
                are recommended for similar clients.
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-purple-900">Opportunity</h4>
              </div>
              <p className="text-sm text-purple-800 leading-relaxed">
                Kisumu and Nakuru markets show lower competition with growing reach potential. Early investment could
                yield higher returns at lower costs.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
