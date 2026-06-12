# Service Class Management & Sub-Class Approval System

## Overview

This system enables **all SERVICE_MANAGER users to manage their own service class's sub-classes** while requiring **SECRETARIAT_CHAIRMAN approval for creation and leadership assignments**.

---

## How It Works

### 1. Access Model

**Who can do what:**

| Operation              |    Secretariat     | Service Manager (Own Class) | Service Manager (Other Class) | Regular User |
| ---------------------- | :----------------: | :-------------------------: | :---------------------------: | :----------: |
| **View sub-classes**   |       ✅ Yes       |           ✅ Yes            |      ✅ Yes (read-only)       |    ❌ No     |
| **Create sub-class**   | ✅ Yes (immediate) |     ⏳ Pending approval     |             ❌ No             |    ❌ No     |
| **Assign leaders**     | ✅ Yes (immediate) |     ⏳ Pending approval     |             ❌ No             |    ❌ No     |
| **Add/remove members** |       ✅ Yes       |           ✅ Yes            |             ❌ No             |    ❌ No     |
| **Approve requests**   |       ✅ Yes       |            ❌ No            |             ❌ No             |    ❌ No     |

---

## API Endpoints

### 1. View Service Class Sub-Classes (READ)

```http
GET /api/v1/member-affairs/sub-classes/:serviceClassId
Authorization: Bearer <token>
```

**Who can access:**

- ✅ SECRETARIAT (all classes)
- ✅ SERVICE_MANAGER of the requested class
- ✅ OTHER SERVICE_MANAGERS (read-only visibility)

**Response:**

```json
[
  {
    "id": "uuid",
    "parent_class_id": "uuid",
    "sub_class_name": "ብሔሮች ክፍል",
    "status": "APPROVED" | "PENDING_APPROVAL" | "REJECTED",
    "sub_chair_id": "uuid",
    "sub_vice_id": "uuid",
    "sub_secretary_id": "uuid",
    "created_at": "2026-06-12T10:00:00Z",
    "updated_at": "2026-06-12T10:00:00Z"
  }
]
```

---

### 2. Create New Sub-Class (WRITE - Requires Approval)

```http
POST /api/v1/member-affairs/sub-classes/:serviceClassId
Authorization: Bearer <token>
Content-Type: application/json

{
  "sub_class_name": "ብሔሮች ክፍል",
  "sub_chair_id": "optional-uuid",
  "sub_vice_id": "optional-uuid",
  "sub_secretary_id": "optional-uuid"
}
```

**Access Control:**

- ✅ **SECRETARIAT**: Created immediately with `status: APPROVED`
- ⏳ **SERVICE_MANAGER** (of the class): Created with `status: PENDING_APPROVAL`
  - Approval request sent to all SECRETARIAT_CHAIRMAN
  - Chairman receives notification
  - Leaders can only be assigned after approval
- ❌ **Others**: Rejected with 403 Forbidden

**Response (SERVICE_MANAGER):**

```json
{
  "id": "uuid",
  "parent_class_id": "uuid",
  "sub_class_name": "ብሔሮች ክፍል",
  "status": "PENDING_APPROVAL",
  "created_at": "2026-06-12T10:00:00Z",
  "_notice": "Sub-class created with PENDING_APPROVAL status. Chairman notification sent."
}
```

---

### 3. Assign Sub-Class Leaders (WRITE - Requires Approval)

To be implemented: Similar approval workflow for assigning `sub_chair_id`, `sub_vice_id`, `sub_secretary_id`

```http
POST /api/v1/member-affairs/sub-classes/:subClassId/assign-leaders
Authorization: Bearer <token>
Content-Type: application/json

{
  "sub_chair_id": "uuid",
  "sub_vice_id": "uuid",
  "sub_secretary_id": "uuid"
}
```

---

### 4. Get Pending Approvals (CHAIRMAN ONLY)

```http
GET /api/v1/approvals/pending
Authorization: Bearer <token>
```

**Response:**

```json
[
  {
    "id": "approval-uuid",
    "sub_class_id": "subclass-uuid",
    "request_type": "CREATE" | "ADD_LEADER" | "UPDATE",
    "requested_by": {
      "id": "user-uuid",
      "full_name_three_parts": "dn. Tewodros Beyene",
      "email": "tewodros.beyene@endaeyesus.local",
      "service_classes": {
        "class_name_amharic": "የመዝሙር ክፍል"
      }
    },
    "requested_at": "2026-06-12T10:00:00Z",
    "status": "PENDING"
  }
]
```

---

### 5. Approve a Request (CHAIRMAN ONLY)

```http
POST /api/v1/approvals/:approvalId/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "applyChanges": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "approval-uuid",
    "status": "APPROVED",
    "approved_by_id": "chairman-uuid",
    "approved_at": "2026-06-12T10:30:00Z"
  }
}
```

**Effect:**

- ✅ Sub-class status changes to `APPROVED`
- ✅ Leaders assigned (if `ADD_LEADER` request)
- ✅ Requester receives notification

---

### 6. Reject a Request (CHAIRMAN ONLY)

```http
POST /api/v1/approvals/:approvalId/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "rejectionReason": "Name conflicts with existing sub-class"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "approval-uuid",
    "status": "REJECTED",
    "rejection_reason": "Name conflicts with existing sub-class",
    "approved_by_id": "chairman-uuid",
    "approved_at": "2026-06-12T10:30:00Z"
  }
}
```

**Effect:**

- ❌ Sub-class status changes to `REJECTED`
- ❌ Requester receives rejection notification with reason

---

### 7. Get Approval History for a Sub-Class

