# Overview

This is a **Campaign Manager Dashboard** application built with Angular 15 and PrimeNG, designed for multichannel marketing communications. The system provides a comprehensive analytics and management platform for sending communications through various channels including SMS, WhatsApp, Push Notifications, RCS, and Email. The dashboard offers real-time monitoring, performance analytics, budget tracking, AI-powered insights, and orchestration capabilities for marketing campaigns.

The application serves as a centralized hub for campaign management with features like KPI monitoring, channel performance analysis, heat maps, campaign tracking, BSP provider comparisons, journey orchestration, and budget vs performance calculations. **Status: Successfully deployed and running on Angular 15 with TypeScript components and SCSS styling.**

**Current Status**: Successfully converted to Angular-style application using PrimeNG components and styling. The application now runs as a client-side JavaScript application with PrimeNG UI components and comprehensive dashboard functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Angular 15 with TypeScript and Angular CLI
- **UI Library**: PrimeNG 15.4.1 components with PrimeIcons and PrimeFlex
- **Styling**: SCSS with PrimeNG theme integration and custom component styles
- **State Management**: Angular services and component-based state management
- **Routing**: Angular Router for client-side navigation
- **Component Structure**: Modular dashboard components with Angular TypeScript architecture

## Backend Architecture
- **Runtime**: Angular development server with hot module replacement
- **Language**: TypeScript with Angular services and dependency injection
- **Data Management**: Component-based data handling with TypeScript interfaces
- **Development Setup**: Angular CLI dev server with live reload
- **Data Storage**: In-component mock data with TypeScript interfaces for future API integration

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Comprehensive data models including:
  - User management system
  - Campaign entities with multi-channel support
  - Channel performance tracking
  - BSP provider management
  - Customer engagement metrics
  - Festival/event scheduling
- **Migration Strategy**: Database schema migrations managed through Drizzle Kit

## Key Architectural Decisions

### Monorepo Structure
The project uses a monorepo approach with shared schemas and types between client and server, enabling type safety across the full stack. This reduces duplication and ensures consistency in data models.

### Angular Component Architecture
The dashboard is built using Angular components for each analytics section (KPI cards, channel performance, heat maps, campaign monitoring, AI suggestions, BSP comparison), following Angular best practices with TypeScript interfaces, component lifecycle hooks, and SCSS styling. Each component manages its own state and data binding.

### Interface-Based Storage
The storage layer uses TypeScript interfaces, making it easy to switch from the current in-memory implementation to a database-backed solution without changing business logic.

### Real-time Design Considerations
The architecture supports real-time updates through query invalidation and refetching, with plans for WebSocket integration for live campaign monitoring.

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **react**, **react-dom**: Core React framework
- **express**: Node.js web server framework
- **vite**: Build tool and development server

## Database & ORM
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-zod**: Schema validation integration
- **@neondatabase/serverless**: PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store

## UI Components & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Dynamic styling utility
- **embla-carousel-react**: Carousel component

## Development & Build Tools
- **typescript**: Type checking and development
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production builds
- **@replit/***: Replit-specific development tools and plugins

## Planned Integrations
The application architecture supports future integration with:
- External BSP providers (Twilio, SendGrid, etc.)
- Analytics services for enhanced reporting
- Authentication providers
- Real-time notification systems
- External calendar APIs for festival/event management