"use client";

import { Building2, Users, BookOpen, Heart, HandHeart, Activity, Calendar, FileText, ShieldCheck, Church, Target, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
            {/* Hero Section */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#C9A227] dark:border-[#D4AF37] shadow-lg">
                <h1 className="text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">የእንዳ ኢየሱስ ግቢ ጉባኤ</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-4">
                    የእንዳ ኢየሱስ ግቢ ጉባኤ በከፍተኛ ትምህርት ተቋማት የሚገኙ የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የሚያግዝ ማዕከላዊ መድረክ ነው። በውስጠ ደንብና በአገልግሎት መዋቅር መሠረት የሚመራ ሲሆን፣ ከሀገረ ስብከቱ በተሰጠው ሥልጣን የአገልግሎት ክፍሎችን በማስተባበር ለአባላት መንፈሳዊ፣ ማህበራዊና አስተዳደራዊ አገልግሎት ይሰጣል።
                </p>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                    ግቢ ጉባኤው በተማሪዎች መንፈሳዊ ሕይወት ውስጥ የማይረሳ ሚና የሚጫወት ሲሆን፣ ከዩኒቨርሲቲ ቆይታ ባሻገር ለቤተ ክርስቲያን አገልግሎት የሚበቁ ትውልዶችን ለማፍራት ያለመ ነው።
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">ተልዕኮ</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                        በግቢ ቆይታቸው ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ ማገዝ፣ ከቤተ ክርስቲያን ትምህርት ጋር የሚስማሙ አገልጋዮችን ማፍራት፣ እንዲሁም በፍቅርና በአንድነት አብረው እንዲሠሩ ማድረግ።
                    </p>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-12 h-12 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-white dark:text-[#0E0E0F]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">ራዕይ</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                        በኦርቶዶክሳዊ እምነት መሠረት የሚመራ፣ ወጣት ተማሪዎች ለቤተ ክርስቲያን አገልግሎት የሚዘጋጁበት፣ በሀገረ ስብከቱ እውቅና ያለው ምሳሌያዊ የግቢ ጉባኤ መሆን።
                    </p>
                </div>
            </div>

            {/* Organizational Structure */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                    <Building2 className="h-6 w-6" /> የድርጅት መዋቅር
                </h2>
                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">
                    በውስጠ ደንቡ መሠረት ግቢ ጉባኤው የሚከተሉት የበላይ አካላት አሉት፦
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">ጠቅላላ ጉባኤ</h3>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">ከፍተኛ የውሳኔ አካል። የሥራ አስፈጻሚ አባላትን ይመርጣል፣ ዓመታዊ ዕቅድና በጀትን ያጸድቃል፣ የሪፖርት ግምገማ ያካሂዳል።</p>
                    </div>
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የሥራ አስፈጻሚ ጉባኤ</h3>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">የዕለት ተዕለት ውሳኔ ሰጪና አስፈጻሚ አካል። በየ15 ቀን ይሰበሰባል፣ የክፍሎችን ሥራ ይቆጣጠራል።</p>
                    </div>
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">ጽሕፈት ቤት</h3>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">ሰብሳቢ፣ ምክትል ሰብሳቢና ጸሐፊ ያካትታል። ዕለታዊ እንቅስቃሴን ይመራል፣ ገቢ ደብዳቤዎችን ያስተናግዳል።</p>
                    </div>
                </div>
            </div>

            {/* Service Departments */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] flex items-center gap-2">
                        <Users className="h-6 w-6" /> የአገልግሎት ክፍሎች
                    </h2>
                    <Link href="/about/service-classes" className="text-sm text-[#C9A227] dark:text-[#D4AF37] hover:underline">
                        ሙሉ ዝርዝር →
                    </Link>
                </div>
                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">
                    ግቢ ጉባኤው በውስጠ ደንቡ መሠረት 7 ዋና ዋና የአገልግሎት ክፍሎችን እንዲሁም ደግሞ ረዳት ክፍሎችን ያካትታል። እያንዳንዱ ክፍል በተጠሪ (ኃላፊ) የሚመራ ሲሆን በሥራ አስፈጻሚ ጉባኤ የሚቆጣጠር ነው።
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        { name: "ትምህርት ክፍል", icon: BookOpen, desc: "የትምህርት መርሐግብሮችን ማስተባበር፣ መምህራን መምደብ፣ የኮርስ ይዘት መገምገም።" },
                        { name: "መዝሙር ክፍል", icon: Heart, desc: "የቤተ ክርስቲያን መዝሙራትን ማስተማር፣ ሥነ-ጥበባትን ማደራጀት።" },
                        { name: "አባላት ጉዳይ ክፍል", icon: Users, desc: "አባላትን መመዝገብ፣ ወደ ክፍሎች መምደብ፣ የምክር አገልግሎት መስጠት።" },
                        { name: "ልማት ክፍል", icon: HandHeart, desc: "ገቢ ማስገኛ መርሐግብሮችን ማቀድ፣ ህትመትና ስርጭት።" },
                        { name: "ሒሳብና ንብረት ክፍል", icon: Building2, desc: "ገንዘብና ንብረት ማስተዳደር፣ ወጪ ገቢን መዝገብ።" },
                        { name: "ሞያና በጎ አድራጎት ክፍል", icon: Activity, desc: "የሥልጠና እድሎች፣ ለችግረኞች ድጋፍ።" },
                        { name: "የባች ማስተባበሪያ ክፍል", icon: Calendar, desc: "ተማሪዎችን በዲፓርትመንት ማደራጀት፣ መርሐግብሮችን ማስተባበር።" },
                        { name: "ሳንሱርና መርሐ ግብር ዝግጅት ክፍል", icon: FileText, desc: "የትምህርትና ጥበብ ሥራዎችን ከቤተ ክርስቲያን ትምህርት ጋር ማጣራት።" },
                        { name: "ኦዲትና ኢንስፔክሽን ክፍል", icon: ShieldCheck, desc: "የሒሳብና አገልግሎት ቁጥጥር፣ ለጠቅላላ ጉባኤ ሪፖርት ማድረግ።" }
                    ].map((dept) => (
                        <div key={dept.name} className="flex items-start gap-2 p-3 bg-[#F8F5F0] dark:bg-[#252529] rounded-lg">
                            <dept.icon className="h-4 w-4 text-[#C9A227] dark:text-[#D4AF37] mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-xs text-[#1a1a1a] dark:text-[#F5F5F5]">{dept.name}</h3>
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">{dept.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Member Rights & Responsibilities */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6" /> የአባልነት መብትና ግዴታ
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#C9A227]" /> መብቶች
                        </h3>
                        <ul className="space-y-2 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] list-disc list-inside">
                            <li>በግቢ ጉባኤው የሚሰጡ ትምህርቶች፣ ዝማሬዎች፣ የንስሐ አባት አገልግሎት የማግኘት</li>
                            <li>በተሰጥኦው መሠረት በአገልግሎት ክፍሎች የመሳተፍ</li>
                            <li>ችግር ሲያጋጥም የምክርና መንፈሳዊ ድጋፍ የማግኘት</li>
                            <li>ጋብቻ በሚፈጽም ጊዜ የምኞት መልእክትና መንፈሳዊ ስጦታ የማግኘት</li>
                            <li>የአባሉ የ1ኛ ደረጃ ቤተሰብ ሲሞት የመጽናናት አገልግሎት የማግኘት</li>
                            <li>የግቢ ጉባኤውን መጽሔትና መረጃዎች የማግኘት (ለተመራቂዎችም በሁኔታ)</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-[#C9A227]" /> ግዴታዎች
                        </h3>
                        <ul className="space-y-2 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] list-disc list-inside">
                            <li>ውስጠ ደንቡንና ሥርዓቱን ማክበር</li>
                            <li>መደበኛ ትምህርቶችንና ስብሰባዎችን በአግባቡ መከታተል</li>
                            <li>ወርሃዊ መዋጮንና የጋራ ውሳኔዎችን በታማኝነት መፈጸም</li>
                            <li>የተመደበለትን የሥራ ኃላፊነት መወጣት</li>
                            <li>የምስጢር ውይይቶችን አለማጋለጥ</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Educational Phases (Gubae) */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6" /> የትምህርት እርከኖች (ጉባኤ)
                </h2>
                <div className="space-y-4">
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37]">ጉባኤ አበው (Gubae Abew) – ደረጃ 1</h3>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">የቤተ ክርስቲያን ታሪክ፣ ትውፊት፣ ሥርዓተ ቅዳሴና መሠረታዊ ትምህርቶች የሚሰጡበት ኮርስ። ይህን ማጠናቀቅ ለአባልነት ቅድመ መስፈርት ነው።</p>
                    </div>
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37]">ጉባኤ ሐዋርያት (Gubae Hawaryat) – ደረጃ 2</h3>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">የማስተማር ሥልጠና፣ ዶግማቲክ ትምህርቶች፣ የውይይት ክህሎቶች። ይህን ካጠናቀቁ በንዑስ ክፍል መሪነት ማገልገል ይችላሉ።</p>
                    </div>
                    <div className="p-4 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl">
                        <h3 className="font-bold text-[#7A1C1C] dark:text-[#D4AF37]">ጉባኤ ኤክሌስያ (Gubae Ecclesiae) – ደረጃ 3</h3>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">የሥርዓተ ቤተ ክርስቲያን ጥልቅ ትምህርቶች፣ የመሪነት ክህሎቶች፣ የትምህርት ጽሑፎች ዝግጅት። ይህን ያጠናቀቁ ለከፍተኛ አመራር ይበቃሉ።</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 text-center border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="text-2xl font-bold text-[#C9A227]">9+</div>
                    <div className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">የአገልግሎት ክፍሎች</div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 text-center border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="text-2xl font-bold text-[#C9A227]">3</div>
                    <div className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">የትምህርት ደረጃዎች</div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 text-center border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="text-2xl font-bold text-[#C9A227]">500+</div>
                    <div className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">ንቁ አባላት</div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 text-center border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="text-2xl font-bold text-[#C9A227]">10+</div>
                    <div className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">ዓመታት አገልግሎት</div>
                </div>
            </div>

            {/* Note */}
            <div className="text-center text-xs text-[#6b6b6b] dark:text-[#B0B0B0] border-t border-[#ddd8d0] dark:border-[#2a2a2d] pt-6">
                ከእንዳ ኢየሱስ ግቢ ጉባኤ ውስጠ ደንብና የአገልግሎት መዋቅር መመሪያ የተወሰደ
            </div>
        </div>
    );
}