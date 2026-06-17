"use client";

import {
  Church,
  Globe,
  Calendar,
  Users,
  Target,
  Award,
} from "lucide-react";

export default function GeneralTab() {
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