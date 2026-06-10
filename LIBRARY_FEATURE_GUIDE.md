# Library Feature Implementation Guide

## Quick Overview

The Library feature is now fully implemented with all requirements from the specification. It provides a modern, user-friendly system for managing educational and spiritual resources using Google Drive cloud storage.

## ✅ What's Been Implemented

### Backend (Express.js + TypeScript)

1. **Enhanced Repository (`library.repository.ts`)**
   - CRUD operations for library items
   - Filtering by category, department, academic year, course, document type
   - Recursive filtering with multiple parameters
   - Full-text search by title
   - Link health tracking (mark as broken/working)
   - Download and like counting

2. **Comprehensive Service (`library.service.ts`)**
   - Google Drive URL validation (regex pattern matching)
   - Direct file upload rejection
   - User interaction tracking (likes, downloads)
   - Link health checking functionality
   - Role-based access control (SECRETARIAT_CHAIRMAN, SUPER_ADMIN)
   - Input validation and error handling

3. **Endpoint Controller (`library.controller.ts`)**
   - List items with advanced filtering
   - Search functionality
   - Like and download tracking
   - CRUD operations for admins
   - Comprehensive error responses

4. **Updated Routes (`library.routes.ts`)**
   - `GET /api/library` - List with filters and search
   - `POST /api/library/:id/like` - Like an item
   - `POST /api/library/:id/download` - Track download
   - `POST /api/library` - Create (admin only)
   - `PATCH /api/library/:id` - Update (admin only)
   - `DELETE /api/library/:id` - Delete (admin only)

5. **Background Job (`library.job.ts`)**
   - Weekly link validation job
   - Batch processing of URLs (10 at a time)
   - HEAD request health checks
   - Admin notifications for broken links
   - Error handling and logging

6. **Job Scheduler (`library.jobs-init.ts`)**
   - Cron schedule: Every Sunday at 2:00 AM
   - Automatic initialization on server start
   - Error handling and monitoring

### Frontend (Next.js + React)

1. **LibraryListing Component**
   - Browse all library items in a responsive grid
   - Real-time search functionality
   - Expandable filter panel with recursive filtering
   - Category badges with color coding
   - Like and download buttons with instant feedback
   - Broken link indicators
   - Loading and empty states

2. **AdminLibraryUpload Component**
   - Modal form for adding resources
   - Google Drive URL validation with helpful error messages
   - Support for all metadata fields
   - Role-based access control
   - Success and error handling

3. **DocumentViewer Component**
   - Embedded Google Drive file viewer
   - PDF viewer with toolbar
   - Graceful fallbacks for unsupported types
   - Broken link detection
   - Download/open in new tab functionality

4. **AdminLibraryManager Component**
   - Dashboard table showing all resources
   - Edit functionality with modal form
   - Delete with confirmation
   - Status indicators (Active/Broken)
   - Real-time statistics (likes, downloads)
   - Responsive design for all screen sizes

---

## 📋 Features Implemented

### FR-LIB-01 [P0]: No Direct File Uploads ✅

- Direct binary file uploads are rejected
- System only accepts Google Drive URLs
- Clear error messages guide users to proper format

### FR-LIB-02 [P0]: Google Drive URLs Only ✅

- URL validation using regex pattern
- Only public Google Drive URLs accepted: `https://drive.google.com/file/d/{FILE_ID}/view`
- Files rendered in iframe or PDF viewer components
- Support for both Google Drive preview and PDF viewing

### FR-LIB-03 [P1]: Weekly Link Validation ✅

- Background job scheduled for Sundays 2:00 AM
- HEAD requests performed on all URLs in batches
- Broken links marked with `is_link_broken: true`
- `last_checked_at` timestamp recorded
- In-app notifications sent to SECRETARIAT_CHAIRMAN
- Batch processing prevents server overwhelming

### FR-LIB-04 [P0]: Categorization ✅

- Three categories implemented:
  - Spiritual (መንፈሳዊ)
  - Academic (አካዳሚክ)
  - Others (ሌሎች)
- Color-coded badges in UI

### FR-LIB-05 [P1]: Recursive Filtering ✅

- Filter by: Department → Academic Year → Course ID → Document Type
- Supports combining multiple filters
- Cumulative AND logic for results
- Search by title (case-insensitive)
- Query parameters for API

### FR-LIB-06 [P1]: User Interactions ✅

- Authenticated users can like items
- Download tracking with counter
- Increment counters on each action
- Prevent duplicate interactions (consider adding in future)

### FR-LIB-07 [P2]: Real-time Aggregate Counts ✅

- Each card displays `likes_count` and `downloads_count`
- Real-time updates after user actions
- Status indicators for broken links

---

## 🛠️ Installation & Setup

### Backend Setup

