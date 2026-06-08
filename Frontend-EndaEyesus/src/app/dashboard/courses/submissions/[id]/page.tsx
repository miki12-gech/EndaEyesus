"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export default function SubmissionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const [submission, setSubmission] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!params.id) return;
        
        // TODO: Replace with actual API call to fetch submission by ID
        // For now, this is a placeholder that would need the backend endpoint
        setLoading(false);
        setError("Submission detail API not yet implemented");
    }, [params.id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-[#EDE9E2] dark:bg-[#252529] rounded w-1/4" />
                    <div className="h-64 bg-[#EDE9E2] dark:bg-[#252529] rounded-xl" />
                </div>
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Link href="/dashboard/courses/submissions" className="inline-flex items-center gap-2 text-sm text-[#7A1C1C] dark:text-[#D4AF37] hover:underline mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Submissions
                </Link>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center">
                    <p className="text-[#6b6b6b] dark:text-[#B0B0B0]">{error || "Submission not found"}</p>
                </div>
            </div>
        );
    }

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return { icon: <CheckCircle className="h-5 w-5" />, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' };
            case 'REJECTED':
                return { icon: <XCircle className="h-5 w-5" />, color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' };
            default:
                return { icon: <Clock className="h-5 w-5" />, color: 'text-[#C9A227]', bgColor: 'bg-[#F8F5F0] dark:bg-[#252529]' };
        }
    };

    const statusInfo = getStatusInfo(submission.status);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Link href="/dashboard/courses/submissions" className="inline-flex items-center gap-2 text-sm text-[#7A1C1C] dark:text-[#D4AF37] hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Submissions
            </Link>

            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#7A1C1C]/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-[#7A1C1C] dark:text-[#D4AF37]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">{submission.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                                <div className="flex items-center gap-1.5">
                                    <User className="h-4 w-4" />
                                    <span>{submission.author?.fullName || "Unknown"}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(submission.submittedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusInfo.bgColor} ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="text-sm font-semibold">{submission.status}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="prose dark:prose-invert max-w-none mb-6">
                    <div dangerouslySetInnerHTML={{ __html: submission.content }} />
                </div>

                {/* Attachments */}
                {submission.attachments && submission.attachments.length > 0 && (
                    <div className="pt-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                        <h3 className="text-sm font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">Attachments</h3>
                        <div className="space-y-2">
                            {submission.attachments.map((attachment: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={attachment.url.startsWith("http") ? attachment.url : `${API_BASE}${attachment.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-[#F8F5F0] dark:bg-[#252529] rounded-lg hover:bg-[#EDE9E2] dark:hover:bg-[#2a2a2d] transition-colors"
                                >
                                    <FileText className="h-5 w-5 text-[#7A1C1C] dark:text-[#D4AF37]" />
                                    <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5]">{attachment.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
