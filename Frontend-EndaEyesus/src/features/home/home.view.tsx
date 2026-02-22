"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Music, Users, Shield, GraduationCap, Star, ChevronDown } from "lucide-react";
import { ServiceClassFeature, TimelineEvent, Testimonial } from "./home.types";
import { Button } from "@/components/ui/button";

const serviceClasses: ServiceClassFeature[] = [
    { id: "1", title: "Mezmur (Choir)", description: "Praising God through sacred Ethiopian Orthodox hymns and spiritual songs.", icon: Music, color: "#C9A227" },
    { id: "2", title: "Sunday School", description: "Deepening our understanding of the Gospel, Dogma, and Church history.", icon: BookOpen, color: "#0F3D2E" },
    { id: "3", title: "General Assembly", description: "Weekly gatherings for prayer, sermons, and community fellowship.", icon: Users, color: "#7A1C1C" },
    { id: "4", title: "Youth Leadership", description: "Training the next generation of dedicated church servants.", icon: Shield, color: "#D4AF37" },
];

const timelineEvents: TimelineEvent[] = [
    { year: "1986 E.C. (ታሕሳስ 29)", title: "Foundation", description: "The fellowship began with a small group of devoted students meeting in campus dorms." },
    { year: "1998 E.C.", title: "Official Recognition", description: "Granted official recognition by the university and local diocese." },
    { year: "2005 E.C.", title: "First Grand Conference", description: "Hosted over 5,000 students for a three-day spiritual conference." },
    { year: "2015 E.C.", title: "Digital Expansion", description: "Launched our first digital initiatives to connect alumni and current students." },
];

const testimonials: Testimonial[] = [
    { id: "t1", name: "Amanuel Tesfaye", department: "Software Engineering", serviceClass: "Choir Member", quote: "Enda Eyesus has been my spiritual anchor throughout my difficult engineering studies. The hymns give me strength." },
    { id: "t2", name: "Meron Hailu", department: "Medicine", serviceClass: "Sunday School Teacher", quote: "Teaching the youth has taught me more about my faith than I ever imagined. This fellowship is a true family." },
    { id: "t3", name: "Dawit Girma", department: "Law", serviceClass: "General Assembly", quote: "The weekly teachings have shaped my moral compass. I am forever grateful for the brothers and sisters I met here." },
];

