//src/features/library/LibraryListing.tsx
"use client";
import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Download, Heart, Eye, FileText, File, Image, FileArchive, Film, Music, Cross, BookOpen } from "lucide-react";
import apiClient from "@/api";
import DocumentViewer from "./DocumentViewer";

interface LibraryItem {
  id: string;
  title: string;
  description?: string;
  drive_url: string;
  drive_file_id?: string;
  preview_url?: string;
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

interface FilterOptions {
  category?: string;
  department?: string;
  academic_year?: number;
  course_id?: string;
  document_type?: string;
  search?: string;
}

// Helper to extract file ID from various Google Drive / Docs URLs
function extractGoogleFileId(url: string): string | null {
  // Pattern for /file/d/{id}/view or /preview
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
  if (match) return match[1];
  // Pattern for /open?id={id}
  match = url.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // Pattern for docs.google.com/document/d/{id}/edit
  match = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)\//);
  if (match) return match[1];
  // Pattern for docs.google.com/presentation/d/{id}/edit
  match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)\//);
  if (match) return match[1];
  // Pattern for docs.google.com/spreadsheets/d/{id}/edit
  match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\//);
  if (match) return match[1];
  // Pattern for docs.google.com/forms/d/{id}/viewform
  match = url.match(/\/forms\/d\/([a-zA-Z0-9_-]+)\//);
  if (match) return match[1];
  return null;
}

// Generate thumbnail URL from file ID (Google Drive thumbnail API)
function getThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
}

