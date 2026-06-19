"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAffairsApi, useMemberAffairsClassId } from "./memberAffairsApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  ThumbsUp,
  Star,
  Reply,
  Send,
  RefreshCw,
  Edit,
} from "lucide-react";

const SacredBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 bg-linear-to-br from-[#F8F5F0]/90 via-[#FFF9F0]/70 to-[#EDE5D8]/90 dark:from-[#0E0E0F] dark:via-[#1A1816] dark:to-[#0A0A0B]" />
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="crossPattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#C9A227]"
          />
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="currentColor"
            className="text-[#7A1C1C]"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crossPattern)" />
    </svg>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A1C1C]/10 rounded-full blur-3xl animate-pulse delay-700" />
  </div>
);

const isValidDriveUrl = (url: string) =>
  /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\//.test(url) ||
  /^https:\/\/docs\.google\.com\/(document|presentation|spreadsheets|forms)\/d\//.test(
    url,
  );

export default function PlanReportMatrix() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const userClassId = useMemberAffairsClassId();
  const userRole: string = user?.system_role || user?.role || "";
  const isChairman = userRole === "SECRETARIAT_CHAIRMAN";
  const isSecretariat = [
    "SECRETARIAT_CHAIRMAN",
    "SECRETARIAT_VICE",
    "SECRETARIAT_SECRETARY",
    "SUPER_ADMIN",
  ].includes(userRole);
  const isServiceManager = userRole === "SERVICE_MANAGER";

  const { data: serviceClassesData } = useQuery({
    queryKey: ["service-classes"],
    queryFn: () => memberAffairsApi.getServiceClasses(),
    enabled: !isSecretariat && !userClassId,
  });
  const serviceClasses = serviceClassesData?.data || [];

  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [docType, setDocType] = useState<"PLAN" | "REPORT">("PLAN");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [quarter, setQuarter] = useState("");

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDriveUrl, setEditDriveUrl] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // ---------- Fetch documents ----------
  const fetchDocuments = async (type: "PLAN" | "REPORT") => {
    if (isSecretariat) {
      const res = await memberAffairsApi.getSecretariatDocuments(type);
      return res.data;
    } else {
      const classId = userClassId || selectedClassId;
      if (!classId) return [];
      const res = await memberAffairsApi.getDocuments(classId, type);
      return res.data;
    }
  };

  const { data: plans, refetch: refetchPlans } = useQuery({
    queryKey: [
      "member-affairs",
      "documents",
      "PLAN",
      isSecretariat ? "secretariat" : userClassId || selectedClassId,
    ],
    enabled: true,
    staleTime: 2000,
    refetchOnWindowFocus: true,
    queryFn: () => fetchDocuments("PLAN"),
  });

  const { data: reports, refetch: refetchReports } = useQuery({
    queryKey: [
      "member-affairs",
      "documents",
      "REPORT",
      isSecretariat ? "secretariat" : userClassId || selectedClassId,
    ],
    enabled: true,
    staleTime: 2000,
    refetchOnWindowFocus: true,
    queryFn: () => fetchDocuments("REPORT"),
  });

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      refetchPlans();
      refetchReports();
    }, 5000);
    return () => clearInterval(pollInterval);
  }, [refetchPlans, refetchReports]);

  const handleRefresh = () => {
    refetchPlans();
    refetchReports();
  };

  // ---------- Mutations ----------
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (isSecretariat) {
        return memberAffairsApi.uploadSecretariatDocument({
          document_type: docType,
          title,
          description,
          drive_url: driveUrl,
          academic_year: docType === "PLAN" ? parseInt(academicYear) : null,
          quarter: docType === "REPORT" ? parseInt(quarter) : null,
        });
      } else {
        let finalClassId = userClassId || selectedClassId;
        if (!finalClassId) throw new Error("Please select a service class");
        return memberAffairsApi.uploadDocument(finalClassId, {
          document_type: docType,
          title,
          description,
          drive_url: driveUrl,
          academic_year: docType === "PLAN" ? parseInt(academicYear) : null,
          quarter: docType === "REPORT" ? parseInt(quarter) : null,
        });
      }
    },
    onSuccess: async (data) => {
      await Promise.all([refetchPlans(), refetchReports()]);
      setOpen(false);
      resetForm();
      if (!isSecretariat) {
        try {
          await memberAffairsApi.notifyChairmanOfPendingDocument();
        } catch (error) {
          console.error("Failed to notify chairman:", error);
        }
      } else {
        // Secretariat upload – notify everyone except the uploader
        const doc = data?.data;
        if (doc?.id) {
          try {
            await memberAffairsApi.notifyDocumentApproved({
              documentId: doc.id,
              excludeUserId: user?.id,
            });
          } catch (error) {
            console.error("Failed to notify about new document:", error);
          }
        }
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memberAffairsApi.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "documents"] });
      refetchPlans();
      refetchReports();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      memberAffairsApi.updateDocument(id, data),
    onSuccess: async () => {
      await Promise.all([refetchPlans(), refetchReports()]);
      setEditDialogOpen(false);
      setEditingDoc(null);
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => memberAffairsApi.approveDocument(id),
    onSuccess: async (response: any) => {
      const data = response?.data;
      await Promise.all([refetchPlans(), refetchReports()]);
      try {
        await memberAffairsApi.notifyDocumentApproved({
          documentId: data?.id,
          excludeUserId: user?.id,
        });
      } catch (error) {
        console.error("Failed to notify class managers:", error);
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      memberAffairsApi.rejectDocument(id, reason),
    onSuccess: async (response: any) => {
      const data = response?.data;
      await Promise.all([refetchPlans(), refetchReports()]);
      try {
        await memberAffairsApi.notifyDocumentRejected(
          data?.uploaded_by,
          data?.title || "Document",
          data?.rejection_reason || "No reason provided",
        );
      } catch (error) {
        console.error("Failed to notify of rejection:", error);
      }
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: ({
      docId,
      content,
      parentId,
    }: {
      docId: string;
      content: string;
      parentId?: string;
    }) => memberAffairsApi.addComment(docId, content, parentId),
    onSuccess: async () => {
      await Promise.all([refetchPlans(), refetchReports()]);
      setCommentText("");
      setReplyToId(null);
      try {
        const doc = [...(plans || []), ...(reports || [])].find(
          (d) => d.id === selectedDocId,
        );
        if (doc && doc.uploaded_by !== user?.id) {
          await memberAffairsApi.notifyCommentAdded(
            doc.uploaded_by,
            doc.title || "Document",
          );
        }
      } catch (error) {
        console.error("Failed to notify of comment:", error);
      }
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      memberAffairsApi.deleteComment(commentId),
    onSuccess: async () => {
      await Promise.all([refetchPlans(), refetchReports()]);
    },
  });

  const addReactionMutation = useMutation({
    mutationFn: ({
      docId,
      reactionType,
    }: {
      docId: string;
      reactionType: "LIKE" | "STAR";
    }) => memberAffairsApi.addReaction(docId, reactionType),
    onSuccess: async (response: any) => {
      const data = response?.data;
      await Promise.all([refetchPlans(), refetchReports()]);
      try {
        const doc = [...(plans || []), ...(reports || [])].find(
          (d) => d.id === data?.document_id,
        );
        if (doc && doc.uploaded_by !== user?.id) {
          await memberAffairsApi.notifyReactionAdded(
            doc.uploaded_by,
            doc.title || "Document",
          );
        }
      } catch (error) {
        console.error("Failed to notify of reaction:", error);
      }
    },
  });

  const removeReactionMutation = useMutation({
    mutationFn: (docId: string) => memberAffairsApi.removeReaction(docId),
    onSuccess: async () => {
      await Promise.all([refetchPlans(), refetchReports()]);
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDriveUrl("");
    setAcademicYear("");
    setQuarter("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  const handleDelete = (docId: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(docId);
    }
  };

  const handleEdit = (doc: any) => {
    setEditingDoc(doc);
    setEditTitle(doc.title);
    setEditDescription(doc.description || "");
    setEditDriveUrl(doc.drive_url);
    setEditStatus(doc.status);
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    const payload: any = {
      title: editTitle,
      description: editDescription,
      drive_url: editDriveUrl,
    };
    // Only chairman can change status
    if (isChairman) {
      payload.status = editStatus;
    }
    updateMutation.mutate({ id: editingDoc.id, data: payload });
  };

  const renderDocumentCard = (doc: any) => (
    <Card key={doc.id} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{doc.title}</CardTitle>
            <CardDescription className="text-xs mt-1">
              Uploaded by {doc.uploader?.full_name_three_parts || "Unknown"} •{" "}
              {new Date(doc.created_at).toLocaleDateString()}
              {!isSecretariat && (
                <>
                  <br />
                  <span className="text-muted-foreground">
                    Class: {doc.service_class?.class_name_amharic || "N/A"}
                  </span>
                </>
              )}
            </CardDescription>
          </div>
          {getStatusBadge(doc.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {doc.description && (
          <p className="text-sm text-muted-foreground">{doc.description}</p>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          <a
            href={doc.drive_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ExternalLink className="h-4 w-4" /> View Document
            </Button>
          </a>
          {isChairman && doc.status === "PENDING" && (
            <>
              <Button
                size="sm"
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => approveMutation.mutate(doc.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const reason = prompt("Enter rejection reason:");
                  if (reason) rejectMutation.mutate({ id: doc.id, reason });
                }}
              >
                <XCircle className="h-4 w-4 mr-1" /> Reject
              </Button>
            </>
          )}
          {/* Edit button – visible to uploader or chairman */}
          {(doc.uploaded_by === user?.id || isChairman) && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(doc)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" /> Edit
            </Button>
          )}
          {/* Delete button – visible to uploader or chairman */}
          {(doc.uploaded_by === user?.id || isChairman) && (
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(doc.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-3 pt-2 border-t">
          <button
            onClick={() => {
              const hasLike = doc.reactions?.some(
                (r: any) =>
                  r.user_id === user?.id && r.reaction_type === "LIKE",
              );
              if (hasLike) removeReactionMutation.mutate(doc.id);
              else
                addReactionMutation.mutate({
                  docId: doc.id,
                  reactionType: "LIKE",
                });
            }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-amber-500"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>
              {doc.reactions?.filter((r: any) => r.reaction_type === "LIKE")
                .length || 0}
            </span>
          </button>
          <button
            onClick={() => {
              const hasStar = doc.reactions?.some(
                (r: any) =>
                  r.user_id === user?.id && r.reaction_type === "STAR",
              );
              if (hasStar) removeReactionMutation.mutate(doc.id);
              else
                addReactionMutation.mutate({
                  docId: doc.id,
                  reactionType: "STAR",
                });
            }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-amber-500"
          >
            <Star className="h-4 w-4" />
            <span>
              {doc.reactions?.filter((r: any) => r.reaction_type === "STAR")
                .length || 0}
            </span>
          </button>
          <button
            onClick={() => setSelectedDocId(doc.id)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-amber-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{doc.comments?.length || 0}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#C9A227] hover:bg-[#B8911A]"
          >
            <Plus className="h-4 w-4 mr-2" /> Upload Document
          </Button>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="bg-white/80 dark:bg-[#1C1C1F]/80 backdrop-blur-sm border border-[#ddd8d0] dark:border-[#2a2a2d]">
            <TabsTrigger value="plans">Annual Plans</TabsTrigger>
            <TabsTrigger value="reports">Quarterly Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="plans" className="space-y-6">
            {plans?.length === 0 ? (
              <div className="text-center py-12 bg-white/60 dark:bg-black/20 rounded-2xl border border-dashed border-[#C9A227]/40">
                <p className="text-muted-foreground">No plans found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans?.map(renderDocumentCard)}
              </div>
            )}
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            {reports?.length === 0 ? (
              <div className="text-center py-12 bg-white/60 dark:bg-black/20 rounded-2xl border border-dashed border-[#C9A227]/40">
                <p className="text-muted-foreground">No reports found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports?.map(renderDocumentCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Upload Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Select
                value={docType}
                onValueChange={(v) => setDocType(v as "PLAN" | "REPORT")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLAN">Annual Plan</SelectItem>
                  <SelectItem value="REPORT">Quarterly Report</SelectItem>
                </SelectContent>
              </Select>
              {!isSecretariat && !userClassId && (
                <div>
                  <label className="text-sm font-medium">Service Class</label>
                  <Select
                    value={selectedClassId}
                    onValueChange={setSelectedClassId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceClasses.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.class_name_amharic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Google Drive URL"
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
              />
              {docType === "PLAN" && (
                <Input
                  type="number"
                  placeholder="Academic Year (e.g., 2024)"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                />
              )}
              {docType === "REPORT" && (
                <Select value={quarter} onValueChange={setQuarter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Quarter 1</SelectItem>
                    <SelectItem value="2">Quarter 2</SelectItem>
                    <SelectItem value="3">Quarter 3</SelectItem>
                    <SelectItem value="4">Quarter 4</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {driveUrl && !isValidDriveUrl(driveUrl) && (
                <p className="text-red-500 text-sm">
                  Invalid Google Drive/Docs URL
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => uploadMutation.mutate()}
                disabled={
                  uploadMutation.isPending ||
                  (!isSecretariat && !userClassId && !selectedClassId)
                }
                className="bg-[#C9A227]"
              >
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <Input
                placeholder="Google Drive URL"
                value={editDriveUrl}
                onChange={(e) => setEditDriveUrl(e.target.value)}
              />
              {isChairman && (
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
                className="bg-[#C9A227]"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Comments Dialog – unchanged */}
        <Dialog
          open={!!selectedDocId}
          onOpenChange={() => setSelectedDocId(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40">
            <DialogHeader>
              <DialogTitle>Comments & Discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {(() => {
                const doc = [...(plans || []), ...(reports || [])].find(
                  (d) => d.id === selectedDocId,
                );
                if (!doc) return null;
                return (
                  <div className="space-y-4">
                    {doc.comments?.map((comment: any) => (
                      <div
                        key={comment.id}
                        className="flex gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {comment.user?.full_name_three_parts?.charAt(0) ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-sm">
                              {comment.user?.full_name_three_parts}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setReplyToId(comment.id)}
                              className="h-7 px-2 text-xs"
                            >
                              <Reply className="h-3 w-3 mr-1" /> Reply
                            </Button>
                            {(comment.user_id === user?.id || isChairman) && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  deleteCommentMutation.mutate(comment.id)
                                }
                                className="h-7 px-2 text-xs text-red-500"
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                          {doc.comments
                            .filter((c: any) => c.parent_id === comment.id)
                            .map((reply: any) => (
                              <div
                                key={reply.id}
                                className="ml-8 mt-3 pl-3 border-l-2 border-[#C9A227]"
                              >
                                <div className="flex gap-3">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>
                                      {reply.user?.full_name_three_parts?.charAt(
                                        0,
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="font-medium text-xs">
                                      {reply.user?.full_name_three_parts}
                                    </p>
                                    <p className="text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3 mt-4">
                      <Textarea
                        placeholder={
                          replyToId ? "Write a reply..." : "Write a comment..."
                        }
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() =>
                          addCommentMutation.mutate({
                            docId: selectedDocId!,
                            content: commentText,
                            parentId: replyToId || undefined,
                          })
                        }
                        disabled={!commentText.trim()}
                        className="self-end bg-[#C9A227]"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    {replyToId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyToId(null)}
                      >
                        Cancel reply
                      </Button>
                    )}
                  </div>
                );
              })()}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}