export function HomeView() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("opacity-100", "translate-y-0");
                    entry.target.classList.remove("opacity-0", "translate-y-10");
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[#0E0E0F]" />; // Prevent hydration mismatch

    return (
        <div className="bg-[#0E0E0F] text-[#F5F5F5] min-h-screen selection:bg-[#D4AF37] selection:text-[#0E0E0F]">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">

                {/* Sacred Cross Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <svg width="600" height="600" viewBox="0 0 400 400" fill="none">
                        <rect x="180" y="20" width="40" height="360" rx="4" fill="#D4AF37" />
                        <rect x="40" y="120" width="320" height="40" rx="4" fill="#D4AF37" />
                    </svg>
                </div>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                    <div className="text-[#D4AF37] font-serif tracking-[0.3em] uppercase text-sm md:text-base mb-4 animate-pulse">
                        .Mekelle University
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#D4AF37] leading-tight" style={{ fontFamily: "serif" }}>
                        እንዳ ኢየሱስ<br />ግቢ ጉባኤ
                    </h1>

                    <p className="text-lg md:text-xl text-[#F5F5F5]/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Uniting Ethiopian Orthodox university students in faith, service, and academic excellence. A spiritual home away from home.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#C9A227] text-[#0E0E0F] font-bold rounded-full px-8 h-14 text-base w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all hover:transform hover:scale-105">
                            <Link href="/register">Join the Fellowship</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] h-14 rounded-full px-8 w-full sm:w-auto transition-all">
                            <Link href="/login">Member Login</Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="relative h-14 rounded-full px-8 w-full sm:w-auto text-[#D4AF37] overflow-hidden group border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500">
                            <Link href="/history">
                                <span className="relative z-10 flex items-center font-medium tracking-wide">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    View History
                                </span>
                                <div className="absolute inset-0 bg-[#D4AF37]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#D4AF37]/50">
                    <ChevronDown className="w-8 h-8" />
                </div>
            </section>

            {/* 2. INSPIRATION / MANUSCRIPT SECTION */}
            <section className="py-24 bg-[#151516] border-y border-[#2a2a2d]/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                            <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">Our Foundation</h2>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F5F5] leading-snug">
                                Rooted in the ancient faith of the Apostles.
                            </h3>
                            <p className="text-[#F5F5F5]/60 leading-relaxed text-lg">
                                The Enda Eyesus Fellowship is built upon the unspoken foundation of the Ethiopian Orthodox Tewahedo Church. We strive to maintain the spiritual discipline, love, and unity taught by the early church fathers while navigating the modern university landscape.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Maintaining apostolic traditions",
                                    "Fostering spiritual growth and theological education",
                                    "Supporting members academically and socially"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#F5F5F5]/80">
                                        <span className="w-6 h-6 rounded-full bg-[#1E4D3A]/20 text-[#1E4D3A] flex items-center justify-center text-sm font-bold border border-[#1E4D3A]/30 flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                            {/* Abstract Manuscript visual representation */}
                            <div className="absolute inset-0 bg-[#0E0E0F] flex flex-col justify-between p-8">
                                <div className="w-full border-b-2 border-dashed border-[#D4AF37]/30 pb-4">
                                    <div className="w-3/4 h-6 bg-[#D4AF37]/20 rounded-md mb-3" />
                                    <div className="w-1/2 h-4 bg-[#D4AF37]/10 rounded-md" />
                                </div>
                                <div className="flex-1 py-8 flex items-center justify-center opacity-20">
                                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                                        <rect x="90" y="10" width="20" height="180" rx="4" fill="#D4AF37" />
                                        <rect x="20" y="60" width="160" height="20" rx="4" fill="#D4AF37" />
                                    </svg>
                                </div>
                                <div className="w-full border-t-2 border-dashed border-[#D4AF37]/30 pt-4">
                                    <div className="w-full h-4 bg-[#D4AF37]/10 rounded-md mb-2" />
                                    <div className="w-5/6 h-4 bg-[#D4AF37]/10 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICE CLASSES */}
            <section className="py-24 bg-[#0E0E0F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-3">Get Involved</h2>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#F5F5F5] mb-6">Service Classes</h3>
                        <p className="text-[#F5F5F5]/60 text-lg">
                            Find your calling within the church. Our fellowship operates through dedicated service classes, ensuring every member can contribute their unique gifts to the glory of God.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {serviceClasses.map((cls, idx) => (
                            <div
                                key={cls.id}
                                className="bg-[#1C1C1F] rounded-2xl p-6 border border-[#2a2a2d] hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-10"
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: `${cls.color}15` }}>
                                    <cls.icon className="w-7 h-7 transition-colors" style={{ color: cls.color }} />
                                </div>
                                <h4 className="text-xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#D4AF37] transition-colors">{cls.title}</h4>
                                <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{cls.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SPIRITUAL JOURNEY TIMELINE */}
            <section className="py-24 bg-[#151516] border-y border-[#2a2a2d]/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-3">Our History</h2>
                        <h3 className="text-3xl font-serif font-bold text-[#F5F5F5]">The Journey of Faith</h3>
                    </div>

                    <div className="relative border-l-2 border-[#D4AF37]/20 ml-4 md:mx-auto md:w-3/4">
                        {timelineEvents.map((evt, idx) => (
                            <div key={idx} className="mb-12 ml-8 relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: `${idx * 200}ms` }}>
                                <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#151516] border-2 border-[#D4AF37]" />
                                <div className="bg-[#1C1C1F] p-6 rounded-2xl border border-[#2a2a2d] hover:border-[#D4AF37]/30 transition-colors">
                                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest mb-2 block">{evt.year}</span>
                                    <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">{evt.title}</h4>
                                    <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{evt.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-20 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <Button asChild size="lg" className="relative group overflow-hidden bg-transparent hover:bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] h-16 px-10 rounded-full transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                            <Link href="/history" className="flex items-center">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                                <span className="relative font-serif text-lg tracking-wide flex items-center">
                                    <BookOpen className="w-5 h-5 mr-3 text-[#D4AF37]" />
                                    Explore the Sacred Archive
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 5. TESTIMONIALS */}
            <section className="py-24 bg-[#0E0E0F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <h2 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-3">Student Voices</h2>
                        <h3 className="text-3xl font-serif font-bold text-[#F5F5F5]">Testimonies of Grace</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((test, idx) => (
                            <div
                                key={test.id}
                                className="bg-[#1C1C1F] p-8 rounded-2xl border border-[#2a2a2d] relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 hover:border-[#D4AF37]/30"
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <Star className="absolute top-6 right-6 w-8 h-8 text-[#D4AF37]/10" aria-hidden="true" />
                                <p className="text-[#F5F5F5]/80 italic text-sm leading-relaxed mb-6 font-serif tracking-wide">
                                    "{test.quote}"
                                </p>
                                <div className="flex items-center gap-3 border-t border-[#2a2a2d] pt-6">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold text-sm">
                                        {test.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[#F5F5F5] font-bold text-sm">{test.name}</p>
                                        <p className="text-[#F5F5F5]/50 text-xs">{test.department} · {test.serviceClass}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. EMERALD CTA CRESENDO */}
            <section className="relative py-24 overflow-hidden border-t-4 border-[#D4AF37]">
                {/* Deep Emerald Background with gradient */}
                <div className="absolute inset-0 bg-[#1E4D3A] mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F] to-transparent opacity-80" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Ready to Serve?
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of Ethiopian Orthodox students who have found their spiritual family at Mekelle University.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#C9A227] text-[#0E0E0F] font-bold rounded-full px-10 h-14 text-base w-full sm:w-auto shadow-2xl transition-all hover:scale-105">
                            <Link href="/register">Create an Account <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}

// Inline component for the glowing badge
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            {children}
        </span>
    );
}
