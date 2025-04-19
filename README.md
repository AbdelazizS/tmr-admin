# My React TS Property Management App

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure your API endpoints in `/src/services/PropertyService.ts`.
4. Run `npm run dev` (or equivalent) to start the development server.
5. Use `npm run lint` for ESLint and `npm run format` for Prettier formatting.

## Architecture Overview

- **/src/contexts:** Contains authentication context.
- **/src/layouts:** Contains route-based layouts (`AuthLayout` for public and `MainLayout` for protected routes).
- **/src/components:** Contains reusable UI components including Sidebar, Navbar, Forms, and Tables.
- **/src/pages:** Contains pages like Login, Register, and PropertyListing.
- **/src/routes:** Contains route definitions with protected routes.
- **/src/schema:** Zod schemas for form validation.
- **/src/services:** API service layer for CRUD operations.
- **/src/types:** Strict TypeScript types.

## Component Documentation
- **Navbar:** Includes dark mode toggle and a profile dropdown.
- **Sidebar:** A professional sidebar for navigation.
- **PropertyForm:** Manages property creation and editing with validations.
- **PropertiesTable:** Displays property data with sorting, filtering, pagination, and row actions.
  
## Key Dependencies
- React + TypeScript, TailwindCSS, react-router-dom, shadcn/ui, react-hook-form, zod, @tanstack/react-table, axios, sonner, lucide-react.
