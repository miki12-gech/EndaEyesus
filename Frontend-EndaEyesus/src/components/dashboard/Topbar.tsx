"use client";

import Link from "next/link";
import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";
import { MessagesSlideover } from "./MessagesSlideover";
import { GraduationCap, BookOpen, User, Shield } from "lucide-react";

const ADMIN_ROLES = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN", "SERVICE_MANAGER"];
const MEMBER_ROLES = ["MEMBER", "TEACHER", "SERVICE_MANAGER", "SECRETARIAT_SECRETARY", "SECRETARIAT_VICE", "SECRETARIAT_CHAIRMAN", "SUPER_ADMIN", "CLASS_LEADER"];

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

    const role = user?.system_role || user?.role || "USER";
    const isAdmin = ADMIN_ROLES.includes(role);
    const isMember = MEMBER_ROLES.includes(role);

    const navItems = [
        { href: "/dashboard/announcements", label: "Announcements", icon: Bell, show: true },
        { href: "/dashboard/courses", label: "Courses", icon: GraduationCap, show: true },
        { href: "/dashboard/library", label: "Library", icon: BookOpen, show: true },
        { href: "/dashboard/about", label: "About", icon: User, show: true },
        { href: "/dashboard/agent", label: "Admin", icon: Shield, show: isAdmin },
    ].filter((item) => item.show);

    return (
        <header className="h-14 lg:h-16 bg-white dark:bg-[#1C1C1F] border-b border-[#ddd8d0] dark:border-[#2a2a2d] flex items-center justify-between px-4 lg:px-6 fixed top-0 right-0 left-0 z-20 shadow-sm">
            {/* Left: page title */}
            <div className="flex items-center gap-3 w-1/4">
                <div>
                    <h2 className="text-base font-semibold text-[#7A1C1C] dark:text-[#D4AF37] tracking-tight leading-tight">{title}</h2>
                    <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] hidden sm:block">
                        Enda Eyesus Student Fellowship
                    </p>
                </div>
            </div>

            {/* Middle: Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-center">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            pathname === href 
                                ? "bg-[#F8F5F0] dark:bg-[#252529] text-[#C9A227] dark:text-[#D4AF37]" 
                                : "text-[#7A1C1C] dark:text-[#F5F5F5] hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"
                        }`}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 lg:gap-3 w-1/4 justify-end">
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
                        <AvatarFallback className="bg-[#7A1C1C] dark:bg-[#9B2323] text-[#C9A227] dark:text-[#D4AF37] font-bold text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
}
