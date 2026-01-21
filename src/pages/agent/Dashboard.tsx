import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout';
import { Button, Badge } from '../../components/common';
import type { Campaign } from '../../types';
import {
  CampaignIcon,
  ClockIcon,
  ReachIcon,
  MoneyIcon,
  BillboardIcon,
  SparkleIcon,
  CheckCircleIcon,
} from '../../components/icons/CustomIcons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Zap, Users, DollarSign } from 'lucide-react';

// Mock data for charts
const reachTrendData = [
  { month: 'Jan', reach: 2400000, impressions: 3200000 },
  { month: 'Feb', reach: 3100000, impressions: 4100000 },
  { month: 'Mar', reach: 2800000, impressions: 3700000 },
  { month: 'Apr', reach: 3800000, impressions: 4900000 },
  { month: 'May', reach: 4200000, impressions: 5500000 },
  { month: 'Jun', reach: 6700000, impressions: 8200000 },
];

const budgetData = [
  { month: 'Jan', allocated: 14000000, spent: 11000000 },
  { month: 'Feb', allocated: 16000000, spent: 13500000 },
  { month: 'Mar', allocated: 15000000, spent: 12800000 },
  { month: 'Apr', allocated: 18000000, spent: 15200000 },
  { month: 'May', allocated: 20000000, spent: 17000000 },
  { month: 'Jun', allocated: 22000000, spent: 18700000 },
];

const locationData = [
  { location: 'Nairobi CBD', campaigns: 28, screens: 45 },
  { location: 'Westlands', campaigns: 22, screens: 35 },
  { location: 'Mombasa', campaigns: 15, screens: 24 },
  { location: 'Kisumu', campaigns: 12, screens: 18 },
  { location: 'Nakuru', campaigns: 8, screens: 12 },
];

const performanceData = [
  { week: 'Week 1', performance: 85 },
  { week: 'Week 2', performance: 88 },
  { week: 'Week 3', performance: 92 },
  { week: 'Week 4', performance: 96 },
];

// Mock data for preview
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Safaricom Year End Promo',
    clientName: 'Safaricom PLC',
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    budget: 5000000,
    productCategory: 'telecom',
    targetAudience: { ageRange: [18, 45], gender: 'all', incomeLevel: ['medium', 'high'], locations: ['Nairobi'] },
    sites: [
      { siteId: '1', site: {} as any, status: 'confirmed', cost: 150000, startDate: '2026-01-01', endDate: '2026-01-31' },
      { siteId: '2', site: {} as any, status: 'confirmed', cost: 120000, startDate: '2026-01-01', endDate: '2026-01-31' },
    ],
    totalReach: 2500000,
    totalCost: 4500000,
    createdAt: '2025-12-15',
    updatedAt: '2026-01-05',
  },
  {
    id: '2',
    name: 'EABL Tusker Launch',
    clientName: 'East African Breweries',
    status: 'pending',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    budget: 8000000,
    productCategory: 'alcohol',
    targetAudience: { ageRange: [25, 45], gender: 'all', incomeLevel: ['medium', 'high'], locations: ['Nairobi', 'Mombasa'] },
    sites: [
      { siteId: '3', site: {} as any, status: 'pending', cost: 200000, startDate: '2026-02-01', endDate: '2026-02-28' },
    ],
    totalReach: 4200000,
    totalCost: 7200000,
    createdAt: '2026-01-02',
    updatedAt: '2026-01-08',
  },
  {
    id: '3',
    name: 'KCB Foundation CSR',
    clientName: 'KCB Bank',
    status: 'draft',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    budget: 3000000,
    productCategory: 'banking',
    targetAudience: { ageRange: [25, 55], gender: 'all', incomeLevel: ['low', 'medium', 'high'], locations: ['Nationwide'] },
    sites: [],
    totalReach: 0,
    totalCost: 0,
    createdAt: '2026-01-08',
    updatedAt: '2026-01-08',
  },
];

