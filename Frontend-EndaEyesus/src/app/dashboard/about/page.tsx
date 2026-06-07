"use client";

import { Calendar, Users, BookOpen, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#C9A227] dark:border-[#D4AF37] shadow-lg">
                <h1 className="text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">About Enda Eyesus</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                    Enda Eyesus is a comprehensive church management system designed to facilitate spiritual growth, 
                    community engagement, and administrative efficiency for our fellowship. Our platform provides tools 
                    for members, leaders, and administrators to connect, learn, and serve together.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Calendar className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Events & Announcements</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Stay updated with fellowship events, announcements, and important dates.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Community</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Connect with fellow members, join service classes, and build meaningful relationships.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <BookOpen className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Library & Resources</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Access spiritual and academic resources to support your learning journey.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Spiritual Growth</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Engage in courses, teachings, and spiritual development programs.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">Our Mission</h2>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                    To empower our community through technology, fostering spiritual growth, meaningful connections, 
                    and effective service. We strive to create an environment where every member can thrive, learn, 
                    and contribute to the collective mission of our fellowship.
                </p>
            </div>
        </div>
    );
}
