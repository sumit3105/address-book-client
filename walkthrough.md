# Address Book Frontend — Walkthrough

## Overview

A premium React + TypeScript frontend client for the **Address Book Server V3** backend API has been implemented. The app features a dark-mode glassmorphism design, full authentication flow, CRUD address management with server-side filtering/pagination, and CSV export capabilities.

## Tech Stack

| Technology | Usage |
|---|---|
| **Vite** | Build tool & dev server (port 3000) |
| **React 19** + **TypeScript 6** | UI framework |
| **Redux Toolkit** | State management (auth + address slices) |
| **React Router v7** | Client-side routing with protected routes |
| **React Hook Form** | Form handling with validation |
| **Axios 1.14.0** | HTTP client (pinned – 1.14.1 is compromised) |
| **Styled Components** | Component-level styling |
| **SCSS + CSS Modules** | Global styles, design tokens, mixins |

## Project Structure

```
src/
├── api/                          # Axios instance + API services
│   ├── axiosInstance.ts          # JWT interceptors, 401 redirect
│   ├── authApi.ts               # Register, Login
│   └── addressApi.ts            # Full CRUD, filter, export
├── components/
│   ├── AddressDetailModal/      # Contact detail view modal
│   ├── ExportModal/             # Field picker + email for CSV export
│   ├── Layout/                  # Navbar + Outlet wrapper
│   └── common/
│       ├── Button/              # 5 variants (primary/secondary/danger/ghost/outline)
│       ├── Input/               # forwardRef input with error states
│       ├── Loader/              # Spinner + skeleton loaders
│       ├── Modal/               # Reusable modal with backdrop blur
│       ├── Toast/               # Toast provider + useToast hook
│       └── ProtectedRoute.tsx   # Auth guard
├── pages/
│   ├── Auth/
│   │   ├── LoginPage.tsx        # Email + password login
│   │   ├── RegisterPage.tsx     # Registration + password strength
│   │   └── Auth.styles.ts       # Shared auth page styles
│   ├── Dashboard/
│   │   ├── DashboardPage.tsx    # Data table + filters + pagination
│   │   └── Dashboard.styles.ts
│   └── AddressForm/
│       ├── AddressFormPage.tsx  # Create/edit form
│       └── AddressForm.styles.ts
├── store/
│   ├── index.ts                 # Store configuration
│   ├── authSlice.ts             # Auth state + async thunks
│   ├── addressSlice.ts          # Address state + async thunks
│   └── hooks.ts                 # Typed useAppDispatch/useAppSelector
├── styles/
│   ├── _variables.scss          # Design tokens (colors, spacing, fonts)
│   ├── _mixins.scss             # Glassmorphism, responsive, flex helpers
│   ├── _animations.scss         # Keyframe animations
│   ├── global.scss              # Reset + base styles
│   ├── theme.ts                 # Styled-components theme object
│   └── styled.d.ts              # Theme type declaration
├── types/
│   └── index.ts                 # All TypeScript interfaces
├── utils/
│   └── validation.ts            # Regex patterns + validation functions
├── App.tsx                      # Routes + providers
└── main.tsx                     # Entry point
```

## Routes

| Path | Component | Auth Required |
|---|---|---|
| `/login` | LoginPage | ✗ |
| `/register` | RegisterPage | ✗ |
| `/` | Dashboard | ✓ |
| `/address/new` | AddressFormPage | ✓ |
| `/address/edit/:id` | AddressFormPage (edit mode) | ✓ |

## Features Implemented

### Authentication
- Login with email/password validation
- Registration with password strength meter (weak → fair → good → strong)
- Confirm password matching
- JWT token stored in localStorage
- Auto-redirect on 401 responses

### Dashboard
- Paginated data table showing name, email, phone, city, state
- Search bar + filter fields for city, state, country, pincode
- Stats bar (total contacts, showing, pages)
- Per-row actions: View (modal), Edit (navigate), Delete (confirm modal)
- Export button → opens field picker modal

### Address Management
- Create new address with section-based form (Personal Info + Address Details)
- Edit existing address (pre-filled via API fetch)
- All validations from backend spec:
  - Email: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
  - Phone: `^[6-9]\d{9}$`
  - Pincode: `^[1-9][0-9]{5}$`
  - Password: min 8 chars, 1 upper, 1 lower, 1 digit, 1 special

### Export
- Field selection via styled checkboxes
- Email input for receiving CSV download link
- Dispatches to `POST /addresses/export`

## UI Screenshots

### Register Page (with Password Strength Meter)
![Register Page](/home/sumitgohil/.gemini/antigravity/brain/2f2e626b-f547-4ab3-8a64-e1a194558e16/register_page_final_1776143952665.png)

## Verification

| Check | Result |
|---|---|
| TypeScript compilation (`tsc -b`) | ✅ 0 errors |
| Production build (`npm run build`) | ✅ Success (397 kB JS, 2.5 kB CSS) |
| Dev server (`npm run dev`) | ✅ Running on port 5173 |
| Login page visual | ✅ Dark theme, glassmorphism, Inter font |
| Register page visual | ✅ Password strength meter working |

## How to Run

```bash
cd /home/sumitgohil/Programs/Typescript/address-book-server-v3-client
npm run dev
# → http://localhost:5173
```

> **Note:** Ensure the backend server is running at `http://localhost:8000` for API calls to work.
