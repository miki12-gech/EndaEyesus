# Library Search and Category Organization Feature

## Overview

The Community Library has been significantly enhanced with an improved search experience and clear visual organization by category (Spiritual, Academic, Other). Resources are now grouped into distinct sections with expandable/collapsible categories for better navigation.

## Features Implemented

### 1. **Enhanced Search Functionality**

- **Real-time Search**: Type in the search bar to filter resources across all categories
- **Smart Search**: Searches by title, description, and metadata
- **Persistent Filters**: Search terms are maintained while browsing different categories
- **Cross-category Search**: Search results appear in their respective category sections

### 2. **Category-Based Organization**

Resources are now clearly organized into three main categories with distinct visual styling:

#### **📿 Spiritual Resources** (Purple Theme)

- Sacred texts and holy books
- Spiritual teachings and guidance
- Prayers and meditations
- Religious education materials
- **Color Scheme**: Purple gradient (from-purple-600 to-purple-700 header)
- **Background**: Light purple gradient

#### **📚 Academic Resources** (Blue Theme)

- Textbooks and course materials
- Past exams and study guides
- Lecture notes and assignments
- Educational research papers
- **Color Scheme**: Blue gradient (from-blue-600 to-blue-700 header)
- **Background**: Light blue gradient

#### **📁 Other Resources** (Amber Theme)

- Miscellaneous files
- General community materials
- Administrative documents
- Any resources not fitting other categories
- **Color Scheme**: Amber gradient (from-amber-600 to-amber-700 header)
- **Background**: Light amber gradient

### 3. **Category Headers with Information**

Each category section features:

- **Emoji Icon**: Visual identifier (📿 for Spiritual, 📚 for Academic, 📁 for Other)
- **Title**: Clear category name
- **Description**: Explains what type of resources are in this category
- **Resource Count**: Badge showing number of resources in category
- **Expand/Collapse Toggle**: Chevron icon that shows/hides items

### 4. **Expand/Collapse Functionality**

- **One-Click Toggle**: Click the category header to expand/collapse all items
- **Persistent State**: Expansion state is maintained while browsing
- **Visual Feedback**: Chevron icon rotates to indicate state
- **Smart Display**: If no items in category, shows message instead of empty grid
- **All Expanded by Default**: Users see all three categories on first load

### 5. **Advanced Filter Options**

Existing filters now work better with categories:

- **Category Filter**: Explicitly filter by Spiritual/Academic/Other
- **Department Filter**: For academic resources
- **Academic Year**: Year-specific filtering
- **Document Type**: Textbook vs. Past Exam
- **Combined Search**: All filters work together with search

## Visual Design

### Category Section Layout

```
┌─────────────────────────────────────────────────┐
│ 📚 Academic Resources    [30] [∨]              │ (Header - expandable)
│ Textbooks, exams, courses...                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Card 1] [Card 2] [Card 3]                   │ (Grid of items)
│  [Card 4] [Card 5] [Card 6]                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Color Coding

| Category  | Header Color | Background | Border     | Icon |
| --------- | ------------ | ---------- | ---------- | ---- |
| Spiritual | Purple-600   | Purple-50  | Purple-300 | 📿   |
| Academic  | Blue-600     | Blue-50    | Blue-300   | 📚   |
| Other     | Amber-600    | Amber-50   | Amber-300  | 📁   |

## User Experience Flow

### Browsing Resources

1. User lands on Library page
2. All three category sections are visible and expanded
3. User sees resource count in each category badge
4. User can:
   - Scroll through all categories
   - Collapse a category to reduce scrolling
   - Search to filter across all categories
   - Use advanced filters for specific needs

### Searching

1. User types in search box at top
2. Results automatically appear grouped by category
3. Only categories with matching results show items
4. Empty categories show "No [category] resources found" message
5. User can refine with additional filters

### Filtering

1. User clicks "Show Filters" button
2. Can select:
   - Category (SPIRITUAL, ACADEMIC, OTHER)
   - Department (for academic)
   - Academic Year (for academic)
   - Document Type (TEXTBOOK, PAST_EXAM)
3. Results update in real-time
4. Each filter works independently or combined

## Technical Implementation

### File Changes

**LibraryListing.tsx** (`src/features/library/LibraryListing.tsx`)

#### New State Management

```typescript
const [expandedCategories, setExpandedCategories] = useState({
  SPIRITUAL: true, // Initially expanded
  ACADEMIC: true,
  OTHER: true,
});
```

#### New Helper Functions

```typescript
// Toggle category expansion
const toggleCategory = (category: keyof typeof expandedCategories) => {
  setExpandedCategories((prev) => ({
    ...prev,
    [category]: !prev[category],
  }));
};

// Group items by category
const groupedItems = {
  SPIRITUAL: data?.filter((item) => item.category === "SPIRITUAL") || [],
  ACADEMIC: data?.filter((item) => item.category === "ACADEMIC") || [],
  OTHER: data?.filter((item) => item.category === "OTHER") || [],
};
```

#### New Category Section Component

```typescript
function CategorySection({
  category, // SPIRITUAL | ACADEMIC | OTHER
  title, // Display title with emoji
  description, // Category description
  items, // LibraryItem array
  isExpanded, // Boolean state
  onToggle, // Callback to expand/collapse
  bgColor, // Tailwind background gradient
  headerColor, // Tailwind header gradient
  accentColor, // Color theme: purple | blue | amber
  // ... callbacks
});
```

### Component Structure

```
LibraryListing (main page)
├── Search Bar (existing)
├── Filters Panel (existing)
├── CategorySection (SPIRITUAL)
│   ├── Header (expandable)
│   └── Grid of LibraryItemCard components
├── CategorySection (ACADEMIC)
│   ├── Header (expandable)
│   └── Grid of LibraryItemCard components
└── CategorySection (OTHER)
    ├── Header (expandable)
    └── Grid of LibraryItemCard components

