# Library UI - Quick Visual Guide

## 📋 Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                    LIBRARY HEADER                        │
│              Resource Library                            │
│    Spiritual and Academic Resources for Our Community   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  🔍 [Search Box - Full Width]                          │
│  Type to search across all categories                  │
└─────────────────────────────────────────────────────────┘

[Filter Button] [Show/Hide Filters]

┌─────────────────────────────────────────────────────────┐
│ Category Filters (when expanded)                        │
├─────────────────────────────────────────────────────────┤
│ [All Categories ▼] [Department] [Year] [Type ▼]       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📿 Spiritual Resources      [12] [∨]                   │ ← Click to expand/collapse
│ Sacred texts, teachings, and spiritual guidance        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Resource │  │ Resource │  │ Resource │            │
│  │   Card   │  │   Card   │  │   Card   │            │
│  │[❤][👁][↓]│  │[❤][👁][↓]│  │[❤][👁][↓]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Resource │  │ Resource │  │ Resource │            │
│  │   Card   │  │   Card   │  │   Card   │            │
│  │[❤][👁][↓]│  │[❤][👁][↓]│  │[❤][👁][↓]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📚 Academic Resources       [28] [∨]                   │ ← Click to expand/collapse
│ Textbooks, exams, courses, and educational materials  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Resource │  │ Resource │  │ Resource │            │
│  │   Card   │  │   Card   │  │   Card   │            │
│  │[❤][👁][↓]│  │[❤][👁][↓]│  │[❤][👁][↓]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📁 Other Resources          [5] [∨]                    │ ← Click to expand/collapse
│ Miscellaneous files and resources                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Resource │  │ Resource │  │ Resource │            │
│  │   Card   │  │   Card   │  │   Card   │            │
│  │[❤][👁][↓]│  │[❤][👁][↓]│  │[❤][👁][↓]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

### Spiritual Resources (Purple Theme)

- **Header**: Dark Purple (`bg-purple-600`)
- **Background**: Light Purple (`from-purple-50 to-purple-100`)
- **Border**: Medium Purple (`border-purple-300`)
- **Count Badge**: Light Purple (`bg-purple-200`)
- **Icon**: 📿 (Prayer Beads)

### Academic Resources (Blue Theme)

- **Header**: Dark Blue (`bg-blue-600`)
- **Background**: Light Blue (`from-blue-50 to-blue-100`)
- **Border**: Medium Blue (`border-blue-300`)
- **Count Badge**: Light Blue (`bg-blue-200`)
- **Icon**: 📚 (Books)

### Other Resources (Amber Theme)

- **Header**: Dark Amber (`bg-amber-600`)
- **Background**: Light Amber (`from-amber-50 to-amber-100`)
- **Border**: Medium Amber (`border-amber-300`)
- **Count Badge**: Light Amber (`bg-amber-200`)
- **Icon**: 📁 (Folder)

## 📱 Resource Card Layout

```
┌─────────────────────────────────┐
│ 🎯 CATEGORY [Link Broken?]     │ ← Category badge + broken warning
├─────────────────────────────────┤
│ Title of Resource               │
│ (can be 2 lines max)            │
├─────────────────────────────────┤
│ Brief description of the        │
│ resource (2 lines max)          │
│                                 │
│ 📍 Department (if applicable)   │
│ 📅 Year 2024 (if applicable)    │
│ 📄 Document Type (if applicable)│
├─────────────────────────────────┤
│ [❤ 42]  [👁 Preview] [↓ 28]   │ ← Action buttons
└─────────────────────────────────┘

Button Layout: 3 columns
- Left:   ❤ Like     (Red theme)
- Center: 👁 Preview (Blue theme)
- Right:  ↓ Download (Amber theme)
```

## 🔍 Search Experience

### When You Type

