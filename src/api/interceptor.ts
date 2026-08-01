import api, { getAccessToken, setAccessToken } from "./axios";
import { API } from "./endpoints";

/** Endpoints that return 401 for bad credentials / no session — do not try to refresh. */
const AUTH_ENDPOINTS_SKIP_REFRESH = new Set<string>([
    API.AUTH.LOGIN,
    API.AUTH.REGISTER,
    API.AUTH.LOGOUT,
    API.AUTH.REFRESH,
]);

function shouldSkipRefreshRetry(url: string | undefined): boolean {
    if (!url) return false;
    return [...AUTH_ENDPOINTS_SKIP_REFRESH].some(
        (endpoint) => url === endpoint || url.endsWith(endpoint),
    );
}

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !shouldSkipRefreshRetry(originalRequest.url)
        ) {
            originalRequest._retry = true;

            try {
                const refreshTokenResponse = await api.post(API.AUTH.REFRESH);
                const accessToken = refreshTokenResponse.data.token;

                setAccessToken(accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch {
                setAccessToken(null);
                // Only hard-redirect for expired protected-API sessions, not auth form errors.
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    },
);
