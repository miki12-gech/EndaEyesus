"use client";

import Link from "next/link";
import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";
import { MessagesSlideover } from "./MessagesSlideover";

const PAGE_TITLES: Record<string, string> = {
    "/dashboard": "Home",
    "/dashboard/posts": "Posts",
    "/dashboard/my-class": "My Class",
    "/dashboard/messages": "Messages",
    "/dashboard/announcements": "Announcements",
    "/dashboard/profile": "Profile",
    "/dashboard/agent": "Admin Panel",
};

interface TopbarProps {
    onMenuOpen: () => void;
}

export function Topbar({ onMenuOpen }: TopbarProps) {
    const pathname = usePathname();
    const title = PAGE_TITLES[pathname] ?? "Dashboard";
    const user = useAuthStore((s) => s.user);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    return (
        <header className="h-14 lg:h-16 bg-white dark:bg-[#1C1C1F] border-b border-[#ddd8d0] dark:border-[#2a2a2d] flex items-center justify-between px-4 lg:px-6 fixed top-0 right-0 left-0 lg:left-64 z-20 shadow-sm">
            {/* Left: hamburger (mobile) + page title */}
            <div className="flex items-center gap-3">
                {/* Hamburger — mobile only */}
                <button
                    onClick={onMenuOpen}
                    className="lg:hidden p-2 -ml-1 rounded-xl text-[#0F3D2E] dark:text-[#D4AF37] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div>
                    <h2 className="text-base font-semibold text-[#0F3D2E] dark:text-[#D4AF37] tracking-tight leading-tight">{title}</h2>
                    <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] hidden sm:block">
                        Enda Eyesus Student Fellowship
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 lg:gap-3">
                {/* Search — desktop only */}
                <div className="hidden md:flex items-center gap-2 bg-[#F8F5F0] dark:bg-[#252529] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl px-3 py-2">
                    <Search className="h-3.5 w-3.5 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="bg-transparent text-sm text-[#1a1a1a] dark:text-[#F5F5F5] placeholder:text-[#6b6b6b] dark:placeholder:text-[#B0B0B0] outline-none w-32"
                        aria-label="Search the platform"
                    />
                </div>

                {/* Dark mode toggle */}
                <ThemeToggle />

                {/* Direct Messages */}
                <MessagesSlideover />

                {/* Notifications */}
                <NotificationDropdown />

                {/* Avatar */}
                <Link href="/dashboard/profile" aria-label="Go to profile">
                    <Avatar className="h-8 w-8 lg:h-9 lg:w-9 border-2 border-[#C9A227] dark:border-[#D4AF37] cursor-pointer hover:scale-105 transition-transform">
                        {user?.profileImage && (
                            <AvatarImage src={`${API_BASE}${user.profileImage}`} alt={user.fullName} />
                        )}
                        <AvatarFallback className="bg-[#0F3D2E] dark:bg-[#1E4D3A] text-[#C9A227] dark:text-[#D4AF37] font-bold text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
}
