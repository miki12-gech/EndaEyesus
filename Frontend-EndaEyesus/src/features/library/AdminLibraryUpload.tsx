"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
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

interface AdminLibraryUploadProps {
  onSuccess?: () => void;
}

export default function AdminLibraryUpload({
  onSuccess,
}: AdminLibraryUploadProps) {
  const [formData, setFormData] = useState<LibraryItemForm>({
    title: "",
    description: "",
    drive_url: "",
    category: "",
    academic_department: "",
    academic_year: undefined,
    course_id: "",
    document_type: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: LibraryItemForm) =>
      apiClient.instance.post("/library", data),
    onSuccess: () => {
      setFormData({
        title: "",
        description: "",
        drive_url: "",
          category: "",
          academic_department: "",
          academic_year: undefined,
        course_id: "",
          document_type: "",
      });
      setErrors({});
      setShowForm(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create library item";
      setErrors({ submit: message });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.drive_url.trim())
      newErrors.drive_url = "Google Drive URL is required";

    if (!formData.category) newErrors.category = "Category is required";

    // Validate Google Drive URL format
    if (formData.drive_url && !isValidGoogleDriveUrl(formData.drive_url)) {
      newErrors.drive_url =
        "Invalid Google Drive URL. Format: https://drive.google.com/file/d/{FILE_ID}/view";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidGoogleDriveUrl = (url: string): boolean => {
    // Accept /view, /preview and open?id=FILE_ID forms
    return /^(?:https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/(?:view|preview)(?:.*)?|https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+))(?:.*)?$/.test(
      url,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createMutation.mutate(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "academic_year" ? parseInt(value) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
      >
        <Upload className="w-4 h-4" />
        Add Resource
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-100 to-orange-100">
          <h2 className="text-2xl font-bold text-amber-900">
            Add Library Resource
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="p-2 hover:bg-amber-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Alert */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errors.submit}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Resource title"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the resource"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Google Drive URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Drive URL *
            </label>
            <input
              type="url"
              name="drive_url"
              value={formData.drive_url}
              onChange={handleInputChange}
              placeholder="https://drive.google.com/file/d/FILE_ID/view"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.drive_url ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              📌 Only public Google Drive URLs are accepted
            </p>
            {errors.drive_url && (
              <p className="text-sm text-red-600 mt-1">{errors.drive_url}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="SPIRITUAL">Spiritual (መንፈሳዊ)</option>
              <option value="ACADEMIC">Academic (አካዳሚክ)</option>
              <option value="OTHER">Others (ሌሎች)</option>
            </select>
          </div>

          {/* Grid for optional fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="academic_department"
                value={formData.academic_department || ""}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <input
                type="number"
                name="academic_year"
                value={formData.academic_year || ""}
                onChange={handleInputChange}
                placeholder="2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Course ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID
              </label>
              <input
                type="text"
                name="course_id"
                value={formData.course_id || ""}
                onChange={handleInputChange}
                placeholder="e.g., CS101"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                name="document_type"
                value={formData.document_type || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select type...</option>
                <option value="TEXTBOOK">Textbook</option>
                <option value="PAST_EXAM">Past Exam</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg transition font-medium"
            >
              {createMutation.isPending ? "Creating..." : "Create Resource"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
