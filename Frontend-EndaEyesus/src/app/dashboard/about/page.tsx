"use client";

import { Calendar, Users, BookOpen, Heart, Building2, Target, ShieldCheck, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#C9A227] dark:border-[#D4AF37] shadow-lg">
                <h1 className="text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">About የእንዳ ኢየሱስ ግቢ ጉባኤ</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-4">
                    የእንዳ ኢየሱስ ግቢ ጉባኤ በከፍተኛ ትምህርት ተቋማት የሚገኙ የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የሚሰጠንቀል ድርሻ ያለው የቤተ ክርስቲያናችን ትራ፣ ነው።
                </p>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                    Enda Eyesus Campus Assembly is a comprehensive church management system designed to facilitate spiritual growth, 
                    community engagement, and administrative efficiency for our fellowship. Our platform provides tools 
                    for members, leaders, and administrators to connect, learn, and serve together.
                </p>
            </div>

            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">Our Mission</h2>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-4">
                    በግቢ ቆይታቸው ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የሚሰጠንቀል ድርሻ ያለው የቤተ ክርስቲያናችን ትራ፣ ነው።
                </p>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                    To empower our community through technology, fostering spiritual growth, meaningful connections, 
                    and effective service. We strive to create an environment where every member can thrive, learn, 
                    and contribute to the collective mission of our fellowship.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Building2 className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Organizational Structure</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Led by the General Assembly, Executive Committee, and Secretariat with 7 service departments working together.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Educational Phases</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Three progressive phases: Gubae Abew, Gubae Hawaryat, and Gubae Ecclesiae for spiritual development.
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
                        <ShieldCheck className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Governance</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        Operates under established bylaws with clear rights, responsibilities, and disciplinary procedures.
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
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">Service Departments</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Education Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Coordinates educational programs and teachings</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Music & Arts Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Manages hymns, liturgy, and artistic expressions</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Development Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Oversees development projects and income generation</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Finance & Property Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Manages financial operations and property</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Member Affairs Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Handles membership, counseling, and member support</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Vocational Service Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Provides vocational training and charity services</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Training Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Conducts skill development and training programs</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A227] dark:bg-[#D4AF37] mt-2 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Audit & Inspection Department</h3>
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Ensures compliance and conducts audits</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">Member Rights & Responsibilities</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2 flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                            Rights
                        </h3>
                        <ul className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] space-y-1 list-disc list-inside">
                            <li>Access to spiritual services (teachings, prayers, sacraments)</li>
                            <li>Participation in service departments based on calling</li>
                            <li>Spiritual counseling and support during difficulties</li>
                            <li>Wedding blessings and spiritual gifts upon marriage</li>
                            <li>Consolation service for immediate family members</li>
                            <li>Access to newsletters when needed</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                            Responsibilities
                        </h3>
                        <ul className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] space-y-1 list-disc list-inside">
                            <li>Respect the bylaws and system of the campus assembly</li>
                            <li>Regularly attend teachings and meetings</li>
                            <li>Faithfully fulfill monthly payments and collective decisions</li>
                            <li>Fulfill assigned work responsibilities</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
