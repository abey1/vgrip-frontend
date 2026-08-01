import { TableProperties } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { CampaignRow } from './CampaignRow'
import type { Campaign } from '../../types/Campaign'
import { useAppSelector } from '../../hooks/hooks'

interface ActiveCampaignsListProps {
  // campaigns: Campaign[]
  // onToggleStatus: (id: string) => void
  // onEdit: (id: string) => void
  // onDelete: (id: string) => void
}

export function ActiveCampaignsList({
  // campaigns,
  // onToggleStatus,
  // onEdit,
  // onDelete,
}: ActiveCampaignsListProps) {

  
  const { allCampaigns } = useAppSelector((state) => state.campaigns);
  console.log("allCampaigns inside ActiveCampaignList", allCampaigns);
  return (
    <Card>
      <CardHeader
        icon={<TableProperties className="size-4" />}
        title="Active campaigns"
      />

      {allCampaigns.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No active campaigns yet. Create one above to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                <th className="pb-3 text-xs font-medium tracking-wide text-gray-500">
                  Campaign name
                </th>
                <th className="px-4 pb-3 text-xs font-medium tracking-wide text-gray-500">
                  Execution frequency
                </th>
                <th className="px-4 pb-3 text-xs font-medium tracking-wide text-gray-500">
                  Daily record limit
                </th>
                <th className="pb-3 pl-4 text-right text-xs font-medium tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allCampaigns.map((campaign) => (
                <CampaignRow
                  campaign={campaign}
                 
                  key={campaign.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
