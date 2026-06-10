"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Edit2, Trash2, AlertCircle } from "lucide-react";
import apiClient from "@/api";

interface LibraryItem {
  id: string;
  title: string;
  description?: string;
  drive_url: string;
  category: "SPIRITUAL" | "ACADEMIC" | "OTHER";
  academic_department?: string;
  academic_year?: number;
  course_id?: string;
  document_type?: "TEXTBOOK" | "PAST_EXAM";
  likes_count: number;
  downloads_count: number;
  is_link_broken: boolean;
  created_at: string;
}

interface AdminLibraryManagerProps {
  onItemDeleted?: () => void;
  onItemUpdated?: () => void;
}

export default function AdminLibraryManager({
  onItemDeleted,
  onItemUpdated,
}: AdminLibraryManagerProps) {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  // Fetch all library items
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["library-admin"],
    queryFn: async () => {
      const response = await apiClient.instance.get("/library");
      return response.data.items;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (itemId: string) =>
      apiClient.instance.delete(`/library/${itemId}`),
    onSuccess: () => {
      setShowDeleteConfirm(null);
      refetch();
      onItemDeleted?.();
    },
  });

  const handleEditClick = (item: LibraryItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDeleteClick = (itemId: string) => {
    setShowDeleteConfirm(itemId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">
        Manage Library Resources
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-amber-200">
                <th className="text-left px-4 py-3 font-semibold text-amber-900">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-semibold text-amber-900">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-semibold text-amber-900">
                  Department
                </th>
                <th className="text-center px-4 py-3 font-semibold text-amber-900">
                  Likes
                </th>
                <th className="text-center px-4 py-3 font-semibold text-amber-900">
                  Downloads
                </th>
                <th className="text-center px-4 py-3 font-semibold text-amber-900">
                  Status
                </th>
                <th className="text-center px-4 py-3 font-semibold text-amber-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item: LibraryItem) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 hover:bg-amber-50 transition ${
                    item.is_link_broken ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.drive_url}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.category === "SPIRITUAL"
                          ? "bg-purple-100 text-purple-700"
                          : item.category === "ACADEMIC"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.academic_department || "-"}
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-red-600">
                    {item.likes_count}
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-blue-600">
                    {item.downloads_count}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.is_link_broken ? (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        Broken
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-2 hover:bg-blue-100 rounded-full transition text-blue-600"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-2 hover:bg-red-100 rounded-full transition text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No library resources found.</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={() => {
            setShowEditModal(false);
            setSelectedItem(null);
          }}
          onSuccess={() => {
            refetch();
            onItemUpdated?.();
            setShowEditModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Delete Resource
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this resource? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteMutation.mutate(showDeleteConfirm)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Item Modal Component
interface EditItemModalProps {
  item: LibraryItem;
  onClose: () => void;
  onSuccess: () => void;
}

function EditItemModal({ item, onClose, onSuccess }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description || "",
    drive_url: item.drive_url,
    category: item.category,
    academic_department: item.academic_department || "",
    academic_year: item.academic_year || "",
    course_id: item.course_id || "",
    document_type: item.document_type || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateMutation = useMutation({
    mutationFn: () =>
      apiClient.instance.patch(`/library/${item.id}`, formData),
    onSuccess,
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update item";
      setErrors({ submit: message });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-100 to-orange-100">
          <h2 className="text-2xl font-bold text-amber-900">Edit Resource</h2>
          <button
            onClick={onClose}
            className="text-amber-700 hover:text-amber-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errors.submit}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Drive URL
            </label>
            <input
              type="url"
              name="drive_url"
              value={formData.drive_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="SPIRITUAL">Spiritual</option>
                <option value="ACADEMIC">Academic</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="academic_department"
                value={formData.academic_department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <input
                type="number"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                name="document_type"
                value={formData.document_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select...</option>
                <option value="TEXTBOOK">Textbook</option>
                <option value="PAST_EXAM">Past Exam</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg transition"
            >
              {updateMutation.isPending ? "Updating..." : "Update Resource"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
