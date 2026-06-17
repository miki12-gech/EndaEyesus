"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardFooter } from "@/components/layout/dashboard-footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // ✅ Changed background to match the topbar
        <div className="min-h-screen bg-white dark:bg-[#1C1C1F] transition-colors duration-300">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar only on mobile */}
            <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <Topbar onMenuOpen={() => setSidebarOpen(true)} />

            <main className="pt-14 lg:pt-16 min-h-screen flex flex-col w-full">
                {/* ✅ Content area now inherits the white background, no extra background needed */}
                <div className="p-4 sm:p-6 lg:p-8 flex-1 w-full">{children}</div>
                <DashboardFooter />
            </main>
        </div>
    );
}