DocumentViewer (modal for preview)
```

## API Integration

The component uses the existing library API:

- `GET /library?category=SPIRITUAL&search=...` - Filtered results
- Filtering happens on backend before returning items
- Search parameter filters across all fields
- Category parameter is optional

## Styling Approach

### Tailwind Classes Used

- **Gradients**: `from-[color]-600 to-[color]-700` for headers
- **Backgrounds**: `from-[color]-50 to-[color]-100` for sections
- **Borders**: `border-[color]-300` for visual distinction
- **Text**: Corresponding color classes for consistency
- **Transitions**: Smooth hover and toggle animations

### Responsive Design

- **Mobile**: Single column cards in each category
- **Tablet**: 2-column grid (md:grid-cols-2)
- **Desktop**: 3-column grid (lg:grid-cols-3)
- **Category headers**: Full width, responsive padding
- **Search bar**: Full width, responsive padding

## Features Detail

### Search Experience

✅ Real-time filtering as you type
✅ Works across all categories simultaneously
✅ Maintains other filter selections
✅ Shows count of results per category
✅ Empty state message for categories with no matches

### Category Management

✅ Three distinct visual themes
✅ Expandable/collapsible sections
✅ Resource count badge
✅ Category description visible in header
✅ Icon emoji for quick visual identification

### User Feedback

✅ Smooth chevron animation on expand/collapse
✅ Loading state spinner while fetching
✅ Error messages if load fails
✅ Empty state messages when no results
✅ Disabled state for broken resources

## Example Scenarios

### Scenario 1: Student Looking for Textbooks

1. Sees **Academic Resources** section in blue
2. Clicks filter to select "TEXTBOOK" type
3. Resources narrow to only textbooks
4. Scrolls through 2-column grid
5. Clicks Preview to view textbook excerpt

### Scenario 2: Spiritual Seeker

1. Sees **Spiritual Resources** section in purple (at top)
2. Searches "prayer" in search box
3. Results filter to matching prayers/guides
4. Expands Academic/Other sections to hide them
5. Views prayer books in full-screen preview

### Scenario 3: Finding by Department

1. Clicks "Show Filters"
2. Selects "Computer Science" department
3. Results show only CS resources (in Academic section)
4. Sees past exams and textbooks for CS courses
5. Can further filter by year (2023, 2024, etc.)

## Performance Considerations

- Categories are grouped client-side (after API returns all items)
- Expand/collapse doesn't cause re-fetch (instant)
- Search triggers API call with debounce (as before)
- Each category renders independently (can optimize individually)
- Loading state shows while fetching from backend

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ Color contrast meets WCAG standards
- ✅ Tooltip text on buttons (`title` attributes)
- ✅ Clear visual hierarchy
- ✅ Keyboard navigation support
- ✅ Icon + text for clarity

## Browser Compatibility

- Works in all modern browsers
- CSS Grid and Flexbox fully supported
- Tailwind v3+ required for gradient syntax
- Smooth animations using CSS transitions

## Future Enhancement Ideas

1. **Save Preferences**: Remember user's expanded/collapsed category state
2. **Favorite Categories**: Pin/star important categories
3. **Category Search**: Filter by category name
4. **Bulk Actions**: Select multiple resources per category
5. **Category Statistics**: Show "Most Liked" per category
6. **Smart Grouping**: Group by department within Academic category
7. **Customizable Order**: Rearrange category order
8. **Category Icons**: Customize category icons

## Troubleshooting

### All resources disappeared

- Check search box - may have entered text
- Check filters - may have selected specific type
- Try clicking "Show Filters" and resetting all filters

### Category not showing even though items exist

- Check if category filter is limiting results
- Try clearing search box
- May need to refresh page

### Expand/collapse not working

- JavaScript may not be loading - check console for errors
- Try refreshing the page
- Clear browser cache

---

## Summary of Improvements

| Aspect                | Before                         | After                                    |
| --------------------- | ------------------------------ | ---------------------------------------- |
| **Organization**      | Single grid of all items       | Three distinct category sections         |
| **Visual Clarity**    | No category distinction        | Color-coded sections (Purple/Blue/Amber) |
| **Navigation**        | Must scroll through everything | Can expand/collapse categories           |
| **Search**            | Works but all mixed together   | Results grouped by category              |
| **User Guidance**     | No category info               | Title, description, emoji icons          |
| **Resource Count**    | Not visible                    | Badge shows per-category count           |
| **Mobile Experience** | Dense grid                     | Cleaner, more scrollable sections        |

---

**Feature Status**: ✅ Fully Implemented and Tested
**Compatibility**: Next.js 15.5.12, React 19, Tailwind CSS v3
**Search Status**: ✅ Functional with real-time filtering
**Category Display**: ✅ Three themed sections with expand/collapse
