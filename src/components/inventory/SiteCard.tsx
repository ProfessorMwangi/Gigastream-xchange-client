import { MapPin, Eye, Users, Star } from 'lucide-react';
import { Card, Badge, Button } from '../common';
import type { Site } from '../../types';

interface SiteCardProps {
  site: Partial<Site> & {
    id: string;
    name: string;
    type: 'billboard' | 'led' | 'transit' | 'street_furniture';
    location: { address: string; county: string };
    pricing: { monthly: number; currency: string };
    availability: 'available' | 'booked' | 'maintenance';
    trafficData: { dailyImpressions: number };
    visibilityScore: number;
    photos: string[];
  };
  onSelect?: (id: string) => void;
  selected?: boolean;
}

const typeLabels = {
  billboard: 'Billboard',
  led: 'LED Screen',
  transit: 'Transit',
  street_furniture: 'Street Furniture',
};

const availabilityConfig = {
  available: { label: 'Available', variant: 'success' as const },
  booked: { label: 'Booked', variant: 'error' as const },
  maintenance: { label: 'Maintenance', variant: 'warning' as const },
};

export function SiteCard({ site, onSelect, selected }: SiteCardProps) {
  const availability = availabilityConfig[site.availability];

  return (
    <Card
      padding="none"
      hover
      className={selected ? 'ring-2 ring-primary-800' : ''}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={site.photos[0]}
          alt={site.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={site.type === 'led' ? 'info' : 'default'}>
            {typeLabels[site.type]}
          </Badge>
        </div>

        {/* Availability */}
        <div className="absolute top-3 right-3">
          <Badge variant={availability.variant}>{availability.label}</Badge>
        </div>

        {/* Visibility Score */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
          <span className="text-sm font-bold text-gray-900">{site.visibilityScore}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{site.name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
          <MapPin className="w-4 h-4" />
          {site.location.address}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {site.visibilityScore}% vis.
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {(site.trafficData.dailyImpressions / 1000).toFixed(0)}K/day
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Monthly Rate</p>
            <p className="font-bold text-gray-900">
              {site.pricing.currency} {site.pricing.monthly.toLocaleString()}
            </p>
          </div>
          <Button
            variant={site.availability === 'available' ? 'primary' : 'outline'}
            size="sm"
            disabled={site.availability !== 'available'}
            onClick={() => onSelect?.(site.id)}
          >
            {site.availability === 'available' ? 'View Details' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
