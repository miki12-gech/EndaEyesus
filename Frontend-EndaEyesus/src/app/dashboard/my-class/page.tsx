"use client";

import { BookOpen, Clock, Users, Music, ChevronRight, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

const classMembers = [
    { name: "Tsegay Hailu", role: "Section Leader", initials: "TH" },
    { name: "Miriam Tesfaye", role: "Alto", initials: "MT" },
    { name: "Bereket Alemu", role: "Tenor", initials: "BA" },
    { name: "Sara Gebru", role: "Soprano", initials: "SG" },
    { name: "Dawit Kiros", role: "Bass", initials: "DK" },
];

export default function MyClassPage() {
    const user = useAuthStore((s) => s.user);
    const serviceClass = user?.serviceClassName || "Fellowship Member";

    if (user?.status === "PENDING") {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#0F3D2E] dark:hover:text-[#D4AF37] font-medium transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Dashboard
                </Link>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center shadow-sm">
                    <div className="w-12 h-12 bg-[#0F3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-[#0F3D2E] dark:text-[#D4AF37]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37] mb-2">Account Pending Approval</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        You will be able to view your class details and members once an administrator approves your account.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back button */}
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#0F3D2E] dark:hover:text-[#D4AF37] font-medium transition-colors group"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dashboard
            </Link>

            {/* Header card */}
            <div
                className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm"
                style={{ borderTop: "4px solid #C9A227" }}
            >
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F3D2E] dark:bg-[#1E4D3A] flex items-center justify-center flex-shrink-0">
                        <Music className="h-7 w-7 text-[#C9A227] dark:text-[#D4AF37]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#0F3D2E] dark:text-[#D4AF37]">{serviceClass}</h1>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-0.5">
                            Praising God through sacred Ethiopian Orthodox service since 1992 E.C.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-[#C9A227] dark:text-[#D4AF37] font-semibold bg-[#C9A227]/10 dark:bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full">
                                Active Member
                            </span>
                            <span className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] flex items-center gap-1">
                                <Users className="h-3 w-3" /> {classMembers.length + 8} members
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Schedule */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm" style={{ borderLeft: "3px solid #0F3D2E" }}>
                        <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] flex items-center gap-2 mb-4">
                            <Clock className="h-4 w-4 text-[#C9A227] dark:text-[#D4AF37]" /> Schedule
                        </h2>
                        <ul className="space-y-3">
                            {[
                                { day: "Saturday", time: "3:00 – 5:00 PM", label: "Rehearsal" },
                                { day: "Sunday", time: "7:00 – 10:00 AM", label: "Liturgy" },
                                { day: "Wednesday", time: "6:00 – 7:30 PM", label: "Practice" },
                            ].map((item) => (
                                <li key={item.day} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">{item.label}</p>
                                        <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">{item.day} · {item.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm" style={{ borderLeft: "3px solid #C9A227" }}>
                        <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-[#C9A227] dark:text-[#D4AF37]" /> Current Study
                        </h2>
                        <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5]">Yared's Degua</p>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">
                            Weekly song: <span className="font-semibold text-[#0F3D2E] dark:text-[#D4AF37]">Siyume Egziabher</span>
                        </p>
                    </div>
                </div>

                {/* Members */}
                <div className="md:col-span-2 bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37]">Class Members</h2>
                        <button className="text-xs text-[#C9A227] dark:text-[#D4AF37] font-semibold hover:text-[#0F3D2E] dark:hover:text-[#F5F5F5] flex items-center gap-0.5 transition-colors">
                            See all <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {classMembers.map((m) => (
                            <div key={m.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-[#0F3D2E] dark:bg-[#1E4D3A] text-[#C9A227] dark:text-[#D4AF37] flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {m.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">{m.name}</p>
                                    <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
