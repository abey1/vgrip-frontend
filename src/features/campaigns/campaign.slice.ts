import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import type{ CampaignResponseDto } from "./campaign.types";
import  {CampaignStatus, ExecutionFrequency} from "../../enums/app.enum";
import type { KeywordResponseDto } from "../keywords/keyword.types";

import {updateCampaign as updateCampaignApi, createCampaign as createCampaignApi, deleteCampaign as deleteCampaignApi} from "./campaign.api";
import type { CreateCampaignDto } from "./campaign.types";
import type { UpdateCampaignDto } from "./campaign.types";
import {toast} from "sonner";
import {getCampaigns as getCampaignsApi } from "./campaign.api";


export const getCampaigns = createAsyncThunk('campaigns/getCampaigns', async () => {
    const response = await getCampaignsApi();
    return response as CampaignResponseDto[];
});

export const updateCampaign = createAsyncThunk('campaigns/updateCampaign', async (campaign: UpdateCampaignDto) => {
    const response = await updateCampaignApi(campaign);
    return response as CampaignResponseDto;
});

export const createCampaign = createAsyncThunk('campaigns/createCampaign', async (campaign: CreateCampaignDto) => {
    const response = await createCampaignApi(campaign);
    return response as CampaignResponseDto;
});

export const deleteCampaign = createAsyncThunk('campaigns/deleteCampaign', async (campaignId: string) => {
    const response = await deleteCampaignApi(campaignId);
    return response as CampaignResponseDto;
});

const allCampaigns: CampaignResponseDto[] = []

function createEmptyUpdateCampaignDto(): CampaignResponseDto {
    return {
        id: "",
        name: "",
        description: "",
        status: CampaignStatus.ACTIVE,
        executionFrequency: ExecutionFrequency.DAILY,
        dailyRecordLimit: 0,
        campaignKeywords: [] as KeywordResponseDto[],
        createdById: "",
        updatedById: "",
        createdAt: new Date(0),
        updatedAt: new Date(0),
    }
}


const campaignSlice = createSlice({
    name: 'campaigns',
    initialState:{
        allCampaigns,
        updateCampaignDto: createEmptyUpdateCampaignDto(),
        updateMode: false,
        createMode: false,
        error: "",
        status: 'idle',
    },
    reducers: {
        setUpdateCampaign: (state, action: PayloadAction<CampaignResponseDto>) => {
            // Copy so we never alias a row from allCampaigns into updateCampaignDto
            state.updateCampaignDto = {
                ...action.payload,
                campaignKeywords: action.payload.campaignKeywords?.map((item) => ({
                    ...item,
                    keyword: { ...item.keyword },
                })) ?? [],
            };
            state.updateMode = true;
        },
        clearUpdateCampaign: (state) => {
            state.updateCampaignDto = createEmptyUpdateCampaignDto();
            state.updateMode = false;
        },
        setCreateCampaign: (state) => {
            state.createMode = true;
        },
        clearCreateCampaign: (state) => {
            state.createMode = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCampaigns.fulfilled, (state, action) => {
            state.allCampaigns = action.payload;
            state.status = 'succeeded';
        })
        .addCase(getCampaigns.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        })
        .addCase(getCampaigns.pending, (state) => {
            state.status = 'loading';
            state.error = "";
        })
        .addCase(updateCampaign.fulfilled, (state, action) => {
            state.allCampaigns = state.allCampaigns.map((campaign) =>
                campaign.id === action.payload.id ? action.payload : campaign,
            );
            state.updateCampaignDto = createEmptyUpdateCampaignDto();
            state.updateMode = false;
            toast.dismiss();
            toast.success("Campaign updated successfully");
            state.status = 'succeeded';
        })
        .addCase(updateCampaign.rejected, (state, action) => {
            state.error = action.error.message || "";
            toast.dismiss();
            toast.error("Failed to update campaign");
            state.status = 'failed';
        })
        .addCase(updateCampaign.pending, (state) => {
            state.status = 'loading';
            toast.dismiss();
            toast.loading("Updating campaign...");
            state.error = "";
        })
        .addCase(createCampaign.fulfilled, (state, action) => {
            state.allCampaigns.push(action.payload);
            state.createMode = false;
            toast.dismiss();
            toast.success("Campaign created successfully");
            state.status = 'succeeded';
        })
        .addCase(createCampaign.rejected, (state, action) => {
            state.error = action.error.message || "";
            toast.dismiss();
            toast.error("Failed to create campaign");
            state.status = 'failed';
        })
        .addCase(createCampaign.pending, (state) => {
            state.status = 'loading';
            toast.dismiss();
            toast.loading("Creating campaign...");
            state.error = "";
        })
        .addCase(deleteCampaign.fulfilled, (state, action) => {
            state.allCampaigns = state.allCampaigns.filter((campaign) => campaign.id !== action.payload.id);
            toast.dismiss();
            toast.success("Campaign deleted successfully");
            state.status = 'succeeded';
        })
        .addCase(deleteCampaign.rejected, (state, action) => {
            state.error = action.error.message || "";
            toast.dismiss();
            toast.error("Failed to delete campaign");
            state.status = 'failed';
        })
        .addCase(deleteCampaign.pending, (state) => {
            state.status = 'loading';
            toast.dismiss();
            toast.loading("Deleting campaign...");
            state.error = "";
        });
    }
});

export default campaignSlice.reducer;
export const { setUpdateCampaign, clearUpdateCampaign, setCreateCampaign, clearCreateCampaign } = campaignSlice.actions;