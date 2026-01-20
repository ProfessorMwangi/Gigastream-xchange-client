import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout';
import { Card, Button, Badge } from '../../components/common';
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
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Dashboard"
        subtitle="Overview of your campaigns and activities"
      />

      <div className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <SparkleIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">AI-Powered Planning</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Launch Your Next Campaign</h2>
              <p className="text-blue-100 mb-6 max-w-xl">
                Get intelligent recommendations for billboard and LED screen placements based on your target audience.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/agent/campaigns/new')}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
                >
                  Create Campaign
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
                <Button
                  onClick={() => navigate('/agent/explore')}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20 font-semibold"
                >
                  Explore Sites
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl rotate-6"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl -rotate-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BillboardIcon className="w-20 h-20 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Active Campaigns */}
          <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <CampaignIcon className="w-7 h-7 text-blue-600" />
                </div>
                <Badge variant="info" size="sm" className="bg-blue-50 text-blue-700 border-0">
                  Live
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Campaigns</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">4</p>
                <p className="text-xs text-gray-400">Running smoothly</p>
              </div>
            </div>
          </Card>

          {/* Pending Approvals */}
          <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-2xl">
                  <ClockIcon className="w-7 h-7 text-orange-600" />
                </div>
                <Badge variant="warning" size="sm" className="bg-orange-50 text-orange-700 border-0">
                  Pending
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pending Approvals</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
                <p className="text-xs text-gray-400">Awaiting response</p>
              </div>
            </div>
          </Card>

          {/* Total Reach */}
          <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <ReachIcon className="w-7 h-7 text-green-600" />
                </div>
                <Badge variant="success" size="sm" className="bg-green-50 text-green-700 border-0">
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Reach</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">6.7M</p>
                <p className="text-xs text-gray-400">Impressions this month</p>
              </div>
            </div>
          </Card>

          {/* Budget Spent */}
          <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <MoneyIcon className="w-7 h-7 text-purple-600" />
                </div>
                <Badge variant="default" size="sm" className="bg-purple-50 text-purple-700 border-0">
                  85%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Budget Spent</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">KES 11.8M</p>
                <p className="text-xs text-gray-400">Of KES 14M allocated</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Recent Campaigns</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/agent/campaigns')}
                className="text-blue-600 hover:text-blue-700"
              >
                View All
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>

            <div className="space-y-3">
              {mockCampaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="bg-white border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/agent/campaigns/${campaign.id}`)}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{campaign.name}</h4>
                          <Badge
                            variant={
                              campaign.status === 'active' ? 'success' :
                              campaign.status === 'pending' ? 'warning' : 'default'
                            }
                            className="capitalize"
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{campaign.clientName}</p>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <BillboardIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-600">{campaign.sites.length} Sites</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <ReachIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-600">{(campaign.totalReach / 1000000).toFixed(1)}M Reach</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-purple-100 rounded-lg">
                              <MoneyIcon className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-gray-600">KES {(campaign.totalCost / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                      <span>
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                      <span>Updated {new Date(campaign.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Card
                className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                onClick={() => navigate('/agent/campaigns/new')}
              >
                <div className="p-5 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                      <CampaignIcon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg">Plan Campaign</h4>
                  </div>
                  <p className="text-sm text-blue-100">Create a new OOH advertising campaign</p>
                </div>
              </Card>

              <Card
                className="bg-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate('/agent/explore')}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <BillboardIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Explore Sites</h4>
                  </div>
                  <p className="text-sm text-gray-600">Browse 2,500+ billboard locations</p>
                </div>
              </Card>

              <Card
                className="bg-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate('/agent/quick-quote')}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <MoneyIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Quick Quote</h4>
                  </div>
                  <p className="text-sm text-gray-600">Get instant pricing estimates</p>
                </div>
              </Card>

              {/* Activity Feed */}
              <Card className="bg-white border-0 shadow-md">
                <div className="p-5">
                  <h4 className="font-bold text-base text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-green-100 rounded-lg mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Site Confirmed</p>
                        <p className="text-xs text-gray-500">Uhuru Highway Billboard</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-orange-100 rounded-lg mt-0.5">
                        <ClockIcon className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Awaiting Approval</p>
                        <p className="text-xs text-gray-500">3 sites pending</p>
                        <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-blue-100 rounded-lg mt-0.5">
                        <CampaignIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Campaign Created</p>
                        <p className="text-xs text-gray-500">EABL Tusker Launch</p>
                        <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
