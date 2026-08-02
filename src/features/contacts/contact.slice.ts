import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ContactResponseDto } from "./contact.types";

import { getDiscoveredContacts as getDiscoveredContactsApi } from "./contact.api";

export const getDiscoveredContacts = createAsyncThunk("contacts/getDiscoveredContacts", async () => {
    const response = await getDiscoveredContactsApi();
    return response as ContactResponseDto[];
});


const initialState: {
        contacts: ContactResponseDto[];
        loading: boolean;
        error: string | undefined;
} = {
    contacts: [],
    loading: false,
    error: undefined,
};

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDiscoveredContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
            state.loading = false;
            state.error = undefined;
        })
        .addCase(getDiscoveredContacts.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getDiscoveredContacts.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
    }
});

export default contactSlice.reducer;
