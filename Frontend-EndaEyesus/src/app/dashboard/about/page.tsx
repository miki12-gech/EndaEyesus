"use client";

import { useState } from "react";
import { Info, Users, FileCheck } from "lucide-react";
import GeneralTab from "@/features/about/GeneralTab";
import ServiceTab from "@/features/about/ServiceTab";
import LawTab from "@/features/about/LawTab";

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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "ጠቅላላ", icon: Info, color: "from-amber-600 to-amber-700" },
    { id: "service", label: "የአገልግሎት ክፍሎች", icon: Users, color: "from-red-700 to-red-800" },
    { id: "law", label: "የውስጠ ደንብ", icon: FileCheck, color: "from-purple-600 to-purple-700" },
  ];

  return (
    // Full-width white background – extends beyond parent padding
    <div className="w-full bg-white dark:bg-[#1C1C1F] min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
      <style>{styles}</style>
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
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
        <div className="mt-6 bg-white dark:bg-[#1C1C1F] rounded-3xl border border-gray-200 dark:border-[#2a2a2d] p-6 md:p-8 shadow-2xl transition-all duration-500">
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "service" && <ServiceTab />}
          {activeTab === "law" && <LawTab />}
        </div>
      </div>
    </div>
  );
}