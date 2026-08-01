import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CrawlLogResponseDto } from "./crawl.types";
import { getCrawlLogsApi } from "./crawl.api";

export const fetchCrawlLogs = createAsyncThunk<
  CrawlLogResponseDto[],
  string
>("crawl/fetchCrawlLogs", async (executionId: string) => {
  return getCrawlLogsApi(executionId);
});

export const crawlSlice = createSlice({
  name: "crawl",
  initialState: {
    /** Keyed by executionId so console data stays tied to the selected run */
    byExecutionId: {} as Record<string, CrawlLogResponseDto[]>,
    loadingExecutionId: null as string | null,
    error: null as string | null,
  },
  reducers: {
    clearCrawlLogs: (state, action: { payload: string }) => {
      delete state.byExecutionId[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrawlLogs.pending, (state, action) => {
        state.loadingExecutionId = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchCrawlLogs.fulfilled, (state, action) => {
        state.byExecutionId[action.meta.arg] = action.payload;
        state.loadingExecutionId = null;
      })
      .addCase(fetchCrawlLogs.rejected, (state, action) => {
        state.loadingExecutionId = null;
        state.error = action.error.message || null;
      });
  },
});

export const { clearCrawlLogs } = crawlSlice.actions;
export default crawlSlice.reducer;
