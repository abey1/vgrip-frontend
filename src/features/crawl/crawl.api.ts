import { api } from "../../api/axios";
import { API } from "../../api/endpoints";
import type { CrawlLogResponseDto } from "./crawl.types";

export async function getCrawlLogsApi(executionId: string) {
    const response = await api.get<CrawlLogResponseDto[]>(`${API.CRAWL.FIND_ALL.replace("{id}", executionId)}`);
    return response.data;
}