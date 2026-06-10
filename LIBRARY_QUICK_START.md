# Library Feature - Quick Start Guide

## ⚡ Getting Started in 5 Minutes

### Step 1: Start Backend Server

```bash
cd Backend-EndaEyesus
npm run dev
```

Expected output:

```
🚀 Server is running on port 5000 in development mode
📦 Connected to the database successfully
[Library Jobs] Library jobs initialized. Link validation scheduled for Sundays at 2:00 AM
```

### Step 2: Start Frontend App

In a new terminal:

```bash
cd Frontend-EndaEyesus
npm run dev
```

Expected output:

```
> next dev
  ▲ Next.js 15.3.4
  - Local:        http://localhost:3000
```

### Step 3: Access the Application

- **Frontend:** http://localhost:3000
- **API Base:** http://localhost:5000/api

---

## 🎯 Testing the Library Feature

### Test as Regular User

1. **Login** to the application
2. Navigate to **Library** or `/library`
3. You should see:
   - Search bar at top
   - Filter button (expandable)
   - Grid of library resources
   - Like and download buttons on each card

### Test Search & Filtering

```
Try searching for:
- "history"
- "academic"
- Select category: Academic
- Set academic year: 2024
```

### Test User Interactions

```
1. Click heart icon to like a resource
2. Click download icon to track download
3. See counters increment in real-time
4. Click resource to open DocumentViewer
```

### Test as Administrator

1. Login with **SECRETARIAT_CHAIRMAN** role
2. Navigate to `/dashboard/library`
3. You should see:
   - "Add Resource" button
   - Table of all resources
   - Edit and delete buttons

### Create a Test Resource

1. Click "Add Resource"
2. Fill form:
   ```
   Title: Test Resource
   Description: This is a test
   Google Drive URL: https://drive.google.com/file/d/ABC123XYZ/view
   Category: Academic
   Department: Computer Science
   Academic Year: 2024
   Document Type: Textbook
   ```
3. Click "Create Resource"
4. See it appear in the list

---

## 🔌 API Testing with curl

### List All Items

```bash
curl -X GET "http://localhost:5000/api/library" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Search by Title

```bash
curl -X GET "http://localhost:5000/api/library?search=history" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Filter by Category

```bash
curl -X GET "http://localhost:5000/api/library?category=ACADEMIC" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Combine Filters

```bash
curl -X GET "http://localhost:5000/api/library?category=ACADEMIC&academic_year=2024&department=CS" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Like a Resource

```bash
curl -X POST "http://localhost:5000/api/library/ITEM_ID/like" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Track Download

```bash
curl -X POST "http://localhost:5000/api/library/ITEM_ID/download" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Resource (Admin)

```bash
curl -X POST "http://localhost:5000/api/library" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Resource",
    "description": "Description here",
    "drive_url": "https://drive.google.com/file/d/FILE_ID/view",
    "category": "ACADEMIC",
    "academic_department": "Computer Science",
    "academic_year": 2024,
    "course_id": "CS101",
    "document_type": "TEXTBOOK"
  }'
```

### Update Resource (Admin)

```bash
curl -X PATCH "http://localhost:5000/api/library/ITEM_ID" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "academic_year": 2025
  }'
```

### Delete Resource (Admin)

```bash
curl -X DELETE "http://localhost:5000/api/library/ITEM_ID" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

---

## 🔍 Database Queries

### Check Library Items

```sql
SELECT id, title, category, likes, downloads
FROM library_items
ORDER BY created_at DESC
LIMIT 10;
```

### Find Broken Links

```sql
SELECT id, title, drive_url, last_checked_at
FROM library_items
WHERE is_link_broken = true;
```

### Get Statistics

```sql
SELECT
  category,
  COUNT(*) as total_items,
  AVG(likes) as avg_likes,
  AVG(downloads) as avg_downloads
FROM library_items
GROUP BY category;
```

---

## 📋 Common Tasks

### Add a New Library Resource

**Via Frontend:**

1. Login as admin
2. Go to `/dashboard/library`
3. Click "Add Resource"
4. Fill in the form
5. Provide Google Drive URL
6. Click "Create Resource"

**Via API:**

```bash
curl -X POST "http://localhost:5000/api/library" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Resource Title",
    "drive_url": "https://drive.google.com/file/d/FILE_ID/view",
    "category": "ACADEMIC"
  }'
