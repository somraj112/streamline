# Contributing to StreamLine

Thank you for contributing to StreamLine!

This project follows a structured engineering workflow inspired by professional software development practices. Please read this guide before contributing.

---

# Development Workflow

Every contribution follows this lifecycle:

```
Issue
    ↓
Feature Branch
    ↓
Development
    ↓
Pull Request
    ↓
Code Review
    ↓
Merge
```

Never develop directly on the `main` branch.

---

# Repository Branches

```
main
│
staging
│
development
│
feature/*
```

* `main` → Production-ready code
* `staging` → Release candidate
* `development` → Active development
* `feature/*` → Individual features

---

# Creating an Issue

Every feature or bug fix should begin with an issue.

A good issue includes:

* Clear title
* Description
* Expected outcome
* Acceptance criteria

---

# Branch Naming

Use descriptive branch names.

Examples:

```
feature/authentication
feature/live-chat
feature/stream-dashboard

fix/login-error
fix/navbar-overflow

docs/update-readme

refactor/api-layer

test/authentication
```

---

# Commit Messages

We follow the Conventional Commits specification.

Examples:

```
feat(auth): implement JWT authentication

feat(chat): add live messaging

fix(stream): resolve buffering issue

docs(readme): update setup instructions

refactor(api): simplify route handlers
```

Avoid commits like:

```
update

final

changes

test

asdf
```

---

# Pull Requests

Every Pull Request should include:

* What changed
* Why it changed
* Screenshots (if UI changes)
* Testing performed

Checklist:

* [ ] Code builds successfully
* [ ] No lint errors
* [ ] Documentation updated
* [ ] No debug code
* [ ] Linked to an issue

---

# Code Style

Please write clean, readable code.

Guidelines:

* Use meaningful variable names.
* Keep functions small.
* Prefer reusable components.
* Avoid duplicated code.
* Comment only when necessary.

---

# Project Structure

Frontend components belong in:

```
apps/web/src/components/
```

Shared utilities belong in:

```
packages/utils/
```

Shared UI components belong in:

```
packages/ui/
```

---

# Before Submitting

Please verify:

```bash
npm run lint
npm run build
```

If tests are available:

```bash
npm test
```

---

# Need Help?

If you're unsure about implementation details, open a discussion or ask a maintainer before starting large changes.

Happy coding! 