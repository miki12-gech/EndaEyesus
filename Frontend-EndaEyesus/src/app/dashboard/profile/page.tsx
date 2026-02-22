"use client";

import { MapPin, BookOpen, GraduationCap, Phone, Mail, Music, Edit, User, Calendar, ArrowLeft, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRef, useState } from "react";
import api from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

const ACADEMIC_YEAR_LABELS: Record<string, string> = {
    YEAR_1: "1st Year", YEAR_2: "2nd Year", YEAR_3: "3rd Year",
    YEAR_4: "4th Year", YEAR_5: "5th Year", YEAR_6: "6th Year",
    YEAR_7: "7th Year", YEAR_8: "8th Year", POST_GRADUATE: "Postgraduate", GRADUATED: "Graduated",
};

export default function ProfilePage() {
    const { user, updateUser } = useAuthStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("image", file);
            const res = await api.post<{ data: { imageURL: string } }>("/upload/image", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            updateUser({ profileImage: res.data.data.imageURL });
        } catch {
            // Fallback: show local preview
            updateUser({ profileImage: URL.createObjectURL(file) });
        } finally {
            setUploading(false);
        }
    };

    const roleBadge = user?.role === "SUPER_ADMIN"
        ? { label: "Super Admin", color: "#C9A227" }
        : user?.role === "CLASS_LEADER"
            ? { label: "Class Leader", color: "#0F3D2E" }
            : { label: "Member", color: "#0F3D2E" };

    return (
        <div className="max-w-3xl mx-auto space-y-5">
            {/* Back button */}
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#0F3D2E] dark:hover:text-[#D4AF37] font-medium transition-colors group mb-1">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dashboard
            </Link>

            {/* Profile Card */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm overflow-hidden" style={{ borderTop: "4px solid #C9A227" }}>
                {/* Cover banner */}
                <div className="h-24 bg-[#0F3D2E] dark:bg-[#151516] relative">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 400 96" fill="none" aria-hidden="true">
                            <rect x="190" y="4" width="20" height="88" rx="4" fill="#C9A227" />
                            <rect x="140" y="36" width="120" height="20" rx="4" fill="#C9A227" />
                        </svg>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    {/* Avatar + Edit */}
                    <div className="flex items-end justify-between -mt-10 mb-4">
                        <div className="relative group">
                            <Avatar className="h-20 w-20 border-4 border-white dark:border-[#1C1C1F] shadow-md">
                                {user?.profileImage && (
                                    <AvatarImage
                                        src={user.profileImage.startsWith("http") ? user.profileImage : `${API_BASE}${user.profileImage}`}
                                        alt={user.fullName}
                                    />
                                )}
                                <AvatarFallback className="text-2xl font-bold bg-[#0F3D2E] dark:bg-[#1E4D3A] text-[#C9A227] dark:text-[#D4AF37]">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                aria-label="Change profile photo"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Upload className="h-5 w-5 text-white" />
                                )}
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp"
                                className="hidden" onChange={handlePhotoChange} aria-label="Upload profile photo" />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                            className="border-[#0F3D2E] dark:border-[#D4AF37] text-[#0F3D2E] dark:text-[#D4AF37] hover:bg-[#0F3D2E] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#0E0E0F] rounded-xl text-xs flex items-center gap-1.5 transition-all">
                            <Edit className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Change Photo"}
                        </Button>
                    </div>

                    {/* Name & identity */}
                    <div className="mb-4">
                        <h1 className="text-xl font-bold text-[#0F3D2E] dark:text-[#D4AF37]">{user?.fullName || "Guest Member"}</h1>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">@{user?.username || "username"}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge style={{ backgroundColor: roleBadge.color }} className="text-white text-[10px] hover:opacity-90 border-0">
                                {roleBadge.label}
                            </Badge>
                            {user?.serviceClassName && (
                                <Badge className="bg-[#C9A227]/15 dark:bg-[#D4AF37]/15 text-[#C9A227] dark:text-[#D4AF37] border border-[#C9A227]/30 dark:border-[#D4AF37]/30 text-[10px] hover:bg-[#C9A227]/20">
                                    {user.serviceClassName}
                                </Badge>
                            )}
                            {user?.status === "PENDING" && (
                                <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700 text-[10px]">
                                    Pending Approval
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    {user?.bio && (
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-5 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-3 italic">
                            &ldquo;{user.bio}&rdquo;
                        </p>
                    )}

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: GraduationCap, label: "Department", value: user?.department },
                            { icon: BookOpen, label: "Academic Year", value: user?.academicYear ? ACADEMIC_YEAR_LABELS[user.academicYear] || user.academicYear : undefined },
                            { icon: Music, label: "Service Class", value: user?.serviceClassName },
                            { icon: MapPin, label: "Birth Place", value: user?.birthPlace },
                            { icon: Calendar, label: "Birth Date", value: user?.birthDate ? new Date(user.birthDate).toLocaleDateString() : undefined },
                            { icon: User, label: "Sex", value: user?.sex ? (user.sex === "MALE" ? "Male" : "Female") : undefined },
                            { icon: Mail, label: "Email", value: user?.email },
                            { icon: Phone, label: "Phone", value: user?.phoneNumber },
                        ]
                            .filter((item) => item.value)
                            .map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0F3D2E]/10 dark:bg-[#1E4D3A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Icon className="h-4 w-4 text-[#0F3D2E] dark:text-[#D4AF37]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] font-medium uppercase tracking-wide">{label}</p>
                                        <p className="text-xs font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] leading-snug">{value}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Account info */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm" style={{ borderLeft: "3px solid #C9A227" }}>
                <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] mb-3">Account</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] uppercase tracking-wide">Status</p>
                        <p className="text-xs font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mt-0.5">{user?.status || "—"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] uppercase tracking-wide">Role</p>
                        <p className="text-xs font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mt-0.5">{user?.role || "—"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
