export const CrawlStatus = {
    RUNNING : "RUNNING",
    SUCCESS : "SUCCESS",
    FAILED : "FAILED",
  } as const;
  
export type CrawlStatus = typeof CrawlStatus[keyof typeof CrawlStatus];

  export const SearchStatus ={
    RUNNING : "RUNNING",
    COMPLETED : "COMPLETED",
    FAILED : "FAILED",
  } as const;

  export type SearchStatus = typeof SearchStatus[keyof typeof SearchStatus];
  
  export const CampaignStatus ={
    ACTIVE : "ACTIVE",
    INACTIVE : "INACTIVE",
  } as const;

  export type CampaignStatus = typeof CampaignStatus[keyof typeof CampaignStatus];
  
  export const CampaignKeywordStatus = {
    ACTIVE : "ACTIVE",
    INACTIVE : "INACTIVE",
  }  as const;

  export type CampaignKeywordStatus = typeof CampaignKeywordStatus[keyof typeof CampaignKeywordStatus];
  
  export const ExecutionFrequency ={
    EVERY_15_MINUTES : "EVERY_15_MINUTES",
    EVERY_30_MINUTES : "EVERY_30_MINUTES",
    HOURLY : "HOURLY",
    DAILY : "DAILY",
    WEEKLY : "WEEKLY",
  } as const;

  export type ExecutionFrequency = typeof ExecutionFrequency[keyof typeof ExecutionFrequency];