import { useState } from 'react';
import { MapPin, Filter, List, Map, Check, Star, Eye, Users } from 'lucide-react';
import { Button, Card, Badge } from '../common';
import clsx from 'clsx';

// Mock sites data
const mockSites = [
  {
    id: '1',
    name: 'Uhuru Highway Billboard',
    type: 'billboard',
    location: { address: 'Uhuru Highway, Nairobi', county: 'Nairobi' },
    dimensions: { width: 48, height: 14, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 350000, currency: 'KES' },
    availability: 'available',
    trafficData: { dailyImpressions: 125000 },
    visibilityScore: 92,
    matchScore: 95,
    photo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
  },
  {
    id: '2',
    name: 'Mombasa Road LED',
    type: 'led',
    location: { address: 'Mombasa Road, Nairobi', county: 'Nairobi' },
    dimensions: { width: 20, height: 10, unit: 'ft' },
    illumination: 'digital',
    pricing: { monthly: 450000, currency: 'KES' },
    availability: 'available',
    trafficData: { dailyImpressions: 180000 },
    visibilityScore: 96,
    matchScore: 91,
    photo: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400',
  },
  {
    id: '3',
    name: 'Westlands Junction',
    type: 'billboard',
    location: { address: 'Westlands Road, Nairobi', county: 'Nairobi' },
    dimensions: { width: 40, height: 12, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 280000, currency: 'KES' },
    availability: 'available',
    trafficData: { dailyImpressions: 95000 },
    visibilityScore: 88,
    matchScore: 87,
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  },
  {
    id: '4',
    name: 'KICC Digital Screen',
    type: 'led',
    location: { address: 'City Centre, Nairobi', county: 'Nairobi' },
    dimensions: { width: 15, height: 10, unit: 'ft' },
    illumination: 'digital',
    pricing: { monthly: 520000, currency: 'KES' },
    availability: 'available',
    trafficData: { dailyImpressions: 220000 },
    visibilityScore: 98,
    matchScore: 89,
    photo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
  },
  {
    id: '5',
    name: 'Thika Road Superhighway',
    type: 'billboard',
    location: { address: 'Thika Road, Nairobi', county: 'Nairobi' },
    dimensions: { width: 60, height: 20, unit: 'ft' },
    illumination: 'lit',
    pricing: { monthly: 420000, currency: 'KES' },
    availability: 'booked',
    trafficData: { dailyImpressions: 200000 },
    visibilityScore: 94,
    matchScore: 93,
    photo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
  },
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
    const site = mockSites.find((s) => s.id === id);
    return sum + (site?.pricing.monthly || 0);
  }, 0);

  const totalReach = selectedSites.reduce((sum, id) => {
    const site = mockSites.find((s) => s.id === id);
    return sum + (site?.trafficData.dailyImpressions || 0) * 30;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Select Sites</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose outdoor media sites for your campaign. Sites are ranked by audience match.
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
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={clsx(
                'p-2 transition-colors',
                viewMode === 'list' ? 'bg-primary-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={clsx(
                'p-2 transition-colors',
                viewMode === 'map' ? 'bg-primary-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-4 bg-accent-50 border border-accent-200 rounded-lg flex items-start gap-3">
        <Star className="w-5 h-5 text-accent-600 mt-0.5" />
        <div>
          <p className="font-medium text-accent-800">AI Recommendations</p>
          <p className="text-sm text-accent-700 mt-0.5">
            Based on your target audience, we've ranked {mockSites.filter(s => s.availability === 'available').length} available sites.
            Top matches are highlighted with a match score.
          </p>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSites.length > 0 && (
        <Card className="bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary-900">
                {selectedSites.length} site{selectedSites.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-primary-700">
                Est. monthly reach: {(totalReach / 1000000).toFixed(1)}M impressions
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-700">Total Monthly Cost</p>
              <p className="text-xl font-bold text-primary-900">
                KES {totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Sites Grid/List */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockSites.map((site) => {
            const isSelected = selectedSites.includes(site.id);
            const isBooked = site.availability === 'booked';

            return (
              <Card
                key={site.id}
                padding="none"
                hover={!isBooked}
                className={clsx(
                  'overflow-hidden',
                  isSelected && 'ring-2 ring-primary-800',
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
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent-500 fill-accent-500" />
                      <span className="text-sm font-semibold text-gray-900">{site.matchScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{site.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {site.location.address}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      {site.visibilityScore}%
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      {(site.trafficData.dailyImpressions / 1000).toFixed(0)}K/day
                    </span>
                    <span className="text-gray-400">
                      {site.dimensions.width}x{site.dimensions.height} {site.dimensions.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Rate</p>
                      <p className="font-semibold text-gray-900">
                        KES {site.pricing.monthly.toLocaleString()}
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
        <div className="bg-gray-200 rounded-xl h-[500px] flex items-center justify-center">
          <div className="text-center">
            <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500">Map integration with Mapbox/Leaflet</p>
          </div>
        </div>
      )}
    </div>
  );
}
