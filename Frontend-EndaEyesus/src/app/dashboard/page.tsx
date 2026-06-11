"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
    const router = useRouter();
    const { user, token } = useAuthStore();

    useEffect(() => {
        if (!token || !user) return;

        // Member Affairs Manager
        if (user.role === "SERVICE_MANAGER" && user.serviceClassName === "የአባልነት ጉዳይ ክፍል") {
            router.replace("/dashboard/member-affairs");
            return;
        }

        // Add other service class redirects here (Education, Choir, etc.)
        // Default fallback
        router.replace("/dashboard/announcements");
    }, [user, token, router]);

    return null;
}