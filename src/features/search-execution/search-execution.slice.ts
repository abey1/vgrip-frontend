import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SearchExecutionResponseDto } from "./search-execution.types";
import { getSearchExecutionsApi } from "./search-execution.api";

export const getSearchExecutions = createAsyncThunk<
  SearchExecutionResponseDto[],
  string
>("searchExecutions/getSearchExecutions", async (campaignId: string) => {
  return getSearchExecutionsApi(campaignId);
});

const searchExecutionsSlice = createSlice({
  name: "searchExecutions",
  initialState: {
    /** Keyed by campaignId so two open Logs panels don't share one list */
    byCampaignId: {} as Record<string, SearchExecutionResponseDto[]>,
    loadingCampaignId: null as string | null,
    error: "" as string | undefined,
  },
  reducers: {
    clearSearchExecutions: (state, action: { payload: string }) => {
      delete state.byCampaignId[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchExecutions.pending, (state, action) => {
        state.loadingCampaignId = action.meta.arg;
        state.error = undefined;
      })
      .addCase(getSearchExecutions.fulfilled, (state, action) => {
        state.byCampaignId[action.meta.arg] = action.payload;
        state.loadingCampaignId = null;
      })
      .addCase(getSearchExecutions.rejected, (state, action) => {
        state.error = action.error.message ?? undefined;
        state.loadingCampaignId = null;
      });
  },
});

export const { clearSearchExecutions } = searchExecutionsSlice.actions;
export default searchExecutionsSlice.reducer;
