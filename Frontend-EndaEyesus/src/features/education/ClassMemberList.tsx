"use client";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  UserPlus,
  GraduationCap,
  Mail,
  IdCard,
  Loader2,
  ChevronRight,
  ChevronDown,
  Phone,
  Calendar,
  MapPin,
  Church,
  Heart,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ---------- Sacred Background (same as SubjectManager) ----------
const SacredBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0]/90 via-[#FFF9F0]/70 to-[#EDE5D8]/90 dark:from-[#0E0E0F] dark:via-[#1A1816] dark:to-[#0A0A0B]" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="crossPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A227]" />
          <circle cx="50" cy="50" r="4" fill="currentColor" className="text-[#7A1C1C]" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crossPattern)" />
    </svg>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A1C1C]/10 rounded-full blur-3xl animate-pulse delay-700" />
  </div>
);

// Helper: format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("am-ET", { year: "numeric", month: "long", day: "numeric" });
};

// Helper component for detail items
const DetailItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-[#ddd8d0]/50 dark:border-[#2a2a2d]/50">
    <Icon className="h-4 w-4 text-[#C9A227] mt-0.5" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  </div>
);

export default function ClassMemberList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubClassId, setSelectedSubClassId] = useState("");

  const { data: members, isLoading } = useQuery({
    queryKey: ["education", "class-members"],
    queryFn: async () => { const res = await educationApi.getEducationClassMembers(); return res.data; },
  });

  const { data: subClasses } = useQuery({
    queryKey: ["member-affairs", "sub-classes", "education-class"],
    queryFn: async () => {
      const res = await fetch("/api/v1/member-affairs/sub-classes/current-education-class", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: dialogOpen,
  });

  const filteredMembers = useMemo(() => {
    if (!members) return [];
    return members.filter((member: any) => {
      const fullName = member.full_name_three_parts?.toLowerCase() || "";
      const email = member.email?.toLowerCase() || "";
      const universityId = member.university_id?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      return fullName.includes(term) || email.includes(term) || universityId.includes(term);
    });
  }, [members, searchTerm]);

  const toggleExpand = (memberId: string) => setExpandedMemberId(expandedMemberId === memberId ? null : memberId);
  const handleAssignClick = (member: any) => { setSelectedMember(member); setSelectedSubClassId(""); setDialogOpen(true); };
  const handleConfirmAssign = () => {
    if (!selectedSubClassId || !selectedMember) return;
    fetch(`/api/v1/member-affairs/sub-classes/${selectedSubClassId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ userId: selectedMember.id }),
    })
      .then((res) => { if (res.ok) { alert(`✅ ${selectedMember.full_name_three_parts} በስኬት ተመድቧል።`); setDialogOpen(false); } else alert("❌ ምደባው አልተሳካም። እባክዎ ይሞክሩ።"); })
      .catch(() => alert("❌ የኔትዎርክ ስህተት።"));
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-10 w-10 animate-spin text-[#C9A227]" /></div>;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section (same as SubjectManager) */}
 <div className="text-center mb-1">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#C9A227]/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[#C9A227]/30">
            <GraduationCap className="h-4 w-4 text-[#C9A227]" />
            <span className="text-sm font-medium text-[#7A1C1C] dark:text-[#D4AF37]">የትምህርት ክፍል አባላት</span>
          </motion.div>
        </div>
        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="ፈልግ በሙሉ ስም፣ ኢሜይል ወይም ዩኒቨርሲቲ መታወቂያ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white/80 dark:bg-[#1C1C1F]/80 backdrop-blur-sm border-[#C9A227]/40 focus:border-[#C9A227] transition-all" />
        </div>

        {/* Members Table */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-20 bg-white/60 dark:bg-black/20 rounded-3xl backdrop-blur-sm border border-dashed border-[#C9A227]/40">
            <Users className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground">ምንም አባል አልተገኘም</h3>
            <p className="text-muted-foreground mt-2">ከላይ ያለውን የፍለጋ ቃል ቀይረው ይሞክሩ</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-white/70 dark:bg-[#1C1C1F]/70 backdrop-blur-sm shadow-xl">
            <table className="min-w-full divide-y divide-[#ddd8d0] dark:divide-[#2a2a2d]">
              <thead className="bg-gradient-to-r from-[#7A1C1C]/5 to-[#C9A227]/5 dark:from-[#7A1C1C]/10 dark:to-[#D4AF37]/10">
                <tr><th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A1C1C] dark:text-[#D4AF37]">አባል</th><th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A1C1C] dark:text-[#D4AF37]">ኢሜይል</th><th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A1C1C] dark:text-[#D4AF37]">መታወቂያ</th><th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A1C1C] dark:text-[#D4AF37]">ዝርዝር</th><th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#7A1C1C] dark:text-[#D4AF37]">ድርጊት</th></tr>
              </thead>
              <tbody className="divide-y divide-[#ddd8d0] dark:divide-[#2a2a2d]">
                {filteredMembers.map((member: any) => (
                  <Fragment key={member.id}>
                    <tr className="group hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors duration-200 cursor-pointer" onClick={() => toggleExpand(member.id)}>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-3"><Avatar className="h-10 w-10 border-2 border-[#C9A227]"><AvatarFallback className="bg-gradient-to-br from-[#7A1C1C] to-[#C9A227] text-white font-bold">{member.full_name_three_parts.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()}</AvatarFallback></Avatar><span className="font-medium text-foreground">{member.full_name_three_parts}</span></div></td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{member.university_id || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><Button variant="ghost" size="sm" className="gap-1 text-[#C9A227] hover:text-[#B8911A]" onClick={(e) => { e.stopPropagation(); toggleExpand(member.id); }}>{expandedMemberId === member.id ? <><ChevronDown className="h-4 w-4" /> ዝጋ</> : <><ChevronRight className="h-4 w-4" /> ዘርጋ</>}</Button></td>
                      <td className="px-6 py-4 whitespace-nowrap"><Button size="sm" className="bg-[#C9A227] hover:bg-[#B8911A] text-white shadow-sm" onClick={(e) => { e.stopPropagation(); handleAssignClick(member); }}><UserPlus className="h-4 w-4 mr-1" /> መድብ</Button></td>
                    </tr>
                    {expandedMemberId === member.id && (
                      <tr className="bg-[#F8F5F0]/50 dark:bg-[#252529]/50">
                        <td colSpan={5} className="px-6 py-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <DetailItem icon={Phone} label="ስልክ ቁጥር" value={member.phone_number || "—"} />
                            <DetailItem icon={Calendar} label="የተመዘገበበት ቀን" value={formatDate(member.created_at)} />
                            <DetailItem icon={GraduationCap} label="አካዳሚክ ዘመን" value={member.academic_year || "—"} />
                            <DetailItem icon={MapPin} label="የማደሪያ ክፍል" value={`${member.dorm_block || "—"} / ${member.dorm_room || "—"}`} />
                            <DetailItem icon={Church} label="የአባልነት ሁኔታ" value={<Badge variant={member.is_active ? "default" : "secondary"}>{member.is_active ? "ንቁ" : "ንቁ አይደለም"}</Badge>} />
                            <DetailItem icon={Heart} label="መንፈሳዊ አባት" value={member.spiritual_father?.full_name_three_parts || "አልተመደበም"} />
                            <DetailItem icon={Heart} label="መንፈሳዊ እናት" value={member.spiritual_mother?.full_name_three_parts || "አልተመደበም"} />
                            <DetailItem icon={Church} label="የንስሐ አባት" value={member.repentance_father?.full_name_three_parts || "አልተመደበም"} />
                            <DetailItem icon={Church} label="የንስሐ ዲያቆን" value={member.repentance_deacon?.full_name_three_parts || "አልተመደበም"} />
                            <DetailItem icon={GraduationCap} label="አካዳሚክ ክፍል" value={member.academic_dept || "—"} />
                          </div>
                          <div className="mt-4 text-center text-xs text-muted-foreground">✙ “እንደ ሰውነት አንድ ሆኖ ብዙ አካላት እንዳሉት፣ እንዲሁም ሁላችን በአንድ መንፈስ ወደ አንድ ሰውነት ተጠመቅን” (1ኛ ቆሮንቶስ 12:12)</div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#1C1C1F] border border-[#C9A227]/40">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-[#7A1C1C] dark:text-[#D4AF37]"><UserPlus className="h-5 w-5" /> ወደ ንዑስ ክፍል መድብ</DialogTitle><DialogDescription>አባል <strong>{selectedMember?.full_name_three_parts}</strong> ን የሚመደቡበትን ንዑስ ክፍል ይምረጡ።</DialogDescription></DialogHeader>
          <div className="py-4"><Select value={selectedSubClassId} onValueChange={setSelectedSubClassId}><SelectTrigger className="w-full"><SelectValue placeholder="ንዑስ ክፍል ይምረጡ" /></SelectTrigger><SelectContent>{subClasses?.map((sub: any) => (<SelectItem key={sub.id} value={sub.id}>{sub.sub_class_name}</SelectItem>))}{(!subClasses || subClasses.length === 0) && <div className="p-2 text-sm text-muted-foreground">ምንም ንዑስ ክፍል የለም</div>}</SelectContent></Select></div>
          <DialogFooter className="flex gap-2"><Button variant="outline" onClick={() => setDialogOpen(false)}>ሰርዝ</Button><Button onClick={handleConfirmAssign} disabled={!selectedSubClassId} className="bg-[#C9A227] hover:bg-[#B8911A] text-white">መድብ</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}