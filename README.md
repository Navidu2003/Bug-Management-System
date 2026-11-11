# Bug Management System — Full-Stack Technical Assignment

[![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![EF Core](https://img.shields.io/badge/Entity%20Framework-Core%208-512BD4)](https://learn.microsoft.com/ef/core/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Relational%20DB-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/OpenAPI-Swagger%20UI-85EA2D?logo=swagger&logoColor=black)](http://localhost:5260/swagger)

A comprehensive, production-grade full-stack **Bug Management System** developed for the **Intern Technical Assignment**. Built adhering strictly to all requirements using **ASP.NET Core Web API (.NET 8)**, **Entity Framework Core**, **PostgreSQL**, and **React.js**.

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Key Features & Specification Compliance](#2-key-features--specification-compliance)
3. [Architecture & Tech Stack](#3-architecture--tech-stack)
4. [Project Directory Structure](#4-project-directory-structure)
5. [Prerequisites](#5-prerequisites)
6. [STEP 1: Database Setup & Configuration](#step-1-database-setup--configuration)
7. [STEP 2: How to Run the Application](#step-2-how-to-run-the-application)
   - [Method A: 1-Click Launch (Recommended)](#method-a-1-click-launch-recommended)
   - [Method B: Running Backend & Frontend Manually](#method-b-running-backend--frontend-manually)
8. [STEP 3: Functional Walkthrough & Verification](#step-3-functional-walkthrough--verification)
9. [STEP 4: REST API Endpoints Reference](#step-4-rest-api-endpoints-reference)
10. [STEP 5: Pre-Submission Checklist & Screenshots Guide](#step-5-pre-submission-checklist--screenshots-guide)
11. [STEP 6: Packaging & Submission Instructions](#step-6-packaging--submission-instructions)
12. [Evaluation Criteria Verification](#12-evaluation-criteria-verification)

---

## 1. Project Overview

The **Bug Management System** enables development and QA teams to report, inspect, filter, update, and manage software defect reports through an intuitive web interface backed by a secure REST API and relational database.

### Core Objectives Fulfilled:
- **REST API Development**: Clean ASP.NET Core 8 Web API with proper HTTP verbs and status codes.
- **Relational Database**: PostgreSQL storage managed via Entity Framework Core Code-First migrations.
- **Frontend Development**: Responsive React single-page application built with functional components and hooks.
- **Integration**: Seamless frontend-backend communication through an encapsulated service layer and reverse proxy.

---

## 2. Key Features & Specification Compliance

### 2.1 Complete CRUD Functionality
- **Create a New Bug**: File new bugs with title, detailed description, and severity level.
  > **Specification Rule Adhered To**: The `ReportDate` is automatically assigned by the backend using the current server timestamp (`DateTime.UtcNow`). The frontend does not provide this value.
- **View All Reported Bugs**: Displays all reported bugs with ID, title, description preview, formatted timestamp, and severity badge.
- **View Single Bug by ID**: Full detail modal/view retrieving fresh details by ID (`GET /api/bugs/{id}`).
- **Update Existing Bug**: Edit the title, description, or severity level (`PUT /api/bugs/{id}`). Original `ReportDate` is safely preserved.
- **Delete a Bug**: Delete a bug (`DELETE /api/bugs/{id}`) with an explicit confirmation dialog to prevent accidental deletion.

### 2.2 Severity Levels
Supported severity enum values:
- `Critical` — High-urgency blockers and system failures (Red badge)
- `High` — Major malfunctions (Orange badge)
- `Medium` — Standard non-critical defects (Amber badge)
- `Low` — Minor cosmetic issues and minor improvements (Green badge)

### 2.3 User Experience & Quality of Life
- **Instant Search**: Search in real time by bug name, description keywords, or ID number.
- **Severity Tabs**: Filter bugs by *All*, *Critical*, *High*, *Medium*, or *Low* with dynamic count badges.
- **Multi-Criteria Sorting**: Sort bugs by *Newest First*, *Oldest First*, *Highest Severity*, *Lowest Severity*, or *Name (A-Z)*.
- **Responsive Layout**: Desktop table view with clean columns and adaptive mobile card list.
- **Form Validation**: Client-side field validations with character limits (title: 3-150 chars, description: 5-2000 chars) + server-side ModelState validation.
- **Toast Notifications**: Floating alerts for operations (create, update, delete, network error).
- **Empty States**: Clear messaging when 0 bugs exist or when search filters yield no results.

---

## 3. Architecture & Tech Stack

| Component | Technology | Implementation Details |
| :--- | :--- | :--- |
| **Backend** | ASP.NET Core 8 Web API | C#, Controller-based REST API, Dependency Injection |
| **ORM** | Entity Framework Core 8 | Code-First migrations, Fluent API configurations, Data Seeding |
| **Database** | PostgreSQL | Relational storage with indexes on `ReportDate` and `Level` |
| **Frontend** | React 18 + Vite | Functional components, custom hooks, centralized API client |
| **Icons** | Lucide React | Modern vector icons (`Bug`, `Plus`, `Trash2`, `Edit3`, `Eye`, etc.) |
| **Styling** | Custom Modern CSS | Plus Jakarta Sans typography, CSS variables, glassmorphic navbar |
| **API Docs** | Swagger / OpenAPI | Swashbuckle UI accessible at `/swagger` |

---

## 4. Project Directory Structure

```text
D:\intern assingment\
├── backend\                                  # ASP.NET Core 8 Web API Project
│   ├── Controllers\
│   │   └── BugsController.cs                 # REST API endpoints (GET, POST, PUT, DELETE)
│   ├── Data\
│   │   ├── ApplicationDbContext.cs           # EF Core DbContext, seeding & configurations
│   │   └── Migrations\                       # Code-First database migration files
│   │       ├── 20261110060230_InitialCreate.cs
│   │       ├── ApplicationDbContextModelSnapshot.cs
│   │       └── init_database.sql             # Idempotent raw SQL migration script
│   ├── Dtos\                                 # Data Transfer Objects with validation rules
│   │   ├── CreateBugDto.cs                   # Excludes ReportDate (server-assigned)
│   │   ├── UpdateBugDto.cs
│   │   └── BugResponseDto.cs
│   ├── Models\
│   │   ├── Bug.cs                            # Database entity model
│   │   └── SeverityLevel.cs                  # Enum (Critical, High, Medium, Low)
│   ├── Properties\
│   │   └── launchSettings.json               # Backend port configuration (port 5260)
│   ├── appsettings.json                      # PostgreSQL connection string
│   ├── appsettings.Development.json
│   ├── BugManagement.Api.csproj              # Package references (Npgsql, EF Core, Swagger)
│   └── Program.cs                            # App startup, DI, CORS, Swagger, auto-migrations
├── frontend\                                 # React Single Page Application
│   ├── src\
│   │   ├── components\
│   │   │   ├── BugDetailModal.jsx            # Single bug detailed modal view
│   │   │   ├── BugFilters.jsx                # Search, severity tabs, sort dropdown
│   │   │   ├── BugFormModal.jsx              # Reusable modal form for Create and Edit
│   │   │   ├── BugTable.jsx                  # Responsive data table + mobile card view
│   │   │   ├── DeleteConfirmModal.jsx        # Deletion confirmation dialog
│   │   │   ├── EmptyState.jsx                # Empty state visual component
│   │   │   ├── LoadingSkeleton.jsx           # Animated shimmer loader
│   │   │   ├── Navbar.jsx                    # Header with statistics pills & Report button
│   │   │   ├── SeverityBadge.jsx             # Visual badge for severity levels
│   │   │   └── Toast.jsx                     # Toast notification system
│   │   ├── services\
│   │   │   └── bugService.js                 # Centralized API service for backend endpoints
│   │   ├── utils\
│   │   │   └── formatters.js                 # Date and relative time formatting utilities
│   │   ├── App.jsx                           # Application state & modal orchestration
│   │   ├── index.css                         # Complete modern design system
│   │   └── main.jsx                          # React application entrypoint
│   ├── index.html                            # HTML entrypoint with fonts
│   ├── package.json                          # Dependencies & scripts
│   └── vite.config.js                        # Vite dev server & API proxy configuration
├── screenshots\                              # Directory for application screenshots
│   └── README.md                             # Guide on the 6 screenshots to capture
├── start-all.bat                             # 1-Click launcher (Backend + Frontend)
├── start-backend.bat                         # Launcher for ASP.NET Core Web API
├── start-frontend.bat                        # Launcher for React frontend
├── .gitignore                                # Git ignore file (excludes build & cache artifacts)
└── README.md                                 # Complete documentation (this file)
```

---

## 5. Prerequisites

Before running the project, verify that the following tools are installed:

| Tool | Recommended Version | Verification Command |
| :--- | :--- | :--- |
| **.NET SDK** | .NET 8.0+ | `dotnet --version` |
| **Node.js** | Node 18+ or 24+ | `node --version` |
| **npm** | npm 9+ or 11+ | `npm --version` |
| **PostgreSQL** | PostgreSQL 14+ or 18 | `psql --version` |

---

## STEP 1: Database Setup & Configuration

### 1.1 Configure Connection String
Open [`backend/appsettings.json`](file:///d:/intern%20assingment/backend/appsettings.json):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=BugManagementDb;Username=postgres;Password=postgres"
  }
}
```
> **Action Required**: Change the `Password=postgres` value to your local PostgreSQL superuser password if different.

### 1.2 Apply Database Migrations (Choose Option A or Option B)

#### Option A: Automatic Migration (Default)
The ASP.NET Core backend is configured in `Program.cs` to automatically create and apply migrations upon startup if the database does not exist. You can also run the migration manually from your terminal:
```powershell
cd "d:\intern assingment\backend"
dotnet ef database update
```

#### Option B: Execute Raw SQL Script (pgAdmin / DBeaver / psql)
If you prefer running SQL directly in your database management tool:
1. Open pgAdmin or your SQL tool.
2. Connect to your local PostgreSQL server and create a database named `BugManagementDb`.
3. Open and run the file:
   [`backend/Data/Migrations/init_database.sql`](file:///d:/intern%20assingment/backend/Data/Migrations/init_database.sql)
4. This script idempotently creates the `Bugs` table, constraints, primary key sequence, indexes, and populates 4 realistic sample bugs.

---

## STEP 2: How to Run the Application

### Method A: 1-Click Launch (Recommended)
Double-click [`start-all.bat`](file:///d:/intern%20assingment/start-all.bat) located in the project root.
- A terminal window will open and launch the **ASP.NET Core Web API** on `http://localhost:5260`.
- A second terminal window will launch the **React Frontend** on `http://localhost:5173`.
- Your browser will be ready to interact with both tiers.

---

### Method B: Running Backend & Frontend Manually

#### 1. Start the ASP.NET Core Backend
Open a terminal in the `backend` folder and run:
```powershell
cd "d:\intern assingment\backend"
dotnet run --urls "http://localhost:5260"
```
- **Backend Base URL**: `http://localhost:5260`
- **Interactive Swagger UI**: [http://localhost:5260/swagger](http://localhost:5260/swagger)

#### 2. Start the React Frontend
Open a separate terminal in the `frontend` folder and run:
```powershell
cd "d:\intern assingment\frontend"
npm run dev
```
- **Frontend Web Application**: [http://localhost:5173](http://localhost:5173)

---

## STEP 3: Functional Walkthrough & Verification

Follow this walkthrough to verify all required assignment features:

```
Step 3.1: Open http://localhost:5173 in your browser
          → Verify initial list of seeded bugs is loaded.
          → Verify severity badges (Critical, High, Medium, Low).
          → Verify top stats pills match the total and severity counts.

Step 3.2: Click "+ Report Bug"
          → Enter Bug Name: "Memory leak in background report generation"
          → Select Severity: "High"
          → Enter Description: "Worker thread fails to release database context after generating monthly report."
          → Click "Create Bug".
          → Verify toast: "Bug created successfully!" and list refreshes.
          → Notice the Report Date was automatically assigned by the server.

Step 3.3: Click the Eye (View) Icon on any bug
          → Verify the detail modal opens showing ID, full description, formatted timestamp, and badge.

Step 3.4: Click the Edit Icon on any bug
          → Update the bug title, change severity to "Critical", and edit description.
          → Click "Save Changes".
          → Verify the updated information appears in the table.

Step 3.5: Click the Trash (Delete) Icon
          → Verify a confirmation dialog appears displaying the bug ID and title.
          → Click "Yes, Delete Bug".
          → Verify bug is deleted and list automatically updates.

Step 3.6: Test Search & Filtering
          → Type a keyword in the search bar (e.g. "token" or "database").
          → Click the "Critical" or "High" severity tab to filter.
          → Change the sort order to "Highest Severity" or "Bug Name (A-Z)".
```

---

## STEP 4: REST API Endpoints Reference

Base URL: `http://localhost:5260/api/bugs`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/bugs` | Retrieve all bugs ordered by report date descending | `200 OK` |
| **GET** | `/api/bugs/{id}` | Retrieve a single bug by its numeric ID | `200 OK`, `404 Not Found` |
| **POST** | `/api/bugs` | Create a new bug (*Server assigns `ReportDate`*) | `201 Created`, `400 Bad Request` |
| **PUT** | `/api/bugs/{id}` | Update an existing bug's name, description, and level | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/bugs/{id}` | Delete a bug by ID | `204 No Content`, `404 Not Found` |

---

### Request & Response Examples

#### 1. GET `/api/bugs` — Retrieve All Bugs
- **Status**: `200 OK`
- **Response**:
```json
[
  {
    "id": 1,
    "bugName": "Authentication token expiration causes 500 error",
    "bugDescription": "When JWT refresh token expires, the client receives HTTP 500 Internal Server Error instead of HTTP 401 Unauthorized.",
    "reportDate": "2026-11-08T09:30:00Z",
    "level": "Critical"
  },
  {
    "id": 2,
    "bugName": "Payment gateway timeout retry loop",
    "bugDescription": "Payment processing fails to back off when gateway response times out, leading to duplicate charge attempts.",
    "reportDate": "2026-11-09T14:15:00Z",
    "level": "High"
  }
]
```

#### 2. GET `/api/bugs/{id}` — Retrieve Bug by ID
- **Status**: `200 OK`
- **Response**:
```json
{
  "id": 1,
  "bugName": "Authentication token expiration causes 500 error",
  "bugDescription": "When JWT refresh token expires, the client receives HTTP 500 Internal Server Error instead of HTTP 401 Unauthorized.",
  "reportDate": "2026-11-08T09:30:00Z",
  "level": "Critical"
}
```
- **When Not Found**: `404 Not Found`
```json
{
  "message": "Bug with ID 999 was not found."
}
```

#### 3. POST `/api/bugs` — Create New Bug
- **Headers**: `Content-Type: application/json`
- **Request Body** *(Note: `reportDate` is not passed by client)*:
```json
{
  "bugName": "Checkout page button unresponsive on iOS Safari",
  "bugDescription": "Tapping the 'Complete Purchase' button on iOS Safari 17.2 produces no response due to an unhandled touch event.",
  "level": "High"
}
```
- **Status**: `201 Created`
- **Location Header**: `/api/bugs/5`
- **Response**:
```json
{
  "id": 5,
  "bugName": "Checkout page button unresponsive on iOS Safari",
  "bugDescription": "Tapping the 'Complete Purchase' button on iOS Safari 17.2 produces no response due to an unhandled touch event.",
  "reportDate": "2026-11-10T10:45:12.789Z",
  "level": "High"
}
```

#### 4. PUT `/api/bugs/{id}` — Update Bug
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "bugName": "Checkout page button unresponsive on iOS Safari (Patch Applied)",
  "bugDescription": "Tapping button produced no response. Touch event listener updated to passive in release 1.4.",
  "level": "Medium"
}
```
- **Status**: `200 OK`
- **Response**:
```json
{
  "id": 5,
  "bugName": "Checkout page button unresponsive on iOS Safari (Patch Applied)",
  "bugDescription": "Tapping button produced no response. Touch event listener updated to passive in release 1.4.",
  "reportDate": "2026-11-10T10:45:12.789Z",
  "level": "Medium"
}
```

#### 5. DELETE `/api/bugs/{id}` — Delete Bug
- **Status**: `204 No Content`

---

## STEP 5: Pre-Submission Checklist & Screenshots Guide

Deliverable #5 in the assignment requirements asks for:
> **"Screenshots of the working application."**

Follow these steps to take the screenshots before submitting:

### Capture the Following 6 Screenshots
Launch the application and take screenshots saving them into the [`screenshots/`](file:///d:/intern%20assingment/screenshots/) folder:

1. `screenshots/01-bug-list.png`
   - Capture the full **Bug Listing Page** showing the table of bugs, severity badges, and navbar stats.
2. `screenshots/02-create-bug.png`
   - Open the **"+ Report Bug"** modal, type in a sample bug, and take a screenshot showing the inputs, severity selection cards, and character counter.
3. `screenshots/03-bug-details.png`
   - Click the eye icon on any bug to open the **Bug Details Modal** showing the full description, formatted report timestamp, and ID badge.
4. `screenshots/04-edit-bug.png`
   - Click the edit icon to open the **Edit Bug Modal** with loaded data.
5. `screenshots/05-delete-confirm.png`
   - Click the delete icon to display the **Delete Confirmation Modal** (*"Are you sure you want to permanently delete bug #..."*).
6. `screenshots/06-swagger-api.png`
   - Open `http://localhost:5260/swagger` in your browser and screenshot the interactive API documentation showing all 5 REST endpoints.

---

## STEP 6: Packaging & Submission Instructions

### Option 1: Git Repository Submission (GitHub / GitLab)
If you are submitting via a Git link:
1. Initialize the git repository (if not already done):
   ```powershell
   git init
   git add .
   git commit -m "Complete full-stack Bug Management System assignment"
   ```
2. Create a new repository on your GitHub account.
3. Push your repository:
   ```powershell
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
> The included [`.gitignore`](file:///d:/intern%20assingment/.gitignore) automatically keeps your repository clean by ignoring `node_modules/`, `bin/`, and `obj/`.

---

### Option 2: ZIP Archive Submission
If you are submitting a `.zip` archive via an email or portal:

**1. Folders to INCLUDE in your zip**:
- `backend/` (All C# source files, controllers, models, DTOs, migrations)
- `frontend/` (`src/`, `package.json`, `index.html`, `vite.config.js`)
- `screenshots/` (All 6 captured screenshots)
- `start-all.bat`, `start-backend.bat`, `start-frontend.bat`
- `README.md`
- `.gitignore`

**2. Bulky Folders to EXCLUDE (Keeps ZIP small, ~2-5 MB)**:
- ❌ Do **NOT** include `frontend/node_modules/` (evaluator runs `npm install`)
- ❌ Do **NOT** include `backend/bin/` or `backend/obj/` (evaluator runs `dotnet build`)
- ❌ Do **NOT** include `.dotnet/`, `.dotnet_home/`, or `.nuget_packages/`

---

## 12. Evaluation Criteria Verification

| Evaluation Criteria | Requirement in Assignment | Our Implementation | Result |
| :--- | :--- | :--- | :---: |
| **CRUD Operations** | Create, View single, View all, Update, Delete bugs | Implemented across all 5 REST endpoints with HTTP verbs. | ✅ Verified |
| **ASP.NET Core Web API** | Standard controllers, route patterns, HTTP codes | Controller-based API (`BugsController`), ProblemDetails, 200, 201, 204, 400, 404. | ✅ Verified |
| **Entity Framework Core** | Code-First migrations, DbContext, proper relations | `ApplicationDbContext`, Fluent API, generated migration files & SQL script. | ✅ Verified |
| **Server-generated ReportDate** | Server generates creation date/time; frontend does not | `CreateBugDto` excludes `ReportDate`; assigned as `DateTime.UtcNow` in controller. | ✅ Verified |
| **Severity Enum Levels** | Critical, High, Medium, Low | Defined in `SeverityLevel.cs`, stored as string in PostgreSQL, visual badges in UI. | ✅ Verified |
| **Database Design** | Relational tables, keys, indexes | Primary key sequence, indexes on `ReportDate` and `Level`, seeded sample data. | ✅ Verified |
| **React Architecture** | Functional components and hooks | Clean components (`BugTable`, `BugFormModal`, `BugDetailModal`, etc.), `useState`, `useEffect`. | ✅ Verified |
| **Frontend/Backend Integration** | Integration between React and API | Centralized `bugService.js`, Vite reverse proxy to port 5260, CORS policy. | ✅ Verified |
| **Validation & Error Handling** | Model validation and proper API responses | Data Annotations (`[Required]`, `[StringLength]`), client inline errors, toast system. | ✅ Verified |
| **Code Readability & Organization** | Organized folder structure, coding conventions | C# PascalCase, JS camelCase, XML documentation, modular folders, `.gitignore`. | ✅ Verified |

---

## 👨‍💻 Submission Note
Developed for the **Intern Technical Assignment — Bug Management System**.
All functional and technical requirements from the assignment specification PDF have been thoroughly implemented and tested.
