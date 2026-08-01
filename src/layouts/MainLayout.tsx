import { Outlet, useNavigate } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";
import { useAppDispatch } from "../hooks/hooks";
import { logout as logoutAction } from "../features/auth/auth.slice";

export default function MainLayout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        // Wait for API + cookie clear + Redux reset before leaving,
        // otherwise LoginPage refresh restores the session and bounces back.
        await dispatch(logoutAction());
        navigate("/login", { replace: true });
    }

    return (
        <>
            <Navbar onLogout={handleLogout} />
            <main className="mx-auto max-w-6xl px-6 py-8 mt-14">
                <Outlet />
            </main>
        </>
    );
}
