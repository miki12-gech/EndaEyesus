# Library Management Guide for SECRETARIAT_CHAIRMAN

## 📚 Overview

As a **SECRETARIAT_CHAIRMAN**, you now have full access to manage the library resources for your institution. This guide explains all the features available to you.

---

## 🎯 Access the Library Management

### Step 1: Login to Dashboard

- Login to the application with your SECRETARIAT_CHAIRMAN account
- Navigate to `/dashboard/library`

### Step 2: Switch to Management View

- In the Library page, click the **"Manage Library"** button (red button, top right)
- This will take you to the admin management interface

---

## ✨ What You Can Do

### 1. **Browse Library** (Default View)

- See all library resources
- Search and filter resources
- Like resources
- Download resources
- This is the view all users see

**Shortcut:** `/dashboard/library` (in browse mode)

---

### 2. **Upload New Resources**

Add new Google Drive links to the library.

**Steps:**

1. Click the **"Manage Library"** button to enter admin mode
2. Click **"Add Resource"** button
3. Fill in the form:
   - **Title** (required) - Name of the resource
   - **Description** (optional) - Brief description
   - **Google Drive URL** (required) - Public Google Drive file URL
   - **Category** (required) - Choose from:
     - `SPIRITUAL` (መንፈሳዊ) - Spiritual materials
     - `ACADEMIC` (አካዳሚክ) - Academic materials
     - `OTHER` (ሌሎች) - Other materials
   - **Department** (optional) - Academic department
   - **Academic Year** (optional) - Year (e.g., 2024)
   - **Course ID** (optional) - Course code
   - **Document Type** (optional) - Choose from:
     - `TEXTBOOK` - Course textbooks
     - `PAST_EXAM` - Previous exam papers

4. Click **"Create Resource"** to save

**Google Drive URL Format:**

```
✅ CORRECT: https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view
❌ WRONG: https://docs.google.com/document/d/...
❌ WRONG: https://drive.google.com/drive/folders/...
```

**What Gets Rejected:**

- ❌ Direct file uploads (PDF, DOC files)
- ❌ Non-public Google Drive URLs
- ❌ Broken or inaccessible links
- ❌ Non-Google Drive URLs

---

### 3. **Edit Existing Resources**

Update information about resources.

**Steps:**

1. In Management View, find the resource in the table
2. Click the **"Edit"** button (pencil icon)
3. Update any fields:
   - Title
   - Description
   - Google Drive URL
   - Category
   - Department
   - Academic Year
   - Course ID
   - Document Type
4. Click **"Save Changes"**

---

### 4. **Delete Resources**

Remove resources from the library.

**Steps:**

1. In Management View, find the resource
2. Click the **"Delete"** button (trash icon)
3. Confirm deletion in the popup
4. Resource is permanently removed

---

### 5. **View Link Status**

Monitor if shared Google Drive links are still working.

**Indicators:**

- 🟢 **Green** = Link is working
- 🔴 **Red** = Link is broken
- ⚠️ **Yellow** = Not yet checked

**Auto-Check:**

- System automatically checks all links every **Sunday at 2:00 AM**
- If a link breaks, you'll get an in-app notification
- Broken links are marked `LINK_BROKEN` in the system

**Manual Check:**

- Click "Check Link" in the admin dashboard to manually verify

---

### 6. **Track Usage Statistics**

See how users interact with resources.

**Visible Statistics:**

- **Likes** - How many users liked the resource
- **Downloads** - How many times users downloaded/accessed it
- **Created At** - When the resource was added
- **Last Updated** - When it was last modified

**In Management View:**

- See all statistics in the resource table
- Use this data to identify popular resources

---

## 🔐 Permission Levels

### What SECRETARIAT_CHAIRMAN Can Do:

✅ Upload (create) resources
✅ Edit resources
✅ Delete resources
✅ View all statistics
✅ Check link status
✅ Receive broken link notifications

### What Regular Users Can Do:

❌ Cannot upload resources
❌ Cannot edit resources
❌ Cannot delete resources
✅ Can browse library
✅ Can search and filter
✅ Can like resources
✅ Can download/access resources

---

## 📋 Management Dashboard Layout

The Management View includes:

### Table Columns:

| Column     | Description                  |
| ---------- | ---------------------------- |
| Title      | Resource name                |
| Category   | SPIRITUAL/ACADEMIC/OTHER     |
| Department | Academic department (if set) |
| Links      | Quick view of statistics     |
| Status     | Link status (Working/Broken) |
| Actions    | Edit/Delete buttons          |

### Filters & Search:

- Search by title
- Filter by category
- Filter by department
- Filter by academic year
- Filter by document type

---

## 🎯 Best Practices

### When Uploading Resources:

1. **Use clear, descriptive titles**
   - ❌ "Document1"
   - ✅ "Organic Chemistry Textbook - Chapter 5"

2. **Add meaningful descriptions**
   - Include subject, author, year
   - Note if it's a reference or required material

3. **Organize by category**
   - Use SPIRITUAL for religious materials
   - Use ACADEMIC for course materials
   - Use OTHER for miscellaneous

