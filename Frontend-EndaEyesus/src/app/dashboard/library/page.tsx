"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LibraryListing from "@/features/library/LibraryListing";

function LibraryContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  return <LibraryListing initialCategory={category} />;
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading library...</div>}>
      <LibraryContent />
    </Suspense>
  );
}