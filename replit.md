# Overview

This Campaign Manager Dashboard, built with Angular and PrimeNG, provides a centralized platform for managing multichannel marketing communications across SMS, WhatsApp, Push Notifications, RCS, and Email. It offers real-time monitoring, performance analytics, budget tracking, AI-powered insights, and journey orchestration for marketing campaigns. The system is designed to handle large-scale data, supporting 15-20 daily campaigns with millions of customer records, and aims to provide actionable insights for optimizing marketing spend and ROI. The project's ambition is to create a world-class analytics platform that combines aesthetics, functionality, and performance for massive data volumes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application is built with Angular 15, utilizing TypeScript and Angular CLI. PrimeNG 15.4.1 components, PrimeIcons, and PrimeFlex are used for the UI, with SCSS for styling and theme integration. Angular services manage state, and Angular Router handles client-side navigation. The component structure is modular, with each analytics section developed as a separate Angular component.

## Backend Architecture
The development environment primarily uses the Angular development server with hot module replacement. Data management is handled through component-based TypeScript interfaces, allowing for a future transition from in-memory mock data to a robust database-backed solution.

## Database Design
The system utilizes Drizzle ORM configured for PostgreSQL, with comprehensive data models for user management, multi-channel campaigns, channel performance, BSP provider management, customer engagement, and event scheduling. Database schema migrations are managed via Drizzle Kit.

## Key Architectural Decisions

### Monorepo Structure
A monorepo approach is employed, sharing schemas and types between client and server to ensure type safety and consistency across the full stack, reducing duplication.

### Angular Component Architecture
The dashboard adopts a modular Angular component architecture, where each analytics section (KPIs, channel performance, heatmaps, monitoring, AI suggestions, BSP comparison) is an independent component following Angular best practices.

### Interface-Based Storage
The storage layer uses TypeScript interfaces, providing flexibility to switch from in-memory data to a database without altering business logic.

### Real-time Design Considerations
The architecture supports real-time updates through query invalidation and refetching, with planned WebSocket integration for live campaign monitoring.

### UI/UX Decisions
The design focuses on a clean, professional, and performance-first approach, featuring a modern card-based layout with consistent theming, logical information hierarchy, and intuitive grid system using PrimeFlex. It incorporates intelligent collapsible sections, progressive feature appearance based on data age (15/30/45/60+ days), and accessibility-first design (WCAG 2.1 AA compliance, keyboard navigation). The aesthetic draws inspiration from platforms like Adobe CJA and Salesforce Marketing Cloud, with mobile-first responsiveness mirroring CleverTap/MoEngage patterns.

### Technical Implementations
Key features include intelligent data architecture with live and overnight batch processing sections, advanced AI integration for context-aware suggestions, a real-time Budget vs Performance Calculator, and a Campaign Calendar. Performance optimization involves lazy loading for heavy components, virtual scrolling for large datasets, and strategic caching for various data ranges.

# External Dependencies

## Core Framework Dependencies
- `@tanstack/react-query` (for server state management and caching)
- `react`, `react-dom` (core React framework - *Note: This seems to be a mismatch with the Angular framework mentioned in the frontend section, typically these would not coexist in a pure Angular app.*)
- `express` (Node.js web server framework)
- `vite` (Build tool and development server - *Note: This also seems to be a mismatch with Angular CLI mentioned for frontend.*)

## Database & ORM
- `drizzle-orm` (TypeScript ORM)
- `drizzle-zod` (Schema validation)
- `@neondatabase/serverless` (PostgreSQL driver)
- `connect-pg-simple` (PostgreSQL session store)

## UI Components & Styling
- `@radix-ui/*` (Accessible UI primitives)
- `tailwindcss` (Utility-first CSS framework)
- `lucide-react` (Icon library)
- `class-variance-authority` (Dynamic styling utility)
- `embla-carousel-react` (Carousel component)

## Development & Build Tools
- `typescript`
- `tsx`
- `esbuild`
- `@replit/*` (Replit-specific tools)

## Planned Integrations
The architecture supports future integration with:
- External BSP providers (e.g., Twilio, SendGrid)
- Analytics services
- Authentication providers
- Real-time notification systems
- External calendar APIs