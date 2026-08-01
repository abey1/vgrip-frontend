import type { CrawlStatus } from "../../enums/app.enum";

export interface CrawlLogResponseDto {
    id: string;
    searchExecutionId: string;
    url: string;
    status: CrawlStatus;
    durationMs: number | null;
    error: string | null;
    createdAt: Date | string | null;
}