// Determine file type and return a human‑readable label and icon
function getFileTypeInfo(url: string): { label: string; icon: JSX.Element; bgClass: string } {
  const lower = url.toLowerCase();
  if (lower.includes('.pdf')) return { label: 'PDF', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' };
  if (lower.includes('.doc') || lower.includes('.docx')) return { label: 'DOC', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' };
  if (lower.includes('.ppt') || lower.includes('.pptx') || lower.includes('presentation')) return { label: 'PPT', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' };
  if (lower.includes('.xls') || lower.includes('.xlsx') || lower.includes('spreadsheet')) return { label: 'XLS', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' };
  if (lower.includes('.jpg') || lower.includes('.jpeg') || lower.includes('.png') || lower.includes('.gif')) return { label: 'IMAGE', icon: <Image className="w-8 h-8" />, bgClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' };
  if (lower.includes('.zip') || lower.includes('.rar') || lower.includes('.7z')) return { label: 'ARCHIVE', icon: <FileArchive className="w-8 h-8" />, bgClass: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300' };
  if (lower.includes('.mp4') || lower.includes('.mov') || lower.includes('.avi')) return { label: 'VIDEO', icon: <Film className="w-8 h-8" />, bgClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' };
  if (lower.includes('.mp3') || lower.includes('.wav')) return { label: 'AUDIO', icon: <Music className="w-8 h-8" />, bgClass: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' };
  if (lower.includes('docs.google.com/document')) return { label: 'GOOGLE DOC', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' };
  if (lower.includes('docs.google.com/presentation')) return { label: 'GOOGLE SLIDES', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' };
  if (lower.includes('docs.google.com/spreadsheets')) return { label: 'GOOGLE SHEETS', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' };
  if (lower.includes('docs.google.com/forms')) return { label: 'GOOGLE FORM', icon: <FileText className="w-8 h-8" />, bgClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' };
  return { label: 'FILE', icon: <File className="w-8 h-8" />, bgClass: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300' };
}

export default function LibraryListing({ initialCategory }: { initialCategory?: string }) {
  const [filters, setFilters] = useState<FilterOptions>({ category: initialCategory });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<LibraryItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>(initialCategory || "ALL");
  const [departments, setDepartments] = useState<string[]>([]);
  const [academicYears, setAcademicYears] = useState<number[]>([]);
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["library", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== "ALL") params.append("category", filters.category);
      if (filters.department) params.append("department", filters.department);
      if (filters.academic_year) params.append("academic_year", filters.academic_year.toString());
      if (filters.course_id) params.append("course_id", filters.course_id);
      if (filters.document_type) params.append("document_type", filters.document_type);
      if (filters.search) params.append("search", filters.search);

      const response = await apiClient.instance.get(`/library?${params.toString()}`);
      const items = response.data.items;

      const depts = Array.from(new Set(items.map((i: any) => i.academic_department).filter(Boolean))) as string[];
      const years = Array.from(new Set(items.map((i: any) => i.academic_year).filter(Boolean))) as number[];
      const courses = Array.from(new Set(items.map((i: any) => i.course_id).filter(Boolean))) as string[];
      setDepartments(depts);
      setAcademicYears(years.sort((a, b) => a - b));
      setCourseIds(courses);

      return items;
    },
  });

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (itemId: string) => apiClient.instance.post(`/library/${itemId}/like`, {}),
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey: ["library"] });
      const previous = queryClient.getQueryData<any>(["library", filters]);
      queryClient.setQueryData(["library", filters], (old: any) => {
        if (!old) return old;
        return old.map((it: any) =>
          it.id === itemId ? { ...it, likes_count: (it.likes_count || 0) + 1 } : it
        );
      });
      return { previous };
    },
    onError: (err, itemId, context: any) => {
      if (context?.previous) queryClient.setQueryData(["library", filters], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["library"] }),
  });

  const downloadMutation = useMutation({
    mutationFn: (itemId: string) => apiClient.instance.post(`/library/${itemId}/download`, {}),
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey: ["library"] });
      const previous = queryClient.getQueryData<any>(["library", filters]);
      queryClient.setQueryData(["library", filters], (old: any) => {
        if (!old) return old;
        return old.map((it: any) =>
          it.id === itemId ? { ...it, downloads_count: (it.downloads_count || 0) + 1 } : it
        );
      });
      return { previous };
    },
    onError: (err, itemId, context: any) => {
      if (context?.previous) queryClient.setQueryData(["library", filters], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["library"] }),
  });

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleDownload = async (item: LibraryItem) => {
    await downloadMutation.mutateAsync(item.id);
    window.open(item.drive_url, "_blank");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "ALL") {
      setFilters((prev) => ({ ...prev, category: undefined }));
    } else {
      setFilters((prev) => ({ ...prev, category: tab }));
    }
  };

  useEffect(() => {
    if (!initialCategory || initialCategory === "ALL") {
      setActiveTab("ALL");
      setFilters((prev) => ({ ...prev, category: undefined }));
    } else {
      setActiveTab(initialCategory);
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "SPIRITUAL": return <Cross className="w-5 h-5" />;
      case "ACADEMIC": return <BookOpen className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, description..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        {/* Loading & Error */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        )}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center text-destructive">
            Failed to load resources. Please try again.
          </div>
        )}

        {/* Resource Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: LibraryItem) => {
              const fileId = item.drive_file_id || extractGoogleFileId(item.drive_url);
              const thumbnailUrl = fileId ? getThumbnailUrl(fileId) : null;
              const hasImageError = imageErrors[item.id];
              const fileTypeInfo = getFileTypeInfo(item.drive_url);

              return (
                <div
                  key={item.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail / Fallback Card */}
                  {thumbnailUrl && !hasImageError ? (
                    <div className="relative w-full h-40 bg-muted overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-40 flex flex-col items-center justify-center gap-2 ${fileTypeInfo.bgClass}`}>
                      {fileTypeInfo.icon}
                      <span className="text-xs font-bold uppercase tracking-wide">{fileTypeInfo.label}</span>
                    </div>
                  )}

                  {/* Category Ribbon */}
                  <div className={`px-4 py-2 flex items-center justify-between border-b border-border bg-gradient-to-r ${
                    item.category === "SPIRITUAL" ? "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30" :
                    item.category === "ACADEMIC" ? "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30" :
                    "from-gray-50 to-gray-100 dark:from-gray-800/40 dark:to-gray-700/30"
                  }`}>
                    <div className="flex items-center gap-2">
                      {getIconForCategory(item.category)}
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                    {item.is_link_broken && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">
                        Link Broken
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    )}
                    {item.academic_department && (
                      <div className="text-xs text-muted-foreground mb-3">
                        <span className="inline-block px-2 py-1 bg-muted rounded-md">
                          {item.academic_department} • Year {item.academic_year} • {item.course_id}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => likeMutation.mutate(item.id)}
                          disabled={item.is_link_broken}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition disabled:opacity-50"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{item.likes_count}</span>
                        </button>
                        <button
                          onClick={() => setSelectedPreview(item)}
                          disabled={item.is_link_broken}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-500 transition disabled:opacity-50"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                      </div>
                      <button
                        onClick={() => handleDownload(item)}
                        disabled={item.is_link_broken}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition disabled:opacity-50"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground text-lg">No resources found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )
        )}
      </div>

      {/* Document Viewer Modal */}
      {selectedPreview && (
        <DocumentViewer
          url={selectedPreview.drive_url}
          title={selectedPreview.title}
          isOpen={!!selectedPreview}
          onClose={() => setSelectedPreview(null)}
          isBroken={selectedPreview.is_link_broken}
        />
      )}
    </div>
  );
}