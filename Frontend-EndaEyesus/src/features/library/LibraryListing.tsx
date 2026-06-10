"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Download,
  Heart,
  Filter,
  Eye,
  BookOpen,
  Zap,
  Folder,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import apiClient from "@/api";
import DocumentViewer from "./DocumentViewer";

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

interface FilterOptions {
  category?: string;
  department?: string;
  academic_year?: number;
  course_id?: string;
  document_type?: string;
  search?: string;
}

export default function LibraryListing() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);
  const [academicYears, setAcademicYears] = useState<number[]>([]);
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<LibraryItem | null>(
    null,
  );
  const [expandedCategories, setExpandedCategories] = useState({
    SPIRITUAL: true,
    ACADEMIC: true,
    OTHER: true,
  });

  // Fetch library items with filters
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["library", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.department) params.append("department", filters.department);
      if (filters.academic_year)
        params.append("academic_year", filters.academic_year.toString());
      if (filters.course_id) params.append("course_id", filters.course_id);
      if (filters.document_type)
        params.append("document_type", filters.document_type);
      if (filters.search) params.append("search", filters.search);

      const response = await apiClient.instance.get(
        `/library?${params.toString()}`,
      );
      const items = response.data.items;

      // derive filter option lists from returned items (for cascading filters)
      const depts = Array.from(
        new Set(items.map((i: any) => i.academic_department).filter(Boolean)),
      );
      const years = Array.from(
        new Set(items.map((i: any) => i.academic_year).filter(Boolean)),
      ).sort((a: number, b: number) => a - b);
      const courses = Array.from(
        new Set(items.map((i: any) => i.course_id).filter(Boolean)),
      );

      setDepartments(depts);
      setAcademicYears(years as number[]);
      setCourseIds(courses);

      return items;
    },
  });

  const queryClient = useQueryClient();

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: (itemId: string) =>
      apiClient.instance.post(`/library/${itemId}/like`, {}),
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey: ["library"] });
      const previous = queryClient.getQueryData<any>(["library", filters]);
      queryClient.setQueryData(["library", filters], (old: any) => {
        if (!old) return old;
        return old.map((it: any) =>
          it.id === itemId ? { ...it, likes_count: (it.likes_count || 0) + 1 } : it,
        );
      });
      return { previous };
    },
    onError: (err, itemId, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(["library", filters], context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["library"] }),
  });

  // Download mutation
  const downloadMutation = useMutation({
    mutationFn: (itemId: string) =>
      apiClient.instance.post(`/library/${itemId}/download`, {}),
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey: ["library"] });
      const previous = queryClient.getQueryData<any>(["library", filters]);
      queryClient.setQueryData(["library", filters], (old: any) => {
        if (!old) return old;
        return old.map((it: any) =>
          it.id === itemId ? { ...it, downloads_count: (it.downloads_count || 0) + 1 } : it,
        );
      });
      return { previous };
    },
    onError: (err, itemId, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(["library", filters], context.previous);
      }
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
    // Track download
    await downloadMutation.mutateAsync(item.id);
    // Open the file in a new window
    window.open(item.drive_url, "_blank");
  };

  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Group items by category
  const groupedItems = {
    SPIRITUAL:
      data?.filter((item: LibraryItem) => item.category === "SPIRITUAL") || [],
    ACADEMIC:
      data?.filter((item: LibraryItem) => item.category === "ACADEMIC") || [],
    OTHER: data?.filter((item: LibraryItem) => item.category === "OTHER") || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Resource Library
          </h1>
          <p className="text-amber-700">
            Spiritual and Academic Resources for Our Community
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search resources..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg p-6 mb-6 border border-amber-200 grid grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={filters.category || ""}
              onChange={(e) =>
                handleFilterChange({ category: e.target.value || undefined })
              }
              className="px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              <option value="SPIRITUAL">Spiritual</option>
              <option value="ACADEMIC">Academic</option>
              <option value="OTHER">Others</option>
            </select>

            {(filters.category === undefined || filters.category === "ACADEMIC") ? (
              <select
                value={filters.department || ""}
                onChange={(e) =>
                  handleFilterChange({ department: e.target.value || undefined })
                }
                className="px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Department"
                value={filters.department || ""}
                onChange={(e) =>
                  handleFilterChange({ department: e.target.value || undefined })
                }
                className="px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            )}

            <select
              value={filters.academic_year || ""}
              onChange={(e) =>
                handleFilterChange({
                  academic_year: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Years</option>
              {academicYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={filters.document_type || ""}
              onChange={(e) =>
                handleFilterChange({
                  document_type: e.target.value || undefined,
                })
              }
              className="px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Types</option>
              <option value="TEXTBOOK">Textbook</option>
              <option value="PAST_EXAM">Past Exam</option>
            </select>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Failed to load library items. Please try again.
          </div>
        )}

        {/* Library Items by Category */}
        {data && data.length > 0 ? (
          <div className="space-y-8">
            {/* Spiritual Resources Section */}
            {(groupedItems.SPIRITUAL.length > 0 ||
              !filters.category ||
              filters.category === "SPIRITUAL") && (
              <CategorySection
                category="SPIRITUAL"
                title="📿 Spiritual Resources"
                description="Sacred texts, teachings, and spiritual guidance"
                items={groupedItems.SPIRITUAL}
                isExpanded={expandedCategories.SPIRITUAL}
                onToggle={() => toggleCategory("SPIRITUAL")}
                bgColor="from-purple-50 to-purple-100"
                headerColor="from-purple-600 to-purple-700"
                accentColor="purple"
                onLike={(id) => likeMutation.mutate(id)}
                onDownload={(item) => handleDownload(item)}
                onPreview={(item) => setSelectedPreview(item)}
                isLiking={likeMutation.isPending}
                isDownloading={downloadMutation.isPending}
              />
            )}

            {/* Academic Resources Section */}
            {(groupedItems.ACADEMIC.length > 0 ||
              !filters.category ||
              filters.category === "ACADEMIC") && (
              <CategorySection
                category="ACADEMIC"
                title="📚 Academic Resources"
                description="Textbooks, exams, courses, and educational materials"
                items={groupedItems.ACADEMIC}
                isExpanded={expandedCategories.ACADEMIC}
                onToggle={() => toggleCategory("ACADEMIC")}
                bgColor="from-blue-50 to-blue-100"
                headerColor="from-blue-600 to-blue-700"
                accentColor="blue"
                onLike={(id) => likeMutation.mutate(id)}
                onDownload={(item) => handleDownload(item)}
                onPreview={(item) => setSelectedPreview(item)}
                isLiking={likeMutation.isPending}
                isDownloading={downloadMutation.isPending}
              />
            )}

            {/* Other Resources Section */}
            {(groupedItems.OTHER.length > 0 ||
              !filters.category ||
              filters.category === "OTHER") && (
              <CategorySection
                category="OTHER"
                title="📁 Other Resources"
                description="Miscellaneous files and resources"
                items={groupedItems.OTHER}
                isExpanded={expandedCategories.OTHER}
                onToggle={() => toggleCategory("OTHER")}
                bgColor="from-amber-50 to-amber-100"
                headerColor="from-amber-600 to-amber-700"
                accentColor="amber"
                onLike={(id) => likeMutation.mutate(id)}
                onDownload={(item) => handleDownload(item)}
                onPreview={(item) => setSelectedPreview(item)}
                isLiking={likeMutation.isPending}
                isDownloading={downloadMutation.isPending}
              />
            )}
          </div>
        ) : null}

        {/* Empty State */}
        {data && data.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No resources found. Try adjusting your filters.
            </p>
          </div>
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

// Category Section Component
interface CategorySectionProps {
  category: "SPIRITUAL" | "ACADEMIC" | "OTHER";
  title: string;
  description: string;
  items: LibraryItem[];
  isExpanded: boolean;
  onToggle: () => void;
  bgColor: string;
  headerColor: string;
  accentColor: string;
  onLike: (id: string) => void;
  onDownload: (item: LibraryItem) => void;
  onPreview: (item: LibraryItem) => void;
  isLiking: boolean;
  isDownloading: boolean;
}

function CategorySection({
  category,
  title,
  description,
  items,
  isExpanded,
  onToggle,
  bgColor,
  headerColor,
  accentColor,
  onLike,
  onDownload,
  onPreview,
  isLiking,
  isDownloading,
}: CategorySectionProps) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} rounded-xl overflow-hidden border-2 ${
        accentColor === "purple"
          ? "border-purple-300"
          : accentColor === "blue"
            ? "border-blue-300"
            : "border-amber-300"
      } shadow-lg`}
    >
      {/* Category Header */}
      <button
        onClick={onToggle}
        className={`w-full bg-gradient-to-r ${headerColor} text-white px-6 py-4 flex items-center justify-between hover:shadow-md transition`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{title.split(" ")[0]}</span>
          <div>
            <h2 className="text-xl font-bold text-left">
              {title.split(" ").slice(1).join(" ")}
            </h2>
            <p className="text-xs opacity-90">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              accentColor === "purple"
                ? "bg-purple-200 text-purple-900"
                : accentColor === "blue"
                  ? "bg-blue-200 text-blue-900"
                  : "bg-amber-200 text-amber-900"
            }`}
          >
            {items.length}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Category Content */}
      {isExpanded && (
        <div className="p-6">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item: LibraryItem) => (
                <LibraryItemCard
                  key={item.id}
                  item={item}
                  onLike={() => onLike(item.id)}
                  onDownload={() => onDownload(item)}
                  onPreview={() => onPreview(item)}
                  isLiking={isLiking}
                  isDownloading={isDownloading}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p
                className={`text-lg font-semibold ${
                  accentColor === "purple"
                    ? "text-purple-600"
                    : accentColor === "blue"
                      ? "text-blue-600"
                      : "text-amber-600"
                }`}
              >
                No {category.toLowerCase()} resources found
              </p>
              <p
                className={`text-sm ${
                  accentColor === "purple"
                    ? "text-purple-500"
                    : accentColor === "blue"
                      ? "text-blue-500"
                      : "text-amber-500"
                }`}
              >
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Library Item Card Component
interface LibraryItemCardProps {
  item: LibraryItem;
  onLike: () => void;
  onDownload: () => void;
  onPreview: () => void;
  isLiking: boolean;
  isDownloading: boolean;
}

function LibraryItemCard({
  item,
  onLike,
  onDownload,
  onPreview,
  isLiking,
  isDownloading,
}: LibraryItemCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden ${item.is_link_broken ? "opacity-60" : ""}`}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              item.category === "SPIRITUAL"
                ? "bg-purple-100 text-purple-700"
                : item.category === "ACADEMIC"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.category}
          </span>
          {item.is_link_broken && (
            <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700">
              Link Broken
            </span>
          )}
        </div>
        <h3 className="mt-3 font-bold text-amber-900 line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        {item.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="space-y-2 text-xs text-gray-500 mb-4">
          {item.academic_department && <p>📍 {item.academic_department}</p>}
          {item.academic_year && <p>📅 Year {item.academic_year}</p>}
          {item.document_type && (
            <p>
              📄 {item.document_type === "TEXTBOOK" ? "Textbook" : "Past Exam"}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={onLike}
            disabled={isLiking || item.is_link_broken}
            title="Like this resource"
            className="flex items-center justify-center gap-1 px-2 py-2 rounded bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 transition text-xs"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">{item.likes_count}</span>
          </button>

          <button
            onClick={onPreview}
            disabled={item.is_link_broken}
            title="Preview document"
            className="flex items-center justify-center gap-1 px-2 py-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 disabled:opacity-50 transition text-xs"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={onDownload}
            disabled={isDownloading || item.is_link_broken}
            title="Download/Open file"
            className="flex items-center justify-center gap-1 px-2 py-2 rounded bg-amber-100 hover:bg-amber-200 text-amber-700 disabled:opacity-50 transition text-xs"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{item.downloads_count}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
