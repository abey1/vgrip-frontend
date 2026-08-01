import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ActiveCampaignsList } from '../components/campaigns/ActiveCampaignList'
import { CreateCampaignForm } from '../components/campaigns/CreateCampaignForm'
import type { Campaign, CampaignFormData } from '../types/Campaign'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import { getCampaigns, setCreateCampaign } from '../features/campaigns/campaign.slice'

import { useEffect } from 'react'

// const INITIAL_CAMPAIGNS: Campaign[] = [
//   {
//     id: '1',
//     name: 'Find AI Engineers',
//     keywords: ['AI Engineering', 'Cambridge University'],
//     frequency: 'Daily',
//     dailyRecordLimit: 250,
//     status: 'active',
//   },
//   {
//     id: '2',
//     name: 'Find AI Engineers',
//     keywords: ['AI Engineering', 'Cambridge University'],
//     frequency: '2x week',
//     dailyRecordLimit: 100,
//     status: 'stopped',
//   },
//   {
//     id: '3',
//     name: 'Find AI Engineers',
//     keywords: ['AI Engineering', 'Cambridge University'],
//     frequency: 'Daily',
//     dailyRecordLimit: 250,
//     status: 'active',
//   },
// ]

interface CampaignsPageProps {
  onLogout?: () => void
}

export function CampaignsPage({ onLogout }: CampaignsPageProps) {
  const dispatch = useAppDispatch();
  const { createMode, updateMode } = useAppSelector((state) => state.campaigns)
  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);
  // const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS)
  const [showForm, setShowForm] = useState(true)

  const handleCreateAndStart = (data: CampaignFormData) => {
    const selectedKeywords = data.keywords
      .filter((keyword) => keyword.selected && keyword.text.trim())
      .map((keyword) => keyword.text.trim())

    if (!data.name || selectedKeywords.length === 0) return

    const campaign: Campaign = {
      id: crypto.randomUUID(),
      name: data.name,
      keywords: selectedKeywords,
      frequency: data.frequency,
      dailyRecordLimit: data.dailyRecordLimit,
      status: 'active',
    }

    // setCampaigns((prev) => [campaign, ...prev])
  }

  const handleSaveDraft = (data: CampaignFormData) => {
    console.log('Draft saved:', data)
  }

  // const handleToggleStatus = (id: string) => {
  //   setCampaigns((prev) =>
  //     prev.map((campaign) =>
  //       campaign.id === id
  //         ? {
  //             ...campaign,
  //             status: campaign.status === 'active' ? 'stopped' : 'active',
  //           }
  //         : campaign,
  //     ),
  //   )
  // }

  // const handleDelete = (id: string) => {
  //   setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id))
  // }

  const handleEdit = (id: string) => {
    console.log('Edit campaign:', id)
    setShowForm(true)
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

        <ActiveCampaignsList
          // campaigns={campaigns}
          // onToggleStatus={handleToggleStatus}
          // onEdit={handleEdit}
          // onDelete={handleDelete}
        />
      </div>
    </>
  )
}
