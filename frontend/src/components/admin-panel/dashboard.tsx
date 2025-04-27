import AppSidebar from "@/components/admin-panel/app-sidebar.tsx";
import React from "react";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import Home from "@/components/admin-panel/home.tsx";

const Dashboard: React.FC = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <Home />
                </main>
            </SidebarProvider>
        </>
    )
}

export default Dashboard;