// src/features/library/DocumentViewer.tsx
"use client";

import { useState } from "react";
import { X, Download, AlertCircle } from "lucide-react";

interface DocumentViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  isBroken?: boolean;
}

export default function DocumentViewer({
  url,
  title,
  isOpen,
  onClose,
  isBroken = false,
}: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  const isPdf = url.includes(".pdf");
  const isGoogleDrive = url.includes("drive.google.com");

  // Convert Google Drive URL to embedded format
  const getEmbeddedUrl = (googleUrl: string) => {
    const fileIdMatch = googleUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return googleUrl;
  };

  const embedUrl = isGoogleDrive ? getEmbeddedUrl(url) : url;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-linear-to-r from-amber-100 to-orange-100">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-amber-900 truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-amber-200 rounded-full transition"
              title="Download/Open in new tab"
            >
              <Download className="w-5 h-5 text-amber-700" />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-200 rounded-full transition"
            >
              <X className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          {isBroken ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Link Broken
                </h3>
                <p className="text-gray-600 mb-4">
                  This resource link has been detected as broken.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
                >
                  Try Opening in New Tab
                </a>
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                </div>
              )}

              {isGoogleDrive ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  allowFullScreen
                />
              ) : isPdf ? (
                <iframe
                  src={`${url}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={title}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      This file type cannot be previewed in the browser.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
                    >
                      Download / Open in New Tab
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
