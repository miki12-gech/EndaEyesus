import Link from "next/link";
import { Send } from "lucide-react";

export function MainFooter() {
    return (
        <footer className="bg-[#0E0E0F] border-t-4 border-[#D4AF37] pt-16 pb-8 relative overflow-hidden">
            {/* Subtle background cross watermark */}
            <div className="absolute -bottom-24 -right-24 opacity-5 pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                    <rect x="180" y="20" width="40" height="360" rx="8" fill="#F5F5F5" />
                    <rect x="40" y="120" width="320" height="40" rx="8" fill="#F5F5F5" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Col */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <rect x="8.5" y="1" width="3" height="18" rx="1" fill="#D4AF37" />
                                    <rect x="2" y="6" width="16" height="3" rx="1" fill="#D4AF37" />
                                </svg>
                            </div>
                            <h2 className="text-[#D4AF37] font-bold text-lg font-serif">Enda Eyesus</h2>
                        </div>
                        <p className="text-[#F5F5F5]/60 text-sm leading-relaxed max-w-md">
                            The official Ethiopian Orthodox Tewahedo Church Student Fellowship at Mekelle University. Uniting students in faith, service, and academic excellence since 1986 E.C. (ታሕሳስ 29).
                        </p>
                        <a
                            href="https://t.me/endaeyesusgbigubae"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors bg-[#1C1C1F] px-4 py-2 rounded-full border border-[#2a2a2d] text-sm font-medium mt-4"
                        >
                            <Send className="w-4 h-4 text-[#D4AF37]" />
                            Join our Telegram Channel
                        </a>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h3 className="text-[#F5F5F5] font-bold mb-4">Fellowship</h3>
                        <ul className="space-y-3 text-sm text-[#F5F5F5]/60">
                            <li><Link href="/register" className="hover:text-[#D4AF37] transition-colors">Become a Member</Link></li>
                            <li><Link href="/login" className="hover:text-[#D4AF37] transition-colors">Member Login</Link></li>
                            <li><span className="cursor-not-allowed opacity-50">Liturgy Schedule</span></li>
                            <li><span className="cursor-not-allowed opacity-50">Choir (Mezmur)</span></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h3 className="text-[#F5F5F5] font-bold mb-4">About</h3>
                        <ul className="space-y-3 text-sm text-[#F5F5F5]/60">
                            <li><span className="cursor-not-allowed opacity-50">Our History</span></li>
                            <li><span className="cursor-not-allowed opacity-50">Executive Committee</span></li>
                            <li><span className="cursor-not-allowed opacity-50">Contact Us</span></li>
                            <li><span className="cursor-not-allowed opacity-50">Support / Donate</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#2a2a2d] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#F5F5F5]/40 text-xs">
                        © {new Date().getFullYear()} እንዳ ኢየሱስ ግቢጉባኤ . All rights reserved.
                    </p>
                    <p className="text-[#D4AF37]/50 text-xs font-serif uppercase tracking-widest">
                        Glory to God
                    </p>
                </div>
            </div>
        </footer>
    );
}