```http
GET /api/v1/approvals/history/:subClassId
Authorization: Bearer <token>
```

**Response:**

```json
[
  {
    "id": "approval-uuid",
    "sub_class_id": "uuid",
    "request_type": "CREATE",
    "status": "APPROVED",
    "requested_by": {...},
    "approved_by": {...},
    "created_at": "2026-06-12T10:00:00Z",
    "updated_at": "2026-06-12T10:30:00Z"
  }
]
```

---

## Notification System

### Types of Notifications Sent

#### 1. **Approval Request** (To SECRETARIAT_CHAIRMAN)

```
Title: Pending Approval: New Sub-Class Request
Message: "Dn. Tewodros Beyene requested approval to create sub-class
'ብሔሮች ክፍል' in የመዝሙር ክፍል."
Action: Review in Admin Dashboard → Approvals
```

#### 2. **Approval Granted** (To Requester)

```
Title: Approval Granted
Message: "Your request to create sub-class has been approved."
```

#### 3. **Approval Rejected** (To Requester)

```
Title: Request Rejected
Message: "Your request was rejected. Reason: Name conflicts with existing sub-class."
```

---

## Workflow Examples

### Example 1: Education Manager Creates Sub-Class

**Step 1**: Education SERVICE_MANAGER logs in

```bash
Email: nahom.gmedhin@endaeyesus.local
Password: <password>
Role: SERVICE_MANAGER (Education Department)
```

**Step 2**: Makes API request to create sub-class

```http
POST /api/v1/member-affairs/sub-classes/{educationClassId}
{
  "sub_class_name": "ሓሴት ትምህርት ክፍል"
}
```

**Step 3**: Response

```json
{
  "id": "subclass-123",
  "status": "PENDING_APPROVAL",
  "_notice": "Sub-class created with PENDING_APPROVAL status. Chairman notification sent."
}
```

**Step 4**: SECRETARIAT_CHAIRMAN receives notification

```
Dashboard → Notifications → "Pending Approval: New Sub-Class Request"
From: Dn. Nahom G/Medhin
Action: Review & Approve or Reject
```

**Step 5**: Chairman approves

```http
POST /api/v1/approvals/{approvalId}/approve
{ "applyChanges": true }
```

**Step 6**: Manager receives notification

```
Dashboard → Notifications → "Approval Granted"
Sub-class is now APPROVED and ready to use
```

---

### Example 2: Manager Assigns Leadership (Requires Approval)

**Step 1**: Education Manager assigns leaders to sub-class (to be implemented)

```http
POST /api/v1/member-affairs/sub-classes/{subClassId}/assign-leaders
{
  "sub_chair_id": "user-uuid",
  "sub_vice_id": "user-uuid",
  "sub_secretary_id": "user-uuid"
}
```

**Step 2-5**: Same approval workflow as above

---

## Database Schema

### SubClassApprovalRequest Table

```sql
CREATE TABLE sub_class_approval_requests (
  id UUID PRIMARY KEY,
  sub_class_id UUID NOT NULL,
  request_type VARCHAR(50),  -- 'CREATE' | 'ADD_LEADER' | 'UPDATE'
  requested_by_id UUID NOT NULL,
  requested_at TIMESTAMPTZ,
  status VARCHAR(20),        -- 'PENDING' | 'APPROVED' | 'REJECTED'
  approved_by_id UUID,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  request_data JSON,         -- Stores requested changes
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  FOREIGN KEY (requested_by_id) REFERENCES users(id),
  FOREIGN KEY (approved_by_id) REFERENCES users(id)
);
```

---

## Implementation Checklist

- [x] Created `serviceClassGuard.ts` middleware for access control
- [x] Created `SubClassApprovalRequest` model in Prisma schema
- [x] Created `approval.service.ts` for approval workflow
- [x] Created `approval.controller.ts` for API handlers
- [x] Created `approvals.routes.ts` for endpoints
- [x] Updated `memberAffairs.routes.ts` to use new guards
- [x] Updated `memberAffairs.service.ts` to handle approvals
- [x] Updated `memberAffairs.controller.ts` to pass user info
- [ ] Run database migration: `npx prisma migrate dev --name add_approval_system`
- [ ] Test with Education SERVICE_MANAGER account
- [ ] Verify Chairman receives notifications
- [ ] Test approval/rejection workflow
- [ ] Update frontend to show pending approvals in Chairman dashboard

---

## Next Steps

1. **Run Database Migration**:

   ```bash
   cd EndaEyesus/Backend-EndaEyesus
   npx prisma migrate dev --name add_sub_class_approval_system
   ```

2. **Rebuild Backend**:

   ```bash
   npm run build
   npm start
   ```

3. **Test with Education Manager**:
   - Login as: `nahom.gmedhin@endaeyesus.local`
   - Try creating a sub-class
   - Should get PENDING_APPROVAL response

4. **Test with Chairman**:
   - Login as: `kibrom.abebe@endaeyesus.local`
   - Check notifications for pending approvals
   - Test approve/reject endpoints

5. **Update Frontend**:
   - Add approval request list in Chairman dashboard
   - Show approval/reject buttons
   - Display notifications

---

## Troubleshooting

**Q: Sub-class created but no notification received?**
A: Check if SECRETARIAT_CHAIRMAN users exist in database. Run:

```bash
npx ts-node scripts/ensure-member-affairs-access.ts
```

**Q: Getting 403 when SERVICE_MANAGER tries to create sub-class?**
A: Verify user's `service_class_id` matches the requested `serviceClassId` in URL

**Q: Sub-class still PENDING after approval?**
A: Run approval endpoint with `"applyChanges": true` to apply changes

---

_Documentation created: 2026-06-12_
