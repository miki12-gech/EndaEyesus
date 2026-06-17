"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Shield } from "lucide-react"; // Or your custom Orthodox cross icon

export default function DashboardPage() {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const [isRouting, setIsRouting] = useState(true);

    useEffect(() => {
        // Wait a tiny fraction of a second to ensure store hydration
        const timer = setTimeout(() => {
            if (!token || !user) {
                router.replace("/login");
                return;
            }

            // Member Affairs Manager Routing
            if (user.role === "SERVICE_MANAGER" && user.serviceClassName === "የአባልነት ጉዳይ ክፍል") {
                router.replace("/dashboard/member-affairs");
                return;
            }

            // Add other service class redirects here (Education, Choir, etc.)
            
            // Default fallback
            router.replace("/dashboard/announcements");
        }, 300);

        return () => clearTimeout(timer);
    }, [user, token, router]);

    // A beautiful cinematic loading state while calculating the redirect
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-center"
            >
                {/* Outer pulsing ring */}
                <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary/20 dark:border-primary/30"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                
                {/* Inner Icon Box */}
                <div className="relative z-10 w-20 h-20 bg-white dark:bg-[#161618] rounded-2xl shadow-2xl border border-border flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary animate-pulse" />
                </div>
            </motion.div>
            
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-muted-foreground text-sm font-medium tracking-widest uppercase"
            >
                ወደ ማዕከል በመግባት ላይ...
            </motion.p>
        </div>
    );
}