export interface SearchExecutionResponseDto {
    id: string;
    campaignId: string;
    startedAt: Date;
    finishedAt: Date | null;
    keyword: string;
    urlsReturned: number;
    status: string;
}