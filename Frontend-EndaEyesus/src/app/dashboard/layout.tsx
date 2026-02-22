import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { DashboardFooter } from "@/components/layout/dashboard-footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8F5F0] dark:bg-[#0E0E0F] transition-colors duration-300">
            <Sidebar />
            <Topbar />
            <main className="pl-64 pt-16 min-h-screen flex flex-col">
                <div className="p-6 flex-1">{children}</div>
                <DashboardFooter />
            </main>
        </div>
    );
}
