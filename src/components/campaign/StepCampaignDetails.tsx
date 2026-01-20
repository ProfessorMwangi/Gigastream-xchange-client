import { Input, Select } from '../common';

const productCategories = [
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'banking', label: 'Banking & Finance' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'alcohol', label: 'Alcohol & Beverages' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'technology', label: 'Technology' },
  { value: 'government', label: 'Government/PSA' },
  { value: 'other', label: 'Other' },
];

interface CampaignDetails {
  name: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: string;
  productCategory: string;
}

interface StepCampaignDetailsProps {
  data: CampaignDetails;
  onChange: (data: Partial<CampaignDetails>) => void;
}

export function StepCampaignDetails({ data, onChange }: StepCampaignDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter the basic information about your advertising campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Campaign Name"
          placeholder="e.g., Safaricom Year End Promo"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />

        <Input
          label="Client Name"
          placeholder="e.g., Safaricom PLC"
          value={data.clientName}
          onChange={(e) => onChange({ clientName: e.target.value })}
        />

        <Input
          label="Start Date"
          type="date"
          value={data.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />

        <Input
          label="End Date"
          type="date"
          value={data.endDate}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />

        <Input
          label="Budget (KES)"
          type="number"
          placeholder="e.g., 5000000"
          value={data.budget}
          onChange={(e) => onChange({ budget: e.target.value })}
          hint="Maximum budget for this campaign"
        />

        <Select
          label="Product Category"
          options={productCategories}
          value={data.productCategory}
          onChange={(e) => onChange({ productCategory: e.target.value })}
          placeholder="Select category"
        />
      </div>

      {data.productCategory === 'alcohol' && (
        <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <p className="text-sm text-warning-700">
            <strong>Note:</strong> Alcohol advertising is restricted to areas with adult demographics (25+ years).
            Sites near schools, hospitals, and religious institutions will be automatically excluded.
          </p>
        </div>
      )}
    </div>
  );
}
