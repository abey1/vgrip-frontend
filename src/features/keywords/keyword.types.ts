import { CampaignKeywordStatus } from "../../enums/app.enum";

export interface KeywordResponseDto  {
    keyword: {
        id: string;
        value: string;
    };
    status: CampaignKeywordStatus;
}

export interface CreateCampaignKeywordRepositoryDto {
    value: string;
    status: CampaignKeywordStatus;
}