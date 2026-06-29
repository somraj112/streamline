# StreamLine

> An open-source live video streaming infrastructure platform built for creators, communities, and developers.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Status](https://img.shields.io/badge/status-Development-orange)

---

## Overview

StreamLine is a production-grade live streaming platform inspired by **Twitch**, **YouTube Live**, **OBS Studio**, and **Mux**.

The goal is to build a scalable platform that enables creators to broadcast live video while providing viewers with a smooth streaming experience, real-time chat, analytics, moderation tools, and recording capabilities.

Unlike a simple video player, StreamLine focuses on the complete streaming infrastructure.

---

## Features

* Live Video Streaming
* Stream Ingestion
* Adaptive Streaming
* Real-Time Chat
* Stream Discovery
* Creator Analytics
* Recording & Playback
* Community Moderation
* Notifications
* Authentication & User Management

---

## Repository Structure

```text
project-name/
│
├── apps/
│   ├── web/              # Next.js Frontend
│   └── server/           # Backend API
│
├── packages/
│   ├── ui/               # Shared UI Components
│   ├── config/           # Shared Configurations
│   ├── types/            # Shared Types
│   └── utils/            # Shared Utilities
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── decisions/
│
├── scripts/
├── .github/
├── README.md
├── CONTRIBUTING.md
└── package.json
```

---

## Tech Stack

### Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* ESLint

### Backend

* Node.js
* Express.js (planned)

### Database

* TBD

### Real-Time

* WebSockets (planned)

---

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd streamline
```

### Install dependencies

```bash
npm install
```

### Run the frontend

```bash
cd apps/web
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Documentation

Project documentation lives inside the `/docs` directory.

* Architecture
* Database Design
* API Specification
* Technical Decisions

---

## 🤝 Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide before opening issues or submitting pull requests.

---

## Project Status

🚧 Currently under active development.

---

## 📄 License

This project is licensed under the MIT License.