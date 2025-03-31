import AppSidebar from "@/components/admin-panel/app-sidebar.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";

const Inbox = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <h1>Nabin Inbox</h1>
                </main>
            </SidebarProvider>
        </>
    )
}
export default Inbox;
