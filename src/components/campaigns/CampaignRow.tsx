import { List, Pencil, Play, Square, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { ConfirmModal } from '../ui/ConfirmModal'
import { cn } from '../../lib/utils'
import type { CampaignResponseDto } from '../../features/campaigns/campaign.types'
import { CampaignStatus } from '../../enums/app.enum'
import { updateCampaign } from '../../features/campaigns/campaign.slice'
import { useAppDispatch } from '../../hooks/hooks'
import { setUpdateCampaign } from '../../features/campaigns/campaign.slice'
import { deleteCampaign } from '../../features/campaigns/campaign.slice'
import { Logs } from './activity/Logs'
import { useState } from 'react'

interface CampaignRowProps {
  campaign: CampaignResponseDto
}

export function CampaignRow({ campaign }: CampaignRowProps) {
  const dispatch = useAppDispatch()
  const [showLogs, setShowLogs] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const isActive = campaign.status === CampaignStatus.ACTIVE

  function onToggleStatus() {
    dispatch(
      updateCampaign({
        id: campaign.id,
        status:
          campaign.status === CampaignStatus.ACTIVE
            ? CampaignStatus.INACTIVE
            : CampaignStatus.ACTIVE,
      }),
    )
  }

  function onEdit() {
    dispatch(setUpdateCampaign(campaign))
  }

  function onConfirmDelete() {
    dispatch(deleteCampaign(campaign.id))
    setShowDeleteConfirm(false)
  }

  function onToggleLogs() {
    setShowLogs(!showLogs)
  }

  return (
    <>
      <tr className="border-t border-gray-100">
        <td className="py-4 pr-4">
          <div className="flex items-start gap-2.5">
            <span
              className={cn(
                'mt-1.5 size-2.5 shrink-0 rounded-full',
                isActive ? 'bg-teal-500' : 'bg-red-500',
              )}
              aria-label={isActive ? 'Active' : 'Stopped'}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {campaign.name}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {campaign.campaignKeywords
                  .map((keyword) => keyword.keyword.value)
                  .join(', ')
                  .slice(0, 50)}
                ...
              </p>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm text-gray-700">
          {campaign.executionFrequency}
        </td>

        <td className="px-4 py-4 text-sm text-gray-700">
          {campaign.dailyRecordLimit}
        </td>

        <td className="py-4 pl-4">
          <div className="flex flex-wrap items-center justify-end gap-2">
            {isActive ? (
              <Button
                variant="danger-outline"
                className="px-2.5 py-1.5"
                onClick={() => onToggleStatus()}
              >
                <Square className="size-3.5 fill-current" />
                Stop
              </Button>
            ) : (
              <Button
                variant="success-outline"
                className="px-2.5 py-1.5"
                onClick={() => onToggleStatus()}
              >
                <Play className="size-3.5 fill-current" />
                Start
              </Button>
            )}

            <Button
              variant="secondary"
              className="px-2.5 py-1.5"
              onClick={() => onEdit()}
            >
              <Pencil className="size-3.5" />
              Edit
            </Button>

            <Button
              variant="danger-outline"
              className="px-2.5 py-1.5"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="size-3.5" />
              Delete
            </Button>

            <Button
              variant="secondary"
              className="px-2.5 py-1.5"
              onClick={() => onToggleLogs()}
            >
              <List className="size-3.5" />
              Logs
            </Button>
          </div>
        </td>
      </tr>

      {showLogs ? (
        <tr className="border-t border-gray-100 bg-gray-50/80">
          <td colSpan={4} className="px-4 py-4">
            <Logs campaignId={campaign.id} />
          </td>
        </tr>
      ) : null}

      <ConfirmModal
        open={showDeleteConfirm}
        title="Delete campaign"
        message={`Are you sure you want to delete this campaign? "${campaign.name}" will be PERMANENTLY REMOVED.`}
        confirmLabel="OK"
        cancelLabel="Cancel"
        confirmVariant="danger"
        icon={<Trash2 className="size-4" />}
        onConfirm={onConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}
