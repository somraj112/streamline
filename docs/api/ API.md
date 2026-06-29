# API Specification

> **Project:** StreamLine
> **Version:** v1.0
> **Status:** Draft

---

# Overview

This document defines all REST API endpoints for StreamLine.

The purpose of this document is to establish a clear contract between the frontend and backend teams. Any API changes must be reflected here before implementation.

---

# Base URL

```
http://localhost:5000/api
```

Production:

```
https://api.<domain>.com/api
```

---

# Authentication

StreamLine uses **JWT Bearer Authentication**.

Example:

```http
Authorization: Bearer <access_token>
```

Protected endpoints require a valid JWT.

---

# Response Format

## Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Authentication

---

## Register User

### POST

```
/auth/register
```

### Request

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Response (201)

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login

### POST

```
/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "token": "<jwt-token>",
  "user": {}
}
```

---

## Logout

```
POST /auth/logout
```

---

## Current User

```
GET /auth/me
```

---

# Users

---

## Get User Profile

```
GET /users/:id
```

---

## Update Profile

```
PATCH /users/:id
```

---

## Follow Creator

```
POST /users/:id/follow
```

---

## Unfollow Creator

```
DELETE /users/:id/follow
```

---

# Streams

---

## Create Stream

```
POST /streams
```

### Request

```json
{
  "title": "",
  "description": "",
  "category": "",
  "visibility": "public"
}
```

---

## Get All Live Streams

```
GET /streams/live
```

---

## Get Stream

```
GET /streams/:id
```

---

## Update Stream

```
PATCH /streams/:id
```

---

## Delete Stream

```
DELETE /streams/:id
```

---

## Start Stream

```
POST /streams/:id/start
```

---

## End Stream

```
POST /streams/:id/end
```

---

## Generate Stream Key

```
POST /streams/:id/key
```

---

## Reset Stream Key

```
PATCH /streams/:id/key
```

---

# Categories

---

## Get Categories

```
GET /categories
```

---

## Get Streams by Category

```
GET /categories/:id/streams
```

---

# Search

---

## Search Streams

```
GET /search?query=
```

---

## Search Creators

```
GET /search/creators?query=
```

---

# Chat

---

## Get Chat History

```
GET /streams/:id/chat
```

---

## Send Message

```
POST /streams/:id/chat
```

### Request

```json
{
  "message": "Hello everyone!"
}
```

---

## Delete Message

```
DELETE /chat/:messageId
```

---

## Ban User

```
POST /chat/ban
```

---

## Timeout User

```
POST /chat/timeout
```

---

# Recordings

---

## Get Recordings

```
GET /recordings
```

---

## Get Recording

```
GET /recordings/:id
```

---

## Delete Recording

```
DELETE /recordings/:id
```

---

## Rename Recording

```
PATCH /recordings/:id
```

---

# Analytics

---

## Dashboard Analytics

```
GET /analytics/dashboard
```

---

## Stream Analytics

```
GET /analytics/streams/:id
```

---

## Audience Analytics

```
GET /analytics/audience
```

---

## Engagement Analytics

```
GET /analytics/engagement
```

---

# Notifications

---

## Get Notifications

```
GET /notifications
```

---

## Mark Notification Read

```
PATCH /notifications/:id
```

---

## Delete Notification

```
DELETE /notifications/:id
```

---

# Moderation

---

## Get Moderators

```
GET /moderation/moderators
```

---

## Add Moderator

```
POST /moderation/moderators
```

---

## Remove Moderator

```
DELETE /moderation/moderators/:id
```

---

## Moderation Logs

```
GET /moderation/logs
```

---

# Admin (Optional)

---

## Get Users

```
GET /admin/users
```

---

## Delete User

```
DELETE /admin/users/:id
```

---

## Get Reports

```
GET /admin/reports
```

---

## Platform Analytics

```
GET /admin/analytics
```

---

# Health Check

```
GET /health
```

Response

```json
{
  "status": "ok",
  "uptime": 123456,
  "version": "1.0.0"
}
```

---

# Future APIs (Out of Scope)

* Payments
* Subscriptions
* Recommendations
* Clips
* AI Moderation
* Donations
* Scheduling Streams
* Polls & Q&A

---

# Notes

* All timestamps use **ISO 8601** format.
* All endpoints return JSON.
* Protected endpoints require JWT authentication.
* Pagination should be supported using:

```
?page=1&limit=20
```

* Search endpoints should support:

```
?sort=
?filter=
?category=
?tag=
```