import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0F]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Title */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-[#1C1C1F] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E4D3A] transition-colors">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <rect x="8.5" y="1" width="3" height="18" rx="1" fill="#D4AF37" />
                                <rect x="2" y="6" width="16" height="3" rx="1" fill="#D4AF37" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-[#D4AF37] font-bold text-lg leading-tight tracking-wide font-serif">
                                Enda Eyesus
                            </h1>
                            <p className="text-[#F5F5F5]/70 text-[10px] uppercase font-medium tracking-widest">
                                MU Fellowship
                            </p>
                        </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-[#F5F5F5]/80 hover:text-[#D4AF37] text-sm font-medium transition-colors">
                            Sign In
                        </Link>
                        <Button asChild className="bg-[#D4AF37] hover:bg-[#C9A227] text-[#0E0E0F] font-bold border-none rounded-full px-6">
                            <Link href="/register">Join Fellowship</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
