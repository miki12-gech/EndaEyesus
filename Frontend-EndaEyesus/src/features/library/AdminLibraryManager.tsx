"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Edit2, Trash2, AlertCircle, Loader2, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

// 1. Properly typed global variants for the table rows
const tableRowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export default function AdminLibraryManager({
  onItemDeleted,
  onItemUpdated,
}: AdminLibraryManagerProps) {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: items, isLoading, refetch } = useQuery({
    queryKey: ["library-admin"],
    queryFn: async () => {
      const response = await apiClient.instance.get("/library");
      return response.data.items;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: string) => apiClient.instance.delete(`/library/${itemId}`),
    onSuccess: () => {
      setShowDeleteConfirm(null);
      refetch();
      onItemDeleted?.();
    },
  });

  // 2. Real-time filtering logic for the new search bar
  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!searchTerm) return items;
    
    const lowerTerm = searchTerm.toLowerCase();
    return items.filter((item: LibraryItem) => 
      item.title.toLowerCase().includes(lowerTerm) ||
      item.academic_department?.toLowerCase().includes(lowerTerm) ||
      item.category.toLowerCase().includes(lowerTerm)
    );
  }, [items, searchTerm]);

  return (
    <div className="relative bg-white dark:bg-[#1C1C1F] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-[#ddd8d0] dark:border-[#2a2a2d] overflow-hidden transition-colors duration-500">
      
      {/* Decorative Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7A1C1C] via-[#C9A227] to-[#7A1C1C] opacity-80" />

      <div className="p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-gray-100 tracking-wide">
            Manage Library Resources
          </h2>
        </div>

        {/* 3. Search Bar: Positioned relative with z-index to prevent hiding under global navbars */}
        <div className="relative z-20 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search archives by title, department, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#C9A227] animate-spin mb-4" />
            <p className="text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400">Loading Archives...</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <motion.table 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-full text-left border-collapse"
            >
              <thead>
                <tr className="border-b border-[#ddd8d0] dark:border-[#2a2a2d]">
                  {["Title", "Category", "Department", "Likes", "Downloads", "Status", "Actions"].map((head, i) => (
                    <th key={i} className="px-4 py-4 text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item: LibraryItem) => (
                  <motion.tr
                    variants={tableRowVariants}
                    key={item.id}
                    className={`group border-b border-gray-100 dark:border-[#2a2a2d]/50 hover:bg-[#faf8f5] dark:hover:bg-[#232326] transition-colors duration-300 ${
                      item.is_link_broken ? "opacity-60 grayscale-50" : ""
                    }`}
                  >
                    <td className="px-4 py-4 max-w-62.5">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{item.drive_url}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                        item.category === "SPIRITUAL" 
                          ? "bg-[#7A1C1C]/10 text-[#7A1C1C] border-[#7A1C1C]/20 dark:bg-[#7A1C1C]/20 dark:text-[#ffb3b3]" 
                          : item.category === "ACADEMIC"
                          ? "bg-[#C9A227]/10 text-[#a38016] border-[#C9A227]/20 dark:bg-[#C9A227]/20 dark:text-[#ffe082]"
                          : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.academic_department || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{item.likes_count}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{item.downloads_count}</td>
                    <td className="px-4 py-4">
                      {item.is_link_broken ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">
                          <AlertCircle className="w-3.5 h-3.5" /> Broken
                        </div>
                      ) : (
                        <span className="inline-flex px-3 py-1 bg-green-100/50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => { setSelectedItem(item); setShowEditModal(true); }}
                          className="p-2 text-gray-500 hover:text-[#C9A227] hover:bg-[#C9A227]/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 font-serif text-lg">
                  {searchTerm ? "No documents matched your search." : "No sacred texts or documents found."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Elegant Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedItem && (
          <EditItemModal
            item={selectedItem}
            onClose={() => { setShowEditModal(false); setSelectedItem(null); }}
            onSuccess={() => { refetch(); onItemUpdated?.(); setShowEditModal(false); setSelectedItem(null); }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Overlay */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#1C1C1F] rounded-2xl max-w-sm w-full p-8 shadow-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">Sever Knowledge?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                This action is irreversible. The manuscript will be permanently removed from the archives.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a2d] dark:hover:bg-[#323235] text-gray-800 dark:text-gray-200 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(showDeleteConfirm)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl transition-colors font-medium flex justify-center items-center"
                >
                  {deleteMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component: Formatted Edit Modal
function EditItemModal({ item, onClose, onSuccess }: any) {
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
    mutationFn: () => apiClient.instance.patch(`/library/${item.id}`, formData),
    onSuccess,
    onError: (error: any) => setErrors({ submit: error.response?.data?.message || "Failed to update item" }),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 20, opacity: 0 }}
        className="bg-white dark:bg-[#1C1C1F] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-2xl relative custom-scrollbar"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-[#1C1C1F]/80 backdrop-blur-xl border-b border-[#ddd8d0] dark:border-[#2a2a2d]">
          <h2 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-gray-100 tracking-wide">Edit Manuscript</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a2d] dark:hover:bg-[#323235] rounded-full transition-colors text-gray-500 dark:text-gray-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {errors.submit && <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">{errors.submit}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100" />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3}
                className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100 resize-none" />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Google Drive URL</label>
              <input type="url" name="drive_url" value={formData.drive_url} onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100">
                  <option value="SPIRITUAL">Spiritual</option>
                  <option value="ACADEMIC">Academic</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Department</label>
                <input type="text" name="academic_department" value={formData.academic_department} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100" />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Academic Year</label>
                <input type="number" name="academic_year" value={formData.academic_year} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100" />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Document Type</label>
                <select name="document_type" value={formData.document_type} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#faf8f5] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all outline-none text-gray-900 dark:text-gray-100">
                  <option value="">Select...</option>
                  <option value="TEXTBOOK">Textbook</option>
                  <option value="PAST_EXAM">Past Exam</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
            <button type="submit" disabled={updateMutation.isPending}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#7A1C1C] to-[#992626] hover:from-[#5e1515] hover:to-[#7A1C1C] disabled:opacity-50 text-white rounded-xl shadow-lg shadow-[#7A1C1C]/20 transition-all font-medium flex justify-center items-center">
              {updateMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Archive"}
            </button>
            <button type="button" onClick={onClose}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a2d] dark:hover:bg-[#323235] text-gray-800 dark:text-gray-200 rounded-xl transition-colors font-medium">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}