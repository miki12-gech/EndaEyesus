"use client";

import { useState } from "react";
import { Building2, Users, BookOpen, Heart, HandHeart, Activity, Calendar, FileText, ShieldCheck, Church, Target, Award, Globe, ChevronDown, Info, FileCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "ጠቅላላ", icon: Info },
        { id: "service", label: "የአገልግሎት ክፍሎች", icon: Users },
        { id: "law", label: "የውስጠ ደንብ", icon: FileCheck },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 px-4 py-6">
            {/* Header */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#C9A227] dark:border-[#D4AF37] shadow-lg">
                <h1 className="text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የእንዳ ኢየሱስ ግቢ ጉባኤ</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0]">የውስጠ ደንብና የአሠራር መመሪያ</p>
            </div>

            {/* Tab Selector */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] p-2">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                activeTab === tab.id
                                    ? "bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F]"
                                    : "text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"
                            }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] p-6">
                {activeTab === "general" && (
                    <div className="space-y-6">
                        {/* Introduction */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                                <Church className="h-6 w-6" /> መግቢያ
                            </h2>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-4">
                                የቤተ ክርስቲያናችን ተስፋ የሆኑት የከፍተኛ ትምህርት ተቋማት ተማሪዎች በግቢ ቆይታቸው መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የግቢ ጉባኤያት ሚና የጎላ ነው። በእንዳ ኢየሱስ ግቢ ጉባኤ የሚከናወኑ ማናቸውም መንፈሳዊ፣ ማኅበራዊና አስተዳደራዊ አገልግሎቶች ወጥ በሆነ መንገድ ይመሩ ዘንድ ይህ የውስጠ ደንብ ተዘጋጅቷል። ይህ መመሪያ የግቢ ጉባኤውን ነባራዊ ሁኔታት ባገናዘበ መልኩ የተመቻቸና የአገልግሎት ጥራትን ለማረጋገጥ ያለመ ነው።
                            </p>
                        </div>

                        {/* What is Enda Eyesus Gbi Gube */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">የእንዳ ኢየሱስ ግቢ ጉባኤ ምንድነት ነው?</h3>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                የእንዳ ኢየሱስ ግቢ ጉባኤ በከፍተኛ ትምህርት ተቋማት የሚገኙ የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የሚያግዝ ማዕከላዊ መድረክ ነው።
                            </p>
                        </div>

                        {/* Where and When */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                                <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                                    <Globe className="h-5 w-5" /> የትኛው ቦታ ነው?
                                </h3>
                                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                    በከፍተኛ ትምህርት ተቋማት ውስጥ በሀገረ ስብከቱ እውቅና የተሰጠው የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ አገልግሎትን ለማገኘት
                                </p>
                            </div>
                            <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                                <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                                    <Calendar className="h-5 w-5" /> መቼ ተጀመረ?
                                </h3>
                                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                    በከፍተኛ ትምህርት ተቋማት ውስጥ የሚገኙ ተማሪዎች መንፈሳዊ አገልግሎትን ለማገኘት በሀገረ ስብከቱ እውቅና ተጀምሯል
                                </p>
                            </div>
                        </div>

                        {/* Administrator */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                                <Users className="h-5 w-5" /> አስተዳዳሪ ማን ነው?
                            </h3>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                በሀገረ ስብከቱ በተሰጠው ሥልጣን እና በውስጠ ደንቡ መሠረት የሚመራ ሲሆን፣ የሥራ አስፈጻሚ ጉባኤ በአስተዳደር ኃላፊነት ይሠራል
                            </p>
                        </div>

                        {/* Vision and Objectives */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                                <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                                    <Target className="h-5 w-5" /> ራዕይ
                                </h3>
                                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                    በኦርቶዶክሳዊ እምነት መሠረት የሚመራ፣ ወጣት ተማሪዎች ለቤተ ክርስቲያን አገልግሎት የሚዘጋጁበት፣ በሀገረ ስብከቱ እውቅና ያለው ምሳሌያዊ የግቢ ጉባኤ መሆን
                                </p>
                            </div>
                            <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                                <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
                                    <Award className="h-5 w-5" /> አላማዎች
                                </h3>
                                <ul className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed list-disc list-inside space-y-2">
                                    <li>በግቢ ቆይታቸው ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ ማገዝ</li>
                                    <li>ከቤተ ክርስቲያን ትምህርት ጋር የሚስማሙ አገልጋዮችን ማፍራት</li>
                                    <li>በፍቅርና በአንድነት አብረው እንዲሠሩ ማድረግ</li>
                                </ul>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5" /> የአገልግሎት ዝርዝር ጥቅሎች
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-[#C9A227] mb-2">9+</div>
                                    <div className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">የአገልግሎት ክፍሎች</div>
                                </div>
                                <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-[#C9A227] mb-2">3</div>
                                    <div className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">የትምህርት ደረጃዎች</div>
                                </div>
                                <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-[#C9A227] mb-2">500+</div>
                                    <div className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">ንቁ አባላት</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "service" && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                            <Users className="h-6 w-6" /> የአገልግሎት ክፍሎች ተግባርና ኃላፊነት መመሪያ
                        </h2>
                        
                        <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mb-6">
                            « እያንዳንዳችሁ የጸጋን ስጦታ እንደ ተቀበላችሁ መጠን በዚያው ጸጋ እርስ በርሳችሁ አገልሉ » ( ፩ኛ የጴጥሮስ መልእክት ፬፥፲ )
                        </div>

                        {/* Table of Contents */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">የርዕስ ማውጫ</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                                <ul className="space-y-1">
                                    <li>• ፩. የበላይ አካላት ተግባርና ኃላፊነት</li>
                                    <li>• ፪. የትምህርትና ሐዋርያዊ አገልግሎት ዘርፍ</li>
                                    <li>• ፫. የመዝሙርና ሥነ-ጥበባት አገልግሎት ዘርፍ</li>
                                    <li>• ፬. የልማት አገልግሎት ዘርፍ</li>
                                    <li>• ፭. የሒሳብና ንብረት ክፍል</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• ፮. የአባላት ጉዳይ አገልግሎት ዘርፍ</li>
                                    <li>• ፯. የባች/ዲፓርትመንት ማስተባበሪያ ዘርፍ</li>
                                    <li>• ፰. የሞያና በጎ አድራጎት አገልግሎት ዘርፍ</li>
                                    <li>• ፱. የሥልጠና ክፍል</li>
                                    <li>• ፲. የኦዲትና ኢንስፔክሽን ዘርፍ</li>
                                </ul>
                            </div>
                        </div>

                        {/* Introduction to Service Guide */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">መግቢያ (Introduction)</h3>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                ቤተ ክርስቲያናችን ጥንትም ቢሆን የሥርዓትና የሕግ መሠረት ናት። በተለይም በከፍተኛ ትምህርት ተቋማት የሚገኘው የነገይቷ ቤተ ክርስቲያን ተስፋ የሆነው ወጣት ተማሪ፣ መንፈሳዊ አገልግሎቱን በተቀናጀና ሥርዓት ባለው መልኩ እንዲወጣ የአገልግሎት ክፍሎችን ሚና መለየት ወሳኝ ነው። ይህ የእንዳ ኢየሱስ ግቢ ጉባኤ የአገልግሎት መዋቅርና የስራ መመርያ ፤ በእንዳ ኢየሱስ ግቢ ጉባኤ ሥር የሚገኙ የአገልግሎት ክፍሎች፣ ንዑሳን ክፍሎችና አመራሮች የተጣለባቸውን አደራ በታማኝነትና በዕውቀት ይወጡ ዘንድ የተዘጋጀ ነው። መመሪያው እያንዳንዱ አገልጋይ የራሱን ድርሻ አውቆ፣ ከሌሎች ክፍሎች ጋር በቅንጅትና በፍቅር እንዲሠራ፣ የአሠራር ግልጽነት እንዲሰፍንና ተጠያቂነት እንዲኖር ያስችላል።
                            </p>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed mt-3">
                                በዚህ ሰነድ ውስጥ ከጠቅላላ ጉባኤ እስከ ንዑሳን ክፍሎች ድረስ ያሉት የአወቃቀር እርከኖች በዝርዝር ተቀምጠዋል። ይህም አባላት እንደ ጸጋቸውና እንደ ተሰጥኦአቸው የሚሳተፉበት ሰፊ ሜዳ ከመፍጠሩም በላይ፣ የግቢ ጉባኤው አስተዳደራዊ ጉዞ በመርህና በሥርዓት እንዲመራ ያደርጋል።
                            </p>
                        </div>

                        {/* Executive Members */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">የሥራ አስፈጻሚ አባላት ዝርዝር የሥራ መግለጫ</h3>
                            <div className="space-y-4 text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                <div>
                                    <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37]">፩ የግቢ ጉባኤ ጠቅላላ ጉባኤ ተግባርና ሓላፊነት</h4>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li>፩፥ የሥራ አስፈጻሚ ጉባኤ አባላትን እና የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል ሓላፊን የሀገረ ስብከት ተወካዮች ባልቡት ይመርጣል፡</li>
                                        <li>፪፥ የግቢ ጉባኤውን አጠቃላይ የሥራ ሂደት ይገመግማል፡</li>
                                        <li>፫፥ በሥራ አስፈጻሚ ጉባኤውና በኦዲትና ኢንስፔክሽን አገልግሎት የቀረበለትን ሪፖርት እንዲሁም እቅድና በጀት መርምሮ ያጸድቃል፡</li>
                                        <li>፬፥ ቢያንስ በዓመት አንድ ጊዜ ይሰበሰባል፡፡</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37]">፪ የሥራ አስፈጻሚ ጉባኤ ተግባርና ሓላፊነት</h4>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li>፩፥ የዩንቨርሲቲው ተማሪዎች ግቢ ጉባኤው በሚያዘጋጃቸው መንፈሳዊ መርሐ ግብሮች እንዲማሩና የሚጠበቅባቸውን መንፈሳዊ አገልግሎት እንዲፈጽሙ ያደርጋል::</li>
                                        <li>፪፥ በግቢ ጉባኤው የሚገኙ አባላት በገንዘባቸው፣ በዕውቀታቸውና በሙያቸው ቤተ ክርስቲያናቸውን እንዲያገለግሉ ሁኔታዎችን ያመቻቻል፡፡</li>
                                        <li>፫፥ በግቢ ጉባኤው ደንብ መሠረት አባላት ይመዘግባል።</li>
                                        <li>፬፥ ከሀገረ ስብከቱ የሚመደበለትን እና የግቢ ጉባኤውን ገንዘብና ንብረት በአግባቡ ይጠቀማል።</li>
                                        <li>፭፥ የግቢ ጉባኤው አባላት በአገልግሎት የሚሳተፉበትን ሁኔታዎች ያመቻቻል።</li>
                                        <li>፮፥ የግቢ ጉባኤውን የሥራ ዕቅድ ያዘጋጃል፣ ለግቢ ጉባኤው ጠቅላላ ጉባኤ አቅርቦ ከተወያየ በኋላ ለሀገረ ስብከቱ እንዲጸድቅለት ይልካል፣ ሲጸድቅ ተግባራዊ ያደርጋል፡፡</li>
                                        <li>፯፥ በየሦስት ወሩ ስለሥራው አጠቃላይ እንቅስቃሴ ሪፖርት ለሀገረ ስብከቱ ያቀርባል::</li>
                                        <li>፰፥ ቢያንስ በአሥራ አምስት ቀን አንድ ጊዜ ስብሰባ ያደርጋል</li>
                                        <li>፱፥ በፍዩ ልዩ ምክንያት የተጓደለ የሥራ አስፈጻሚ ጉባኤ አባላትን ይተካል ይህንንም ለሀገረ ስብከቱ ያሳውቃል::</li>
                                        <li>፲. በመመርያው መሰረት የክፍላት መቃቅርን ያደራጃል ። በዚህ መመርያ ያልተጠቀሰ ነገር ግን ለክፍሉ ስራ ሐላፊነት አፈጻሸም ላይ ያግዛል ተብሎ የታመነበት አዲስ ንዑስ ክፍል ሊያቋቁም ይችላል።</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Service Departments Overview */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">የአገልግሎት ክፍሎች አጠቃላይ ክፍሎች</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { name: "ትምህርት ክፍል", icon: BookOpen },
                                    { name: "መዝሙር ክፍል", icon: Heart },
                                    { name: "አባላት ጉዳይ ክፍል", icon: Users },
                                    { name: "ልማት ክፍል", icon: HandHeart },
                                    { name: "ሒሳብና ንብረት ክፍል", icon: Building2 },
                                    { name: "ሞያና በጎ አድራጎት ክፍል", icon: Activity },
                                    { name: "የባች ማስተባበሪያ ክፍል", icon: Calendar },
                                    { name: "ሳንሱርና መርሐ ግብር ዝግጅት ክፍል", icon: FileText },
                                    { name: "ኦዲትና ኢንስፔክሽን ክፍል", icon: ShieldCheck }
                                ].map((dept) => (
                                    <div key={dept.name} className="flex items-center gap-2 p-3 bg-white dark:bg-[#1C1C1F] rounded-lg">
                                        <dept.icon className="h-4 w-4 text-[#C9A227] dark:text-[#D4AF37]" />
                                        <span className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">{dept.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-6">
                            ረድኤተ እግዚአብሔር አይለየን አሜን!
                        </div>
                    </div>
                )}

                {activeTab === "law" && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                            <FileCheck className="h-6 w-6" /> የእንዳ ኢየሱስ ግቢ ጉባኤ
                        </h2>
                        <p className="text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">የውስጠ ደንብና የአሠራር መመሪያ</p>

                        {/* Introduction */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">መግቢያ</h3>
                            <p className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">
                                የቤተ ክርስቲያናችን ተስፋ የሆኑት የከፍተኛ ትምህርት ተቋማት ተማሪዎች በግቢ ቆይታቸው መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የግቢ ጉባኤያት ሚና የጎላ ነው። በእንዳ ኢየሱስ ግቢ ጉባኤ የሚከናወኑ ማናቸውም መንፈሳዊ፣ ማኅበራዊና አስተዳደራዊ አገልግሎቶች ወጥ በሆነ መንገድ ይመሩ ዘንድ ይህ የውስጠ ደንብ ተዘጋጅቷል። ይህ መመሪያ የግቢ ጉባኤውን ነባራዊ ሁኔታት ባገናዘበ መልኩ የተመቻቸና የአገልግሎት ጥራትን ለማረጋገጥ ያለመ ነው።
                            </p>
                        </div>

                        {/* Structure */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አንድ</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">መዋቅርና አመራር</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 1፦</strong> ተዋረድና የውሳኔ አሰጣጥ</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 1.1. ጠቅላላ ጉባኤ፦ የግቢ ጉባኤው ከፍተኛ አካል ነው። የሥራ አስፈጻሚ አባላትን ይመርጣል፣ ዓመታዊ ዕቅድና በጀትን ያጸድቃል።</li>
                                    <li>• 1.2. የሥራ አስፈጻሚ ጉባኤ፦ የግቢ ጉባኤው የዕለት ተዕለት ውሳኔ ሰጪና አስፈጻሚ አካል ነው።</li>
                                    <li>• 1.3. የአገልግሎት ክፍሎች፦ በጽሕፈት ቤቱ የሚመሩ 7 የተለዩ ዘርፎችን የያዙ የአገልግሎት ማዕከላት ናቸው።</li>
                                </ul>
                            </div>
                        </div>

                        {/* Executive Assembly */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ሁለት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የስራ አስፈጻሚ ጉባኤና አወቃቀርና የስራ ሐላፊነት</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 2፦</strong> የስራ አስፈጻሚ አወቃቀር</p>
                                <p>2.1. የግቢ ጉባኤው ስራ አስፈጻሚ ጉባኤ የሚከተሉት የጽሕፈት ቤት አባላት እና 7 የአገልግሎት ክፍሎች ያካትታል።</p>
                                <div className="grid md:grid-cols-3 gap-2 mt-3 text-sm">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>• ሰብሳቢ</li>
                                        <li>• ምክትል ሰብሳቢ</li>
                                        <li>• ጸሐፊ</li>
                                        <li>• ትምህርት ክፍል</li>
                                    </ul>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>• መዝሙር ክፍል</li>
                                        <li>• አባላት ጉዳይ ክፍል</li>
                                        <li>• ልማት ክፍል</li>
                                        <li>• ሒሳብና ንብረት ክፍል</li>
                                    </ul>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>• ሞያና አገልግሎት ክፍል</li>
                                        <li>• የባች ማስተባበሪያ ክፍል</li>
                                        <li>• ሳንሱርና መርሐ ግብር ዝግጅት ክፍል</li>
                                        <li>• ኦዲትና ኢንስፔክሽን ክፍል</li>
                                    </ul>
                                </div>
                                <p className="mt-3">2.2. እያንዳንዱ የአገልግሎት ክፍል ከክፍሉ ተጠሪ በተጨማሪ በሥራ አስፈጻሚው በሚጸድቁ አንድ ጸሐፊና እንደ አስፈላጊነቱ የንዑሳን ክፍሎች ተጠሪዎች ይመራል።</p>
                            </div>
                        </div>

                        {/* Membership */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አራት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የአባልነት ምዝገባ፣ መብትና ግዴታ</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 7፦</strong> የአባልነት ምዝገባና ቅድመ ሁኔታ</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 7.1. ማንኛውም በዩኒቨርሲው የተመደበ የኦርቶዶክስ ተዋሕዶ እምነት ተከታይ ተማሪ (ተማሪ ያልሆነ አይቻልም) ጉባኤ አበው በአግባቡ ተከታትሎ ሲመረቅ የአባላት ጉዳይ ክፍል የሚያዘጋጀውን ቅጽ በመሙላት አባል መሆን ይችላል።</li>
                                    <li>• 7.2. አዲስ አባል ስለ ግቢ ጉባኤው ዓላማ፣ ሥርዓትና መመሪያ አጭር ገለጻ ይሰጣቸዋል።</li>
                                </ul>
                                <p className="mt-3"><strong>አንቀጽ 8፦</strong> የአባላት መብትና ግዴታ</p>
                                <div className="grid md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <p className="font-semibold">8.1. መብት</p>
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            <li>• በግቢ ጉባኤው የሚሰጡ አገልግሎቶች የማግኘት (ትምህርት፣ ዝማሬ፣ ንስሐ አባት፣ ስልጠናዎች...)</li>
                                            <li>• እንደ ተሰጥኦውና እንደ ዝግጅቱ፣ በግቢ ጉባኤው ሕግና ደንብ መሰረት በአገልግሎት ዘርፎች የመሳተፍ።</li>
                                            <li>• ችግር ሲገጥመው ከግቢ ጉባኤው የማማከርና መንፈሳዊ ድጋፍ የማግኘት።</li>
                                            <li>• በግቢ ቆይታው በቤተ ክርስቲያን ስርዓት ጋብቻን ቢፈጽም የእንኳን ደስ አለህ/ሽ መልእክትና መንፈሳዊ ስጦታን ይበረከትለታል።</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-semibold">8.2. ግዴታ</p>
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            <li>• የግቢ ጉባኤውን ውስጠ ደንብና ሥርዓት ማክበር።</li>
                                            <li>• መደበኛ ትምህርቶችንና ስብሰባዎችን በአግባቡ መከታተል።</li>
                                            <li>• ወርሃዊ መዋጮንና ሌሎች የጋራ ውሳኔዎችን በታማኝነት መፈጸም።</li>
                                            <li>• የተመደበለትን የስራ ሐላፊነት መወጣት።</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service Requirements */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አምስት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የአገልግሎት እርከኖችና የሥልጠና መስፈርቶች</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p>ይህ ክፍል እንደ መድረክ መሪነትና መምህርነት ያሉ አገልግሎቶችን ለመስጠት የሚያስፈልጉ የትምህርት ደረጃዎችን ይወስናል።</p>
                                <p><strong>አንቀጽ 9፦</strong> የአገልግሎት ፈቃድና ገደቦች</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 9.1. ጠቅላላ አገልግሎት፦ ማንኛውም የ"ጉባኤ አበው" ትምህርትን ያጠናቀቀ አባል በሁሉም ክፍላት በአባልነት ማገልገል ይችላል።</li>
                                    <li>• 9.2. ልዩ የአገልግሎት ገደቦች፦ የሚከተሉት አገልግሎቶች "ጉባኤ አበው" ከማጠናቀቅ በተጨማሪ የትምህርት ዝግጅት ይጠይቃሉ፦</li>
                                </ul>
                            </div>
                        </div>

                        {/* Administration Election */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ስድስት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የአስተዳደር ምርጫ ፖሊሲ</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 10፦</strong> የአመራር ምርጫ መስፈርቶና ሂደት</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 10.1. ምርጫ አስተባባሪ አካል፦ የሀገረ ስብከቱ ተወካዮች፣ የግቢ ጉባኤው ሰብሳቢ እና ኦዲትና ኢንስፔክሽን ክፍል ሐላፊ ያካተተ ሲሆን ዕጩዎችን ከስራ አስፈጻሚው በመቀበል የማጣራትና የመገምገም እንዲሁም የምርጫውን ፕሮግራም የመምራት ኃላፊነት ይኖረዋል።</li>
                                    <li>• 10.2. ለዕጩነት የሚያበቁ መስፈርቶች</li>
                                </ul>
                            </div>
                        </div>

                        {/* Conduct */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ሰባት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የአባላት ሥነ-ምግባርና ዲሲፕሊን</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 11፦</strong> የጥፋት ደረጃዎችና የቅጣት እርምጃዎች</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 11.1. ቀላል ጥፋቶች፦ ያለበቂ ምክንያ ከመደበኛ ትምህርትና መርሐግብር በተደጋጋሚ መቅረት፣ መዘግየት፣ ወርሃዊ መዋጮ እስከ 3 ወር አለመክፈል እና ሌሎች ቀላል ስሕተቶች።</li>
                                    <li>• 11.2. ከባድ ጥፋቶች፦ በቤተ ክርስቲያን አስተምህሮ ላይ መሳለቅ፣ ስሑት ትምህርት ማስተማር፣ በቡድን ተከፍሎ ግጭት መፍጠር፣ ምስጢር አሳልፎ መስጠት፣ በገንዘብና ንብረት ላይ ታማኝነት ማጣት።</li>
                                </ul>
                            </div>
                        </div>

                        {/* Meetings */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ስምንት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የስብሰባ ሥርዓትና የፋይንስ መመሪያ</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 12፦</strong> የስብሰባ አይነቶች</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 12.1. የሥራ አስፈጻሚ ስብሰባ፦ ቢያንስ በየ15 ቀን አንድ ጊዜ ይካሄዳል። ምላዓተ ጉባኤ የሚሟላው ከግማሽ በላይ አባላት ሲገኑ ነው።</li>
                                    <li>• 12.2. የጠቅላላ ጉባኤ ስብሰባ፦ በዓመት ሁለት ጊዜ (በየሴሚስተሩ) ይካሄዳል።</li>
                                </ul>
                            </div>
                        </div>

                        {/* Finance */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ስምንት</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የፋይንስና የንብረት አያያዝ</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 13፦</strong> የገንዘብ አጠቃም።</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>• 13.1. የገንዘብ አጠቃም፦ ማንኛውም ወጪ በሥራ አስፈጻሚው ታውቆ በቃለ-ጉባኤ ከጸደቆ በኋላ በሰብሳቢውና በሒሳብ ሹሙ ፊርማ ብቻ ወጪ ይሆናል።</li>
                                    <li>• 13.2. ከ1,000 ብር በላይ የሆኑ ክፍያዎች በባንክ ዝውወር ወይም ደግሞ በደረሰኝ እንዲፈጸሙ ይበረታል።</li>
                                    <li>• 13.3. የንብረት ኦዲት፦ የኦዲት ክፍሉ በየሦስት ወሩ መደበኛ የንብረት ምርመራ በማድረግ ለሥራ አስፈጻሚው ሪፖርት ያቀርባል።</li>
                                </ul>
                            </div>
                        </div>

                        {/* Amendments */}
                        <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ዘጠኝ</h3>
                            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">ማጠቃለያ ድንጋጌዎች</h4>
                            <div className="text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed space-y-2">
                                <p><strong>አንቀጽ 14፦</strong> መመሪያውን ስለማሻል</p>
                                <p>14.1. ይህ መመሪያ ሊሻሻል የሚችለው በሥራ አስፈጻሚው ወደ ጠቅላላ ጉባኤው ቀርቦ 2/3ኛ ድምፅ ሲደግፍ ብቻ ነው።</p>
                                <p><strong>አንቀጽ 15፦</strong> መመሪያው የሚጸናበት ጊዜ</p>
                                <p>15.1. ይህ የውስጠ ደንብና የአሠራር መመሪያ ከዛሬ ______ ቀን ______ ዓ.ም ጀምሮ የጸና ይሆናል።</p>
                            </div>
                        </div>

                        <div className="text-center text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-6">
                            ረድኤተ እግዚአብሔር አይለየን አሜን!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}