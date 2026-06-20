// src/features/member-affairs/SpiritualAssignments.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAffairsApi } from "./memberAffairsApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Users, UserPlus, Shield, Filter } from "lucide-react";
import { useState } from "react";

// Helper to get the correct role label
function getRoleLabel(role: string): string {
  switch (role) {
    case "repentance_father_id":
      return "Repentance Father";
    case "repentance_deacon_id":
      return "Coordinator Deacon";
    case "spiritual_father_id":
      return "Spiritual Father";
    case "spiritual_mother_id":
      return "Spiritual Mother";
    default:
      return role;
  }
}

export default function SpiritualAssignments() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("unassigned");
  const [filterType, setFilterType] = useState<"priest" | "spiritual_father" | "spiritual_mother">("priest");
  const [selectedMentorId, setSelectedMentorId] = useState<string>("all");

  // Fetch unassigned members (missing at least one spiritual role)
  const { data: unassigned, isLoading: loadingUnassigned } = useQuery({
    queryKey: ["member-affairs", "unassigned-spiritual"],
    queryFn: async () => {
      const res = await memberAffairsApi.getUnassignedSpiritual();
      return res.data;
    },
  });

  // Fetch all members with spiritual assignments (for assigned tab)
  const { data: allMembers, isLoading: loadingAll } = useQuery({
    queryKey: ["member-affairs", "members-with-spiritual"],
    queryFn: async () => {
      const res = await memberAffairsApi.listMembers({});
      return res.data;
    },
  });

  // Fetch candidates for dropdowns (priests, deacons, etc.)
  const { data: priests } = useQuery({
    queryKey: ["spiritual-candidates", "priest"],
    queryFn: async () => {
      const res = await memberAffairsApi.getSpiritualCandidates("priest");
      return res.data;
    },
  });
  const { data: deacons } = useQuery({
    queryKey: ["spiritual-candidates", "deacon"],
    queryFn: async () => {
      const res = await memberAffairsApi.getSpiritualCandidates("deacon");
      return res.data;
    },
  });
  const { data: spiritualCandidates } = useQuery({
    queryKey: ["spiritual-candidates", "spiritual"],
    queryFn: async () => {
      const res = await memberAffairsApi.getSpiritualCandidates("spiritual");
      return res.data;
    },
  });

  const maleCandidates = spiritualCandidates?.filter((c: any) => c.sex === "MALE") || [];
  const femaleCandidates = spiritualCandidates?.filter((c: any) => c.sex === "FEMALE") || [];

  // Mutation to assign a spiritual role
  const assignMutation = useMutation({
    mutationFn: ({ memberId, role, valueId }: { memberId: string; role: string; valueId: string }) =>
      memberAffairsApi.assignSpiritual(memberId, role, valueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "unassigned-spiritual"] });
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "members-with-spiritual"] });
    },
  });

  if (loadingUnassigned || loadingAll) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A227]" />
      </div>
    );
  }

  // Prepare data for assigned tab: filter by selected mentor
  let assignedMembers: any[] = allMembers || [];
  if (selectedMentorId !== "all") {
    assignedMembers = assignedMembers.filter((m: any) => {
      if (filterType === "priest") return m.repentance_father_id === selectedMentorId;
      if (filterType === "spiritual_father") return m.spiritual_father_id === selectedMentorId;
      if (filterType === "spiritual_mother") return m.spiritual_mother_id === selectedMentorId;
      return false;
    });
  }

  // Helper to get mentor name by ID
  const getMentorName = (id: string | null) => {
    if (!id) return "—";
    const all = [...(priests || []), ...(deacons || []), ...maleCandidates, ...femaleCandidates];
    const mentor = all.find((m: any) => m.id === id);
    return mentor?.full_name_three_parts || "Unknown";
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white dark:bg-[#1C1C1F] border border-border">
          <TabsTrigger value="unassigned" className="data-[state=active]:bg-[#7A1C1C] data-[state=active]:text-white dark:data-[state=active]:bg-[#D4AF37] dark:data-[state=active]:text-black">
            <Users className="h-4 w-4 mr-2" /> Unassigned Members
          </TabsTrigger>
          <TabsTrigger value="assigned" className="data-[state=active]:bg-[#7A1C1C] data-[state=active]:text-white dark:data-[state=active]:bg-[#D4AF37] dark:data-[state=active]:text-black">
            <Shield className="h-4 w-4 mr-2" /> Assigned Members
          </TabsTrigger>
        </TabsList>

        {/* Unassigned Tab */}
        <TabsContent value="unassigned">
          <Card>
            <CardHeader>
              <CardTitle>Members Missing Spiritual Guides</CardTitle>
              <CardDescription>
                These members are missing one or more spiritual roles. Assign mentors using the buttons below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {unassigned?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">All members have complete spiritual assignments.</div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {unassigned?.map((member: any) => (
                    <div key={member.id} className="border rounded-xl p-5 bg-white dark:bg-[#1C1C1F] shadow-sm">
                      <div className="flex justify-between items-start flex-wrap gap-3">
                        <div>
                          <h4 className="font-semibold text-lg">{member.full_name_three_parts}</h4>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <Badge variant="outline" className="mt-1">{member.service_classes?.class_name_amharic}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.university_id && <span>ID: {member.university_id}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t">
                        {!member.repentance_father_id && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">Missing Repentance Father</span>
                            <Select
                              onValueChange={(val) =>
                                assignMutation.mutate({ memberId: member.id, role: "repentance_father_id", valueId: val })
                              }
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Select priest" />
                              </SelectTrigger>
                              <SelectContent>
                                {priests?.map((p: any) => (
                                  <SelectItem key={p.id} value={p.id}>{p.full_name_three_parts}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {!member.repentance_deacon_id && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">Missing Deacon</span>
                            <Select
                              onValueChange={(val) =>
                                assignMutation.mutate({ memberId: member.id, role: "repentance_deacon_id", valueId: val })
                              }
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Select deacon" />
                              </SelectTrigger>
                              <SelectContent>
                                {deacons?.map((d: any) => (
                                  <SelectItem key={d.id} value={d.id}>{d.full_name_three_parts}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {!member.spiritual_father_id && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">Missing Spiritual Father</span>
                            <Select
                              onValueChange={(val) =>
                                assignMutation.mutate({ memberId: member.id, role: "spiritual_father_id", valueId: val })
                              }
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Select spiritual father" />
                              </SelectTrigger>
                              <SelectContent>
                                {maleCandidates.map((c: any) => (
                                  <SelectItem key={c.id} value={c.id}>{c.full_name_three_parts}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {!member.spiritual_mother_id && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">Missing Spiritual Mother</span>
                            <Select
                              onValueChange={(val) =>
                                assignMutation.mutate({ memberId: member.id, role: "spiritual_mother_id", valueId: val })
                              }
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Select spiritual mother" />
                              </SelectTrigger>
                              <SelectContent>
                                {femaleCandidates.map((c: any) => (
                                  <SelectItem key={c.id} value={c.id}>{c.full_name_three_parts}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assigned Tab */}
        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>Members with Spiritual Assignments</CardTitle>
              <CardDescription>Filter by mentor to see all members under their care.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="w-48">
                  <label className="text-sm font-medium mb-1 block">Filter by</label>
                  <Select value={filterType} onValueChange={(v) => { setFilterType(v as any); setSelectedMentorId("all"); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priest">Repentance Father (Priest)</SelectItem>
                      <SelectItem value="spiritual_father">Spiritual Father</SelectItem>
                      <SelectItem value="spiritual_mother">Spiritual Mother</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-50">
                  <label className="text-sm font-medium mb-1 block">Mentor</label>
                  <Select value={selectedMentorId} onValueChange={setSelectedMentorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="All mentors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All {filterType === "priest" ? "Priests" : filterType === "spiritual_father" ? "Spiritual Fathers" : "Spiritual Mothers"}</SelectItem>
                      {filterType === "priest" && priests?.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>{p.full_name_three_parts}</SelectItem>
                      ))}
                      {filterType === "spiritual_father" && maleCandidates.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.full_name_three_parts}</SelectItem>
                      ))}
                      {filterType === "spiritual_mother" && femaleCandidates.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.full_name_three_parts}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" onClick={() => setSelectedMentorId("all")}>
                  <Filter className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold">Member</th>
                      <th className="text-left py-3 px-2 font-semibold">Service Class</th>
                      <th className="text-left py-3 px-2 font-semibold">Repentance Father</th>
                      <th className="text-left py-3 px-2 font-semibold">Deacon</th>
                      <th className="text-left py-3 px-2 font-semibold">Spiritual Father</th>
                      <th className="text-left py-3 px-2 font-semibold">Spiritual Mother</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedMembers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">No members found for the selected filter.</td>
                      </tr>
                    ) : (
                      assignedMembers.map((member: any) => (
                        <tr key={member.id} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-2 font-medium">{member.full_name_three_parts}</td>
                          <td className="py-3 px-2">{member.service_classes?.class_name_amharic || "—"}</td>
                          <td className="py-3 px-2">{getMentorName(member.repentance_father_id)}</td>
                          <td className="py-3 px-2">{getMentorName(member.repentance_deacon_id)}</td>
                          <td className="py-3 px-2">{getMentorName(member.spiritual_father_id)}</td>
                          <td className="py-3 px-2">{getMentorName(member.spiritual_mother_id)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}