# Library Feature - API Documentation

## Overview

The Library feature provides a centralized, searchable digital repository for educational and spiritual resources using cloud storage links (Google Drive). It implements all functional requirements including URL validation, link health checks, filtering, and user interactions.

## API Endpoints

### Base URL

```
/api/library
```

### Authentication

All endpoints require authentication via JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. List All Library Items

**Endpoint:** `GET /api/library`

**Authentication:** Required (authenticated users)

**Query Parameters:**

- `category` (optional): Filter by category - `SPIRITUAL`, `ACADEMIC`, `OTHER`
- `department` (optional): Filter by academic department
- `academic_year` (optional): Filter by academic year (number)
- `course_id` (optional): Filter by course ID
- `document_type` (optional): Filter by document type - `TEXTBOOK`, `PAST_EXAM`
- `search` (optional): Search by title (case-insensitive)

**Response:**

```json
{
  "status": "success",
  "items": [
    {
      "id": "uuid",
      "title": "Coptic Church History",
      "description": "Comprehensive overview",
      "drive_url": "https://drive.google.com/file/d/FILE_ID/view",
      "category": "SPIRITUAL",
      "academic_department": "Theology",
      "academic_year": 2024,
      "course_id": "THEO101",
      "document_type": "TEXTBOOK",
      "likes_count": 25,
      "downloads_count": 150,
      "is_link_broken": false,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

### 2. Like a Library Item

**Endpoint:** `POST /api/library/:id/like`

**Authentication:** Required

**Parameters:**

- `id` (path): Item ID (UUID)

**Response:**

```json
{
  "status": "success",
  "message": "Item liked successfully",
  "likes_count": 26
}
```

---

### 3. Track Download

**Endpoint:** `POST /api/library/:id/download`

**Authentication:** Required

**Parameters:**

- `id` (path): Item ID (UUID)

**Response:**

```json
{
  "status": "success",
  "message": "Download tracked successfully",
  "downloads_count": 151
}
```

---

### 4. Create Library Item

**Endpoint:** `POST /api/library`

**Authentication:** Required (SECRETARIAT_CHAIRMAN or SUPER_ADMIN only)

**Request Body:**

```json
{
  "title": "Resource Title",
  "description": "Optional description",
  "drive_url": "https://drive.google.com/file/d/FILE_ID/view",
  "category": "ACADEMIC",
  "academic_department": "Computer Science",
  "academic_year": 2024,
  "course_id": "CS101",
  "document_type": "TEXTBOOK"
}
```

**Validation Rules:**

- `title`: Required, string
- `drive_url`: Required, must be valid public Google Drive URL (format: `https://drive.google.com/file/d/{FILE_ID}/view`)
- `category`: Required, must be `SPIRITUAL`, `ACADEMIC`, or `OTHER`
- Other fields: Optional
- **Direct file uploads are rejected** - only Google Drive URLs accepted
- **Non-Google Drive URLs are rejected**

**Response:**

```json
{
    "status": "success",
    "message": "Library item created successfully",
    "data": {
        "id": "uuid",
        "title": "Resource Title",
        ...
    }
}
```

**Error Responses:**

```json
// If user is not authorized
{
    "status": "error",
    "message": "Only administrators can create library items"
}

// If Google Drive URL is invalid
{
    "status": "error",
    "message": "Only public Google Drive URLs are accepted. Format: https://drive.google.com/file/d/{FILE_ID}/view"
}

// If direct file upload attempted
{
    "status": "error",
    "message": "Direct file uploads are not allowed. Please provide a public Google Drive URL instead."
}
```

---

### 5. Update Library Item

**Endpoint:** `PATCH /api/library/:id`

**Authentication:** Required (SECRETARIAT_CHAIRMAN or SUPER_ADMIN only)

**Parameters:**

- `id` (path): Item ID (UUID)

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "drive_url": "https://drive.google.com/file/d/NEW_FILE_ID/view",
  "category": "SPIRITUAL",
  "academic_department": "Theology",
  "academic_year": 2025,
  "course_id": "THEO201",
  "document_type": "PAST_EXAM"
}
```

**Response:**

```json
{
    "status": "success",
    "message": "Library item updated successfully",
    "data": { ... }
}
```

---

### 6. Delete Library Item

**Endpoint:** `DELETE /api/library/:id`

**Authentication:** Required (SECRETARIAT_CHAIRMAN or SUPER_ADMIN only)

**Parameters:**

- `id` (path): Item ID (UUID)

**Response:**

```json
{
  "status": "success",
  "message": "Library item deleted successfully"
}
```

---

## Features Implemented

### FR-LIB-01: No Direct File Uploads

❌ Direct binary file uploads are rejected. Only Google Drive URLs are accepted.

### FR-LIB-02: Google Drive URLs Only

✅ Only public Google Drive URLs in format `https://drive.google.com/file/d/{FILE_ID}/view` are accepted.
✅ Files are rendered inside iframes or PDF viewer components.

### FR-LIB-03: Weekly Link Validation Job

✅ Background cron job runs every Sunday at 2:00 AM.
✅ Performs HEAD requests on all Google Drive URLs.
✅ Marks broken links with `is_link_broken: true`.
✅ Sends in-app notifications to Library Administrators (SECRETARIAT_CHAIRMAN).
✅ Records `last_checked_at` timestamp.

### FR-LIB-04: Categorization

✅ Three categories: Spiritual (መንፈሳዊ), Academic (አካዳሚክ), Others (ሌሎች)

