import { MapPin, Users, Calendar, Wallet, FileText, Download, Send } from 'lucide-react';
import { Card, Badge, Button } from '../common';

interface CampaignSummary {
  name: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: string;
  productCategory: string;
  ageRange: [number, number];
  gender: string;
  incomeLevel: string[];
  locations: string[];
  selectedSites: string[];
}

// Mock site data for display
const sitesData: Record<string, { name: string; location: string; cost: number; reach: number }> = {
  '1': { name: 'Uhuru Highway Billboard', location: 'Uhuru Highway, Nairobi', cost: 350000, reach: 3750000 },
  '2': { name: 'Mombasa Road LED', location: 'Mombasa Road, Nairobi', cost: 450000, reach: 5400000 },
  '3': { name: 'Westlands Junction', location: 'Westlands Road, Nairobi', cost: 280000, reach: 2850000 },
  '4': { name: 'KICC Digital Screen', location: 'City Centre, Nairobi', cost: 520000, reach: 6600000 },
};

interface StepReviewProps {
  data: CampaignSummary;
}

export function StepReview({ data }: StepReviewProps) {
  const selectedSiteDetails = data.selectedSites
    .map((id) => sitesData[id])
    .filter(Boolean);

  const totalCost = selectedSiteDetails.reduce((sum, site) => sum + site.cost, 0);
  const totalReach = selectedSiteDetails.reduce((sum, site) => sum + site.reach, 0);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Review Campaign</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review your campaign details before generating the proposal.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sites</p>
              <p className="text-xl font-bold text-gray-900">{data.selectedSites.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Users className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Est. Reach</p>
              <p className="text-xl font-bold text-gray-900">{(totalReach / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Calendar className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-xl font-bold text-gray-900">
                {data.startDate && data.endDate
                  ? Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24))
                  : 0} days
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Wallet className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cost</p>
              <p className="text-xl font-bold text-gray-900">KES {totalCost.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Details */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">Campaign Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Campaign Name</p>
            <p className="font-medium text-gray-900">{data.name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium text-gray-900">{data.clientName || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium text-gray-900">{formatDate(data.startDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium text-gray-900">{formatDate(data.endDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="font-medium text-gray-900">
              {data.budget ? `KES ${parseInt(data.budget).toLocaleString()}` : 'Not set'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Product Category</p>
            <p className="font-medium text-gray-900 capitalize">{data.productCategory || 'Not set'}</p>
          </div>
        </div>
      </Card>

      {/* Target Audience */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">Target Audience</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info">Age: {data.ageRange[0]}-{data.ageRange[1]}</Badge>
          <Badge variant="info" className="capitalize">Gender: {data.gender}</Badge>
          {data.incomeLevel?.map((level) => (
            <Badge key={level} variant="info" className="capitalize">{level} Income</Badge>
          ))}
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Target Locations</p>
          <div className="flex flex-wrap gap-2">
            {data.locations?.length > 0 ? (
              data.locations.map((loc) => (
                <span key={loc} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {loc}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No locations selected</span>
            )}
          </div>
        </div>
      </Card>

      {/* Selected Sites */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4">Selected Sites ({data.selectedSites.length})</h3>
        <div className="space-y-3">
          {selectedSiteDetails.map((site, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{site.name}</p>
                <p className="text-sm text-gray-500">{site.location}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">KES {site.cost.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{(site.reach / 1000000).toFixed(1)}M reach</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="font-medium text-gray-700">Total</span>
          <span className="text-lg font-bold text-gray-900">KES {totalCost.toLocaleString()}</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-5 h-5" />
          <span className="text-sm">A PDF proposal will be generated with all campaign details.</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Preview PDF
          </Button>
          <Button variant="accent">
            <Send className="w-4 h-4 mr-2" />
            Submit Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
