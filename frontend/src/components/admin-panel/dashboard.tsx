import AppSidebar from "@/components/admin-panel/app-sidebar.tsx";
import React from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";

const Dashboard: React.FC = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />

                </main>
            </SidebarProvider>
        </>
    )
}

export default Dashboard;