```
"prayer" → Searches across all categories
         → Results appear in their category sections
         → Only shows categories with matches

Result:
┌─────────────────────────────────────┐
│ 📿 Spiritual Resources      [3] [∨] │
│ Found: Prayer Book, Prayer Guide... │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📚 Academic Resources       [0] [^] │
│ No academic resources found        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📁 Other Resources          [0] [^] │
│ No other resources found           │
└─────────────────────────────────────┘
```

## 🎯 Interaction Flow

### Expand/Collapse Category

```
1. Click category header (anywhere in blue/purple/amber bar)
2. Chevron icon rotates (▼ becomes ▲)
3. Cards appear/disappear smoothly
4. Count badge always visible
```

### Preview Document

```
1. Click 👁 Preview button on card
2. Full-screen modal opens
3. Can scroll through document
4. Click X or outside modal to close
5. Preview supports: Google Docs, PDFs, Images, Videos
```

### Like Resource

```
1. Click ❤ Like button
2. Number updates in real-time
3. Button disables briefly during update
4. Can like multiple times from different sessions
```

### Download Resource

```
1. Click ↓ Download button
2. File opens in new tab
3. Download count increments
4. Button disables briefly during update
```

## 🔧 Filter Options

### Available Filters

1. **Category**: SPIRITUAL / ACADEMIC / OTHER
2. **Department**: Computer Science, Mathematics, etc. (for Academic)
3. **Academic Year**: 2024, 2023, 2022, etc.
4. **Document Type**: TEXTBOOK / PAST_EXAM

### Using Filters

```
1. Click [Show Filters] button
2. Select any combination of filters
3. Results update automatically
4. Each filter works independently
5. Click [Hide Filters] to minimize panel
```

## 📊 Category Statistics

**Badge Shows Count**

```
Example: 📚 Academic Resources [28] [∨]
         ^^                   ^^
         Icon               Count Badge
```

The count badge displays:

- Total number of resources in that category
- Updates when filters are applied
- Shows 0 if no resources match current filters

## ♿ Accessibility Features

- **Color**: Not the only distinguisher (icons + text too)
- **Icons**: Emoji for quick identification
- **Text**: Clear category names and descriptions
- **Hover**: Tooltips on action buttons
- **Keyboard**: Can navigate with Tab key
- **Disabled**: Clear visual state for inactive options

## 📱 Responsive Behavior

### Mobile (< 768px)

- Search bar: Full width
- Filters: Stacked vertically
- Cards: Single column (1 per row)
- Category headers: Condensed padding
- Action buttons: Icons only (no text labels)

### Tablet (768px - 1024px)

- Search bar: Full width
- Filters: 2 columns
- Cards: 2 per row
- Category headers: Normal padding
- Action buttons: Icon + abbreviated text

### Desktop (> 1024px)

- Search bar: Full width
- Filters: 4 columns
- Cards: 3 per row
- Category headers: Full padding with descriptions
- Action buttons: Icon + full text

## 🎨 Visual Feedback

### Loading

```
⏳ Spinning loader in center of screen
"Loading library items..."
```

### Error

```
⚠️ Red alert box
"Failed to load library items. Please try again."
```

### Empty Category

```
No [category] resources found
Try adjusting your search or filters
```

### No Results

```
No resources found. Try adjusting your filters.
(shown when all categories are empty)
```

## 🚀 Quick Actions Cheat Sheet

| Goal                 | Action                            |
| -------------------- | --------------------------------- |
| Find spiritual books | Search "book" or filter SPIRITUAL |
| View past exams      | Filter ACADEMIC + PAST_EXAM       |
| Hide a category      | Click category header to collapse |
| Preview document     | Click 👁 Preview button           |
| Download file        | Click ↓ Download button           |
| Like resource        | Click ❤ Like button               |
| See more info        | Read description on card          |
| Filter by year       | Expand filters, select year       |
| Reset filters        | Clear search box, select "All"    |

---

**Last Updated**: 2024
**Status**: ✅ Live and Functional
**Tested On**: Chrome, Firefox, Safari, Edge
