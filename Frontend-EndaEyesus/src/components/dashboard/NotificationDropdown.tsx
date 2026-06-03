"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check } from "lucide-react";
import apiClient from "@/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NotificationItem = {
    id: string;
    title?: string;
    message?: string;
    target_route?: string | null;
    is_read: boolean;
    created_at: string;
};

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const res = await apiClient.notifications.listNotifications({
                unread_only: false,
                limit: 20,
                offset: 0,
            });
            const data = res.data as any;
            setNotifications(data?.items || data || []);
            setUnreadCount(typeof data?.unread_count === "number" ? data.unread_count : 0);
        } catch (e: any) {
            // Ignore 403 forbidden if user is pending
            if (e.response?.status !== 403) {
                console.error("Failed to fetch notifications", e);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
        intervalRef.current = setInterval(fetchNotifications, 30000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [user]);

    const markAsRead = async (id: string, linkTarget?: string | null) => {
        // Optimistically update UI
        setNotifications((p) => p.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
        setUnreadCount((p) => Math.max(0, p - 1));
        setIsOpen(false);
        if (linkTarget) router.push(linkTarget);
    };

    const markAllAsRead = async () => {
        try {
            await apiClient.notifications.markAllRead();
            setNotifications((p) => p.map((n) => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className="relative p-2 rounded-xl hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-[#7A1C1C] dark:bg-[#8B2C2C] text-white text-[10px] font-bold">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-[350px] p-0 shadow-lg border-[#ddd8d0] dark:border-[#2a2a2d] bg-white dark:bg-[#1C1C1F]"
            >
                <div className="flex items-center justify-between p-4 border-b border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <h3 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37]">Notifications</h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-[#6b6b6b] hover:text-[#7A1C1C] dark:text-[#B0B0B0] dark:hover:text-[#D4AF37] flex items-center gap-1"
                        >
                            <Check className="w-3 h-3" /> Mark all read
                        </button>
                    )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] text-sm">
                            No notifications yet
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id, notification.target_route)}
                                    className={`flex items-start gap-3 p-4 border-b border-[#ddd8d0] dark:border-[#2a2a2d] cursor-pointer hover:bg-[#F8F5F0] dark:hover:bg-[#2a2a2d] transition-colors ${
                                        !notification.is_read ? "bg-[#F8F5F0]/50 dark:bg-[#2a2a2d]/30" : ""
                                    }`}
                                >
                                    <Avatar className="h-10 w-10 shrink-0">
                                        <AvatarFallback className="bg-[#7A1C1C] dark:bg-[#9B2323] text-[#C9A227] dark:text-[#D4AF37] text-xs">
                                            {(notification.title || "N").slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        {notification.title && (
                                            <p className="text-sm font-medium text-[#7A1C1C] dark:text-[#D4AF37]">
                                                {notification.title}
                                            </p>
                                        )}
                                        <p className="text-sm text-[#1a1a1a] dark:text-[#e0e0e0]">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                                            {new Date(notification.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {!notification.is_read && (
                                        <div className="w-2 h-2 rounded-full bg-[#7A1C1C] dark:bg-[#8B2C2C] shrink-0 mt-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
