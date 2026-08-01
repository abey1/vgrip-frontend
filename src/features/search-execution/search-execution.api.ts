import type { SearchExecutionResponseDto } from "./search-execution.types";
import {api } from "../../api/axios";
import { API } from "../../api/endpoints";

export async function getSearchExecutionsApi(campaignId: string) {
    const response = await api.get<SearchExecutionResponseDto[]>(`${API.SEARCH_EXECUTIONS.FIND_ALL.replace("{id}", campaignId)}`);
    return response.data;
}