"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  BookOpen,
  Heart,
  HandHeart,
  Building2,
  Activity,
  Calendar,
  FileText,
  ShieldCheck,
  Church,
  Target,
  Award,
  Globe,
  ChevronDown,
  Info,
  FileCheck,
  Menu,
  X,
  GraduationCap,
  Music,
  UserCheck,
  DollarSign,
  Briefcase,
  Filter,
  Eye,
  Mic,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// General Tab Content (same as original, but enhanced layout)
// ─────────────────────────────────────────────────────────────────────────────
function GeneralTab() {
  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-white to-amber-50 dark:from-[#1C1C1F] dark:to-[#252529] rounded-2xl p-6 shadow-md border border-amber-100 dark:border-[#2a2a2d]">
        <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
          <Church className="h-6 w-6" /> መግቢያ
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          የቤተ ክርስቲያናችን ተስፋ የሆኑት የከፍተኛ ትምህርት ተቋማት ተማሪዎች በግቢ ቆይታቸው መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የግቢ ጉባኤያት ሚና የጎላ ነው። በእንዳ ኢየሱስ ግቢ ጉባኤ የሚከናወኑ ማናቸውም መንፈሳዊ፣ ማኅበራዊና አስተዳደራዊ አገልግሎቶች ወጥ በሆነ መንገድ ይመሩ ዘንድ ይህ የውስጠ ደንብ ተዘጋጅቷል። ይህ መመሪያ የግቢ ጉባኤውን ነባራዊ ሁኔታ ባገናዘበ መልኩ የተመቻቸና የአገልግሎት ጥራትን ለማረጋገጥ ያለመ ነው።
        </p>
      </div>

      {/* What is Enda Eyesus */}
      <div className="group bg-gradient-to-br from-[#7A1C1C]/5 to-[#C9A227]/5 dark:from-[#D4AF37]/10 dark:to-[#7A1C1C]/10 rounded-2xl p-8 border border-[#C9A227]/30 dark:border-[#D4AF37]/30 hover:shadow-xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4 flex items-center gap-3">
          <span className="p-3 bg-[#7A1C1C]/10 dark:bg-[#D4AF37]/10 rounded-xl">
            <Church className="h-6 w-6 text-[#7A1C1C] dark:text-[#D4AF37]" />
          </span>
          የእንዳ ኢየሱስ ግቢ ጉባኤ ምንድነት ነው?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          የእንዳ ኢየሱስ ግቢ ጉባኤ በከፍተኛ ትምህርት ተቋማት የሚገኙ የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የሚያግዝ ማዕከላዊ መድረክ ነው።
        </p>
      </div>

      {/* Where and When Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all">
          <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5" /> የትኛው ቦታ ነው?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">በከፍተኛ ትምህርት ተቋማት ውስጥ በሀገረ ስብከቱ እውቅና በተሰጠው የኦርቶዶክስ ተዋሕዶ እምነት ተከታዮች ተማሪዎች መንፈሳዊ አገልግሎትን ለማገኘት የሚመደብበት ቦታ ነው።</p>
        </div>
        <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all">
          <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5" /> መቼ ተጀመረ?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">በከፍተኛ ትምህርት ተቋማት ውስጥ የሚገኙ ተማሪዎች መንፈሳዊ አገልግሎትን ለማገኘት በሀገረ ስብከቱ እውቅና ተጀምሯል። ከተማሪዎች ትውልድ ጋር በተያያዘ የሚለዋወጥ ሲሆን መንፈሳዊ ትምህርትና አገልግሎት በቀጣይነት እየተሰጠ ይገኛል።</p>
        </div>
      </div>

      {/* Administrator */}
      <div className="bg-linear-to-br from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-900/30 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
          <Users className="h-5 w-5" /> አስተዳዳሪ ማን ነው?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">በሀገረ ስብከቱ በተሰጠው ሥልጣን እና በውስጠ ደንቡ መሠረት የሚመራ ሲሆን፣ የሥራ አስፈጻሚ ጉባኤ (ሰብሳቢ፣ ምክትል ሰብሳቢ፣ ጸሐፊ እና የአገልግሎት ክፍሎች ኃላፊዎች) በአስተዳደር ኃላፊነት ይሠራል። ከፍተኛ ቁጥጥር ደግሞ በሀገረ ስብከቱ ተወካዮች ይደረጋል።</p>
      </div>

      {/* Vision and Objectives Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" /> ራዕይ
          </h3>
          <p className="text-gray-700 dark:text-gray-300">በኦርቶዶክሳዊ እምነት መሠረት የሚመራ፣ ወጣት ተማሪዎች ለቤተ ክርስቲያን አገልግሎት የሚዘጋጁበት፣ በሀገረ ስብከቱ እውቅና ያለው ምሳሌያዊ የግቢ ጉባኤ መሆን።</p>
        </div>
        <div className="bg-linear-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3 flex items-center gap-2">
            <Award className="h-5 w-5" /> አላማዎች
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>በግቢ ቆይታቸው ተማሪዎች መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ ማገዝ</li>
            <li>ከቤተ ክርስቲያን ትምህርት ጋር የሚስማሙ አገልጋዮችን ማፍራት</li>
            <li>በፍቅርና በአንድነት አብረው እንዲሠሩ ማድረግ</li>
            <li>የቤተ ክርስቲያን ትውፊትና ዶግማ እንዲጠበቅ ማድረግ</li>
          </ul>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Service Tab with Sidebar Navigation (preserves all content)
// ─────────────────────────────────────────────────────────────────────────────
// This array defines the sections for the sidebar. Each corresponds to an ID in the main content.
const serviceSections = [
  { id: "general-assembly", title: "ጠቅላላ ጉባኤ", icon: Users, content: null }, // content will be rendered inline
  { id: "executive-committee", title: "ሥራ አስፈጻሚ ጉባኤ", icon: Users, content: null },
  { id: "secretariat", title: "ጽሕፈት ቤት", icon: FileText, content: null },
  { id: "education", title: "ትምህርት ክፍል", icon: GraduationCap, content: null },
  { id: "psalm", title: "መዝሙርና ሥነ-ጥበባት", icon: Music, content: null },
  { id: "development", title: "ልማት ክፍል", icon: HandHeart, content: null },
  { id: "finance", title: "ሒሳብና ንብረት", icon: DollarSign, content: null },
  { id: "member-affairs", title: "አባላት ጉዳይ", icon: UserCheck, content: null },
  { id: "batch", title: "ባች/ዲፓርትመንት ማስተባበሪያ", icon: Users, content: null },
  { id: "professional", title: "ሞያ አገልግሎት", icon: Briefcase, content: null },
  { id: "censorship", title: "ሳንሱርና መርሐ ግብር", icon: Filter, content: null },
  { id: "audit", title: "ኦዲትና ኢንስፔክሽን", icon: Eye, content: null },
];

function ServiceTab() {
  const [activeSection, setActiveSection] = useState("general-assembly");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // List of sections (same as before)
  const serviceSections = [
    { id: "general-assembly", title: "ጠቅላላ ጉባኤ", icon: Users },
    { id: "executive-committee", title: "ሥራ አስፈጻሚ ጉባኤ", icon: Users },
    { id: "secretariat", title: "ጽሕፈት ቤት", icon: FileText },
    { id: "education", title: "ትምህርት ክፍል", icon: GraduationCap },
    { id: "psalm", title: "መዝሙርና ሥነ-ጥበባት", icon: Music },
    { id: "development", title: "ልማት ክፍል", icon: HandHeart },
    { id: "finance", title: "ሒሳብና ንብረት", icon: DollarSign },
    { id: "member-affairs", title: "አባላት ጉዳይ", icon: UserCheck },
    { id: "batch", title: "ባች/ዲፓርትመንት ማስተባበሪያ", icon: Users },
    { id: "professional", title: "ሞያ አገልግሎት", icon: Briefcase },
    { id: "censorship", title: "ሳንሱርና መርሐ ግብር", icon: Filter },
    { id: "audit", title: "ኦዲትና ኢንስፔክሽን", icon: Eye },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  // Intersection Observer to update active section on scroll (desktop)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-80px 0px -80px 0px" }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  // Get current section title for mobile dropdown
  const currentSectionTitle = serviceSections.find(s => s.id === activeSection)?.title || "Jump to Section";

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 animate-fadeInUp">
      {/* Mobile: Dropdown Navigation (visible only on small screens) */}
      <div className="lg:hidden sticky top-24 z-20 bg-white dark:bg-[#1C1C1F] p-3 rounded-xl border border-gray-200 dark:border-[#2a2a2d] shadow-md">
        <select
          value={activeSection}
          onChange={(e) => scrollToSection(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252529] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
        >
          {serviceSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block lg:sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto w-72 bg-white dark:bg-[#1C1C1F] border-r border-gray-200 dark:border-[#2a2a2d] flex-shrink-0">
        <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2d] sticky top-0 bg-white dark:bg-[#1C1C1F] z-10">
          <h3 className="font-bold text-lg text-[#7A1C1C] dark:text-[#D4AF37]">የክፍሎች መሪ</h3>
        </div>
        <nav className="p-2 space-y-1">
          {serviceSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === section.id
                  ? "bg-linear-to-r from-[#7A1C1C] to-[#A02828] dark:from-[#D4AF37] dark:to-[#C9A227] text-white dark:text-[#0E0E0F] shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#252529]"
              }`}
            >
              <section.icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{section.title}</span>
            </button>
          ))}
        </nav>
      </aside>


      {/* Main content area – all the original content preserved exactly */}
      <main className="flex-1 space-y-8 pb-20">
        {/* 1. General Assembly */}
        <div ref={(el) => { sectionRefs.current["general-assembly"] = el; }} data-section-id="general-assembly" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፩ የግቢ ጉባኤ ጠቅላላ ጉባኤ ተግባርና ሓላፊነት</h3>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የሥራ አስፈጻሚ ጉባኤ አባላትን እና የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል ሓላፊን የሀገረ ስብከት ተወካዮች ባልቡት ይመርጣል፡</li>
              <li>የግቢ ጉባኤውን አጠቃላይ የሥራ ሂደት ይገመግማል፡</li>
              <li>በሥራ አስፈጻሚ ጉባኤውና በኦዲትና ኢንስፔክሽን አገልግሎት የቀረበለትን ሪፖርት እንዲሁም እቅድና በጀት መርምሮ ያጸድቃል፡</li>
              <li>ቢያንስ በዓመት አንድ ጊዜ ይሰበሰባል፡፡</li>
            </ul>
          </div>
        </div>

        {/* 2. Executive Committee */}
        <div ref={(el) => { sectionRefs.current["executive-committee"] = el; }} data-section-id="executive-committee" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፪ የሥራ አስፈጻሚ ጉባኤ ተግባርና ሓላፊነት</h3>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የዩንቨርሲቲው ተማሪዎች ግቢ ጉባኤው በሚያዘጋጃቸው መንፈሳዊ መርሐ ግብሮች እንዲማሩና የሚጠበቅባቸውን መንፈሳዊ አገልግሎት እንዲፈጽሙ ያደርጋል::</li>
              <li>በግቢ ጉባኤው የሚገኙ አባላት በገንዘባቸው፣ በዕውቀታቸውና በሙያቸው ቤተ ክርስቲያናቸውን እንዲያገለግሉ ሁኔታዎችን ያመቻቻል፡፡</li>
              <li>በግቢ ጉባኤው ደንብ መሠረት አባላት ይመዘግባል።</li>
              <li>ከሀገረ ስብከቱ የሚመደብለትን እና የግቢ ጉባኤውን ገንዘብና ንብረት በአግባቡ ይጠቀማል።</li>
              <li>የግቢ ጉባኤው አባላት በአገልግሎት የሚሳተፉበትን ሁኔታዎች ያመቻቻል።</li>
              <li>የግቢ ጉባኤውን የሥራ ዕቅድ ያዘጋጃል፣ ለግቢ ጉባኤው ጠቅላላ ጉባኤ አቅርቦ ከተወያየ በኋላ ለሀገረ ስብከቱ እንዲጸድቅለት ይልካል፣ ሲጸድቅ ተግባራዊ ያደርጋል፡፡</li>
              <li>በየሦስት ወሩ ስለሥራው አጠቃላይ እንቅስቃሴ ሪፖርት ለሀገረ ስብከቱ ያቀርባል::</li>
              <li>ቢያንስ በአሥራ አምስት ቀን አንድ ጊዜ ስብሰባ ያደርጋል</li>
              <li>በልዩ ልዩ ምክንያት የተጓደለ የሥራ አስፈጻሚ ጉባኤ አባላትን ይተካል ይህንንም ለሀገረ ስብከቱ ያሳውቃል::</li>
              <li>በመመርያው መሰረት የክፍላት መቃቅርን ያደራጃል ። በዚህ መመርያ ያልተጠቀሰ ነገር ግን ለክፍሉ ስራ ሐላፊነት አፈጻጸም ላይ ያግዛል ተብሎ የታመነበት አዲስ ንዑስ ክፍል ሊያቋቁም ይችላል።</li>
            </ul>
          </div>
        </div>

        {/* 3. Secretariat Office */}
        <div ref={(el) => { sectionRefs.current["secretariat"] = el; }} data-section-id="secretariat" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፫ የሥራ አስፈጻሚ ጽ/ቤት ተግባርና ኃላፊነት</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">የግቢ ጉባኤው ጽ/ቤት የግቢ ጉባኤውን ሰብሳቢ፣ ምክትል ሰብሳቢ እና ጸሐፊ የሚያካትት ሲሆን የሚከተሉት ዋና ዋና ተግባራት ይኖሩታል፡፡</p>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፫፥፩ የጽሕፈት ቤት አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤውን ሥራ በበላይነት ይመራል፤ ሌሎች ክፍሎች አገልግሎታቸውን በአግባቡ እንዲወጡ ያበረታታል፤</li>
              <li>ለሥራ አስፈጻሚ ጉባኤ የስብሰባ አጀንዳዎችን ተወያይቶ ያዘጋጃል፣</li>
              <li>የግቢ ጉባኤውን የሥራ አፈፃፀም ሪፖርት አጠናክሮ ለሥራ አስፈፃሚ ጉባኤ ያቀርባል፤ ሲፀድቅም ለሀገረ ስብከቱ ይልካል፤</li>
              <li>እንደ አስፈላጊነቱ አስቸኳይ ስብሰባዎች ይጠራል፣</li>
              <li>በየ6 ወሩ የግቢውን አጠቃላይ ጉባኤ ከሚመለከታቸው ክፍሎች ጋር በመሆን ያዘጋጃል፣ ተወካይም ከሀገረ ስብከቱ ያስመድባል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፫፥፪ የሰብሳቢ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤውን ሥራ በበላይነት ይመራል፤ ክፍሎችም አገልግሎታቸውን በአግባቡ እንዲወጡ ያበረታታል።</li>
              <li>የግቢ ጉባኤውን ጠቅላላ ጉባኤና የሥራ አስፈፃሚ ጉባኤ ስብሰባዎችን ይመራል።</li>
              <li>ለግቢ ጉባኤው የተመደበውን በጀት፣ አስቸኳይ በጀት፣ ቁሳቁስ ከሒሳብና ንብረት ክፍል ኃላፊ ጋር በመሆን ይፈቅዳል፣</li>
              <li>እንደ አስፈላጊነቱ አስቸኳይ ስብሰባዎችን ይጠራል፣</li>
              <li>ሀገረ ስብከቱ በሚጠራቸው ስብሰባዎች ላይ ግቢ ጉባኤውን ወክሎ ይገኛል፣</li>
              <li>በግቢ ጉባኤው ስም የሚወጡ ደብዳቤዎችን ፈርሞ እንዲወጡ ያደርጋል፣</li>
              <li>በየሰሚስተሩ ወሩ የግቢ ጉባኤውን ጠቅላላ ጉባኤ እንዲዘጋጅ ጥሪ ያስተላልፋል፣</li>
              <li>ገቢ ደብዳቤዎችን ለሚመለከታቸው ክፍሎች ይመራል፣ ምላሽ የሚፈልጉ ደብዳቤዎች ማስታወሻ በመያዝ ከሚመለከተው ክፍል ወቅታዊ ምላሽ መስጠቱን ይከታተላል።</li>
              <li>የሲሶ ዓመት ሪፖርት ለሀገረ ስብከቱ ወቅቱን ጠብቆ መላኩን ይቆጣጠራል።</li>
              <li>የክፍል ሓላፊዎች የተሰጣቸውን ተግባርና የተጣለባቸውን ሓላፊነት በአግባቡ እየተወጡ መሆኑን ይከታተላል። መስተካከል ያለባቸው ጉዳዮች ካሉ በግልፅ ያስረዳል። በጊዜ ሂደት መሻሻል ካልታየና ሥራዎች እየተበደሉ መሆናቸው ከተረጋገጠ በምትካቸው ሌሎች ሓላፊዎች በሥራ አስፈፃሚ ውሳኔ እንዲመደቡ ለሥራ አስፈፃሚ ጉባኤ ያቀርባል።</li>
              <li>በግቢ ጉባኤው ጠቅላላ ጉባኤ የጸደቀውን ዕቅድ ለሀገረ ስብከቱ ይልካል። ሀገረ ስብከቱ ማሻሻያ አድርጎበት ከጸደቀ በኋላ በሚፈለገው መጠን ተባዝቶ ለክፍሎች መሰጠቱንና ለግቢ ጉባኤውም ቀሪ መደረጉን ያረጋግጣል፣</li>
              <li>ከምክትል ሰብሳቢውና ከጸሐፊው ጋር በመመዳደብ በክፍሎች ስብሰባዎች ላይ ይገኛል፤</li>
              <li>የሀገረ ስብከቱ ተወካዮች በመጋበዝ የሥራ አስፈፃሚ ጉባኤ የምክክር መርሐግብር እንዲዘጋጅ ያደርጋል፣</li>
              <li>የአገልግሎት ክፍሎች የዓመቱን ዕቅድና መርሐግብራት በሀገረ ስብከቱ እንዲጸድቁ ያደርጋል፣ ይቆጣጠራል፡፡</li>
            </ul>
          </div>
        </div>

        {/* 4. Education Department */}
        <div ref={(el) => { sectionRefs.current["education"] = el; }} data-section-id="education" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፬ የትምህርት ክፍል ተግባርና ሓላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፬፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በግቢ ጉባኤው የሚደረጉትን ማናቸውንም (መደበኛና መደበኛ ያልሆነ) የትምህርት መርሐግብራት ቀድሞ ለጽሕፈት ቤቱ ያቀርባል፤</li>
              <li>በተጨማሪም በመርሐግብሮቹ ላይ ከሀገረ ስብከቱ ትምህርት ክፍል ጋር በመነጋገር መምህራን እንዲመደቡ ያደርጋል!</li>
              <li>የተመደቡትንም መምህራን ሁኔታ በተመለከተ ከመርሐግብሩ (ከኮርስ ፍፃሜ) በኋላ ሪፖርት ለሀገረ ስብከት ትምህርት ክፍል ያቀርባል፤</li>
              <li>በተነደፈው ሥርዓተ ትምህርት መሠረት ለአባላት ተገቢው ትምህርት መስጠቱንና መርሐግብሮች በተያዘላቸው ሰዓት መከናወናቸውን ይቆጣጠራል፤</li>
              <li>የአብነት ትምህርትን ያስተባብራል ።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፪ የትምህርት ክፍል ሓላፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፤ ያስተባብራል ! የክፍሉን አባላት ቢያንስ በ፲፭ ቀን አንድ ጊዜ ይሰበስባል</li>
              <li>የንዑሳን ክፍሎች ሓላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈፃሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፣ ይቆጣጠራል፣</li>
              <li>ለክፍሉ አባላት በሥራ አስፈፃሚ ጉባኤ የተወሰኑ ውሳኔዎችንና የተከናወኑ ተግባራትን አጠቃላይ መረጃ ያሳውቃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፫ የትምህርት ክፍል ጸሐፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የስብሰባ አጀንዳ ከክፍሉ ሓላፊ ጋር በመሆን ያዘጋጃል፣ ቃለ ጉባኤም ይይዛል፣</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል፣</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈፃሚ ጉባኤ ያቀርባል፣</li>
              <li>ከግቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ኃላፊዎች ይሰጣል፣</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፬ የሥርዓተ ትምህርት ክትትል ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤውን መደበኛ የሥርዓተ ትምህርት መርሐግብራትን (ኮርሶች) መዝግቦ ይይዛል፣</li>
              <li>የተመደቡ መምህራን በሰዓቱና በቦታው ተገኝተው ትምህርቱን መስጠታቸውን ተከታትሎ ለትምህርት ክፍል ሓላፊ ሪፖርት ያደርጋል፣</li>
              <li>በተነደፈው ሥርዓተ ትምህርት መሠረት ለአባላት ተገቢው ትምህርት መሰጠቱንና መርሐግብሮቹ በተያዘላቸው የጊዜ ሰሌዳ መሠረት መከናወናቸውን ይቆጣጠራል፤</li>
              <li>ሥርዓተ ትምህርቱን የተመለከቱ አጠቃላይ መረጃዎች (የባች የሥርዓተ ትምህርት መርሐግብሮችን፤ በዓመቱ የተሰጡ የትምህርት ዓይነቶችን፤ ያስተማሩ መምህራንን ስም፤ ትምህርቱ የወሰደውን ጊዜ፣ ያጋጠሙ ችግሮችን፤ ትምህርቱ የተሰጠበትን ቀንና ቦታ ወዘተ) በመያዝ በየሦስት ወሩ ለግቢ ጉባኤው ትምህርት ክፍል ሪፖርት ያደርጋል፤</li>
              <li>የአባላት የክትትል መዝገብ (attendance) በአባላት ክትትል ንዑስ ክፍል (አባላት ጉዳይ) መመዝገባቸውን ይቆጣጠራል፡፡ በየጊዜውም ከንዑስ ክፍሉ ተወካዮች ተቀብሎ መረጃዎችን ያጠናቅራል፣</li>
              <li>በተከታታይ ሦስት ጊዜና ከዚያ በላይ የቀሩ አባላትን ዝርዝር የምክር አገልግሎት እንዲያገኙ ለአባላት ጉዳይ ክፍል ያሳውቃል፤</li>
              <li>የሥርዓተ ትምህርቱን መማሪያ መጻሕፍት እንዲሟሉ ያደርጋል (ገዝቶ ለግቢ ጉባኤው ተቀማጭ ያደርጋል)!</li>
              <li>የንዑስ ክፍሉን ዓመታዊ ዕቅድና የሩብ ዓመት የዕቅድ አፈጻጸም ሪፖርት አዘጋጅቶ ለትምህርት ክፍል ያቀርባል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፭ የመምህራን ምደባ ን/ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ከሀገረ ስብከት ጋር በመነጋገር የግቢ ጉባኤውን ዓመታዊ የትምህርት የጊዜ ሰሌዳ ያዘጋጃል!</li>
              <li>በግቢ ጉባኤው የሚደረጉ ማናቸውም (መደበኛና መደበኛ ያልሆነ) መርሐግብራትን መዝግቦ ለትምህርት ክፍል ሓላፊ ያሳውቃል !</li>
              <li>በመርሐግብሮቹ ላይ ከሀገረ ስብከቱ ትምህርት ክፍል ጋር በመነጋገር መምህራን እንዲመደቡ ያደርጋል፤ መርሐግብር መሪዎችና አወያዮችንም ይመድባል፣</li>
              <li>ለክፍሉ ጥያቄ ሲቀርብ ለሌሎች ክፍሎች አባላት በልዩ ልዩ ርዕሶች ዙሪያ ትምህርት እንዲሰጥ ያደርጋል፤</li>
              <li>በዓመቱ አጋማሽ የእረፍት ቀናት አስፈላጊ በሆኑ ጊዜያት ሁሉንም ባቾች ያሳተፈ የጋራ የትምህርት መርሐግብር ያዘጋጃል፤</li>
              <li>የተተኪ መምህራንና የመርሐግብር መሪዎች ሥልጠና እንዲሰጥ ከአባላት ጉዳይ ክፍል ጋር በመሆን አባላትን መርጦ ለሥልጠና ክፍል ያሳውቃል፤</li>
              <li>የንዑስ ክፍሉን ዓመታዊ ዕቅድና የሩብ ዓመት የዕቅድ አፈጻጸም ሪፖርት አዘጋጅቶ ለትምህርት ክፍል ያቀርባል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፮ የአብነት ትምህርት ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ከሀገረ ስብከት እና ከአጥቢያ ሰበካ ጉባኤ ጋር በመነጋገር የግቢ ጉባኤው አባላት የአብነት ትምህርት የሚማሩበትን መንገድ ያመቻቻል፤</li>
              <li>የአብነት ትምህርት የሚማሩ አባላትን ዝርዝር መረጃ መዝግቦ ይይዛል፣ ለሀገረ ስብከቱ ያሳውቃል፤</li>
              <li>የአብነት ትምህርቱን ተምረው ክህነት ለመቀበል የሚፈልጉ አባላትን ከአባላት ጉዳይ ክፍል ጋር በመሆን ካጣራ በኋላ ከሀገረ ስብከቱ ጋር በመነጋገር ሥልጣነ ክህነት እንዲቀበሉ ሁኔታዎችን ያመቻቻል፤</li>
              <li>ለአብነት ትምህርት ቤቱ አስፈላጊ የሆኑ ቁሳቁሶችን (የመማሪያ ቦታ፣ መጻሕፍት፤ ወዘተ) ከሚመለከታቸው አካላት ጋር በመሆን እንዲሟሉ ያደርጋል፣</li>
              <li>የንዑስ ክፍሉን ዓመታዊ ዕቅድና የሩብ ዓመት የዕቅድ አፈጻጸም ሪፖርት አዘጋጅቶ ለትምህርት ክፍል ያቀርባል፣</li>
              <li>የግቢ ጉባኤ አባላት የሆኑ ዲያቆናትን በመደበኛ መርሐ ግብራት እና በቤተ መቅደስ አገልግሎት እንዲሳተፉ እና እንዲያገለግሉ ያደርጋል ፣ ያስተባብራል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፬፥፯ የትምህርታዊ ጽሑፎች ዝግጅት ን/ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ልዩ ልዩ ትምህርታዊ የሆኑ ጽሑፎችን (የሰሌዳ መጽሔት፣ በራሪ ጽሑፎች፣ የጥያቄና መልስ ውድድሮች ፣ የውይይት ጥያቄዎች ፣ የቴሌግራም ጽሑፎች ወዘተ) እንዲደርስ ያደርጋል፣</li>
              <li>ማናቸውም የሚዘጋጁ ጽሑፎች ለአባላት ከመድረሳቸው በፊት በትምህርት ክፍል ሓላፊ እንዲገመገሙ ያደርጋል፣</li>
              <li>የግቢ ጉባኤው አባላትን ጥያቄዎችን መሠረት ያደረጉና ወቅታዊ ጉዳዮችን ያገናዘቡ በራሪ ጽሑፎች ተዘጋጅተው እንዲሰራጩ ከትምህርት ክፍል ሓላፊ ጋር ይመካከራል፤ ሥራውንም ይከታተላል፣</li>
              <li>በአጽራረ ቤተ ክርስቲያን የሚሰራጩ ጽሑፎችን በባች (ዲፓርትመንት) አስተባባሪዎችና በን/ክፍሉ አባላት አማካኝነት ሰብስቦ ለትምህርት ክፍል ያደርሳል፡፡</li>
              <li>የንዑስ ክፍሉን ዓመታዊ ዕቅድና የሩብ ዓመት የዕቅድ አፈጻጸም ሪፖርት አዘጋጅቶ ለትምህርት ክፍል ያቀርባል ።</li>
            </ul>
          </div>
        </div>

        {/* 5. Psalm and Arts Department */}
        <div ref={(el) => { sectionRefs.current["psalm"] = el; }} data-section-id="psalm" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፭ የመዝሙርና ሥነ-ጥበባት ክፍል ተግባርና ሓላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፭፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የመዝሙርና ሥነ-ጥበባት ክፍል አባላት ስለ አገልግሎቱ በቂ ግንዛቤ እንዲኖራቸው፤ ኖሯቸውም እንዲጠቀሙበት ያደርጋል፤</li>
              <li>በተለያዩ ቋንቋዎች የሚዘመሩ መዝሙራትን (ግጥምና ዜማ) አሰባስቦ በሳንሱር ክፍል እንዲገመገሙ ካደረገ በኋላ አገልግሎት ላይ እንዲውሉ ያደርጋል።</li>
              <li>ከስልጠና እና ትምህርት ክፍል ጋር በመሆን ስለ ኦርቶዶክሳዊ መዝሙራት የግንዛቤ ማስጨበጫ መርሐግብራትን ያዘጋጃል፤</li>
              <li>በግቢ ጉባኤው ቻናሎች ሊቀርቡ የሚችሉ የስነ ጽሑፍ ስራዎች በማሰባሰብ ለትምህርታዊ ጽሑፎች ንዑስ ክፍል ይልካል፤</li>
              <li>መንፈሳዊ ጭውውቶችን፣ ድራማዎችንና መጣጥፎችን እንዲያዘጋጁ አባላትን ያበረታታል፡፡ የተዘጋጁትንም ወደ ሳንሱር ክፍል በመላክ ተገምግመው ሲፈቀዱ ለዕይታ እንዲቀርቡ ያደርጋል፤</li>
              <li>ጉባኤ ሐዋርያት ላይ ተሳትፈው የተመረቁ ተሰጥኦ ያላቸውን አባላት በመመልመል ፣ ተጨማሪ የክፍሉ ስልጠናዎች እንዲወስዱ ካደረገ በኋላ በመርሐግብራት ላይ እንዲቀርቡ ያደርጋል፣</li>
              <li>የሥነ-ጽሑፍና የሥነ-ስዕል ተሰጥኦ ያላቸውን አባላት በመለየት ጽሑፎቻቸውን እና ሥዕሎቻቸውን በተለያዩ መርሐግብራት ላይ እንዲያቀርቡ ያበረታታል፣ ሁኔታዎችን ያመቻቻል ፣</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፭፥፪ የመዝሙርና ሥነ-ጥበባት ክፍል ኃላፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፣ ያስተባብራል ፤ የክፍሉን አባላት ቢያንስ በ፲፭ ቀን አንድ ጊዜ ይሰበስባል፣</li>
              <li>የንዑሳን ክፍሎች ሓላፊዎችን ከክፍሉ አባላት ያስመርጣል፣ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፣</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፣ ይቆጣጠራል፣</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና የተከናወኑ ተግባራትን አጠቃላይ መረጃ ያሳውቃል፣</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፭፥፫ የመዝሙርና ስነ ጥበባት ክፍል ጸሐፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የስብሰባ አጀንዳ ከክፍሉ ሓላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል ፤</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል ፤</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል ፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከግቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ሓላፊዎች ይሰጣል ፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፭፥፬ የመዝሙር ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የንዑስ ክፍሉ አባላት ስለ መዝሙር አገልግሎት በቂ ግንዛቤ እንዲኖራቸው፤ ፍጹም የሆነ አንድነትም እንዲኖራቸው ያደርጋል፤</li>
              <li>በተለያዩ ቋንቋዎች ሊዘመሩ የሚችሉ አዳዲስ መዝሙራትን /ግጥምና ዜማ/ ሰብስቦ ለመዝሙር ክፍል ሐላፊ ያስረክባል፣</li>
              <li>የግቢ ጉባኤው አባላት ኦርቶዶክሳዊ መዝሙራትን የሚያውቁበትን ሁኔታ ያመቻቻል፤</li>
              <li>በተለያዩ የግቢ ጉባኤው መርሐግብራት ላይ ኦርቶዶክሳዊ መዝሙራትን የዜማ መሣሪያዎች /ከበሮ፣ ጸናጽል፣ በገና . . . ወዘተ/ እንዲቀርቡና እንዲዘመሩ ያደርጋል፤</li>
              <li>በጉባኤ ስለሚዘመሩ መዝሙራት ከክፍሉ ሓላፊ ጋር ይነጋገራል በጋራ ይሠራል፤</li>
              <li>ከስልጠና እና ትምህርት ክፍል ጋር በመሆን ስለ ኦርቶዶክሳዊ መዝሙራት የግንዛቤ ማስጨበጫ መርሐግብራትን ያዘጋጃል፤</li>
              <li>የንዑስ ክፍሉን የሥራ አፈጻጸም ሪፖርትና የሩብ ዓመት ሪፖርት ለክፍሉ ያቀርባል፤ ዓመታዊ ዕቅድም ያዘጋጃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፭፥፭ የሥነ ጽሑፍ ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የሥነ-ጽሑፍ ተሰጥኦ ያላቸው አባላት መንፈሳዊ ጭውውቶችን፣ ድራማዎችን፣ መጣጥፎችን እንዲያዘጋጁ ያበረታታል፤ በግቢ ጉባኤ ሳንሱር ክፍል ተገምግመው ተቀባይነት ካገኙ በኋላ በተለያዩ መርሐግብራት ላይ እንዲቀርቡ ያደርጋል፤</li>
              <li>በሚዲያዎች ሊቀርቡ የሚችሉ ሥነ ጽሑፎችን በማሰባሰብ ለሳንሱር ክፍል ይልካል፤</li>
              <li>የቤተ ክርስቲያንን ሀብት/ቅርሶች/ እንደ አደራ ጠብቆ የጥበብ ችሎታን፣ ሙያን፣ ከሌሎች ንዑሳን ክፍሎች ጋር በመተባበር ለአባላት በልዩ ልዩ መርሐግብራት ላይ የሚቀርብበትን ሁኔታዎችን ያመቻቻል፤</li>
              <li>የንዑስ ክፍሉን የሥራ አፈጻጸም ሪፖርት በሩብ ዓመቱ ለመዝሙርና ስነጥበባት ክፍል ያቀርባል፤ ዓመታዊ ዕቅድም ያዘጋጃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፭፥፮ ሥነ-ምስል ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ተሰጥኦ ያላቸው አባላት ልዩ ልዩ መንፈሳዊ ሥዕላትን እንዲስሉ ያበረታታል፤ የተሰሩትንም በሳንሱር ክፍል ከተገመገሙና ተቀባይነት ካገኙ በኋላ በልዩ ልዩ መርሐግብራት ላይ እንዲቀርቡ ያደርጋል፤</li>
              <li>ከስልጠና ክፍል ጋር በመሆን ስለቤተክርስቲያን ስዕላትና የአሳሳል ዘዴ /ጥበብ/ የግንዛቤ ማስጨበጫ መርሐግብራትን ያዘጋጃል፤</li>
              <li>የቤተ ክርስቲያን ሀብት/ቅርስ/ የሆኑ ስዕላትን የአሳሳል ጥበብ ለአባላት በልዩ ልዩ መርሐግብራት የሚቀርቡበትን የሚታወቁበትን መንገድ ያመቻቻል፤</li>
              <li>የንዑስ ክፍሉን የሩብ ዓመት ዕቅድ አፈጻጸም ሪፖርትና ዓመታዊ ዕቅድ ለመዝሙርና ስነጥበባት ክፍል ያቀርባል፤</li>
            </ul>
          </div>
        </div>

        {/* 6. Development Department */}
        <div ref={(el) => { sectionRefs.current["development"] = el; }} data-section-id="development" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፮ የልማት ክፍል ተግባርና ሓላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፮፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በዓመቱ ውስጥ ለሚደረጉ የግቢ ጉባኤው ዝግጅቶችና ሌሎች ተግባራትን ለማከናወን የተለያዩ የገቢ ማስገኛ መርሐግብራትን ያዘጋጃል፤ የሚገኘውንም ገቢ በሂሳብ መመሪያው መሰረት ተግባራዊ ያደርጋል፤ ስራዎችም በሙሉ ለግቢ ጉባኤው ስራ አስፈጻሚ ያሳውቃል፡፡</li>
              <li>የግቢ ጉባኤው የሕትመት ስራዎችን የሰራል ያሰራጫል።</li>
              <li>ግቢ ጉባኤው ያለበትን አካባቢ ነባራዊ ሁኔታ በማጥናት ቋሚ የልማት ፕሮጀክቶችን ያዘጋጃል ፤ በግቢ ጉባኤው ስራ አስፈጻሚ ኮሚቴ ሲፈቀድለት ተግባራዊ ያደርጋል፤</li>
              <li>የግቢ ጉባኤው ቋሚ የልማት ተቋማቱ ያንቀሳቅሳል ( በረከት ሱቅ ፣ ንጻሬ ሕትመት ቤት ፣ መዝሙር ቤት ፣ የእርጥብ ስራ ፣ የአጽዋማት ዳቦ መሰብሰብ )</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፮፥፪ የልማት ክፍል ኃላፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ስራ በበላይነት ይመራል፤ ያስተባብራል ፤ የክፍሉን አባላት ቢያንስ በ15 ቀን አንድ ጊዜ ይሰበስባል፤</li>
              <li>የንዑሳን ክፍሎች ሓላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፤ ይቆጣጠራል፤</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና የተከናወኑ ተግባራትን አጠቃላይ መረጃ ያሳውቃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፮፥፫ የልማት ክፍል ጸሐፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የስብሰባ አጀንዳ ከክፍሉ ሓላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል፤</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል፤</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሶስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከግቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ሓላፊዎች ይሰጣል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፮፥፬ የገቢ ማስገኛ ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ለግቢ ጉባኤው ልዩ ልዩ ተግባራትን ለማከናወን የሚያስችል የገንዘብ ምንጭ ለማግኘት ልዩ ልዩ የገቢ ማስገኛ መርሐግብራትን ያዘጋጃል ( ለምሳሌ ሎቶሪ ፣ ፎቶ ቤት ፣ ንዋያተ ቅድሳት ሱቅ . . . . . . . . ወዘተ)፤</li>
              <li>ቋሚ የልማት ተቋማቱን የሥራ ሂደት ይከታተላል፤ ይቆጣጠራል፤</li>
              <li>የንዑስ ክፍሉን ዓመታዊ ዕቅድና የሩብ ዓመት ሪፖርት አዘጋጅቶ ለልማት ክፍል ይልካል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፮፥፭ ሕትመትና ስርጭት ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የቤተ ክርስቲያንን የኅትመት ውጤቶች በጉባኤያት ልዩ ልዩ መርሐግብራት ላይ ለአባላት እንዲደርሱ ያደርጋል፤</li>
              <li>የግቢ ጉባኤው የሕትመት ስራዎችን ያከናውናል (ፎቶ ኮፒ ፣ ፕሪንት ፣ ፎቶ ቤት)</li>
              <li>የንዑስ ክፍሉን የሩብ ዓመት ዕቅድ አፈጻጸም ሪፖርትና ዓመታዊ ዕቅድ አዘጋጅቶ ለልማት ክፍል ይልካል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፮፥፮ የሒሳብ ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በልማት ክፍል /የገቢ ማስገኛ ንዑስ ክፍል/ የሚከናወኑ የልማት ተቋማት የሒሳብ እንቅስቃሴ ይቆጣጠራል፤ ወጭና ገቢ ሰነዶችን በአግባቡ በመዝገብ ይይዛል፤</li>
              <li>ወጪዎች በተያዘላቸው ዕቅድ መሰረት መከናወናቸውን ይቆጣጠራል፤</li>
              <li>ቋሚ ንብረቶችንና አላቂ የልማት ተቋሙን ዕቃዎች በመዝገብ ይይዛል፤ በጊዜውም ይቆጣጠራል፤</li>
              <li>የሒሳብ ሪፖርትን አዘጋጅቶ ለልማት ክፍል እና/ወይም ለልማት ተቋሙ በበላይነት ለሚቆጣጠረው አካል ያቀርባል፤</li>
              <li>የልማት ተቋሙ ገንዘብ ወደ ግቢ ጉባኤው ሒሳብና ንብረት ገቢ ያደርጋል ፤</li>
              <li>የንዑስ ክፍሉን የሩብ ዓመት ዕቅድ አፈጻጸም ሪፖርትና ዓመታዊ ዕቅድ አዘጋጅቶ ለልማት ክፍል ያቀርባል፤</li>
            </ul>
          </div>
        </div>

        {/* 7. Finance and Property Department */}
        <div ref={(el) => { sectionRefs.current["finance"] = el; }} data-section-id="finance" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፯ የሒሳብና ንብረት ክፍል ተግባርና ሓላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፯፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>አጠቃላይ የግቢ ጉባኤውን ገቢና ወጪ ሰነዶች በመዝገብ ይይዛል፤</li>
              <li>ወጪዎች በዕቅድ መሠረት /በተያዘላቸው በጀት/ መከናወናቸውን ይከታተላል፤ ይቆጣጠራል፤</li>
              <li>በሰብሳቢው/በምክትል ሰብሳቢው/ ፊርማ የሚወጡ ወጪዎችን ይከፍላል፤ ገንዘቡንም ደረሰኝ ከሰጠው ብር ጋር በማገናዘብ በመረከብ ይይዛል፤</li>
              <li>የግቢ ጉባኤውን ንብረት በየሰሚስተሩ አንድ ግዜ ይቆጣጠራል /ይመዘግባል /</li>
              <li>ወቅታዊና ዓመታዊ የሒሳብ ሪፖርቶችን ያዘጋጃል፤</li>
              <li>በዓመቱ መጨረሻ ላይ የግቢ ጉባኤውን ንብረት በአደራነት ለሀገረ ስብከቱ በህጋዊ ሰነድ አስረክቦ ይሄዳል፤ሲመለስ ይረከባል፤ እንዲሁም ሌሎች ሒሳብ ነክ ተግባራትን ያከናውናል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፯፥፪ የሒሳብ ንብረት ክፍል ሓላፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ስራ በበላይነት ይመራል፣ ያስተባብራል ፤ የክፍሉን አባላት ቢያንስ በ15 ቀን አንድ ጊዜ ይሰበስባል፤</li>
              <li>የንዑሳን ክፍሎች ሓላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፣ ይቆጣጠራል፤</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና የተከናወኑ ተግባራትን አጠቃላይ መረጃ ያሳውቃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፯፥፫ የሒሳብ ንብረት ክፍል ጸሐፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የሰብሰባ አጀንዳ ከክፍሉ ሓላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል፤</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል፤</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከግቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ሓላፊዎች ይሰጣል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፯፥፬ የሒሳብ ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>አጠቃላይ የግቢ ጉባኤውን ገቢና ወጪ ሰነዶች በአግባቡ መዝገብ ይይዛል፤</li>
              <li>ወጪዎች በተያዘላቸው ዕቅድ/በጀት/ መሰረት መከናወናቸውን ይከታተላል፣ ይቆጣጠራል፤</li>
              <li>በሰብሳቢው ፊርማ የሚታዘዙ ወጪዎችን ይከፍላል፤ ተቀብሎም ደረሰኝ ከወጣው ገንዘብ ጋር በማገናዘብ ለመረከብ ይይዛል፤</li>
              <li>ወቅታዊና ዓመታዊ የሒሳብ ሪፖርቶችን ያዘጋጃል ፤ በክፍል ሐላፊው አማካኝነት ለግቢ ጉባኤው ሥራ አስፈጻሚም ያቀርባል፤</li>
              <li>ከግቢ ጉባኤው አባላት የሚዋጡ ልዩ ልዩ አስተዋጽኦዎችን /እንደ ወርኃዊ ፣ ዓመታዊ መዋጮ ካለ/ ይሰበስባል፣ ገቢ ያደርጋል፤</li>
              <li>የንዑስ ክፍሉን ዕቅድ አፈጻጸም ሪፖርት በየሩብ ዓመቱ አዘጋጅቶ ለሒሳብ ንብረት ክፍል ያቀርባል፤ ዓመታዊ ዕቅድም ያዘጋጃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፯፥፭ የንብረት ንዑስ ክፍል ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤውን ንብረቶች /ቋሚ የገቢ ማስገኛ ተቋማትን ጨምሮ/ ይመዘግባል፤ ለተገቢው ሥራ መዋላቸውንም ይቆጣጠራል፤</li>
              <li>አዳዲስ ተገዝተው የሚገቡ ንብረቶችን ይመዘግባል፤ ለተገቢው አገልግሎት እንዲውሉ ያደርጋል፤</li>
              <li>በልዩ ልዩ ምክንያት ጉዳት የደረሰባቸው ንብረቶች ሲኖሩ አስፈላጊው ጥገና እንዲደረግላቸው ያደርጋል፤</li>
              <li>የንዑስ ክፍሉን የሩብ ዓመት ዕቅድ አፈጻጸም ሪፖርት አዘጋጅቶ ለሒሳብ ንብረት ክፍል ያቀርባል፤ ዓመታዊ ዕቅድም ያዘጋጃል፤</li>
            </ul>
          </div>
        </div>

        {/* 8. Member Affairs Department */}
        <div ref={(el) => { sectionRefs.current["member-affairs"] = el; }} data-section-id="member-affairs" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፰ የአባላት ጉዳይ ክፍል ተግባርና ሓላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፰፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤ አባላት የምክር አገልግሎት የሚያገኙበትን መንገድ ከትምህርት ክፍል ጋር በመሆን ያመቻቻል፤</li>
              <li>አባላት የንስሐ አባት እንዲይዙ ሁኔታዎችን ያመቻቻል፤ በየጊዜውም ሂደቱን ይከታተላል፤</li>
              <li>የቤተክርስቲያንን ሥርዓትና እምነት በመጠበቅ የማስተማር ዕውቀት ያላቸውን አባላት በመለየት ለትምህርት ክፍል ያሳውቃል፤</li>
              <li>አባላት ስለ ቤተ ክርስቲያናቸው፣ ስለግቢ ጉባኤያቸው ከግቢ ቆይታቸው ከወጡ በኋላ ስላለው አገልግሎት በበቂ ሁኔታ መረጃ እንዲያገኙ ያደርጋል፤ እንዲሁም የሟሟያ ጽሑፋቸውን በቤተ ክርስቲያን አገልግሎት/በቤተ ክርስቲያን ዙሪያ/ እንዲያዘጋጁ ሁኔታዎችን ያመቻቻል፤</li>
              <li>አዳዲስ አባላትን ይመዘግባል ፣ በግቢ ጉባኤው ሕግና ደንብ መሰረት አባላት ወደ ክፍላት ይመድባል።</li>
              <li>አባላት እርዳታ የሚሻቸው ከሆነ /የአካል ጉዳት፣ ከአቅም በላይ የሆነ የገንዘብ ችግር፣ የጤና ችግር ወዘተ/ ለጽሕፈት ቤቱ ያሳውቃል ሂደቱንም ይከታተላል፤</li>
              <li>ወደ ገዳማትና አድባራት የሚደረጉ ጉዞዎችንና በግቢ ጉባኤው ውስጥ የሚደረጉ በዓላትን ሌሎች ክፍሎችን በማስተባበር እንዲከናወኑ ያደርጋል፡፡</li>
              <li>የግቢ ጉባኤውን አባላት ዝርዝር መዝገብ ቁጥር በመስጠት ሁኔታውን ይቆጣጠራል፤ አጠቃላይ የአባላትን መረጃም ይይዛል፤ አስፈላጊ ከሆነ ብቻ ከግቢ ጉባኤው ጽ/ቤት ጋር በመነጋገር ለጠያቂ አካላት መረጃ ይሰጣል፤</li>
              <li>የምረቃ መጽሔት ላይ የሚወጡ ተማሪዎችን ባለው መረጃ መሠረት ግምገማና ከ ሰ/ት/ቤት መረጃ ጋር አገናዝቦ በስራ አስፈጻሚ ጉባኤ አስጸድቆ ለሀገረ ስብከቱ ግቢ ጉባኤያት ማስተባበሪያ ኮሚቴ ይልካል፤</li>
              <li>የግቢ ጉባኤው አባላት መንፈሳዊ ህይወት እንዲጠነክር ከትምህርት ክፍል ጋር በመተባበር በተለያዩ ርዕሶች ዙሪያ ውይይት እንዲዘጋጅ ያደርጋል ፣</li>
              <li>የግቢ ጉባኤው ተማሪዎች ከተመረቁ በኋላ በአገልግሎት ላይ እንዲሳተፉና የቤተ ክርስቲያንን ዓላማ ከዳር ለማድረስ የሚችሉ አባላትን ለማፍራት የተለያየ ሥራዎችን ይሠራል፤ የተመረቁትንም ሙሉ መረጃ /አድራሻ/ በፋይል በመሰነድ ያስቀምጣል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፰፥፪ የአባላት ጉዳይ ክፍል ሓላፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፤ ያስተባብራል ፤ የክፍሉን አባላት ቢያንስ በ15 ቀን አንድ ጊዜ ይሰበስባል፤</li>
              <li>የንዑሳን ክፍሎች ሓላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፣ ይቆጣጠራል፤</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና የተከናወኑ ተግባራትን አጠቃላይ መረጃ ያሳውቃል፤</li>
              <li>በጽሕፈት ቤቱ ፈቃድ በሀገረ ስብከቱ ስብሰባ ላይ የአባላት ጉዳይ ክፍል ወክሎ ይገኛል፡፡</li>
              <li>በጽሕፈት ቤቱ የሚሰጠው የአባላት ጉዳይ ማጣራት ሓላፊነት በግልጽነትና ታማኝነት ይፈጽማል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፰፥፫ የአባላት ጉዳይ ክፍል ጸሐፊ ተግባርና ሓላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የስብሰባ አጀንዳ ከክፍሉ ሓላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል፤</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል፤</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከግቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ኃላፊዎች ይሰጣል፤</li>
            </ul>
          </div>
        </div>

        {/* 9. Batch Coordination Department */}
        <div ref={(el) => { sectionRefs.current["batch"] = el; }} data-section-id="batch" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፲፪. የባች/ዲፓርትመንት ማስተባበሪያ ክፍል ተግባርና ኃላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፪፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በግቢ ጉባኤው የሚሰጡትን ትምህርቶች ተደራሽነት ለማስፋት ተማሪዎችን በዲፓርትመንት/ባች አደረጃጀት በመጠቀም ይቀሰቅሳል፣ ይጋብዛል።</li>
              <li>አዲስ ገቢ ተማሪዎችን በመቀበልና ወደ ተገቢው የትምህርት ደረጃ እንዲገቡ በማድረግ ከመንፈሳዊ ሕይወት እንዳይርቁ ያደርጋል።</li>
              <li>እንደ አስፈላጊነቱ በግቢው ውስጥ ያሉ ጠቅላላ እንቅስቃሴዎች በመያዝ ለሚመለከተው ክፍል ያቀርባል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፪፥፪ የባች ማስተባበሪያ ክፍል ኃላፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፣ ያስተባብራል፤ ንዑሳን ክፍሎችን በቅርበት ይከታተላል።</li>
              <li>የቅስቀሳና ጥሪ ሥራዎች በሁሉም ዲፓርትመንቶች ተደራሽ መሆናቸውን ያረጋግጣል።</li>
              <li>ለክፍሉ አባላትና ለዲፓርትመንት ተጠሪዎች በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችን ያስተላልፋል።</li>
              <li>ለክፍሉ የሚያስፈልጉ ንብረቶች ከንብረት ክፍል ይረከባል ፣ በአግባቡ ጥቅም ላይ መዋላቸውን ይቆጣጠራል ።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፪፥፫ የባች ማስተባበሪያ ክፍል ጸሐፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የስብሰባ አጀንዳ ከክፍሉ ኃላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤ ይይዛል።</li>
              <li>በዲፓርትመንት የተደራጁ የአባላት ዝርዝርና የመርሐ ግብር ተሳታፊዎችን መረጃ ይይዛል።</li>
              <li>የክፍሉን ዕቅድና ሪፖርት አዘጋጅቶ ለሥራ አስፈጻሚው ያቀርባል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፪፥፬ የቅስቀሳና መረጃ ንዑስ ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በግቢው ውስጥ ያሉትን ሁሉንም ዲፓርትመንቶች በመለየት በእያንዳንዱ ዲፓርትመንት ተጠሪዎችን ይመድባል።</li>
              <li>ስለሚሰጡት የትምህርት ኮርሶችና እና ስለ ልዩ ልዩ መርሐ ግብሮች ለተማሪዎች ጥሪ ያደርጋል፣ ይቀሰቅሳል።</li>
              <li>የማስታወቂያ ቦርዶችን፣ የቴሌግራም ገጾችንና የዲፓርትመንት ግሩፖችን በመጠቀም መልዕክቶችን ያስተላልፋል።</li>
              <li>በተለይ አዲስ ለሚጀመሩ ኮርሶች ሰፊ የቅስቀሳ ዘመቻ ያካሂዳል፣</li>
              <li>ተማሪዎች በትምህርት ገበታቸው ላይ በንቃት እንዲገኙ የማንቂያ መልእክት (SMS) ይልካል።</li>
              <li>የቤተ ክርስቲያን እና የግቢ ጉባኤው ወቅታዊ መልእክቶችን ብግዜው አባሉ ጋር እንዲዳረስ ያደርጋል።</li>
              <li>የግቢ ጉባኤውን አባላት ከመናፍቃን ቅስቀሳና ከሌሎች አላስፈላጊ ድርጊቶች ለመጠበቅ በግቢው የሚደረጉ እንቅስቃሴዎችን መረጃ ይሰበስባል፤ በክፍሉ ሐላፊ በኩል ለጽሕፈት ቤቱ ያሳውቃል፤</li>
            </ul>
          </div>
        </div>

        {/* 10. Professional Services Department */}
        <div ref={(el) => { sectionRefs.current["professional"] = el; }} data-section-id="professional" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፱ የሞያ አገልግሎት ክፍል ተግባርና ኃላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-2 mb-2">፱፥፩ የክፍሉ አጠቃላይ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>አባላት በቀለም ትምህርታቸው የሚጠናከሩበትን መንገድ ያመቻቻል፤ በትምህርታቸው ድክመት ያለባቸውን አባላት በዲፓርትመንታቸው በመለየት ተከታታይ የማጠናከሪያ ትምህርት ይሰጣል፤ ሁሉም በሚማሩበት ሞያ ቤተ ክርስቲያንን ማገልገል እንዲችሉ ሁኔታዎችን ያመቻቻል፤</li>
              <li>አመቺ በሆነ ቦታ፣ ቁጥርና እንቅስቃሴ ቤተ መጻሕፍት እንዲኖር ሁኔታዎችን ያመቻቻል፤</li>
              <li>የግቢ ጉባኤው አባላት ባላቸው ወይም በሚማሩበት ሞያ ጉልበት አገልግሎት ለሚፈልጉት ሰንበት ት/ቤቶች፣ ሰበካ ጉባኤ፣ ገዳማትና አድባራት አገልግሎት እንዲሰጡ ያደርጋል ፤</li>
              <li>በግቢ ውስጥ ለሚገኙ አካል ጉዳተኞችና ጡረተኞች ተማሪዎችን በመመደብ አስፈላጊውን እገዛ ያደርጋል ፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፱፥፪ የሞያ አገልግሎት ክፍል ኃላፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፤ ያስተባብራል፤ የክፍሉን አባላት ቢያንስ በ15 ቀን አንድ ጊዜ ይሰበስባል፤</li>
              <li>የንዑሳን ክፍሎች ኃላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፤ ይቆጣጠራል፤</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና አጠቃላይ መረጃ ያሳውቃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፱፥፫ የነጻ ሞያ አገልግሎት ንዑስ ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>ለአዲስ ገቢ ተማሪዎች ስለ ግቢ ተማሪዎች ገለጻ (Orientation) በማዘጋጀት፣ የፈተና ወረቀቶችን፣ ካርታዎችን( የካፌ እና መኝታ) ከተማሪዎች በማሰባሰብ እንዲደርሳቸው በማድረግ፣ ስለ ትምህርት አሰጣጥና የጊዜ አጠቃቀም ሥልጠና በመስጠት ወይም ምክር እንዲያገኙ በማድረግ ወዘተ አባላት በቀለም ትምህርታቸው እንዲጠነክሩ ሁኔታዎችን ያመቻቻል፤</li>
              <li>አባላት በሚማሩበት የሞያ ዘርፍ ከልማት ክፍል ጋር በመተባበር ለግቢ ጉባኤው ገቢ ሊያስገኙ የሚችሉ ቴክኖሎጂዎች፣ የዕደ ጥበብ ውጤቶች እንዲያዘጋጁና እንዲያበረክቱ ሁኔታዎችን ያመቻቻል፤ ያበረታታል፤</li>
              <li>በትምህርታቸው ድክመት ያለባቸውን አባላት በየዲፓርትመንታቸው በመለየት ተከታታይ የማጠናከሪያ ትምህርትና ድጋፍ በሌሎች አባላት እንዲያገኙ ያደርጋል፤</li>
              <li>የግቢ ጉባኤው አባላት በሚማሩበት ሞያ በየአካባቢያቸው ለቤተክርስቲያን አስተዋጽኦ እንዲያበረክቱ ሁኔታዎችን ያመቻቻል፤</li>
              <li>የግቢ ጉባኤው አባላት በሚማሩበት ቤተ ክርስቲያን የማጠናከሪያ ትምህርት እንዲሰጡ ሁኔታዎችን ያመቻቻል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፱፥፬ የበጎ አድራጎት ንዑስ ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በቅድሚያ የአካል ጉዳተኛ፣ የጤና ችግር ወይም ከአቅም በላይ የሆነ የገንዘብ ችግር ያለባቸውን የግቢ ጉባኤው አባላት ከአባላት ጉዳይ ክፍል ጋር በመተባበር አስፈላጊውን እርዳታ እንዲያገኙ ያደርጋል፤</li>
              <li>ፈቃደኛ ከሆኑ አባላት ያገለገሉ አልባሳትን፣ የገንዘብ ድጋፍ በማሰባሰብ ለነዳያን እንዲደርሱ ያደርጋል፤ እንዲሁም ነዳያን ጾም እንዲፈቱና በዓላትን እንዲያከብሩ አስተዋጽኦ ያደርጋል፤</li>
              <li>ለተቸገሩ አብያተ ክርስቲያናት መርጃ የሚውል እርዳታ (ሙዳይ) ያሰባስባል፤ ከሀገረ ስብከቱ ጋር በመተባበር የሚረዱበትን መንገድ ያመቻቻል፤</li>
              <li>የግቢ ጉባኤውን አባላት በማስተባበር በአጥቢያ ቤተክርስቲያን የሚሰሩ ሥራዎችን (ለምሳሌ የቤተ ክርስቲያኑን ግቢ ማጽዳት፣ ዛፍ መትከል፣ ልብስ ተክህኖ ማጠብ ወዘተ) እንዲያግዙ ያደርጋል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፱፥፭ የቤተ መጻሕፍት አገልግሎት ንዑስ ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤው የቤተ መጻሕፍት አገልግሎት ይቆጣጠራል ፣ አባላት ተውሰው መጠቀም የሚችሉበትን ሁኔታ ያመቻቻል፤</li>
              <li>ከግቢ ጉባኤው አባላት መጻሕፍትን፣ መጽሔቶችን፣ ጋዜጦችን ወዘተ በስጦታ ወይም በውሰት በማሰባሰብ ቤተ መጻሕፍቱን ያጠናክራል፤</li>
              <li>የቤተ መጻሕፍቱን ንብረቶች በየጊዜው በመመዝገብ ያለውና የጠፉትን ወይም የተበላሹትን በመለየት ለአስተዳደርና ንብረት ክፍል ያሳውቃል፤</li>
            </ul>
          </div>
        </div>

        {/* 11. Censorship & Program Department */}
        <div ref={(el) => { sectionRefs.current["censorship"] = el; }} data-section-id="censorship" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፲፰ . የሳንሱርና የመርሐ ግብራት ዝግጅት ክፍል ተግባርና ኃላፊነት</h3>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">አጠቃላይ የክፍሉ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤው መደበኛ መርሐ ግብራት ላይ የሚቀርቡት ዝርዝር ፕሮግራሞችን ከክፍሎች በመሰብሰብ ይደራጃል ፣ ለመድረክ መሪው ይሰጣል፤</li>
              <li>የግቢ ጉባኤው መርሐ ግብራት ላይ የሚቀርቡ እንዲሁም ደግሞ በማሕበራዊ ድህረ ገጾች የሚለጠፉ ትምህርቶች ፣የስነጥበብ ስራዎች ፣ መዝሙሮች . . . . . ይመረምራል ፣ ተገቢ መሆናቸዉን ያረጋግጣል ፣</li>
              <li>ለመርሐ ግብሮች የሚሆኑ አዳራሾችን ይከፍታል - በወንበር ፣ projector ፣ ድምጽ ማጉያ እና ሌሎች ነገሮች በማደራጀት ምቹ ያደርጋል።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፰፥፪ የሳንሱርና መርሐ ግብር ዝግጅት ክፍል ኃላፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፣ ያስተባብራል፤ ንዑሳን ክፍሎችን በቅርበት ይከታተላል።</li>
              <li>ለመርሐ ግብሮች የሚያስፈልጉ ቁሳቁሶች (ወንበር፣ ድንኳን፣ መብራት) እንዲሟሉ ከሚመለከተው ክፍል ጋር ይሠራል።</li>
              <li>የሳንሱር እና መርሐ ግብር ዝግጀት ሥራዎች በአግባቡ መፈጸማቸው ያረጋግጣል።</li>
              <li>ለክፍሉ አባላትና በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችን ያስተላልፋል።</li>
              <li>ለክፍሉ የሚያስፈልጉ ንብረቶች ከንብረት ክፍል ይረከባል ፣ በአግባቡ ጥቅም ላይ መዋላቸውን ይቆጣጠራል ።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፰፥፫ የሳንሱርና መርሐ ግብር ዝግጅት ክፍል ጸሐፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የሰብሰባ አጀንዳ ከክፍሉ ኃላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል።</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል።</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከገቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ኃላፊዎች ይሰጣል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፰:፩ የሳንሱር ን/ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>በግቢ ጉባኤው ስም የሚዘጋጁ ማናቸውም ጽሑፎች፣ ግጥሞች፣ እና የመዝሙር ግጥሞች ከኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ዶግማና ቀኖና (ትምህርተ ሃይማኖትና ሥርዓት) ጋር የማይጋጩ መሆናቸውን መመርመርና ማረጋገጥ።</li>
              <li>አዳዲስ የሚዘጋጁ መዝሙራት (ግጥምና ዜማ) ከቤተ ክርስቲያን መንፈሳዊ ለዛና የዜማ ስልት (ቅኝት) እንዳይወጡ መከታተልና ማጽደቅ።</li>
              <li>የሚዘጋጁ ድራማዎች፣ መንፈሳዊ ጭውውቶችና መጣጥፎች መልእክታቸው ወንጌልን የሚያስተምር፣ ከቤተ ክርስቲያን ታሪክ ጋር የማይጋጭና ለሥነ-ምግባር የታነጸ መሆኑን መገምገም።</li>
              <li>የሚሳሉ ሥዕላት (አይኮኖግራፊ) የቤተ ክርስቲያንን ቀለማትና የአሳሳል ሕግ የተከተሉ መሆናቸውን ማረጋገጥ።</li>
              <li>በግቢ ጉባኤው ማሕበራዊ ድህረ ገጾች ፣ በበራሪ ጽሑፎችና በመጽሔቶች ላይ የሚወጡ መረጃዎች ተዓማኒነት ያላቸውና ተገቢ መሆናቸውን ያረጋግጣል።</li>
              <li>ግድፈት ያለባቸው ሥራዎች ሲቀርቡ ደራሲያኑ ወይም አዘጋጆቹ በምን መልኩ ማስተካከል እንዳለባቸው መንፈሳዊና ሞያዊ ምክረ-ሃሳብ መስጠት።</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፰:፪ የመርሐ ግብር ዝግጅት ንዑስ ክፍል</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የመማሪያና የመርሐ ግብር አዳራሾችን ቀድሞ በመገኘት ያጸዳል፣ ወንበሮችን ያሰናዳል።</li>
              <li>የድምፅ ማጉያ (Speaker)፣ የProjector ፣ የመብራት ሲስተሞችን ከሙያና አገልግሎት ጋር በመነጋገር ያሟላል፣ ብልሽት ሲኖርም ያስጠግናል።</li>
              <li>ከመርሐ ግብር ፍጻሜ በኋላ አዳራሹን ወደ ነበረበት ይመልሳል።</li>
            </ul>
          </div>
        </div>

        {/* 12. Audit & Inspection Department */}
        <div ref={(el) => { sectionRefs.current["audit"] = el; }} data-section-id="audit" className="scroll-mt-24">
          <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2d]">
            <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">፲፱. የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል ተግባርና ኃላፊነት</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">የኦዲትና ኢንስፔክሽን ክፍል ተጠሪነቱ ለጠቅላላ ጉባኤ ሆኖ የሚከተሉት ተግባራትና ንዑሳን ክፍሎች ይኖሩታል።</p>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">አጠቃላይ የክፍሉ ተግባራት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤው አጠቃላይ ገቢና ወጪ ተመዝግበው በአግባቡ መያዛቸውን ይከታተላል፤</li>
              <li>የግቢ ጉባኤው አጠቃላይ ገንዘብ ከሀገረ ስብከቱ እና ከግቢ ጉባኤው ሥራ አስፈጻሚ በተመረጡ ተወካዮች በኩል በተከፈተው የሒሳብ መዝገብ (bank account) መቀመጡን ያረጋግጣል፤</li>
              <li>በትምህርት ዓመቱ መጀመሪያ ወቅት የግቢ ጉባኤው ንብረቶች አስፈላጊው መረጃ ተይዞና ተፈርሞ ለተመደበላቸው ክፍሎች መሰጠቱን ያረጋግጣል፤</li>
              <li>የትምህርት ዓመቱ ሲጠናቀቅ የግቢ ጉባኤውን ንብረቶች ከየክፍሎች በግምጃ ቤት ተቆጥረው፣ ከአገልግሎት ውጪ አለመሆናቸው ተረጋግጦ ከቋሚ የመግዛት መዝገብ ጋር ተመሳክሮ ገቢ መደረጋቸውን ያረጋግጣል፤</li>
              <li>ወጪዎች በዕቅድ ወይም በቃለ ጉባኤ ውሳኔ መሠረት መሆናቸውን ይከታተላል፤ ስህተቶች ሲታዩ አስፈላጊ ማስተካከያዎች እንዲደረጉ ያሳስባል፤</li>
              <li>የግቢ ጉባኤውን ንብረቶች በአራት ወር አንድ ጊዜ ይቆጣጠራል፣ ደህንነታቸውንም ያረጋግጣል፤</li>
              <li>የግቢ ጉባኤው የአገልግሎት ክፍሎችን እንቅስቃሴ በየወሩ ከዕቅዳቸው ጋር በማገናዘብ ይገመግማል፤ የግምገማውንም ሪፖርት በሥራ አስፈጻሚ ጉባኤ ስብሰባ ላይ ያቀርባል፤</li>
              <li>የሩብ ዓመትና ዓመታዊ ሪፖርቶችን ያዘጋጃል፣ ለሀገረ ስብከቱ ኦዲትና ኢንስፔክሽን ይልካል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፱፥፩ የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል ኃላፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን ሥራ በበላይነት ይመራል፤ ያስተባብራል፤ የክፍሉን አባላት ቢያንስ በ15 ቀን አንድ ጊዜ ይሰበስባል፤</li>
              <li>የንዑሳን ክፍሎች ኃላፊዎችን ከክፍሉ አባላት ያስመርጣል፤ ለሥራ አስፈጻሚ ጉባኤም አቅርቦ ያስጸድቃል፤</li>
              <li>ንዑሳን ክፍሎች ሥራቸውን በአግባቡ መወጣታቸውን ይከታተላል፤ ይቆጣጠራል፤</li>
              <li>ለክፍሉ አባላት በሥራ አስፈጻሚ ጉባኤ የተወሰኑ ውሳኔዎችንና አጠቃላይ መረጃ ያሳውቃል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፱፥፪ የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል ጸሐፊ ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የክፍሉን የሰብሰባ አጀንዳ ከክፍሉ ኃላፊ ጋር በመሆን ያዘጋጃል፤ ቃለ ጉባኤም ይይዛል፤</li>
              <li>የገቢና ወጪ ማኅደር አዘጋጅቶ ደብዳቤዎችንና ተዛማጅ መረጃዎችን በአግባቡ ያስቀምጣል፤</li>
              <li>ንዑሳን ክፍሎች ዓመታዊ ዕቅድና በየሦስት ወራት የዕቅድ አፈጻጸም ሪፖርት እንዲያዘጋጁ ያሳስባል፤ የተዘጋጁትንም አጠናቅሮ ለሥራ አስፈጻሚ ጉባኤ ያቀርባል፤</li>
              <li>ከገቢ ጉባኤው ጽ/ቤት የተሰጠውን የክፍሉን ዕቅድ አባዝቶ ለንዑሳን ክፍሎች ኃላፊዎች ይሰጣል፤</li>
            </ul>
            <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mt-4 mb-2">፲፱፥፫ የኢንስፔክሽን ንዑስ ክፍል ተግባርና ኃላፊነት</h4>
            <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>የአገልግሎት ክፍሎች በዕቅዳቸው መሠረት ሥራቸውን እያከናወኑ መሆናቸውን ይከታተላል፣ ተግባራዊ የእርማት አስተያየት በወቅቱ ይሰጣል፤ የእርማት እርምጃ የማይወሰድ ከሆነ ለሀገረ ስብከቱ የኦዲትና ኢንስፔክሽን አገልግሎት ክፍል እና ለጠቅላላ ጉባኤ ያሳውቃል፤</li>
              <li>የግቢ ጉባኤው አገልግሎቶች በግቢ ጉባኤያት የአገልግሎት መዋቅር መመሪያ መሠረት እየተከናወኑ መሆናቸውን ይቆጣጠራል፤ ስህተቶች ወይም ልዩነቶች ሲኖሩ የእርማት አስተያየት በወቅቱ ይሰጣል፤ የአርማት እርምጃ የማይወስድ ከሆነ ለሀገረ ስብከቱ ያሳውቃል፤</li>
              <li>የሥራ አስፈጻሚ ጉባኤና የአገልግሎት ክፍሎች መደበኛ ስብሰባዎች መደረጋቸውንና አባላት መገኘታቸውን ይከታተላል፤ ተጠያቂን በመመደብ በስብሰባዎቹ የሚወሰኑ ውሳኔዎች ተግባራዊነት ይከታተላል፤</li>
              <li>ወጪዎች በዕቅድ ወይም በቃለ ጉባኤ ውሳኔ መሠረት መሆናቸውን ይከታተላል፤ ስህተቶች ሲታዩ አስፈላጊ ማስተካከያዎች እንዲደረጉ ያሳስባል፤</li>
              <li>የግቢ ጉባኤው የአገልግሎት ክፍሎችን እንቅስቃሴ በየወሩ ከዕቅዳቸው ጋር በማገናዘብ ይገመግማል፤ የግምገማውንም ሪፖርት በሥራ አስፈጻሚ ጉባኤ ስብሰባ ላይ ያቀርባል፤</li>
              <li>የንዑስ ክፍሉን ዕቅድ አፈጻጸም ሪፖርት በየሩብ ዓመቱ ለክፍሉ ያቀርባል፤ ዓመታዊ ዕቅድም ያዘጋጃል፤</li>
            </ul>
          </div>
        </div>

        {/* Closing prayer */}
        <div className="text-center text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-8 py-4 border-t border-gray-200 dark:border-gray-700">
          ረድኤተ እግዚአብሔር አይለየን አሜን!
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Law Tab Content (same as original, enhanced with better layout)
// ─────────────────────────────────────────────────────────────────────────────
function LawTab() {
  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="bg-gradient-to-br from-white to-amber-50 dark:from-[#1C1C1F] dark:to-[#252529] rounded-2xl p-6 border border-amber-100 dark:border-[#2a2a2d]">
        <h3 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-4">መግቢያ</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">የቤተ ክርስቲያናችን ተስፋ የሆኑት የከፍተኛ ትምህርት ተቋማት ተማሪዎች በግቢ ቆይታቸው መንፈሳዊ ዕውቀትን እንዲጨብጡና ሥርዓተ ቤተ ክርስቲያንን እንዲያውቁ የግቢ ጉባኤያት ሚና የጎላ ነው። በእንዳ ኢየሱስ ግቢ ጉባኤ የሚከናወኑ ማናቸውም መንፈሳዊ፣ ማኅበራዊና አስተዳደራዊ አገልግሎቶች ወጥ በሆነ መንገድ ይመሩ ዘንድ ይህ የውስጠ ደንብ ተዘጋጅቷል። ይህ መመሪያ የግቢ ጉባኤውን ነባራዊ ሁኔታ ባገናዘበ መልኩ የተመቻቸና የአገልግሎት ጥራትን ለማረጋገጥ ያለመ ነው።</p>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አንድ</h3>
        <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">መዋቅርና አመራር</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 1፦</strong> ተዋረድና የውሳኔ አሰጣጥ</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>1.1. ጠቅላላ ጉባኤ፦</strong> የግቢ ጉባኤው ከፍተኛ አካል ነው። የሥራ አስፈጻሚ አባላትን ይመርጣል፣ ዓመታዊ ዕቅድና በጀትን ያጸድቃል።</li>
          <li><strong>1.2. የሥራ አስፈጻሚ ጉባኤ፦</strong> የግቢ ጉባኤው የዕለት ተዕለት ውሳኔ ሰጪና አስፈጻሚ አካል ነው።</li>
          <li><strong>1.3. የአገልግሎት ክፍሎች፦</strong> በጽሕፈት ቤቱ የሚመሩ 7 የተለዩ ዘርፎችን የያዙ የአገልግሎት ማዕከላት ናቸው።</li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ሁለት</h3>
        <h4 className="font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">የስራ አስፈጻሚ ጉባኤና አወቃቀርና የስራ ሐላፊነት</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 2፦</strong> የስራ አስፈጻሚ አወቃቀር</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">2.1. የግቢ ጉባኤው ስራ አስፈጻሚ ጉባኤ የሚከተሉት የጽሕፈት ቤት አባላት እና 7 የአገልግሎት ክፍሎች ያካትታል።</p>
        <div className="grid md:grid-cols-3 gap-2 mt-3 text-sm">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300"><li>ሰብሳቢ</li><li>ምክትል ሰብሳቢ</li><li>ጸሐፊ</li><li>ትምህርት ክፍል</li></ul>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300"><li>መዝሙር ክፍል</li><li>አባላት ጉዳይ ክፍል</li><li>ልማት ክፍል</li><li>ሒሳብና ንብረት ክፍል</li></ul>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300"><li>ሞያና አገልግሎት ክፍል</li><li>የባች ማስተባበሪያ ክፍል</li><li>ሳንሱርና መርሐ ግብር ዝግጅት ክፍል</li><li>ኦዲትና ኢንስፔክሽን ክፍል</li></ul>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2">2.2. እያንዳንዱ የአገልግሎት ክፍል ከክፍሉ ተጠሪ በተጨማሪ በሥራ አስፈጻሚው በሚጸድቁ አንድ ጸሐፊና እንደ አስፈላጊነቱ የንዑሳን ክፍሎች ተጠሪዎች ይመራል።</p>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">አንቀጽ 3፦ ዝርዝር የሥራ መግለጫ</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">3.1. የእያንዳንዱ አገልጋይና የክፍል ተጠሪ ዝርዝር ተግባርና ኃላፊነት በዚህ ደንብ አባሪ ሆኖ በቀረበው <strong>“የእንዳ ኢየሱስ ግቢ ጉባኤ የአገልግሎት መዋቅርና የተግባር መመሪያ”</strong> ላይ በዝርዝር ተካቷል። ሁሉም አገልጋይ ተግባሩን ሲያከናውን የተጠቀሰውን መመሪያና የስራ ሐላፊነት መሰረት በማድረግ ይሆናል።</p>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ሦስት – ዕቅድ፣ ሪፖርትና የመረጃ ፍሰት</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 4፦</strong> የሥራ ዕቅድ ዝግጅት</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          <li>4.1. እያንዳንዱ ክፍል የዓመቱን ዕቅድ በትምህርት ዓመቱ መጀመሪያ አዘጋጅቶ ለጽሕፈት ቤቱ ማቅረብ ይኖርበታል።</li>
          <li>4.2. የተቀናጀው የግቢ ጉባኤው ዓመታዊ ዕቅድ በሥራ አስፈጻሚው ታይቶ ለጠቅላላ ጉባኤው ቀርቦ መጽደቅ ይኖርበታል።</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 5፦</strong> የሪፖርት አቀራረብ</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          <li>5.1. ክፍሎች በየሦስት ወሩ (ሩብ ዓመት) የሥራ አፈጻጸም ሪፖርታቸውን ለጽሕፈት ቤቱ ማቅረብ ይኖርባቸዋል።</li>
          <li>5.2. ጽሕፈት ቤቱ የክፍሎችን ሪፖርት አጠናቅሮ በየሴሚስተሩ ለጠቅላላ ጉባኤና ለሀገረ ስብከቱ ያቀርባል።</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 6፦</strong> የመረጃ አያያዝና ምስጢር መጠበቅ</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li>6.1. የግቢ ጉባኤው ሰነዶች፣ የአባላት መረጃዎችና ቃለ-ጉባኤዎች በጽሕፈት ቤቱና በሚመለከተው ክፍል በአግባቡ ተመዝግበው መቀመጥ ይኖርባቸዋል።</li>
          <li>6.2. የአባላትን ግላዊ መረጃና የምስጢር ውይይቶችን አሳልፎ መስጠት በዲሲፕሊን የሚያስጠይቅ ከባድ ጥፋት ነው።</li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አራት – የአባልነት ምዝገባ፣ መብትና ግዴታ</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 7፦</strong> የአባልነት ምዝገባና ቅድመ ሁኔታ</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          <li>7.1. ማንኛውም በዩኒቨርሲቲው የተመደበ የኦርቶዶክስ ተዋሕዶ እምነት ተከታይ ተማሪ (ተማሪ ያልሆነ አይቻልም) ጉባኤ አበው በአግባቡ ተከታትሎ ሲመረቅ የአባላት ጉዳይ ክፍል የሚያዘጋጀውን ቅጽ በመሙላት አባል መሆን ይችላል።</li>
          <li>7.2. አዲስ አባል ስለ ግቢ ጉባኤው ዓላማ፣ ሥርዓትና መመሪያ አጭር ገለጻ ይሰጣቸዋል።</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 8፦</strong> የአባላት መብትና ግዴታ</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">8.1. መብት</p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>በግቢ ጉባኤው የሚሰጡ አገልግሎቶች የማግኘት (ትምህርት፣ ዝማሬ፣ ንስሐ አባት፣ ስልጠናዎች...)</li>
              <li>እንደ ተሰጥኦውና እንደ ዝግጅቱ፣ በግቢ ጉባኤው ሕግና ደንብ መሰረት በአገልግሎት ዘርፎች የመሳተፍ።</li>
              <li>ችግር ሲገጥመው ከግቢ ጉባኤው የማማከርና መንፈሳዊ ድጋፍ የማግኘት።</li>
              <li>በግቢ ቆይታው በቤተ ክርስቲያን ስርዓት ጋብቻን ቢፈጽም የእንኳን ደስ አለህ/ሽ መልእክትና መንፈሳዊ ስጦታን ይበረከትለታል።</li>
              <li>የአባሉ የ1ኛ ደረጃ ቤተሰብ ሲሞት የመጽናናት አገልግሎት የማግኘት መብት አለው።</li>
              <li>ተመራቂ አባላት አስፈላጊውን ነገር አሟልተው ሲገኙ ግቢ ጉባኤው የሚያዘጋጀው መጽሔት የማግኘት መብት አላቸው።</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">8.2. ግዴታ</p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>የግቢ ጉባኤውን ውስጠ ደንብና ሥርዓት ማክበር።</li>
              <li>መደበኛ ትምህርቶችንና ስብሰባዎችን በአግባቡ መከታተል።</li>
              <li>ወርሃዊ መዋጮና ሌሎች የጋራ ውሳኔዎችን በታማኝነት መፈጸም።</li>
              <li>የተመደበለትን የስራ ሐላፊነት መወጣት።</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል አምስት – የአገልግሎት እርከኖችና የሥልጠና መስፈርቶች</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 9፦</strong> የአገልግሎት ፈቃድና ገደቦች</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>9.1. ጠቅላላ አገልግሎት፦</strong> ማንኛውም የ"ጉባኤ አበው" ትምህርትን ያጠናቀቀ አባል በሁሉም ክፍላት በአባልነት ማገልገል ይችላል።</li>
          <li><strong>9.2. ልዩ የአገልግሎት ገደቦች፦</strong> የሚከተሉት አገልግሎቶች "ጉባኤ አበው" ከማጠናቀቅ በተጨማሪ የትምህርት ዝግጅት ይጠይቃሉ፦
            <ul className="list-circle list-inside ml-8">
              <li>የንዑስ ክፍል መሪዎች፦ "ጉባኤ ሐዋርያት" በአግባቡ ተምሮ ያጠናቀቀ።</li>
              <li>የመድረክ መሪነትና ተተኪ መምህርነት፦ "ጉባኤ ሐዋርያት" አጠናቆ "ጉባኤ ኤቅሌስያ" የጀመረ ወይም ያጠናቀቀ መሆን አለበት።</li>
              <li>ትምህርታዊ ጽሑፎች ዝግጅት፦ በ"ጉባኤ ኤቅሌስያ" በኩል የሚሰጡ ጥናታዊ ትምህርቶችን መከታተል ግዴታ ነው።</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ስድስት – የአስተዳደር ምርጫ ፖሊሲ</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 10፦</strong> የአመራር ምርጫ መስፈርቶችና ሂደት</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>10.1. ምርጫ አስተባባሪ አካል፦</strong> የሀገረ ስብከቱ ተወካዮች፣ የግቢ ጉባኤው ሰብሳቢ እና ኦዲትና ኢንስፔክሽን ክፍል ሐላፊ ያካተተ ሲሆን ዕጩዎችን ከስራ አስፈጻሚው በመቀበል የማጣራትና የመገምገም እንዲሁም የምርጫውን ፕሮግራም የመምራት ኃላፊነት ይኖረዋል። ምርጫው ሲጨረስ ደግሞ፣ የምርጫ አካሄድ ሪፖርት ለሀገረ ስብከቱ ያቀርባል።</li>
          <li><strong>10.2. ለዕጩነት የሚያበቁ መስፈርቶች</strong>
            <ul className="list-circle list-inside ml-8">
              <li>በመንፈሳዊ ሕይወቱ (በንስሐ እና የቁርባን ሕይወቱ) የታወቀ።</li>
              <li>ቢያንስ የ"ጉባኤ ሐዋርያት" ትምህርትን ያጠናቀቀ።</li>
              <li>በትምህርቱ (Academic) ውጤታማና ለሌሎች አርአያ መሆን የሚችል ተማሪ።</li>
              <li>በሥራ አስፈጻሚነት ለመመረጥ ቢያንስ አንድ ዓመት በንዑስ ክፍል አስተባባሪነት ያገለገለ መሆን አለበት።</li>
              <li>በአገልግሎት ዘመኑ ለመስክ ተልእኮ ከግቢ የማይወጣ እንዲሁም ደግሞ 2ኛ ዓመት ያልሆነ መሆን አለበት።</li>
            </ul>
          </li>
          <li><strong>10.3. የምርጫ ሂደት</strong>
            <ul className="list-circle list-inside ml-8">
              <li>የሥራ አስፈጻሚ አባላት የአገልግሎት ዘመን አንድ (1) ዓመት ይሆናል።</li>
              <li>አንድ የስራ አስፈጻሚ አባል ከሁለት ግዜ በላይ ሊመረጥ አይችልም።</li>
              <li>አዲሱ የሚመረጠው የስራ አመራር ጽ/ቤት ከነባሩ ስራ አመራር አባላት ብቻ ይሆናል።</li>
              <li>የክፍላት ተጠሪዎች እንዲሁም የኦዲትና ኢንስፔክሽን ሐላፊ ከየክፍሉ ተመርጠው በስራ አመራሩም ተቀባይነት ያገኙ ዕጩዎች ወደ ጠቅላላ ጉባኤው በማቅረብ የሚመረጡ ይሆናል።</li>
              <li>የምርጫው ውጤት በሀገረ ስብከቱ ታውቆ ማረጋገጫ ማግኘት ይኖርበታል።</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ሰባት – የአባላት ሥነ-ምግባርና ዲሲፕሊን</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 11፦</strong> የጥፋት ደረጃዎችና የቅጣት እርምጃዎች</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>11.1. ቀላል ጥፋቶች፦</strong> ያለበቂ ምክንያት ከመደበኛ ትምህርትና መርሐግብር በተደጋጋሚ መቅረት፣ መዘግየት፣ ወርሃዊ መዋጮ እስከ 3 ወር አለመክፈል እና ሌሎች ቀላል ስሕተቶች።
            <ul className="list-circle list-inside ml-8">
              <li>መጀመርያ ደረጃ፦ የቃል ምክር በክፍል ተጠሪው በኩል ይሰጣል።</li>
              <li>ሁለተኛ ደረጃ፦ የቃል ምክር በአባላት ጉዳይ በኩል ይሰጣል።</li>
              <li>ሶስተኛ ደረጃ፦ በክፍሉ መተዳደርያ ደንብ መሰረት የአገልግሎት እገዳ ወይም ደግሞ ሌላ አስተማሪ ቅጣት ሊጣልበት ይችላል።</li>
            </ul>
          </li>
          <li><strong>11.2. ከባድ ጥፋቶች፦</strong> በቤተ ክርስቲያን አስተምህሮ ላይ መሳለቅ፣ ስሑት ትምህርት ማስተማር፣ በቡድን ተከፋፍሎ ግጭት መፍጠር፣ ምስጢር አሳልፎ መስጠት፣ በገንዘብና ንብረት ላይ ታማኝነት ማጣት።
            <ul className="list-circle list-inside ml-8">
              <li>መጀመርያ ደረጃ፦ በሥራ አስፈጻሚው ተወስኖ በጽሑፍ ማስጠንቀቂያ መስጠት።</li>
              <li>ሁለተኛ ደረጃ፦ ለተወሰነ ጊዜ ከአገልግሎት ማገድ ወይም ለጠቅላላ ጉባኤ አቅርቦ እንዲሰናበት ማድረግና ለሀገረ ስብከቱ ማሳወቅ።</li>
            </ul>
          </li>
          <li><strong>11.3. የእርምጃ አወሳሰድ አካሄድ፦</strong> ጥፋት በፈጸመ አባል ላይ እርምጃ ከመወሰዱ በፊት አባሉን በአካል አግኝቶ ነገሩን ማስረዳትና ሐሳቡን እንዲገልጽ ማድረግ ይገባል።</li>
          <li><strong>11.4.</strong> በከፍተኛ የአገልግሎት እርከን ላይ ያለ አገልጋይ ከባድ ጥፋት ቢፈጽም፣ ከኃላፊነቱ ከመታገድ በተጨማሪ ለተወሰነ ጊዜ ወደ አነስተኛ የአገልግሎት እርከን ዝቅ እንዲል ሊደረግ ይችላል።</li>
          <li><strong>11.5.</strong> በሥራ አስፈጻሚ አባል ላይ የሚወሰድ ማንኛዉም እርምጃ ለሀገረ ስብከቱ የግቢ ጉባኤ አስተባባሪ ኮሚቴ በደብዳቤ አሳውቆ፣ ተቀባይነት ማግኘት ይኖርበታል። ተቀባይነት የማያገኝ ከሆነ ግን የሀገረ ስብከቱ ተወካይ ባለበት የስራ አስፈጻሚ ስብሰባ በማድረግ ነገሩን በድጋሜ ይታያል።</li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ስምንት – የስብሰባ ሥርዓትና የፋይናንስ መመሪያ</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 12፦</strong> የስብሰባ አይነቶች</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          <li><strong>12.1. የሥራ አስፈጻሚ ስብሰባ፦</strong> ቢያንስ በየ15 ቀን አንድ ጊዜ ይካሄዳል። ምላዓተ ጉባኤ የሚሟላው ከግማሽ በላይ አባላት ሲገኙ ነው።</li>
          <li><strong>12.2. የጠቅላላ ጉባኤ ስብሰባ፦</strong> በዓመት ሁለት ጊዜ (በየሴሚስተሩ) ይካሄዳል። ለአባሉ ሊመች ይችላል ተብሎ በታመነበት ቀን የሚካሄድ ሲሆን የስብሰባው ማስታወቅያ ከአንድ ሳምንት በፊት ከተነገረ በኋላ በተገኘው አባል ሊደረግ ይችላል።</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 13፦</strong> የፋይናንስና የንብረት አያያዝ</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>13.1. የገንዘብ አጠቃቀም፦</strong> ማንኛውም ወጪ በሥራ አስፈጻሚው ታቅዶ በቃለ-ጉባኤ ከጸደቀ በኋላ በሰብሳቢውና በሒሳብ ሹሙ ፊርማ ብቻ ወጪ ይሆናል።</li>
          <li><strong>13.2.</strong> ከ1,000 ብር በላይ የሆኑ ክፍያዎች በባንክ ዝውውር ወይም ደግሞ በደረሰኝ እንዲፈጸሙ ይበረታታል።</li>
          <li><strong>13.3. የንብረት ኦዲት፦</strong> የኦዲት ክፍሉ በየሦስት ወሩ መደበኛ የንብረት ምርመራ በማድረግ ለሥራ አስፈጻሚው ሪፖርት ያቀርባል።</li>
        </ul>
      </div>

      <div className="bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">ክፍል ዘጠኝ – ማጠቃለያ ድንጋጌዎች</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 14፦</strong> መመሪያውን ስለማሻሻል</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2 ml-4">14.1. ይህ መመሪያ ሊሻሻል የሚችለው በሥራ አስፈጻሚው ወደ ጠቅላላ ጉባኤው ቀርቦ 2/3ኛ ድምፅ ሲደገፍ ብቻ ነው።</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>አንቀጽ 15፦</strong> መመሪያው የሚጸናበት ጊዜ</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2 ml-4">15.1. ይህ የውስጠ ደንብና የአሠራር መመሪያ ከዛሬ ______ ቀን ______ ዓ.ም ጀምሮ የጸና ይሆናል።</p>
      </div>

      <div className="text-center text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-6 py-4 border-t border-gray-200 dark:border-gray-700">
        ረድኤተ እግዚአብሔር አይለየን አሜን!
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main AboutPage Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "ጠቅላላ", icon: Info, color: "from-amber-600 to-amber-700" },
    { id: "service", label: "የአገልግሎት ክፍሎች", icon: Users, color: "from-red-700 to-red-800" },
    { id: "law", label: "የውስጠ ደንብ", icon: FileCheck, color: "from-purple-600 to-purple-700" },
  ];
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.5s ease-out forwards;
  }
`;
  return (
    <div className="max-w-7xl mx-auto">
      <style>{styles}</style>
    {/* Tab Navigation - Improved spacing & no wrap on mobile */}
{/* Tab Navigation - Sticky with better top offset */}
<div className="sticky top-16 z-40 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-gray-200 dark:border-[#2a2a2d] p-1 shadow-lg">
  <div className="flex flex-nowrap justify-center gap-1 overflow-x-auto scrollbar-hide">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-1 px-2 py-1.5 sm:px-5 sm:py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-[11px] sm:text-sm ${
          activeTab === tab.id
            ? `bg-gradient-to-r ${tab.color} text-white shadow-md scale-105`
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#252529] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37]"
        }`}
      >
        <tab.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
        {tab.label}
      </button>
    ))}
  </div>
</div>
      {/* Tab Content */}
      <div className="bg-white dark:bg-[#1C1C1F] rounded-3xl border border-gray-200 dark:border-[#2a2a2d] p-6 md:p-8 shadow-2xl transition-all duration-500">
        {activeTab === "general" && <GeneralTab />}
        {activeTab === "service" && <ServiceTab />}
        {activeTab === "law" && <LawTab />}
      </div>
    </div>
  );
}