# Copilot Instructions for Heritage Revival

## Project Overview

- **Monorepo** with `frontend` (Next.js/React/TypeScript) and `backend` (Node.js/Express/MongoDB)
- **Frontend**: Next.js app in `frontend/` using Ant Design, Tailwind, and custom components. Data types in `src/types/`.
- **Backend**: Express API in `backend/` with MongoDB (via Mongoose), file uploads (Multer), and email notifications (Nodemailer).

## Key Workflows

- **Frontend dev**: `cd frontend && pnpm dev` (or `npm run dev`/`yarn dev`)
- **Backend dev**: `cd backend && npm run dev` (nodemon, port 5000)
- **API base URL**: `http://localhost:5000/api/`
- **MongoDB**: Requires `MONGO_URI` in backend `.env`

## Data Flow & Integration

- **Members**: CRUD via `/api/members` (see `backend/routes/members.js`)
  - File uploads: `profileImageFile` (handled by Multer)
  - Confirmation email sent on member creation
- **Frontend fetches** member data from backend (see `src/app/our-members/page.tsx`)
- **MemberCard** UI: `src/components/OurMembers/MemberCard.tsx`

## Project Conventions

- **TypeScript types**: All shared types in `frontend/src/types/`
- **Component structure**: Feature-based folders under `frontend/src/components/`
- **API endpoints**: All backend routes prefixed with `/api/`
- **Env config**: Use `.env` in backend for secrets (not committed)

## Patterns & Examples

- **Adding a new member**: POST to `/api/members` with form data and optional file
- **Fetching members**: See `OurMembersPage` in `frontend/src/app/our-members/page.tsx`
- **Custom UI**: Extend Ant Design components, use Tailwind for utility styles

## External Dependencies

- **Frontend**: Next.js, React, Ant Design, Tailwind, SweetAlert2
- **Backend**: Express, Mongoose, Multer, Nodemailer, dotenv

## References

- **Backend entry**: `backend/server.js`
- **Frontend entry**: `frontend/src/app/page.tsx`
- **Member model**: `backend/models/Member.js`
- **API routes**: `backend/routes/`
- **UI components**: `frontend/src/components/`

---

For questions about project-specific patterns, see referenced files or ask for examples from the codebase.