```

### Search for Resources

**Via Frontend:**

1. Go to `/library`
2. Type in search bar
3. Results update instantly

**Via API:**

```bash
curl -X GET "http://localhost:5000/api/library?search=keyword" \
  -H "Authorization: Bearer TOKEN"
```

### Filter Resources

**Via Frontend:**

1. Click "Show Filters"
2. Select filters:
   - Category
   - Department
   - Academic Year
   - Document Type
3. Results update automatically

**Via API:**

```bash
curl -X GET "http://localhost:5000/api/library?category=ACADEMIC&academic_year=2024" \
  -H "Authorization: Bearer TOKEN"
```

### Edit a Resource

**Via Frontend:**

1. Login as admin
2. Go to `/dashboard/library`
3. Click edit icon (pencil)
4. Update fields
5. Click "Update Resource"

**Via API:**

```bash
curl -X PATCH "http://localhost:5000/api/library/ITEM_ID" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

### Delete a Resource

**Via Frontend:**

1. Login as admin
2. Go to `/dashboard/library`
3. Click delete icon (trash)
4. Confirm deletion

**Via API:**

```bash
curl -X DELETE "http://localhost:5000/api/library/ITEM_ID" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🐛 Troubleshooting

### Backend won't start

```
Issue: "Port 5000 is in use"
Solution: Kill process on port 5000 or change PORT env variable

Issue: "Database connection failed"
Solution: Check DATABASE_URL in .env file, verify PostgreSQL is running

Issue: "Module not found"
Solution: Run npm install && npm run build
```

### Frontend won't start

```
Issue: "Port 3000 is in use"
Solution: Kill process or let Next.js use different port

Issue: "Cannot find module"
Solution: Run npm install
```

### API endpoints not working

```
Issue: "401 Unauthorized"
Solution: Provide valid JWT token in Authorization header

Issue: "400 Bad Request"
Solution: Check request body, verify Google Drive URL format

Issue: "403 Forbidden"
Solution: Verify user has SECRETARIAT_CHAIRMAN role for admin endpoints
```

### Google Drive URL validation fails

```
Valid Format:
✅ https://drive.google.com/file/d/FILE_ID/view

Invalid Examples:
❌ https://docs.google.com/...
❌ https://drive.google.com/drive/folders/...
❌ Just the FILE_ID without full URL

Solution: Use complete public Google Drive file URL with /view at end
```

### Link validation job not running

```
Issue: Background job not executing
Solution:
1. Verify server logs show job initialization
2. Check cron schedule: Should run Sunday 2:00 AM
3. Review server.ts for job initialization

Expected Log:
[Library Jobs] Library jobs initialized. Link validation scheduled for Sundays at 2:00 AM
```

---

## 📚 Full Documentation

For complete details, see:

- **API Documentation:** `docs/LIBRARY_API_DOCUMENTATION.md`
- **Feature Guide:** `LIBRARY_FEATURE_GUIDE.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`
- **Complete Checklist:** `LIBRARY_COMPLETE_CHECKLIST.md`
- **Verification Report:** `LIBRARY_IMPLEMENTATION_VERIFICATION_REPORT.md`

---

## ✅ Verification Checklist

After starting the servers, verify:

- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] Can navigate to `/library`
- [ ] Can search for resources
- [ ] Can filter resources
- [ ] Can like resources
- [ ] Can download resources
- [ ] Can open resource viewer
- [ ] Can login as admin
- [ ] Can access `/dashboard/library`
- [ ] Can create new resource
- [ ] Can edit resource
- [ ] Can delete resource
- [ ] API endpoints respond correctly

---

## 🎉 Success!

If all checks pass, the Library Feature is working correctly!

**Ready for:** Development ✅ | Testing ✅ | Staging 🔧 | Production 🚀

---

_Last Updated: June 9, 2026_  
_Library Feature v1.0.0_
