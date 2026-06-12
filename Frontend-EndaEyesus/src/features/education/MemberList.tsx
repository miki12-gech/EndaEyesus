"use client";

import { useQuery } from "@tanstack/react-query";
import { memberAffairsApi } from "@/features/member-affairs/memberAffairsApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function MemberList() {
  const { data: members } = useQuery({
    queryKey: ["member-affairs", "members", "education"],
    queryFn: async () => {
      // We need to filter members of Education department. Assuming service_class_id can be obtained.
      const all = await memberAffairsApi.listMembers({});
      // Filter by service class name (you might need to adjust)
      return all.data.filter((m: any) => m.service_classes?.class_name_amharic === "የትምህርት ክፍል");
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>University ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((m: any) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.full_name_three_parts}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.university_id}</TableCell>
                <TableCell>{m.academic_dept}</TableCell>
                <TableCell>{m.academic_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}