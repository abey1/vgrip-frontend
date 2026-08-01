import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {

    const {isAuthenticated} = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children || <Outlet />;
}


// import { Outlet } from "react-router-dom";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//     return children || <Outlet />;
// }