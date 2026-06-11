import { Suspense } from "react";
import MemberAffairsContent from "./MemberAffairsContent";

export default function MemberAffairsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Loading...</div>}>
      <MemberAffairsContent />
    </Suspense>
  );
}