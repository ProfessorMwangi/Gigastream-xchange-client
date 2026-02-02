import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout';
import { Card, Button, Badge } from '../../components/common';
import type { Campaign } from '../../types';
import {
  CampaignIcon,
  ReachIcon,
  MoneyIcon,
  BillboardIcon,
  SparkleIcon,
} from '../../components/icons/CustomIcons';
import { Search, Filter, Plus, Calendar, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

// Mock campaigns data
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
      { siteId: '4', site: {} as any, status: 'pending', cost: 180000, startDate: '2026-02-01', endDate: '2026-02-28' },
      { siteId: '5', site: {} as any, status: 'pending', cost: 160000, startDate: '2026-02-01', endDate: '2026-02-28' },
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
  {
    id: '4',
    name: 'Equity Bank Digital Banking',
    clientName: 'Equity Bank',
    status: 'active',
    startDate: '2025-12-15',
    endDate: '2026-01-15',
    budget: 6000000,
    productCategory: 'banking',
    targetAudience: { ageRange: [22, 45], gender: 'all', incomeLevel: ['medium', 'high'], locations: ['Nairobi', 'Kisumu', 'Nakuru'] },
    sites: [
      { siteId: '6', site: {} as any, status: 'confirmed', cost: 250000, startDate: '2025-12-15', endDate: '2026-01-15' },
      { siteId: '7', site: {} as any, status: 'confirmed', cost: 220000, startDate: '2025-12-15', endDate: '2026-01-15' },
    ],
    totalReach: 3200000,
    totalCost: 5500000,
    createdAt: '2025-12-01',
    updatedAt: '2025-12-20',
  },
  {
    id: '5',
    name: 'Naivas Grand Opening',
    clientName: 'Naivas Supermarkets',
    status: 'completed',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    budget: 2500000,
    productCategory: 'fmcg',
    targetAudience: { ageRange: [20, 50], gender: 'all', incomeLevel: ['low', 'medium', 'high'], locations: ['Nakuru'] },
    sites: [
      { siteId: '8', site: {} as any, status: 'confirmed', cost: 180000, startDate: '2025-11-01', endDate: '2025-11-30' },
    ],
    totalReach: 1800000,
    totalCost: 2200000,
    createdAt: '2025-10-15',
    updatedAt: '2025-12-01',
  },
];

type FilterStatus = 'all' | 'active' | 'pending' | 'draft' | 'completed';

export function Campaigns() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockCampaigns.length,
    active: mockCampaigns.filter(c => c.status === 'active').length,
    pending: mockCampaigns.filter(c => c.status === 'pending').length,
    draft: mockCampaigns.filter(c => c.status === 'draft').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <Header
        title="My Campaigns"
        subtitle="Manage and track all your advertising campaigns"
      />

      <div className="p-8 max-w-[1800px] mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
          <div className="absolute inset-0 opacity-20 mix-blend-soft-light" style={{ backgroundImage: 'url(/noisy-grad.png)', backgroundSize: 'cover' }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <SparkleIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold tracking-wide">CAMPAIGN MANAGEMENT</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Campaign Portfolio</h2>
              <p className="text-indigo-100 text-lg">
                {stats.total} campaigns created • {stats.active} currently running
              </p>
            </div>
            <Button
              onClick={() => navigate('/campaigns/new')}
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-xl px-6 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                    <CampaignIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="info" className="bg-blue-100 text-blue-700 border-0 font-semibold">
                    Total
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">All Campaigns</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                    <SparkleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant="success" className="bg-green-100 text-green-700 border-0 font-semibold">
                    Live
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Active Campaigns</p>
                <p className="text-4xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge variant="warning" className="bg-orange-100 text-orange-700 border-0 font-semibold">
                    Review
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Pending Approval</p>
                <p className="text-4xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
                    <BillboardIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <Badge variant="default" className="bg-gray-100 text-gray-700 border-0 font-semibold">
                    Drafts
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Draft Campaigns</p>
                <p className="text-4xl font-bold text-gray-900">{stats.draft}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns or clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex gap-2">
                  {(['all', 'active', 'pending', 'draft', 'completed'] as FilterStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={clsx(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        filterStatus === status
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''}
            </h3>
          </div>

          {filteredCampaigns.length === 0 ? (
            <Card className="bg-white border-0 shadow-lg">
              <div className="p-12 text-center">
                <CampaignIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Create your first campaign to get started'}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => navigate('/campaigns/new')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Campaign
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredCampaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 duration-300 overflow-hidden group"
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                >
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{campaign.name}</h4>
                            <Badge
                              variant={
                                campaign.status === 'active' ? 'success' :
                                campaign.status === 'pending' ? 'warning' :
                                campaign.status === 'completed' ? 'default' : 'default'
                              }
                              className="capitalize font-semibold"
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-4 font-medium">{campaign.clientName}</p>

                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-blue-100 rounded-lg">
                                <BillboardIcon className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-gray-700 font-medium">{campaign.sites.length} LED Sites</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-green-100 rounded-lg">
                                <ReachIcon className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-gray-700 font-medium">
                                {campaign.totalReach > 0 ? `${(campaign.totalReach / 1000000).toFixed(1)}M Reach` : 'No reach data'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-purple-100 rounded-lg">
                                <MoneyIcon className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-gray-700 font-medium">
                                KES {campaign.totalCost > 0 ? (campaign.totalCost / 1000000).toFixed(1) + 'M' : '0'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-orange-100 rounded-lg">
                                <Calendar className="w-4 h-4 text-orange-600" />
                              </div>
                              <span className="text-gray-700 font-medium">
                                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <span className="mr-2">View Details</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                        <span className="font-medium">Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                        <span>Last updated {new Date(campaign.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
