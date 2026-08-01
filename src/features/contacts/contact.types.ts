export interface ContactResponseDto {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    sourceUrl: string | null;
    domain: string | null;
    keyword: string | null;
    discoveredAt: Date;
    campaignId: string;
    crawlLogId: string | null;
}