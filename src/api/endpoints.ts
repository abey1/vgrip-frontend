export const API = {
    CRAWL:{
        FIND_ALL: "/{id}/crawl-logs",
    },
    SEARCH_EXECUTIONS:{
        FIND_ALL: "/{id}/search-executions",
    },
    AUTH:{
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
    },

    CAMPAIGNS:{
        FIND_ALL: "/campaigns",
        CREATE: "/create-campaign",
        UPDATE: "/update-campaign",
        DELETE: "/delete-campaign/{id}",
        FIND_BY_ID: "/campaigns/{id}",
    },
    CONTACTS:{
        FIND_ALL: "/discovered-contacts",
    },
}