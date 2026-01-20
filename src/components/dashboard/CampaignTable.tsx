import { Badge, Button } from '../common';
import { Eye, MoreHorizontal } from 'lucide-react';
import type { Campaign } from '../../types';

interface CampaignTableProps {
  campaigns: Campaign[];
}

const statusConfig = {
  draft: { label: 'Draft', variant: 'default' as const },
  pending: { label: 'Pending', variant: 'warning' as const },
  active: { label: 'Active', variant: 'success' as const },
  completed: { label: 'Completed', variant: 'info' as const },
  cancelled: { label: 'Cancelled', variant: 'error' as const },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sites</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reach</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {campaigns.map((campaign) => {
            const status = statusConfig[campaign.status];
            return (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{campaign.clientName}</td>
                <td className="py-4 px-4">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{campaign.sites.length}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {(campaign.totalReach / 1000000).toFixed(1)}M
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  KES {campaign.totalCost.toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
