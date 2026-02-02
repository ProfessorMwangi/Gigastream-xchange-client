import { MapPin, Users, Calendar, Wallet, FileText, Download } from 'lucide-react';
import { Card, Badge, Button } from '../common';
import { pdf } from '@react-pdf/renderer';
import { CampaignProposalPDF } from '../pdf/CampaignProposalPDF';

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

// Premium site data from Xchange inventory
const sitesData: Record<string, {
  name: string;
  location: string;
  cost: number;
  reach: number;
  impressions: number;
  frequency: number;
}> = {
  '1': {
    name: 'WAIYAKI WAY NEAR OLD SAFARICOM OLD HQ OUTBOUND',
    location: 'Waiyaki Way, Nairobi',
    cost: 650000,
    reach: 630769,
    impressions: 4100000,
    frequency: 6.5
  },
  '2': {
    name: 'OUTERING RD @SHELL DONHOLM EXCHANGE',
    location: 'Outering Road, Nairobi',
    cost: 580000,
    reach: 402778,
    impressions: 2900000,
    frequency: 7.2
  },
  '3': {
    name: 'ELDORET TOWN UGANDA RD @ZION MALL',
    location: 'Uganda Road, Eldoret',
    cost: 420000,
    reach: 307692,
    impressions: 2400000,
    frequency: 7.8
  },
  '4': {
    name: 'MUTHANGARI DRIVE NEAR NAIVAS BARAKA SHELL',
    location: 'Muthangari Drive, Nairobi',
    cost: 550000,
    reach: 333333,
    impressions: 2100000,
    frequency: 6.3
  },
  '5': {
    name: 'KISUMU TOWN NEAR KCB ROUNDABOUT',
    location: 'KCB Roundabout, Kisumu',
    cost: 380000,
    reach: 205882,
    impressions: 2100000,
    frequency: 10.2
  },
  '6': {
    name: 'LANGATA RD NEAR WATERFRONT MALL',
    location: 'Langata Road, Nairobi',
    cost: 480000,
    reach: 272727,
    impressions: 1500000,
    frequency: 5.5
  },
  '7': {
    name: 'THIKA SUPERHIGHWAY AT ALLSOPS',
    location: 'Thika Superhighway, Nairobi',
    cost: 450000,
    reach: 365385,
    impressions: 950000,
    frequency: 2.6
  },
  '8': {
    name: 'SARIT CENTRE',
    location: 'Sarit Centre, Westlands',
    cost: 520000,
    reach: 56098,
    impressions: 230000,
    frequency: 4.1
  },
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
  const totalImpressions = selectedSiteDetails.reduce((sum, site) => sum + site.impressions, 0);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePreviewPDF = async () => {
    try {
      const pdfData = {
        ...data,
        totalCost,
        totalReach,
        totalImpressions,
        sites: selectedSiteDetails.map(site => ({
          name: site.name,
          location: site.location,
          monthlyRate: site.cost,
          reach: site.reach,
          impressions: site.impressions,
          frequency: site.frequency,
        })),
      };

      const blob = await pdf(<CampaignProposalPDF data={pdfData} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfData = {
        ...data,
        totalCost,
        totalReach,
        totalImpressions,
        sites: selectedSiteDetails.map(site => ({
          name: site.name,
          location: site.location,
          monthlyRate: site.cost,
          reach: site.reach,
          impressions: site.impressions,
          frequency: site.frequency,
        })),
      };

      const blob = await pdf(<CampaignProposalPDF data={pdfData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.name || 'Campaign'}_Proposal.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review Campaign</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review your campaign details before generating the proposal.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sites</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{data.selectedSites.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Est. Reach</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{(totalReach / 1000000).toFixed(2)}M</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data.startDate && data.endDate
                  ? Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24))
                  : 0} days
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
              <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">KES {(totalCost / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Details */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Campaign Name</p>
            <p className="font-medium text-gray-900 dark:text-white">{data.name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
            <p className="font-medium text-gray-900 dark:text-white">{data.clientName || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
            <p className="font-medium text-gray-900 dark:text-white">{formatDate(data.startDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
            <p className="font-medium text-gray-900 dark:text-white">{formatDate(data.endDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {data.budget ? `KES ${parseInt(data.budget).toLocaleString()}` : 'Not set'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product Category</p>
            <p className="font-medium text-gray-900 dark:text-white capitalize">{data.productCategory || 'Not set'}</p>
          </div>
        </div>
      </Card>

      {/* Target Audience */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Target Audience</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info">Age: {data.ageRange[0]}-{data.ageRange[1]}</Badge>
          <Badge variant="info" className="capitalize">Gender: {data.gender}</Badge>
          {data.incomeLevel?.map((level) => (
            <Badge key={level} variant="info" className="capitalize">{level} Income</Badge>
          ))}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Target Locations</p>
          <div className="flex flex-wrap gap-2">
            {data.locations?.length > 0 ? (
              data.locations.map((loc) => (
                <span key={loc} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {loc}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">No locations selected</span>
            )}
          </div>
        </div>
      </Card>

      {/* Selected Sites */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Selected Sites ({data.selectedSites.length})</h3>
        <div className="space-y-3">
          {selectedSiteDetails.map((site, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{site.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{site.location}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">KES {(site.cost / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{(site.reach / 1000).toFixed(0)}K reach</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Total Monthly Cost</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(totalImpressions / 1000000).toFixed(1)}M impressions • {(totalReach / 1000000).toFixed(2)}M reach
            </p>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">KES {totalCost.toLocaleString()}</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium">Generate official PDF proposal with all campaign details and performance metrics.</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePreviewPDF}>
            <Download className="w-4 h-4 mr-2" />
            Preview PDF
          </Button>
          <Button variant="secondary" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="accent">
            <img src="/done-ring.svg" alt="" className="w-4 h-4 mr-2 brightness-0 invert" />
            Submit Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
