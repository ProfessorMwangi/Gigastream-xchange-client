import { useState } from 'react';
import { MapPin, Filter, List, Map, Check, Star, Eye, Users, TrendingUp, Clock } from 'lucide-react';
import { Button, Card, Badge } from '../common';
import clsx from 'clsx';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Premium sites data from Xchange inventory
const premiumSites = [
  {
    id: '1',
    name: 'WAIYAKI WAY NEAR OLD SAFARICOM OLD HQ OUTBOUND',
    type: 'billboard',
    location: { address: 'Waiyaki Way, Nairobi', county: 'Nairobi' },
    dimensions: { width: 48, height: 14, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 650000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 136667,
      monthlyImpressions: 4100000,
      frequency: 6.5,
      reach: 630769
    },
    visibilityScore: 95,
    matchScore: 98,
    photo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
  },
  {
    id: '2',
    name: 'OUTERING RD @SHELL DONHOLM EXCHANGE',
    type: 'led',
    location: { address: 'Outering Road, Nairobi', county: 'Nairobi' },
    dimensions: { width: 40, height: 12, unit: 'ft' },
    illumination: 'digital',
    pricing: { monthly: 580000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 96667,
      monthlyImpressions: 2900000,
      frequency: 7.2,
      reach: 402778
    },
    visibilityScore: 93,
    matchScore: 95,
    photo: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400',
  },
  {
    id: '3',
    name: 'ELDORET TOWN UGANDA RD @ZION MALL',
    type: 'billboard',
    location: { address: 'Uganda Road, Eldoret', county: 'Eldoret' },
    dimensions: { width: 48, height: 14, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 420000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 80000,
      monthlyImpressions: 2400000,
      frequency: 7.8,
      reach: 307692
    },
    visibilityScore: 91,
    matchScore: 89,
    photo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
  },
  {
    id: '4',
    name: 'MUTHANGARI DRIVE NEAR NAIVAS BARAKA SHELL',
    type: 'billboard',
    location: { address: 'Muthangari Drive, Nairobi', county: 'Nairobi' },
    dimensions: { width: 40, height: 12, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 550000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 70000,
      monthlyImpressions: 2100000,
      frequency: 6.3,
      reach: 333333
    },
    visibilityScore: 92,
    matchScore: 93,
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  },
  {
    id: '5',
    name: 'KISUMU TOWN NEAR KCB ROUNDABOUT',
    type: 'led',
    location: { address: 'KCB Roundabout, Kisumu', county: 'Kisumu' },
    dimensions: { width: 36, height: 10, unit: 'ft' },
    illumination: 'digital',
    pricing: { monthly: 380000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 70000,
      monthlyImpressions: 2100000,
      frequency: 10.2,
      reach: 205882
    },
    visibilityScore: 94,
    matchScore: 87,
    photo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
  },
  {
    id: '6',
    name: 'LANGATA RD NEAR WATERFRONT MALL',
    type: 'billboard',
    location: { address: 'Langata Road, Nairobi', county: 'Nairobi' },
    dimensions: { width: 48, height: 14, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 480000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 50000,
      monthlyImpressions: 1500000,
      frequency: 5.5,
      reach: 272727
    },
    visibilityScore: 90,
    matchScore: 91,
    photo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
  },
  {
    id: '7',
    name: 'THIKA SUPERHIGHWAY AT ALLSOPS',
    type: 'billboard',
    location: { address: 'Thika Superhighway, Nairobi', county: 'Nairobi' },
    dimensions: { width: 60, height: 20, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 450000, currency: 'KES' },
    availability: 'available',
    trafficData: {
      dailyImpressions: 31667,
      monthlyImpressions: 950000,
      frequency: 2.6,
      reach: 365385
    },
    visibilityScore: 89,
    matchScore: 88,
    photo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
  },
  {
    id: '8',
    name: 'SARIT CENTRE',
    type: 'led',
    location: { address: 'Sarit Centre, Westlands', county: 'Nairobi' },
    dimensions: { width: 30, height: 12, unit: 'ft' },
    illumination: 'digital',
    pricing: { monthly: 520000, currency: 'KES' },
    availability: 'booked',
    trafficData: {
      dailyImpressions: 7667,
      monthlyImpressions: 230000,
      frequency: 4.1,
      reach: 56098
    },
    visibilityScore: 96,
    matchScore: 85,
    photo: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400',
  },
];

// Hourly performance data from PCR
const hourlyPerformanceData = [
  { hour: '6am', impressions: 3.2 },
  { hour: '9am', impressions: 8.5 },
  { hour: '12pm', impressions: 12.3 },
  { hour: '3pm', impressions: 15.8 },
  { hour: '6pm', impressions: 18.2 },
  { hour: '9pm', impressions: 11.4 },
  { hour: '12am', impressions: 4.1 },
];

