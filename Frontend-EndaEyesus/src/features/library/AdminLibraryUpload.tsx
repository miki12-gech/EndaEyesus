// src/features/library/AdminLibraryUpload.tsx
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api";

interface LibraryItemForm {
  title: string;
  description: string;
  drive_url: string;
  category: "SPIRITUAL" | "ACADEMIC" | "OTHER";
  academic_department?: string;
  academic_year?: number;
  course_id?: string;
  document_type?: "TEXTBOOK" | "PAST_EXAM";
}

export default function AdminLibraryUpload({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState<LibraryItemForm>({
    title: "",
    description: "",
    drive_url: "",
    category: "SPIRITUAL",
    academic_department: "",
    academic_year: undefined,
    course_id: "",
    document_type: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: (data: LibraryItemForm) => apiClient.instance.post("/library", data),
    onSuccess: () => {
      setFormData({
        title: "",
        description: "",
        drive_url: "",
        category: "SPIRITUAL",
        academic_department: "",
        academic_year: undefined,
        course_id: "",
        document_type: undefined,
      });
      setErrors({});
      onSuccess?.();
    },
    onError: (error: any) => {
      setErrors({ submit: error.response?.data?.message || "Failed to create item" });
    },
  });

  // ✅ Updated: accepts Google Drive files, Google Docs, Slides, Sheets, Forms
  const isValidDriveUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?(drive\.google\.com\/file\/d\/|docs\.google\.com\/(document|presentation|spreadsheets|forms)\/d\/)([a-zA-Z0-9_-]+)\/(?:edit|view|preview|viewform)(?:\?.*)?$/;
    return pattern.test(url);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title required";
    if (!formData.drive_url.trim()) newErrors.drive_url = "Google Drive URL required";
    if (!formData.category) newErrors.category = "Category required";
    if (!isValidDriveUrl(formData.drive_url)) newErrors.drive_url = "Invalid Google Drive / Docs URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) createMutation.mutate(formData);
  };

  const updateField = (field: keyof LibraryItemForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && <div className="p-3 bg-red-50 text-red-700 rounded-lg">{errors.submit}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Google Drive / Docs URL *</label>
        <input
          type="url"
          value={formData.drive_url}
          onChange={(e) => updateField("drive_url", e.target.value)}
          placeholder="https://drive.google.com/file/d/.../view  or  https://docs.google.com/presentation/d/.../edit"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">
          Supports: Google Drive files, Google Docs, Sheets, Slides, Forms (publicly shareable)
        </p>
        {errors.drive_url && <p className="text-sm text-red-600 mt-1">{errors.drive_url}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value as LibraryItemForm["category"])}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="SPIRITUAL">Spiritual (መንፈሳዊ)</option>
          <option value="ACADEMIC">Academic (አካዳሚክ)</option>
          <option value="OTHER">Others (ሌሎች)</option>
        </select>
      </div>

      {formData.category === "ACADEMIC" && (
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Department"
            value={formData.academic_department || ""}
            onChange={(e) => updateField("academic_department", e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Academic Year"
            value={formData.academic_year || ""}
            onChange={(e) =>
              updateField("academic_year", e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="px-3 py-2 border rounded-lg"
          />
          <input
            placeholder="Course ID (e.g., CS101)"
            value={formData.course_id || ""}
            onChange={(e) => updateField("course_id", e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={formData.document_type || ""}
            onChange={(e) =>
              updateField(
                "document_type",
                e.target.value === "" ? undefined : (e.target.value as "TEXTBOOK" | "PAST_EXAM")
              )
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Document Type</option>
            <option value="TEXTBOOK">Textbook</option>
            <option value="PAST_EXAM">Past Exam</option>
          </select>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {createMutation.isPending ? "Creating..." : "Create Resource"}
        </button>
      </div>
    </form>
  );
}