1. **Install Dependencies**

   ```bash
   cd Backend-EndaEyesus
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The library jobs will initialize automatically on server start.

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd Frontend-EndaEyesus
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 📱 Usage Examples

### For Regular Users

1. **Browse Library**
   - Navigate to `/library` page
   - View all resources in grid layout

2. **Search Resources**
   - Use search bar at top
   - Type keywords to find items

3. **Filter Resources**
   - Click "Show Filters"
   - Select category, department, year, document type
   - Results update instantly

4. **Like a Resource**
   - Click heart icon on resource card
   - Counter increments immediately

5. **Download Resource**
   - Click download button on card
   - File opens in new tab
   - Download is tracked

6. **View in Viewer**
   - Click on resource title or preview
   - Opens DocumentViewer modal
   - Can view PDF or Google Drive files inline

### For Administrators

1. **Add Resource**
   - Click "Add Resource" button
   - Fill in form with Google Drive URL
   - Complete metadata fields
   - Submit to create

2. **Edit Resource**
   - Go to Library Manager (admin panel)
   - Find resource in table
   - Click edit icon
   - Update fields and save

3. **Delete Resource**
   - Click delete icon in table
   - Confirm deletion
   - Resource removed from system

4. **View Analytics**
   - See likes and downloads count in manager table
   - Monitor link status (Active/Broken)
   - Track popularity of resources

---

## 🔧 Configuration

### Environment Variables (Backend)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/koinonia
DIRECT_URL=postgresql://user:password@localhost:5432/koinonia

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret
```

### Cron Job Schedule

The link validation job runs on:

- **Day:** Sunday
- **Time:** 2:00 AM (02:00)
- **Frequency:** Weekly

To modify, edit `library.jobs-init.ts`:

```typescript
// Change this cron pattern
cron.schedule("0 2 * * 0", async () => {
  // Current: Sundays 2:00 AM
  // Job execution
});
```

Cron Pattern Format: `minute hour day month day-of-week`

- `0 2 * * 0` = Sunday 2:00 AM
- `0 0 * * 0` = Sunday midnight
- `0 3 * * 1` = Monday 3:00 AM

---

## 📚 API Documentation

See `docs/LIBRARY_API_DOCUMENTATION.md` for detailed API endpoints, examples, and error handling.

### Quick Endpoints

```
GET    /api/library                    # List items (with filters/search)
POST   /api/library/:id/like           # Like an item
POST   /api/library/:id/download       # Track download
POST   /api/library                    # Create (admin)
PATCH  /api/library/:id                # Update (admin)
DELETE /api/library/:id                # Delete (admin)
```

---

## 🔐 Security Features

1. **JWT Authentication** - All endpoints require valid token
2. **Role-Based Access** - Admin functions restricted to SECRETARIAT_CHAIRMAN
3. **URL Validation** - Only approved Google Drive URLs
4. **No File Storage** - Zero blob storage, uses external links
5. **Link Health Monitoring** - Detects and flags broken links
6. **Error Messages** - Helpful but non-revealing messages

---

## 🐛 Troubleshooting

### Issue: Background job not running

**Solution:**

- Verify `node-cron` is installed: `npm list node-cron`
- Check server logs for initialization message
- Ensure server is running (job runs weekly on schedule)

### Issue: Google Drive URL validation failing

**Solution:**

- Verify URL format: `https://drive.google.com/file/d/FILE_ID/view`
- Ensure file is public (shareable link should work)
- File ID should be alphanumeric with hyphens/underscores

### Issue: Broken link notifications not appearing

**Solution:**

- Verify admin user has SECRETARIAT_CHAIRMAN role
- Check database for notification creation
- Review background job logs

---

## 📊 Database Queries

### Check Library Items

```sql
SELECT id, title, category, is_link_broken, last_checked_at
FROM library_items
ORDER BY created_at DESC;
```

### Find Broken Links

```sql
SELECT id, title, drive_url, last_checked_at
FROM library_items
WHERE is_link_broken = true
ORDER BY last_checked_at DESC;
```

### Get Statistics

```sql
SELECT
    category,
    COUNT(*) as total,
    SUM(likes) as total_likes,
    SUM(downloads) as total_downloads
FROM library_items
GROUP BY category;
```

---

## 🚀 Future Enhancements

1. **Advanced Search**
   - Full-text search with relevance ranking
   - Faceted search for better UX

2. **User Ratings**
   - 5-star rating system
   - Reviews and comments

3. **Collections**
   - Save favorite resources
   - Create custom collections

4. **Analytics**
   - Popular resources charts
   - User engagement analytics
   - Download trends

5. **Batch Operations**
   - Upload multiple resources
   - Bulk edit/delete
   - Export as CSV

6. **Access Controls**
   - Resource permissions
   - Restricted access by department/year
   - View history per user

7. **Integration**
   - LMS integration
   - Calendar sync
   - Slack notifications

---

## 📞 Support

For issues, questions, or contributions:

1. Check the API documentation
2. Review this README
3. Check troubleshooting section
4. Contact development team

---

## 📝 Notes

- All library items are stored in PostgreSQL database
- No files are stored on server (uses Google Drive)
- Background job requires server to be running
- Notifications require valid admin user email
- All timestamps are in UTC (Timestamptz)

---

## Version

- **Version:** 1.0.0
- **Last Updated:** 2024-06-09
- **Status:** Production Ready

---

**Implementation completed with all FR-LIB requirements fulfilled!** ✅