// Daily performance data
const dailyPerformanceData = [
  { day: 'Mon', reach: 2.1, fill: '#3b82f6' },
  { day: 'Tue', reach: 2.3, fill: '#2563eb' },
  { day: 'Wed', reach: 2.5, fill: '#1d4ed8' },
  { day: 'Thu', reach: 2.4, fill: '#1e40af' },
  { day: 'Fri', reach: 2.8, fill: '#1e3a8a' },
  { day: 'Sat', reach: 3.2, fill: '#7c3aed' },
  { day: 'Sun', reach: 2.9, fill: '#6d28d9' },
];

interface StepSiteSelectionProps {
  selectedSites: string[];
  onChange: (siteIds: string[]) => void;
}

export function StepSiteSelection({ selectedSites, onChange }: StepSiteSelectionProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);

  const toggleSite = (siteId: string) => {
    const updated = selectedSites.includes(siteId)
      ? selectedSites.filter((id) => id !== siteId)
      : [...selectedSites, siteId];
    onChange(updated);
  };

  const totalCost = selectedSites.reduce((sum, id) => {
    const site = premiumSites.find((s) => s.id === id);
    return sum + (site?.pricing.monthly || 0);
  }, 0);

  const totalReach = selectedSites.reduce((sum, id) => {
    const site = premiumSites.find((s) => s.id === id);
    return sum + (site?.trafficData.reach || 0);
  }, 0);

  const totalImpressions = selectedSites.reduce((sum, id) => {
    const site = premiumSites.find((s) => s.id === id);
    return sum + (site?.trafficData.monthlyImpressions || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Premium Sites</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose outdoor media sites for your campaign. Sites are ranked by audience match and performance data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
          <div className="flex border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={clsx(
                'p-2 transition-colors',
                viewMode === 'list'
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={clsx(
                'p-2 transition-colors',
                viewMode === 'map'
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
              )}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Performance */}
        <Card className="bg-linear-to-br from-blue-50/50 to-white dark:from-blue-950/10 dark:to-slate-800/50 p-6 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Hourly Performance</h5>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={hourlyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <YAxis tickFormatter={(value) => `${value}%`} stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '10px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Peak hours: 3pm - 6pm (71% of daily reach)</p>
        </Card>

        {/* Daily Performance */}
        <Card className="bg-linear-to-br from-purple-50/50 to-white dark:from-purple-950/10 dark:to-slate-800/50 p-6 border border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Daily Reach Pattern</h5>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <YAxis tickFormatter={(value) => `${value}M`} stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="reach" radius={[8, 8, 0, 0]}>
                {dailyPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Weekend reach increases by 24% on average</p>
        </Card>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30 rounded-lg flex items-start gap-3">
        <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
        <div>
          <p className="font-medium text-purple-800 dark:text-purple-400">AI-Powered Recommendations</p>
          <p className="text-sm text-purple-700 dark:text-purple-500 mt-0.5">
            Based on your target audience and real performance data, we've ranked {premiumSites.filter(s => s.availability === 'available').length} available premium sites.
            Sites with 90+ match scores are optimal for your campaign goals.
          </p>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSites.length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-400">Sites Selected</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{selectedSites.length}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-400">Est. Monthly Reach</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{(totalReach / 1000000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-400">Total Impressions</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{(totalImpressions / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-400">Total Monthly Cost</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">KES {(totalCost / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
      )}

      {/* Sites Grid/List */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumSites.map((site) => {
            const isSelected = selectedSites.includes(site.id);
            const isBooked = site.availability === 'booked';

            return (
              <Card
                key={site.id}
                padding="none"
                hover={!isBooked}
                className={clsx(
                  'overflow-hidden transition-all',
                  isSelected && 'ring-2 ring-blue-600 dark:ring-cyan-600',
                  isBooked && 'opacity-60'
                )}
              >
                <div className="relative">
                  <img
                    src={site.photo}
                    alt={site.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={site.type === 'led' ? 'info' : 'default'}>
                      {site.type.toUpperCase()}
                    </Badge>
                    {isBooked && <Badge variant="error">Booked</Badge>}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-purple-500 fill-purple-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{site.matchScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{site.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {site.location.address}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Eye className="w-3 h-3" />
                      <span>{site.visibilityScore}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{(site.trafficData.dailyImpressions / 1000).toFixed(0)}K/day</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-500">
                      {site.dimensions.width}x{site.dimensions.height}{site.dimensions.unit}
                    </div>
                  </div>

                  {/* Performance metrics */}
                  <div className="mt-3 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Monthly Reach</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{(site.trafficData.reach / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Frequency</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{site.trafficData.frequency}x</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Rate</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        KES {(site.pricing.monthly / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="sm"
                      disabled={isBooked}
                      onClick={() => toggleSite(site.id)}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Selected
                        </>
                      ) : (
                        'Select'
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-125 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Map integration with Mapbox/Leaflet</p>
          </div>
        </div>
      )}
    </div>
  );
}
