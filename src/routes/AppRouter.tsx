import {Navigate, Route, Routes} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";

import { LoginPage } from "../pages/LoginPage";
import {SignupPage }from "../pages/SignupPage";

import { CampaignsPage } from "../pages/CampaignPage";
import { RecordsPage } from "../pages/RecordPage";
import SearchExecutionPage from "../pages/SearchExecutionPage";
import CrawlLogPage from "../pages/CrawlLogPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter(){
    return (
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* bare / must NOT render MainLayout or the campaigns shell flashes */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* protected routes */}
            <Route element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/records" element={<RecordsPage />} />
                <Route path="/search-execution" element={<SearchExecutionPage />} />
                <Route path="/crawl-log" element={<CrawlLogPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
