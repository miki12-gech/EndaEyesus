"use client";

import { useQuery } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClassMemberList() {
  const router = useRouter();

  const { data: members, isLoading } = useQuery({
    queryKey: ["education", "class-members"],
    queryFn: async () => {
      const res = await educationApi.getEducationClassMembers();
      return res.data;
    },
  });

  if (isLoading) return <div className="p-4 text-center">Loading class members...</div>;

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>University ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member: any) => (
              <TableRow key={member.id}>
                <TableCell>{member.full_name_three_parts}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.university_id || "—"}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/education/subclasses?memberId=${member.id}`)}
                  >
                    Assign to Sub‑Class
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}