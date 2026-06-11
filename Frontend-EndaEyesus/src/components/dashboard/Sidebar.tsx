"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, GraduationCap, BookOpen, User, LogOut, Shield, Users, Activity, X, 
  Cross as CrossIcon, ChevronDown, ChevronRight, FileText, Sparkles, 
  UserCheck, Layers, UserPlus 
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ADMIN_ROLES = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN", "SERVICE_MANAGER"];
const MEMBER_ROLES = ["MEMBER", "TEACHER", "SERVICE_MANAGER", "SECRETARIAT_SECRETARY", "SECRETARIAT_VICE", "SECRETARIAT_CHAIRMAN", "SUPER_ADMIN", "CLASS_LEADER"];

function getRoleBadge(role: string) {
    switch (role) {
        case "SECRETARIAT_CHAIRMAN": return { label: "⭐ Chairman", color: "#C9A227", bg: "rgba(201,162,39,0.15)", border: "#C9A22740" };
        case "SECRETARIAT_VICE":     return { label: "⭐ Vice Chair", color: "#C9A227", bg: "rgba(201,162,39,0.15)", border: "#C9A22740" };
        case "SECRETARIAT_SECRETARY": return { label: "⭐ Secretary", color: "#C9A227", bg: "rgba(201,162,39,0.15)", border: "#C9A22740" };
        case "SERVICE_MANAGER":     return { label: "⭐ Svc Manager", color: "#C9A227", bg: "rgba(201,162,39,0.15)", border: "#C9A22740" };
        case "SUPER_ADMIN":         return { label: "⭐ Super Admin", color: "#C9A227", bg: "rgba(201,162,39,0.15)", border: "#C9A22740" };
        case "TEACHER":             return { label: "🎓 Teacher", color: "#7ac9a8", bg: "rgba(15,61,46,0.4)", border: "#7ac9a840" };
        case "CLASS_LEADER":        return { label: "🏷 Class Leader", color: "#7ac9a8", bg: "rgba(15,61,46,0.4)", border: "#7ac9a840" };
        default: return null;
    }
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const role = user?.system_role || user?.role || "USER";
    const isAdmin = ADMIN_ROLES.includes(role);
    const isChairman = role === 'SECRETARIAT_CHAIRMAN';
    const roleBadge = getRoleBadge(role);

    const [libraryOpen, setLibraryOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const [memberAffairsOpen, setMemberAffairsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    const canAccessMemberAffairs = 
        (role === "SERVICE_MANAGER" && user?.serviceClassName === "የአባልነት ጉዳይ ክፍል") ||
        ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN"].includes(role);

    const mainNavItems = [
        { href: "/dashboard/announcements", label: "Announcements", icon: Bell, show: true },
        { href: "/dashboard/courses", label: "Courses", icon: GraduationCap, show: true },
        { href: "/dashboard/about", label: "About", icon: User, show: true },
    ].filter((item) => item.show);

    const libraryCategories = [
        { href: "/dashboard/library", label: "All Resources", icon: BookOpen, query: "" },
        { href: "/dashboard/library?category=SPIRITUAL", label: "Spiritual", icon: Sparkles },
        { href: "/dashboard/library?category=ACADEMIC", label: "Academic", icon: GraduationCap },
        { href: "/dashboard/library?category=OTHER", label: "Other", icon: FileText },
    ];

    const adminSubItems = [
        { href: "/dashboard/agent", label: "Admin Panel", icon: Shield },
        ...(isChairman ? [
            { href: "/dashboard/agent/roles", label: "Role Management", icon: Shield },
            { href: "/dashboard/agent/members", label: "Member Census", icon: Users },
        ] : []),
    ];

    const memberAffairsItems = [
        { href: "/dashboard/member-affairs?tab=pending", label: "Pending Approvals", icon: UserCheck },
        { href: "/dashboard/member-affairs?tab=census", label: "Member Census", icon: Users },
        { href: "/dashboard/member-affairs?tab=spiritual", label: "Spiritual Care", icon: Shield },
        { href: "/dashboard/member-affairs?tab=subclasses", label: "Sub‑Classes", icon: Layers },
        { href: "/dashboard/member-affairs?tab=documents", label: "Plans & Reports", icon: FileText },
        { href: "/dashboard/member-affairs?tab=batch", label: "Batch Assign", icon: UserPlus },
    ];

    return (
        <aside className={`w-72 min-h-screen bg-white dark:bg-[#1C1C1F] flex flex-col fixed left-0 top-0 z-50 shadow-2xl border-r border-[#ddd8d0] dark:border-[#2a2a2d] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
            {/* Logo */}
            <div className="px-6 py-6 border-b border-[#ddd8d0] dark:border-[#2a2a2d] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#9B2323] flex items-center justify-center shadow-md">
                        <CrossIcon className="h-5 w-5 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <div>
                        <p className="text-foreground font-bold text-base leading-tight">Enda Eyesus</p>
                        <p className="text-[#C9A227] dark:text-[#D4AF37] text-[10px] font-medium tracking-wide">MU Fellowship</p>
                    </div>
                </div>
                <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Role badge */}
            {roleBadge && (
                <div className="mx-4 mt-4 mb-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-center" style={{ background: roleBadge.bg, color: roleBadge.color, border: `1px solid ${roleBadge.border}` }}>
                    {roleBadge.label}
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {mainNavItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-[#F8F5F0] to-[#f0ebe3] dark:from-[#252529] dark:to-[#1f1f23] text-[#C9A227] dark:text-[#D4AF37] shadow-sm" : "text-muted-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529] hover:text-foreground dark:hover:text-[#F5F5F5]"}`}
                        >
                            <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? "text-[#C9A227] dark:text-[#D4AF37]" : ""}`} />
                            {label}
                            {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A227] dark:bg-[#D4AF37]" />}
                        </Link>
                    );
                })}

                {/* Library Dropdown */}
                <div>
                    <button
                        onClick={() => setLibraryOpen(!libraryOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5" />
                            Library
                        </div>
                        {libraryOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {libraryOpen && (
                        <div className="ml-8 mt-1 space-y-1 border-l border-[#ddd8d0] dark:border-[#2a2a2d] pl-3">
                            {libraryCategories.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === "/dashboard/library" && href === "/dashboard/library" ? true : pathname === "/dashboard/library" && href.includes("category") && window.location.search === href.split("?")[1];
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? "text-[#C9A227] dark:text-[#D4AF37] bg-[#F8F5F0] dark:bg-[#252529]" : "text-muted-foreground hover:text-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"}`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Member Affairs Dropdown */}
                {canAccessMemberAffairs && (
                    <div>
                        <button
                            onClick={() => setMemberAffairsOpen(!memberAffairsOpen)}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5" />
                                Member Affairs
                            </div>
                            {memberAffairsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        {memberAffairsOpen && (
                            <div className="ml-8 mt-1 space-y-1 border-l border-[#ddd8d0] dark:border-[#2a2a2d] pl-3">
                                {memberAffairsItems.map(({ href, label, icon: Icon }) => {
                                    const isActive = pathname === "/dashboard/member-affairs" && new URLSearchParams(window.location.search).get("tab") === href.split("=")[1];
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={onClose}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? "text-[#C9A227] dark:text-[#D4AF37] bg-[#F8F5F0] dark:bg-[#252529]" : "text-muted-foreground hover:text-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Admin Dropdown (only for admins) */}
                {isAdmin && (
                    <div>
                        <button
                            onClick={() => setAdminOpen(!adminOpen)}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5" />
                                Admin
                            </div>
                            {adminOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        {adminOpen && (
                            <div className="ml-8 mt-1 space-y-1 border-l border-[#ddd8d0] dark:border-[#2a2a2d] pl-3">
                                {adminSubItems.map(({ href, label, icon: Icon }) => {
                                    const isActive = pathname === href;
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={onClose}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? "text-[#C9A227] dark:text-[#D4AF37] bg-[#F8F5F0] dark:bg-[#252529]" : "text-muted-foreground hover:text-foreground hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* User card & logout */}
            <div className="px-4 py-4 border-t border-[#ddd8d0] dark:border-[#2a2a2d] space-y-2">
                <Link href="/dashboard/profile" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#F8F5F0] dark:bg-[#252529] hover:bg-[#F0EBE3] dark:hover:bg-[#2a2a2e] transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227] dark:border-[#D4AF37] flex-shrink-0">
                        {user?.profileImage ? (
                            <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080"}${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#9B2323] flex items-center justify-center text-white dark:text-[#0E0E0F] font-bold text-sm">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-semibold truncate">{user?.fullName || "Guest Member"}</p>
                        <p className="text-muted-foreground text-[10px] truncate">{user?.email || "Fellowship Member"}</p>
                    </div>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200">
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}