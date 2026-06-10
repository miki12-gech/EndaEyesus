"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown } from "lucide-react";

const categories = [
  { name: "All Resources", slug: "", query: "" },
  { name: "Spiritual", slug: "spiritual", query: "category=SPIRITUAL" },
  { name: "Academic", slug: "academic", query: "category=ACADEMIC" },
  { name: "Other", slug: "other", query: "category=OTHER" },
];

export function LibraryNavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
          isOpen
            ? "bg-[#F8F5F0] dark:bg-[#252529] text-[#C9A227] dark:text-[#D4AF37]"
            : "text-[#7A1C1C] dark:text-[#F5F5F5] hover:bg-[#F8F5F0] dark:hover:bg-[#252529]"
        }`}
      >
        <BookOpen className="h-4 w-4" />
        Library
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#1C1C1F] rounded-xl shadow-lg border border-[#ddd8d0] dark:border-[#2a2a2d] overflow-hidden z-[200]">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/dashboard/library${cat.query ? `?${cat.query}` : ""}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#1a1a1a] dark:text-[#F5F5F5] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] hover:text-[#C9A227] dark:hover:text-[#D4AF37] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}