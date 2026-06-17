import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CrossIcon } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1C1C1F] border-b border-[#ddd8d0] dark:border-[#2a2a2d] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">

                    {/* Logo & Title */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A227] dark:group-hover:bg-[#C9A227] transition-colors">
                            <CrossIcon className="h-5 w-5 text-white dark:text-[#0E0E0F]" />
                        </div>
                        <div>
                            <h1 className="text-[#7A1C1C] dark:text-[#D4AF37] font-bold text-lg leading-tight tracking-wide font-serif group-hover:text-[#C9A227] dark:group-hover:text-[#D4AF37] transition-colors">
                                Enda Eyesus
                            </h1>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] text-[10px] uppercase font-medium tracking-widest">
                                MU Fellowship
                            </p>
                        </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-[#1a1a1a] dark:text-[#F5F5F5] hover:text-[#C9A227] dark:hover:text-[#D4AF37] text-sm font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                        <Button
                            asChild
                            className="bg-[#7A1C1C] hover:bg-[#C9A227] dark:bg-[#D4AF37] dark:hover:bg-[#C9A227] text-white dark:text-[#0E0E0F] font-bold border-none rounded-full px-6 h-10 transition-all hover:scale-105"
                        >
                            <Link href="/register">Join Fellowship</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    );
}