### FR-LIB-05: Recursive Filtering

✅ Supports filtering by:

- Department → Academic Year → Course ID → Document Type
- Each filter can be combined with others
- Results are cumulative (AND logic)

### FR-LIB-06: User Interactions

✅ Authenticated users can:

- Like items (increments `likes_count`)
- Download items (increments `downloads_count`)
- React to items through likes

### FR-LIB-07: Real-time Aggregate Counts

✅ Each item card displays:

- Real-time `likes_count`
- Real-time `downloads_count`
- Status of link health

---

## Background Job: Link Validation

### Schedule

- **Frequency:** Weekly (Sundays at 2:00 AM)
- **Implementation:** Node.js cron job with node-cron package

### Process

1. Retrieves all library items from database
2. Processes URLs in batches (10 at a time) to avoid overwhelming requests
3. Performs HTTP HEAD request on each URL
4. Updates `is_link_broken` and `last_checked_at` fields
5. Sends notifications to admins for broken links
6. Logs results for monitoring

### Notification

- **Type:** In-app notification
- **Recipients:** All users with SECRETARIAT_CHAIRMAN role
- **Content:** Alert with link to admin panel for broken item

---

## Database Schema

### library_items Table

| Column              | Type         | Description                |
| ------------------- | ------------ | -------------------------- |
| id                  | UUID         | Primary key                |
| title               | VARCHAR(200) | Item title                 |
| description         | TEXT         | Item description           |
| drive_url           | VARCHAR(500) | Google Drive URL           |
| category            | ENUM         | SPIRITUAL, ACADEMIC, OTHER |
| academic_department | VARCHAR(100) | Department name            |
| academic_year       | INT          | Academic year              |
| course_id           | VARCHAR(50)  | Course identifier          |
| document_type       | ENUM         | TEXTBOOK, PAST_EXAM        |
| likes               | INT          | Like counter               |
| downloads           | INT          | Download counter           |
| is_link_broken      | BOOLEAN      | Link health status         |
| last_checked_at     | TIMESTAMPTZ  | Last health check time     |
| created_at          | TIMESTAMPTZ  | Creation timestamp         |
| updated_at          | TIMESTAMPTZ  | Update timestamp           |

---

## Frontend Components

### Components Available

1. **LibraryListing**
   - Main component for browsing library items
   - Search functionality
   - Recursive filtering with expandable filter panel
   - Real-time like and download buttons
   - Broken link indicators

2. **AdminLibraryUpload**
   - Modal form for adding new resources
   - URL validation with helpful error messages
   - Support for all metadata fields
   - Role-based access (SECRETARIAT_CHAIRMAN only)

3. **DocumentViewer**
   - Embedded viewer for Google Drive files
   - PDF viewer with toolbar
   - Fallback for unsupported file types
   - Broken link detection with helpful message

4. **AdminLibraryManager**
   - Admin dashboard for managing all resources
   - Edit and delete functionality
   - Status indicators (Active/Broken)
   - Interaction statistics (likes, downloads)

---

## Error Handling

### Common Error Responses

**400 Bad Request - Invalid Google Drive URL:**

```json
{
  "status": "error",
  "message": "Only public Google Drive URLs are accepted. Format: https://drive.google.com/file/d/{FILE_ID}/view"
}
```

**403 Forbidden - Insufficient Permissions:**

```json
{
  "status": "error",
  "message": "Only administrators can create library items"
}
```

**404 Not Found:**

```json
{
  "status": "error",
  "message": "Library item not found"
}
```

**500 Internal Server Error:**

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Usage Examples

### Search for Resources

```bash
curl -X GET "http://localhost:3000/api/library?search=history" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Filter by Category and Department

```bash
curl -X GET "http://localhost:3000/api/library?category=ACADEMIC&department=Computer%20Science" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create New Resource

```bash
curl -X POST "http://localhost:3000/api/library" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Data Structures Textbook",
    "description": "Advanced data structures course material",
    "drive_url": "https://drive.google.com/file/d/ABC123XYZ/view",
    "category": "ACADEMIC",
    "academic_department": "Computer Science",
    "academic_year": 2024,
    "course_id": "CS201",
    "document_type": "TEXTBOOK"
  }'
```

### Like a Resource

```bash
curl -X POST "http://localhost:3000/api/library/ITEM_UUID/like" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Security Considerations

1. **URL Validation:** Only public Google Drive URLs are accepted - prevents security risks from arbitrary URLs
2. **Authentication:** All endpoints require JWT authentication
3. **Authorization:** Administrative functions restricted to SECRETARIAT_CHAIRMAN and SUPER_ADMIN roles
4. **No File Uploads:** Direct file uploads rejected - reduces server storage requirements and security risks
5. **Link Health Checks:** Regular validation prevents broken links from remaining in the system
6. **Notifications:** Admins are immediately notified of broken links for maintenance

---

## Future Enhancements

1. **Advanced Search:** Full-text search with relevance ranking
2. **User Ratings:** Allow users to rate resources
3. **Comments:** Enable discussion on resources
4. **Caching:** Cache frequently accessed resources
5. **Analytics:** Track resource popularity over time
6. **Batch Operations:** Upload multiple resources at once
7. **Access Logs:** Track who downloads what and when
8. **Resource Recommendations:** AI-powered suggestions based on user history

---

## Support

For issues or questions regarding the Library feature, contact the development team or create an issue in the project repository.
