import { api } from "../../api/axios";

import { API } from "../../api/endpoints";
import type { ContactResponseDto } from "./contact.types";


export async function getDiscoveredContacts(): Promise<ContactResponseDto[]> {
    const response = await api.get<ContactResponseDto[]>(API.CONTACTS.FIND_ALL);
    return response.data;
}