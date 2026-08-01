import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";


const queryClient = new QueryClient();

interface props {
    children: ReactNode;
}

export default function QueryProvider({ children }: props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}