export function AgentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative transition-colors duration-300">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-blue-400/20 dark:bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <Header
        title="Dashboard"
        subtitle="Real-time insights and campaign analytics"
      />

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto space-y-6">
        {/* Hero Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Hero Card - Spanning 8 columns */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-600 dark:via-blue-600 dark:to-purple-600 p-10 lg:p-12 shadow-2xl shadow-blue-500/20 dark:shadow-cyan-500/30">
            {/* Overlay Noise */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

            {/* Animated orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 dark:bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 dark:bg-pink-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-full mb-6 border border-white/20">
                <SparkleIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold tracking-wide text-white">POWERED BY GIGASTREAM</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white leading-tight">
                Ready to Launch?
              </h1>
              <p className="text-lg lg:text-xl text-blue-50 mb-10 max-w-2xl leading-relaxed font-light">
                Plan your next digital LED campaign across Kenya's premium inventory.
                <span className="block mt-1 text-white/90 font-medium">We handle everything after you book.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate('/campaigns/new')}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all px-8 py-4 text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Create Campaign
                </Button>
                <Button
                  onClick={() => navigate('/explore')}
                  className="bg-white text-indigo-600 hover:bg-white/90 font-semibold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all px-8 py-4 text-base"
                >
                  Explore Inventories
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats Glass Cards - Spanning 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            {/* Active Campaigns Glass Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 dark:from-green-400/10 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/20 dark:bg-green-400/20 backdrop-blur-xl rounded-2xl border border-green-500/30 dark:border-green-400/30">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="success" className="bg-green-500/20 dark:bg-green-400/20 text-green-700 dark:text-green-300 border border-green-500/30 dark:border-green-400/30 font-bold backdrop-blur-xl">
                    +18%
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Active Campaigns</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">12</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Running smoothly</p>
              </div>
            </div>

            {/* Monthly Reach Glass Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 dark:from-cyan-400/10 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 dark:bg-cyan-400/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 dark:border-cyan-400/30">
                    <ReachIcon className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <Badge variant="info" className="bg-blue-500/20 dark:bg-cyan-400/20 text-blue-700 dark:text-cyan-300 border border-blue-500/30 dark:border-cyan-400/30 font-bold backdrop-blur-xl">
                    Live
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Monthly Reach</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">8.2M</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Impressions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Pending Approvals */}
          <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 dark:from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="p-4 bg-gradient-to-br from-orange-500/20 dark:from-orange-400/20 to-orange-600/20 dark:to-orange-500/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 dark:border-orange-400/30 shadow-lg">
                  <ClockIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <Badge variant="warning" className="bg-orange-500/20 dark:bg-orange-400/20 text-orange-700 dark:text-orange-300 border border-orange-500/30 dark:border-orange-400/30 font-bold backdrop-blur-xl px-3 py-1">
                  Urgent
                </Badge>
              </div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 tracking-wide uppercase">Pending Approvals</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">8</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Awaiting response</p>
            </div>
          </div>

          {/* LED Inventories */}
          <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 dark:from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 dark:from-cyan-400/20 to-blue-600/20 dark:to-cyan-500/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 dark:border-cyan-400/30 shadow-lg">
                  <BillboardIcon className="w-7 h-7 text-blue-600 dark:text-cyan-400" />
                </div>
                <Badge variant="info" className="bg-blue-500/20 dark:bg-cyan-400/20 text-blue-700 dark:text-cyan-300 border border-blue-500/30 dark:border-cyan-400/30 font-bold backdrop-blur-xl px-3 py-1">
                  +12
                </Badge>
              </div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 tracking-wide uppercase">LED Inventories</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">134</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Across Kenya</p>
            </div>
          </div>

          {/* Total Reach */}
          <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 dark:from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="p-4 bg-gradient-to-br from-green-500/20 dark:from-green-400/20 to-green-600/20 dark:to-green-500/20 backdrop-blur-xl rounded-2xl border border-green-500/30 dark:border-green-400/30 shadow-lg">
                  <Users className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <Badge variant="success" className="bg-green-500/20 dark:bg-green-400/20 text-green-700 dark:text-green-300 border border-green-500/30 dark:border-green-400/30 font-bold backdrop-blur-xl px-3 py-1">
                  +28%
                </Badge>
              </div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 tracking-wide uppercase">Total Reach</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">6.7M</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Monthly impressions</p>
            </div>
          </div>

          {/* Budget Spent */}
          <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 dark:from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 dark:from-purple-400/20 to-purple-600/20 dark:to-purple-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 dark:border-purple-400/30 shadow-lg">
                  <DollarSign className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <Badge variant="default" className="bg-purple-500/20 dark:bg-purple-400/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 dark:border-purple-400/30 font-bold backdrop-blur-xl px-3 py-1">
                  85%
                </Badge>
              </div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 tracking-wide uppercase">Budget Spent</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">11.8M</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Of KES 14M allocated</p>
            </div>
          </div>
        </div>

        {/* Analytics Bento Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Real-time campaign performance metrics</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-cyan-400/10 backdrop-blur-xl rounded-full border border-blue-500/20 dark:border-cyan-400/20">
              <div className="w-2 h-2 bg-blue-500 dark:bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-blue-700 dark:text-cyan-300">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Reach Trend Chart */}
            <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 dark:from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Reach & Impressions Trend</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last 6 months performance</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 dark:bg-cyan-400/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 dark:border-cyan-400/20">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={reachTrendData}>
                    <defs>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => `${(value / 1000000).toFixed(2)}M`}
                    />
                    <Area type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} fill="url(#colorReach)" />
                    <Area type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={3} fill="url(#colorImpressions)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Budget Performance Chart */}
            <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 dark:from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Budget Performance</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Allocation vs. spending</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 dark:bg-purple-400/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 dark:border-purple-400/20">
                    <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => `KES ${(value / 1000000).toFixed(1)}M`}
                    />
                    <Bar dataKey="allocated" fill="#8b5cf6" name="Allocated" radius={[12, 12, 0, 0]} />
                    <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Location Performance */}
            <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 dark:from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Top Locations</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Best performing regions</p>
                  </div>
                  <div className="p-3 bg-green-500/10 dark:bg-green-400/10 backdrop-blur-xl rounded-2xl border border-green-500/20 dark:border-green-400/20">
                    <BillboardIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={locationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis dataKey="location" type="category" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} width={110} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="campaigns" fill="#10b981" name="Campaigns" radius={[0, 12, 12, 0]} />
                    <Bar dataKey="screens" fill="#3b82f6" name="LED Screens" radius={[0, 12, 12, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Score */}
            <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 dark:from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Performance Score</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Weekly trend analysis</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 dark:bg-orange-400/10 backdrop-blur-xl rounded-2xl border border-orange-500/20 dark:border-orange-400/20">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '600' }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => `${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#f59e0b"
                      strokeWidth={4}
                      dot={{ fill: '#f59e0b', r: 6, strokeWidth: 2, stroke: '#fff' }}
                      name="Performance Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaigns & Quick Actions Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Campaigns</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Your latest campaign activity</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/campaigns')}
                className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-semibold hover:bg-blue-50/50 dark:hover:bg-cyan-400/10"
              >
                View All
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>

            {mockCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 dark:from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{campaign.name}</h4>
                        <Badge
                          variant={
                            campaign.status === 'active' ? 'success' :
                            campaign.status === 'pending' ? 'warning' : 'default'
                          }
                          className="capitalize font-semibold backdrop-blur-xl border"
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">{campaign.clientName}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-500/10 dark:bg-cyan-400/10 backdrop-blur-xl rounded-xl border border-blue-500/20 dark:border-cyan-400/20">
                            <BillboardIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">{campaign.sites.length} LED Sites</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-500/10 dark:bg-green-400/10 backdrop-blur-xl rounded-xl border border-green-500/20 dark:border-green-400/20">
                            <ReachIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">{(campaign.totalReach / 1000000).toFixed(1)}M Reach</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-500/10 dark:bg-purple-400/10 backdrop-blur-xl rounded-xl border border-purple-500/20 dark:border-purple-400/20">
                            <MoneyIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">KES {(campaign.totalCost / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-white/20 dark:border-slate-700/50 font-medium">
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                    <span>Updated {new Date(campaign.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Common tasks</p>
            </div>

            {/* Plan Campaign Card */}
            <div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 dark:from-cyan-600 dark:via-blue-600 dark:to-purple-600 p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/campaigns/new')}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 inline-flex mb-4">
                  <CampaignIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl mb-2">Plan Campaign</h4>
                <p className="text-sm text-blue-100 font-medium">Create a new LED advertising campaign</p>
              </div>
            </div>

            {/* Explore Sites Card */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/explore')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 dark:from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

              <div className="relative z-10">
                <div className="p-3 bg-green-500/20 dark:bg-green-400/20 backdrop-blur-xl rounded-2xl border border-green-500/30 dark:border-green-400/30 inline-flex mb-4">
                  <BillboardIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Explore Sites</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Browse 134+ LED locations</p>
              </div>
            </div>

            {/* Quick Quote Card */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/quote')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 dark:from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

              <div className="relative z-10">
                <div className="p-3 bg-purple-500/20 dark:bg-purple-400/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 dark:border-purple-400/30 inline-flex mb-4">
                  <MoneyIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Quick Quote</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Get instant pricing estimates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
