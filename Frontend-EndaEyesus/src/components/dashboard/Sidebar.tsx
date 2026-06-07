"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, GraduationCap, BookOpen, User, LogOut, Shield, Users, Activity, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

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
    const isMember = MEMBER_ROLES.includes(role);
    const roleBadge = getRoleBadge(role);

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    const navItems = [
        { href: "/dashboard/announcements", label: "Announcements", icon: Bell, show: true },
        { href: "/dashboard/courses", label: "Courses", icon: GraduationCap, show: true },
        { href: "/dashboard/library", label: "Library", icon: BookOpen, show: true },
        { href: "/dashboard/about", label: "About", icon: User, show: true },
        { href: "/dashboard/agent", label: "Admin", icon: Shield, show: isAdmin },
        { href: "/dashboard/agent/roles", label: "Roles", icon: Shield, show: role === 'SECRETARIAT_CHAIRMAN' },
        { href: "/dashboard/agent/members", label: "Members", icon: Users, show: role === 'SECRETARIAT_CHAIRMAN' || role === 'SECRETARIAT_VICE' || role === 'SECRETARIAT_SECRETARY' },
        { href: "/dashboard/agent/audit-logs", label: "Audit Logs", icon: Activity, show: role === 'SECRETARIAT_CHAIRMAN' },
    ].filter((item) => item.show);

    return (
        <aside
            className={`
                w-64 min-h-screen bg-[#7A1C1C] dark:bg-[#1C1C1F] flex flex-col
                fixed left-0 top-0 z-30 shadow-xl dark:border-r dark:border-[#2a2a2d]
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
        >
            {/* Logo + mobile close button */}
            <div className="px-6 py-6 border-b border-white/10 dark:border-[#2a2a2d] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 dark:bg-[#D4AF37]/15 border border-[#C9A227]/40 dark:border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <rect x="8.5" y="1" width="3" height="18" rx="1" fill="#C9A227" />
                            <rect x="2" y="6" width="16" height="3" rx="1" fill="#C9A227" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white dark:text-[#F5F5F5] font-bold text-sm leading-tight">Enda Eyesus</p>
                        <p className="text-[#C9A227]/70 dark:text-[#D4AF37]/60 text-[10px] font-medium">MU Fellowship</p>
                    </div>
                </div>
                {/* Mobile close button */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Role badge */}
            {roleBadge && (
                <div className="mx-4 mt-3 mb-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center"
                    style={{
                        background: roleBadge.bg,
                        color: roleBadge.color,
                        border: `1px solid ${roleBadge.border}`,
                    }}>
                    {roleBadge.label}
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Sidebar navigation">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link key={href} href={href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-white/10 dark:bg-[#D4AF37]/10 text-[#C9A227] dark:text-[#D4AF37]"
                                : "text-white/70 dark:text-[#B0B0B0] hover:bg-white/8 dark:hover:bg-[#9B2323]/40 hover:text-white dark:hover:text-[#F5F5F5]"
                                }`}
                            aria-current={isActive ? "page" : undefined}>
                            <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-[#C9A227] dark:text-[#D4AF37]" : "text-white/60 dark:text-[#B0B0B0] group-hover:text-white dark:group-hover:text-[#F5F5F5]"}`} />
                            {label}
                            {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A227] dark:bg-[#D4AF37]" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom: user card + logout */}
            <div className="px-4 py-4 border-t border-white/10 dark:border-[#2a2a2d] space-y-2">
                <Link href="/dashboard/profile" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/6 dark:bg-white/4 hover:bg-white/10 dark:hover:bg-white/8 transition-colors">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C9A227] dark:border-[#D4AF37] flex-shrink-0">
                        {user?.profileImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080"}${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#C9A227] dark:bg-[#D4AF37] flex items-center justify-center text-[#7A1C1C] font-bold text-sm">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-white dark:text-[#F5F5F5] text-sm font-semibold truncate">{user?.fullName || "Guest Member"}</p>
                        <p className="text-white/50 dark:text-[#B0B0B0]/60 text-[10px] truncate">{user?.email || "Fellowship Member"}</p>
                    </div>
                </Link>

                <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 dark:text-[#B0B0B0] hover:bg-[#7A1C1C]/40 dark:hover:bg-[#8B2C2C]/30 hover:text-white dark:hover:text-[#F5F5F5] transition-all duration-200"
                    aria-label="Logout">
                    <LogOut className="h-4 w-4" /> Logout
                </button>
            </div>
        </aside>
    );
}
