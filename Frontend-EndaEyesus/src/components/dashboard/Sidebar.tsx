"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Bell, User, LogOut, Shield, FileText, MessageSquare } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const role = user?.role;

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    const navItems = [
        { href: "/dashboard", label: "Home", icon: Home, show: true },
        { href: "/dashboard/posts", label: "Posts", icon: FileText, show: true },
        { href: "/dashboard/my-class", label: "My Class", icon: BookOpen, show: true },
        { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, show: true },
        { href: "/dashboard/announcements", label: "Announcements", icon: Bell, show: true },
        { href: "/dashboard/profile", label: "Profile", icon: User, show: true },
        // Admin-only
        { href: "/dashboard/agent", label: "Admin Panel", icon: Shield, show: role === "SUPER_ADMIN" },
    ].filter((item) => item.show);

    return (
        <aside className="w-64 min-h-screen bg-[#0F3D2E] dark:bg-[#1C1C1F] flex flex-col fixed left-0 top-0 z-30 shadow-xl dark:border-r dark:border-[#2a2a2d]">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/10 dark:border-[#2a2a2d]">
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
            </div>

            {/* Role badge */}
            {role && role !== "MEMBER" && (
                <div className="mx-4 mt-3 mb-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center"
                    style={{
                        background: role === "SUPER_ADMIN" ? "rgba(201,162,39,0.15)" : "rgba(15,61,46,0.4)",
                        color: role === "SUPER_ADMIN" ? "#C9A227" : "#7ac9a8",
                        border: `1px solid ${role === "SUPER_ADMIN" ? "#C9A227" : "#7ac9a8"}40`,
                    }}>
                    {role === "SUPER_ADMIN" ? "⭐ Super Admin" : "🏷 Class Leader"}
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar navigation">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link key={href} href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-white/10 dark:bg-[#D4AF37]/10 text-[#C9A227] dark:text-[#D4AF37]"
                                : "text-white/70 dark:text-[#B0B0B0] hover:bg-white/8 dark:hover:bg-[#1E4D3A]/40 hover:text-white dark:hover:text-[#F5F5F5]"
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
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/6 dark:bg-white/4 hover:bg-white/10 dark:hover:bg-white/8 transition-colors">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C9A227] dark:border-[#D4AF37] flex-shrink-0">
                        {user?.profileImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`http://localhost:8080${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#C9A227] dark:bg-[#D4AF37] flex items-center justify-center text-[#0F3D2E] font-bold text-sm">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-white dark:text-[#F5F5F5] text-sm font-semibold truncate">{user?.fullName || "Guest Member"}</p>
                        <p className="text-white/50 dark:text-[#B0B0B0]/60 text-[10px] truncate">{user?.serviceClassName || "Fellowship Member"}</p>
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
