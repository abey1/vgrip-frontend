import { CampaignStatus, ExecutionFrequency } from "../../enums/app.enum";
import type { KeywordResponseDto } from "../keywords/keyword.types";
import type { BaseResponseDto } from "../basedto/base.types";
import type { CreateCampaignKeywordRepositoryDto } from "../keywords/keyword.types";

export interface CampaignResponseDto extends BaseResponseDto{
    name: string;
    description: string | null;
    status: CampaignStatus;
    executionFrequency: ExecutionFrequency;
    dailyRecordLimit: number;
    campaignKeywords: KeywordResponseDto[];
    createdById: string;
    updatedById: string;
}

export interface CreateCampaignDto {
    name: string;
    description?: string;
    status: CampaignStatus;
    executionFrequency: ExecutionFrequency;
    dailyRecordLimit: number;
    keywords: CreateCampaignKeywordRepositoryDto[];
}

export interface UpdateCampaignDto {
    id: string;
    name?: string;
    description?: string;
    status?: CampaignStatus;
    executionFrequency?: ExecutionFrequency;
    dailyRecordLimit?: number;
    keywords?: CreateCampaignKeywordRepositoryDto[];
}