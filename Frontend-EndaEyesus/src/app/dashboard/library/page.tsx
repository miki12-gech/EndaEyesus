"use client";

import { useEffect, useState } from "react";
import { Folder, FileText, Download, Heart, ExternalLink } from "lucide-react";
import apiClient from "@/api";

export default function LibraryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLibrary = () => {
        apiClient.library.listLibrary()
            .then(res => {
                const data = res.data;
                const list = Array.isArray(data) ? data : (data as any)?.items || [];
                setItems(list);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLibrary();
    }, []);

    const handleLike = async (id: string) => {
        try {
            await apiClient.library.likeLibraryItem(id);
            fetchLibrary(); // refresh likes
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <div className="p-8 text-center text-[#6b6b6b]">Loading library...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7A1C1C] flex items-center justify-center">
                    <Folder className="h-5 w-5 text-[#C9A227]" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Resource Library</h1>
                    <p className="text-sm text-[#6b6b6b]">Course materials, books, and references</p>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <FileText className="h-10 w-10 text-[#C9A227]/30 mx-auto mb-3" />
                    <p className="text-sm font-medium text-[#6b6b6b]">No resources found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-bold text-sm text-[#7A1C1C] dark:text-[#F5F5F5]">{item.title}</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7A1C1C] text-white">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-xs text-[#6b6b6b] mb-4">{item.description}</p>
                            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                                <button onClick={() => handleLike(item.id)} className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#7A1C1C] transition-colors">
                                    <Heart className="h-4 w-4" /> {item.likes_count || 0}
                                </button>
                                {item.drive_url && (
                                    <a href={item.drive_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37] ml-auto">
                                        <ExternalLink className="h-4 w-4" /> View in Drive
                                    </a>
                                )}
                                <button onClick={() => window.open(item.drive_url, '_blank')} className="flex items-center gap-1.5 text-xs text-white bg-[#7A1C1C] px-3 py-1.5 rounded-lg hover:bg-[#C9A227] transition-colors">
                                    <Download className="h-4 w-4" /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
