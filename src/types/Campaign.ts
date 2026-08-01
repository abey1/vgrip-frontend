export type CampaignStatus = 'active' | 'stopped'

export type ExecutionFrequency =
  | 'Hourly'
  | 'Daily'
  | '2x week'
  | 'Weekly'
  | 'Monthly'

export interface Keyword {
  id: string
  text: string
  selected: boolean
}

export interface Campaign {
  id: string
  name: string
  keywords: string[]
  frequency: ExecutionFrequency
  dailyRecordLimit: number
  status: CampaignStatus
}

export interface CampaignFormData {
  name: string
  keywords: Keyword[]
  frequency: ExecutionFrequency
  dailyRecordLimit: number
}
