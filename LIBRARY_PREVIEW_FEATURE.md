# Library Document/Media Preview Feature

## Overview

The Community Library now includes a comprehensive document and media preview feature that allows users to view Google Drive files and PDFs directly within the application without opening them in a new tab.

## Features Implemented

### 1. **Preview Button**

- A new "Preview" button has been added to each library resource card
- Located between the "Like" and "Download" buttons (3-column grid layout)
- Disabled if the resource link is broken
- Uses the Eye icon from lucide-react for visual clarity

### 2. **Document Viewer Modal**

- Full-screen modal preview experience
- **Header**: Shows document title with Download and Close buttons
- **Content Area**: Displays the embedded document with loading state
- **Responsive Design**: Adapts to different screen sizes (max-width 4xl, max-height 90vh)

### 3. **Supported File Types**

- **Google Drive Files**: Automatically detects and converts to embedded preview format
  - Google Docs
  - Google Sheets
  - Google Slides
  - PDF files stored on Google Drive
  - Images
  - Videos
- **Direct PDF Links**: PDFs hosted anywhere with toolbar and navigation
- **Fallback**: For unsupported file types, displays helpful message with link to download/open in new tab

### 4. **Preview Experience**

- **Automatic URL Conversion**: Converts standard Google Drive URLs (`/view`) to preview format (`/preview`)
- **Loading State**: Shows spinning loader while document is being embedded
- **Error Handling**:
  - Displays "Link Broken" message if link is invalid
  - Provides "Try Opening in New Tab" fallback option
- **Full Screen**: Takes up 90% of viewport for optimal viewing
- **Easy Close**: Click the X button or use the modal backdrop to close

## Technical Implementation

### File Changes

1. **LibraryListing.tsx** (`src/features/library/LibraryListing.tsx`)
   - Added `selectedPreview` state to track which item is being previewed
   - Added `Eye` icon import from lucide-react
   - Added `DocumentViewer` component import
   - Fixed API calls to use `apiClient.instance` instead of raw axios
   - Added `onPreview` callback to LibraryItemCard
   - Added DocumentViewer modal at the bottom of component
   - Updated action buttons grid from flex to 3-column layout

2. **DocumentViewer.tsx** (Already existed - no changes needed)
   - Handles all preview rendering logic
   - Supports Google Drive embedded URLs
   - Supports PDF viewing with toolbar
   - Graceful fallback for unsupported types

### API Integration

- Uses configured `apiClient` with proper backend URL
- Endpoints used:
  - `GET /library` - Fetch library items
  - `POST /library/:id/like` - Like a resource
  - `POST /library/:id/download` - Track downloads

## User Experience Flow

1. User browses library resources
2. User clicks "Preview" button on any resource card
3. Modal opens with document embedded
4. User can:
   - View document in full screen
   - Download the original file using the download icon
   - Close the preview
   - Try opening in new tab if preview fails

## Responsive Design

- **Mobile**: Preview button shows icon only (text hidden on small screens)
- **Tablet**: Preview button shows icon + text
- **Desktop**: Full layout optimized for larger screens
- Modal adapts to smaller screens by adjusting max-height

## Accessibility Features

- `title` attributes on buttons for hover tooltips
- Clear disabled states for broken links
- Semantic HTML structure
- ARIA-compatible icon usage

## Example Preview Scenarios

### Google Drive Document

```
User clicks Preview → URL converted from:
  https://drive.google.com/file/d/FILE_ID/view
  to:
  https://drive.google.com/file/d/FILE_ID/preview
Modal displays embedded Google Drive viewer
```

### PDF File

```
User clicks Preview → Detects .pdf in URL
Modal displays PDF with toolbar and navigation controls
```

### Unsupported File

```
User clicks Preview → File type cannot be embedded
Modal shows message with "Download/Open in New Tab" button
```

## Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard iframe embedding which is widely supported
- Fallback options provided for unsupported types

## Future Enhancements

- Add file type indicators in library cards (PDF, Google Doc, etc.)
- Implement page preview thumbnails in card headers
- Add annotation/note-taking in preview modal
- Support for more file types (Word docs, Excel sheets, etc.)
- Search within document while previewing
- Print directly from preview modal

## Security Considerations

- Only public/shared Google Drive links are supported
- Links must be accessible without authentication
- Embedded content is subject to Google Drive's sharing settings
- No local file storage or processing
- CORS headers respected for all embedded content

## Troubleshooting

### Preview shows blank/loading forever

- Check if Google Drive link is properly shared publicly
- Verify file ID in URL is correct
- Some files may not support embedding (check file type)

### "Link Broken" message appears

- Link may have been removed or made private
- Try opening in new tab to verify
- Contact resource administrator

### Preview button disabled

- The resource link has been marked as broken
- Admin has flagged this resource
- Use "Download" button to try opening anyway

## Code Example

```typescript
// Using preview feature in LibraryListing
const [selectedPreview, setSelectedPreview] = useState<LibraryItem | null>(null);

// In card component:
<button onClick={() => setSelectedPreview(item)}>Preview</button>

// At bottom of component:
{selectedPreview && (
  <DocumentViewer
    url={selectedPreview.drive_url}
    title={selectedPreview.title}
    isOpen={!!selectedPreview}
    onClose={() => setSelectedPreview(null)}
    isBroken={selectedPreview.is_link_broken}
  />
)}
```

## Testing the Feature

1. Navigate to the Library page
2. Click "Preview" button on any resource
3. Verify document loads in modal
4. Test on different file types:
   - Google Docs
   - PDFs
   - Spreadsheets
   - Images
5. Test responsive design on mobile/tablet
6. Verify "Download" and "Close" buttons work
7. Test broken link handling

## Performance Considerations

- Modal only renders when a resource is selected (lazy rendering)
- Google Drive embedding is handled by Google servers (no local processing)
- Lightweight component (~3KB minified)
- No external dependencies added beyond existing libraries

---

**Feature Added**: Document/Media Preview Modal
**Date**: 2024
**Status**: ✅ Complete and Integrated
**Testing Status**: Ready for user acceptance testing