4. **Include metadata**
   - Department: Help users find relevant materials
   - Academic Year: Indicate which cohort it's for
   - Course ID: Link to specific courses

5. **Test links before adding**
   - Make sure the Google Drive link is public
   - Verify users can access it
   - Test that the file opens correctly

### When Managing Resources:

1. **Review regularly**
   - Check for broken links
   - Remove outdated materials
   - Update descriptions as needed

2. **Monitor statistics**
   - Popular resources = valuable content
   - Low engagement = possibly outdated
   - Use data to guide updates

3. **Respond to broken links**
   - When you get notifications, fix or remove them
   - Re-upload with new link if available
   - Notify users if important material is unavailable

---

## 🔗 Google Drive URL Help

### How to Get the Correct Google Drive URL:

1. **Find your file in Google Drive**
2. **Right-click the file** → "Share"
3. **Make it "Public"** or **"Anyone with the link"**
4. **Copy the link**
   - Should look like: `https://drive.google.com/file/d/FILEID/view`

5. **Upload to Library**
   - Paste this link in the "Google Drive URL" field

### File Types Supported:

✅ PDF files
✅ Documents (Google Docs, Word)
✅ Presentations (PowerPoint, Google Slides)
✅ Spreadsheets
✅ Images
✅ Videos
✅ Any file Google Drive can preview

### Sharing Settings:

✅ Public (Anyone can access without login)
✅ Anyone with the link (Anyone with link can access)
❌ Restricted (Only invited people - won't work)
❌ Private (Only you - won't work)

---

## 📞 Troubleshooting

### **Problem: "Invalid Google Drive URL" error**

**Solution:**

- Check that URL starts with `https://drive.google.com/file/d/`
- Ensure it ends with `/view`
- Copy the full URL exactly from Google Drive sharing dialog
- Don't modify or shorten the URL

### **Problem: Link is marked BROKEN**

**Solution:**

- Verify the Google Drive file still exists
- Check sharing settings are still public
- Delete the resource and re-upload with new link
- Contact the file owner if permissions were changed

### **Problem: Users can't access the resource**

**Solution:**

- Verify Google Drive sharing is set to "Public"
- Test the link yourself in an incognito window
- Check if Google Drive has restricted the file
- Try uploading the file to a new location
- Ensure the file format is supported

### **Problem: "You don't have permission" error**

**Solution:**

- The Google Drive file is set to restricted
- Change Google Drive sharing settings to "Public" or "Anyone with link"
- Re-upload the resource with the updated link

---

## 🔄 Workflow Example

### Example: Adding a New Textbook

```
1. Open Google Drive
   └─ Find or upload "Introduction to Biochemistry.pdf"

2. Share the file
   └─ Right-click → Share
   └─ Set to "Anyone with the link"
   └─ Copy the share link

3. Go to Dashboard
   └─ Click /dashboard/library
   └─ Click "Manage Library"

4. Click "Add Resource"
   ├─ Title: "Introduction to Biochemistry Textbook"
   ├─ Description: "Comprehensive textbook for Biochemistry 101, suitable for beginners"
   ├─ Google Drive URL: [paste the link]
   ├─ Category: ACADEMIC
   ├─ Department: Biology
   ├─ Academic Year: 2024
   ├─ Course ID: BIO301
   └─ Document Type: TEXTBOOK

5. Click "Create Resource"
   └─ Resource appears in library
   └─ All students can now access it

6. Monitor
   └─ Check usage statistics
   └─ Watch for broken links
   └─ Update if needed
```

---

## 📊 Analytics & Reports

### View Resource Statistics:

In the Management Table, you can see:

- **Total Resources** - All resources you've uploaded
- **Most Liked** - Sort by likes to see popular materials
- **Most Downloaded** - See which resources are used most
- **Broken Links** - See which links need fixing
- **Recent Additions** - See newly added resources

### Use This Data To:

- Identify high-demand materials
- Find outdated or unused resources
- Plan new uploads based on user needs
- Maintain library quality

---

## 🆘 Support & Questions

### If You Need Help:

1. Check this guide first
2. Test the link independently
3. Verify Google Drive sharing settings
4. Try a different file if the first doesn't work
5. Contact your IT support if issues persist

---

## ✅ Quick Checklist

When uploading a resource, verify:

- [ ] Title is clear and descriptive
- [ ] Description is helpful
- [ ] Google Drive URL is correct format
- [ ] File is publicly shared in Google Drive
- [ ] Category is appropriate
- [ ] Metadata (department, year, course) is accurate
- [ ] Document type is selected if applicable
- [ ] You tested the link works
- [ ] File opens correctly in Google Drive viewer

---

## 📝 Notes

- Resources are **immediately available** to all users after creation
- **Edited resources** update instantly for all users
- **Deleted resources** are **permanently removed** and cannot be recovered
- **Background job** runs every Sunday at 2:00 AM to check link health
- **Notifications** appear in-app if your links break
- All resources are **version controlled** - you can see when they were created/updated

---

_Last Updated: June 9, 2026_  
_Library Management System v1.0.0_
