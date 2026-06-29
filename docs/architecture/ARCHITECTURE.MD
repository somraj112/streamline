# Architecture

> **Project:** StreamLine
> **Version:** 1.0
> **Status:** Draft

---

# Overview

StreamLine follows a **Modular Monolithic Architecture**.

The application is organized into independent modules with clear responsibilities while running as a single deployable backend application. This approach provides a clean separation of concerns, simplifies collaboration, and allows the project to evolve into microservices if future scalability requires it.

The system consists of four major layers:

* Presentation Layer
* Application Layer
* Data Layer
* Infrastructure Layer

---

# System Architecture

```text
                        ┌────────────────────────┐
                        │     Client Browser     │
                        └────────────┬───────────┘
                                     │
                                     │ HTTPS
                                     ▼
                     ┌────────────────────────────┐
                     │      Next.js Frontend      │
                     └────────────┬───────────────┘
                                  │
                              REST API
                                  │
                                  ▼
                  ┌────────────────────────────────┐
                  │      Express Backend API       │
                  └────────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
 Authentication Layer     Business Logic Layer      Real-Time Layer
                                                     (Socket.IO)
                                   │
                                   ▼
                        Repository / ORM Layer
                                   │
                                   ▼
                             PostgreSQL Database
                                   │
                                   ▼
                          External Infrastructure
```

---

# Architecture Style

The project uses a layered architecture.

```text
Presentation Layer
        │
        ▼
Routing Layer
        │
        ▼
Controller Layer
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
    Database
```

Each layer has a single responsibility and communicates only with the layer directly beneath it.

---

# Frontend Architecture

The frontend is built with **Next.js** using the App Router.

Recommended structure:

```text
apps/web/
└── src/
    ├── app/
    ├── components/
    ├── hooks/
    ├── context/
    ├── services/
    ├── utils/
    ├── constants/
    ├── config/
    ├── assets/
    └── styles/
```

### Responsibilities

**app/**

* Routing
* Layouts
* Pages

**components/**

* Reusable UI

**services/**

* API communication

**hooks/**

* Custom React hooks

**context/**

* Global state

**utils/**

* Helper functions

---

# Backend Architecture

The backend follows a layered design.

```text
apps/server/
└── src/
    ├── config/
    ├── middleware/
    ├── routes/
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── models/
    ├── validations/
    ├── sockets/
    ├── utils/
    └── server.js
```

### Responsibilities

**routes/**

* API routing

**controllers/**

* Handle HTTP requests

**services/**

* Business logic

**repositories/**

* Database abstraction

**models/**

* Database schema

**middleware/**

* Authentication
* Validation
* Error handling

---

# Communication

The frontend communicates with the backend using REST APIs over HTTPS.

Real-time communication uses **WebSockets** through Socket.IO.

The backend communicates with PostgreSQL using **Prisma ORM**.

---

# Technology Stack

## Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## ORM

* Prisma

## Real-Time

* Socket.IO

## Streaming

* FFmpeg
* MediaMTX (planned)

---

# Request Lifecycle

A standard HTTP request flows through the application in the following order.

```text
Client
   │
   ▼
Next.js
   │
REST Request
   │
Express Router
   │
Middleware
   │
Controller
   │
Service
   │
Repository
   │
Prisma ORM
   │
PostgreSQL
   │
Response
```

---

# Real-Time Architecture

WebSocket communication is separated from traditional REST APIs.

```text
Client
    │
WebSocket Connection
    │
Socket.IO Server
    │
Application Services
    │
PostgreSQL
```

This separation allows REST APIs to remain stateless while maintaining persistent real-time connections.

---

# Data Flow

```text
User Action
      │
      ▼
Frontend
      │
REST / WebSocket
      │
Backend
      │
Business Logic
      │
Database
      │
Response
      │
Frontend Update
```

---

# Deployment Architecture

```text
                    Internet
                        │
                        ▼
                 Reverse Proxy
                    (NGINX)
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
 Next.js Frontend               Express Backend
                                        │
                                        ▼
                                  PostgreSQL
                                        │
                                        ▼
                            Object Storage (Future)
```

---

# Scalability Strategy

The architecture is designed to support future growth.

Potential additions include:

* Redis
* Background Job Queue
* CDN
* Object Storage
* Dedicated Streaming Server
* Horizontal Scaling
* Microservices

These additions can be introduced without major changes to the overall architecture.

---

# Security Architecture

Security is enforced throughout the application.

* JWT Authentication
* Password Hashing
* Role-Based Access Control
* Input Validation
* Rate Limiting
* HTTPS
* CORS Protection
* Environment Variables
* Secure HTTP Headers

---

# Design Principles

The architecture follows these engineering principles.

* Separation of Concerns
* Single Responsibility Principle
* Dependency Inversion
* Modular Design
* Reusability
* Scalability
* Maintainability
* Security by Design
* API-First Development

---

# Future Evolution

As StreamLine grows, individual modules can be extracted into independent services without requiring significant changes to the frontend architecture.

This modular approach minimizes coupling and allows the platform to scale incrementally while maintaining a clean and maintainable codebase.
