"use client";

export default function LawTab() {
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