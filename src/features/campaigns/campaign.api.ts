import {api } from "../../api/axios";
import { API } from "../../api/endpoints";

import type { CampaignResponseDto, CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";

export async function getCampaigns(): Promise<CampaignResponseDto[]> {

    const response = await api.get<CampaignResponseDto[]>(API.CAMPAIGNS.FIND_ALL);

    return response.data;
}

export async function createCampaign(campaign: CreateCampaignDto): Promise<CampaignResponseDto> {

    const response = await api.post<CampaignResponseDto>(API.CAMPAIGNS.CREATE, campaign);

    return response.data;
}

export async function updateCampaign(campaign: UpdateCampaignDto): Promise<CampaignResponseDto> {

    const response = await api.put<CampaignResponseDto>(API.CAMPAIGNS.UPDATE, campaign);

    return response.data;
}

export async function deleteCampaign(id: string): Promise<CampaignResponseDto> {

    const response = await api.delete<CampaignResponseDto>(API.CAMPAIGNS.DELETE.replace("{id}", id));

    return response.data;
}

export async function getCampaignById(id: string): Promise<CampaignResponseDto> {

    const response = await api.get<CampaignResponseDto>(API.CAMPAIGNS.FIND_BY_ID.replace("{id}", id));

    return response.data;
}