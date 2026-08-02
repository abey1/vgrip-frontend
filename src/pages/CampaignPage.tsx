import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ActiveCampaignsList } from '../components/campaigns/ActiveCampaignList'
import { CreateCampaignForm } from '../components/campaigns/CreateCampaignForm'
import type { CampaignFormData } from '../types/Campaign'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getCampaigns, setCreateCampaign } from '../features/campaigns/campaign.slice'

export function CampaignsPage() {
  const dispatch = useAppDispatch()
  const { createMode, updateMode } = useAppSelector((state) => state.campaigns)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [dispatch])

  const handleCreateAndStart = (data: CampaignFormData) => {
    const selectedKeywords = data.keywords
      .filter((keyword) => keyword.selected && keyword.text.trim())
      .map((keyword) => keyword.text.trim())

    if (!data.name || selectedKeywords.length === 0) return
  }

  const handleSaveDraft = (data: CampaignFormData) => {
    console.log('Draft saved:', data)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <Button
          variant="primary"
          onClick={() => dispatch(setCreateCampaign())}
          className="shrink-0"
        >
          <Plus className="size-4" />
          New campaign
        </Button>
      </div>

      <div className="space-y-6">
        {createMode || updateMode ? (
          <CreateCampaignForm
            onSaveDraft={handleSaveDraft}
            onCreateAndStart={handleCreateAndStart}
          />
        ) : null}

        <ActiveCampaignsList />
      </div>
    </>
  )
}
