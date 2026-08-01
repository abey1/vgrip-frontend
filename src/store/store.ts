import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import campaignReducer from "../features/campaigns/campaign.slice";
import contactReducer from "../features/contacts/contact.slice";
import searchExecutionsReducer from "../features/search-execution/search-execution.slice";
import crawlReducer from "../features/crawl/crawl.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        campaigns: campaignReducer,
        contacts: contactReducer,
        searchExecutions: searchExecutionsReducer,
        crawl: crawlReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;