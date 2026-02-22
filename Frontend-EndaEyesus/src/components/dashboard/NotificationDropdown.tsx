"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { Notification } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const user = useAuthStore((s) => s.user);
    const router = useRouter();

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const res = await api.get<{ data: { list: Notification[], unreadCount: number } }>('/notifications');
            setNotifications(res.data.data.list);
            setUnreadCount(res.data.data.unreadCount);
        } catch (e: any) {
            // Ignore 403 forbidden if user is pending
            if (e.response?.status !== 403) {
                console.error('Failed to fetch notifications', e);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30s
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user]);

    const markAsRead = async (id: string, linkTarget?: string | null) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            setNotifications(p => p.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(p => Math.max(0, p - 1));
            setIsOpen(false);
            if (linkTarget) {
                router.push(linkTarget);
            }
        } catch (e) { console.error(e); }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            setNotifications(p => p.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (e) { console.error(e); }
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
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[350px] p-0 shadow-lg border-[#ddd8d0] dark:border-[#2a2a2d] bg-white dark:bg-[#1C1C1F]">
                <div className="flex items-center justify-between p-4 border-b border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <h3 className="font-semibold text-[#0F3D2E] dark:text-[#D4AF37]">Notifications</h3>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-[#6b6b6b] hover:text-[#0F3D2E] dark:text-[#B0B0B0] dark:hover:text-[#D4AF37] flex items-center gap-1">
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
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id, notification.linkTarget)}
                                    className={`flex items-start gap-3 p-4 border-b border-[#ddd8d0] dark:border-[#2a2a2d] cursor-pointer hover:bg-[#F8F5F0] dark:hover:bg-[#2a2a2d] transition-colors ${!notification.isRead ? 'bg-[#F8F5F0]/50 dark:bg-[#2a2a2d]/30' : ''}`}
                                >
                                    <Avatar className="h-10 w-10 shrink-0">
                                        <AvatarFallback className="bg-[#0F3D2E] dark:bg-[#1E4D3A] text-[#C9A227] dark:text-[#D4AF37] text-xs">
                                            {notification.actor.fullName.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm text-[#1a1a1a] dark:text-[#e0e0e0]">
                                            <span className="font-medium text-[#0F3D2E] dark:text-[#D4AF37]">{notification.actor.fullName}</span>
                                            {' '}{notification.content}
                                        </p>
                                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
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
