# Amphetamemes - Psychedelic AI Template System

## Overview

Amphetamemes is a dynamic, AI-powered template management system for creating psychedelic art prompts that evolve with cultural trends. The application generates detailed art prompts inspired by underground comix culture (R. Crumb, S. Clay Wilson) and psychedelic poster art, with real-time trend integration powered by Perplexity AI. Users can create, browse, customize, and export templates across multiple categories (Social Media, Climate, AI Tech, Politics, Capitalism, Surveillance, etc.).

The system emphasizes "Controlled Chaos" - maintaining a rebellious, truth-revealing aesthetic while ensuring usability through clear information hierarchy and consistent interaction patterns.

**Long-Term Vision:** Amphetamemes serves as a proof-of-concept for quantum-inspired energetic file systems that can transform humanity across 20 domains: healthcare, education, climate, economics, governance, culture, justice, and existential risk mitigation. See `VISION.md` for the complete humanitarian roadmap and `BLUEPRINT.md` for technical implementation phases.

## AI Tools & Credits

**Creative AI Stack:**
- **Grok (X.AI)** - Advanced prompt engineering and quantum consciousness concept development
- **Perplexity AI** - Real-time cultural trend research and template context generation (model: "sonar")
- **Leonardo AI** - Psychedelic artwork generation for quantum system diagrams and underground comix visuals
- **Claude (Anthropic)** - Full-stack development, system architecture, and code implementation

**Visual Assets:**
- All quantum network diagrams and psychedelic comix artwork created using Grok-engineered prompts rendered through Leonardo AI
- Sacred geometry visualizations featuring Fibonacci spirals, golden ratio networks, and superpositioned quantum equations
- Underground comix aesthetic inspired by R. Crumb, S. Clay Wilson, and 1960s psychedelic poster art

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 13, 2025)

**GitHub Release Preparation (LATEST - Final):**
- ✅ **PII Removed** - All personal addresses, phone numbers, and personal emails removed from legal docs
- ✅ **Typo Fixed** - "bakersrreet" corrected to "bakerstreet" throughout
- ✅ **Security hardening** - Stripe returns 503 when keys missing (no server crashes)
- ✅ **Push script professionalized** - Removed force-push and political content, collaborative workflow ready
- ✅ **GitHub Sponsors configuration** - FUNDING.yml with business email (kiliaan@bakerstreet221b.store)
- ✅ **.env.example template** - Clear API key setup instructions with security warnings
- ✅ **CONTRIBUTING.md verified** - Professional collaboration guidelines ready
- ✅ **Royalty structure added to PATENT.md** - 4-tier licensing (3-10% based on company size)
- ✅ **README.md GitHub-ready** - Correct repo URL, security warnings, professional documentation
- ✅ **.gitignore enhanced** - Protected vault/, secrets, sensitive data
- ✅ **PUSH_TO_GITHUB.sh script** - Ready to deploy to https://github.com/Bakery-street-project/c-h-OODOOOOORRRR
- ✅ **All legal docs verified** - LICENSE, COPYRIGHT, PATENT.md, CREDITS.md complete
- ✅ **Architect review passed** - All changes verified for security and deployment readiness

**AutomationCodex Integration:**
- ✅ **Mathematical optimization framework integrated** - Graph Theory, Information Theory, Markov Decision Processes
- ✅ **Template Evolution API** - AutomationCodex-powered template lifecycle management
- ✅ **Content Complexity Analysis** - Shannon entropy calculations for prompt optimization
- ✅ **Portfolio Analytics** - Graph-based template portfolio optimization
- ✅ **API Endpoints:**
  - `GET /api/optimization/analyze/:id` - Analyze template using mathematical models
  - `GET /api/optimization/portfolio` - Portfolio-wide optimization analysis
  - `POST /api/optimization/evolve/:id` - Trigger template evolution

**MVP Completed:**
- ✅ Full-stack AI-powered template system with psychedelic design
- ✅ PostgreSQL database with template persistence  
- ✅ Perplexity AI integration (model: "sonar") for real-time cultural research
- ✅ Template generation: 2-step AI process (research context → generate psychedelic prompt)
- ✅ Trend research feature: standalone tool for discovering trending topics
- ✅ Export system: JSON/CSV/Text formats with proper escaping
- ✅ Template gallery: browse all generated templates with real-time data
- ✅ Stripe payment integration for template bundle sales
- ✅ Complete e-commerce flow: Store → Checkout → Success → Download

**Visual Integration System (LATEST):**
- ✅ Hero replacement: Superbrain Ascending (quantum portal/fractal clouds) for dramatic first impression
- ✅ VisualShowcase component: 3-panel grid showcasing Ethereal Essence, Dark Tree Anomaly, Cosmic Being
- ✅ SymbolismDecoder component: Educational section explaining sacred geometry, quantum portals, media satire
- ✅ HowItWorks enhancement: Split layout with Superbrain Paradox artwork + feature cards
- ✅ 5 psychedelic art assets strategically integrated across HomePage
- ✅ Underground comix aesthetic maintained throughout visual narrative
- ✅ All data-testids preserved, responsive layouts verified

**Stripe Payment System:**
- ✅ 4 pricing tiers: Single ($4.99), Starter Pack ($12.99), Creator Bundle ($19.99), Complete Collection ($34.99)
- ✅ Stripe Checkout integration with secure payment processing
- ✅ Webhook signature verification using rawBody buffer
- ✅ Purchase tracking with download tokens (32-byte hex)
- ✅ Template bundle generation and delivery system
- ✅ Multi-format export: JSON, CSV, and plain text
- ✅ Routing system with wouter (HomePage, StorePage, SuccessPage, DownloadPage)

**Bug Fixes:**
- Fixed Perplexity model name (updated to "sonar")
- Fixed CSV export escaping for special characters
- Fixed date type handling in exports
- Fixed TanStack Query keys to work with fetcher (single-string arrays)
- Fixed webhook signature verification with raw request body
- Enhanced error messages for better debugging

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript
- Vite for build tooling and development server
- TanStack Query (React Query) for server state management
- Tailwind CSS with custom design system
- Shadcn/ui component library (Radix UI primitives)
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)

**Design System:**
- Typography: "Bungee" for headers (psychedelic feel), "Space Grotesk" for body text, "JetBrains Mono" for code
- Custom color palette with HSL variables for theming
- Spacing system based on Tailwind units (2, 4, 6, 8, 12, 16, 20, 24)
- Asymmetric layouts with intentional grid-breaking for visual interest
- Dark/light mode support via CSS class toggling

**Key Components:**
- `HeroSection`: Full-bleed Superbrain Ascending artwork with gradient overlay and CTAs
- `VisualShowcase`: 3-panel grid featuring Ethereal Essence, Dark Tree Anomaly, Cosmic Being with captions
- `SymbolismDecoder`: Educational cards explaining sacred geometry, quantum portals, media satire themes
- `HowItWorks`: Split layout pairing Superbrain Paradox artwork with feature cards (Adaptive Metadata, Event Hooks, Edge Privacy)
- `TemplateCard`: Displays individual templates with category badges, trend meters, and export options
- `TemplateCreatorForm`: Generates new templates using Perplexity AI research
- `TrendResearcher`: Standalone trend research tool
- `ExportDialog`: Multi-format export (TXT, JSON, CSV) with copy-to-clipboard
- `TrendMeter`: Visual representation of trend intensity (0-100%)

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Node.js runtime with ESM modules
- Session-based architecture (using express-session with PostgreSQL store)
- RESTful API design

**API Endpoints:**
- `GET /api/templates` - Retrieve all templates or filter by category
- `POST /api/templates/generate` - Generate new template with Perplexity AI
- `GET /api/templates/:id` - Get single template details
- `PATCH /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Remove template
- `POST /api/trends/research` - Research trends via Perplexity API
- `POST /api/create-checkout-session` - Create Stripe checkout session for template bundle purchase
- `POST /api/stripe-webhook` - Webhook handler for Stripe payment events (signature verified)
- `GET /api/session/:sessionId` - Exchange Stripe session ID for purchase details and download token
- `GET /api/download/:token` - Download purchased template bundle using secure token
- `GET /api/optimization/analyze/:id` - Analyze template with AutomationCodex mathematical models
- `GET /api/optimization/portfolio` - Portfolio-wide optimization using graph theory
- `POST /api/optimization/evolve/:id` - Evolve template using AutomationCodex algorithms

**Perplexity AI Integration:**
- Model: `llama-3.1-sonar-small-128k-online` for real-time, grounded research
- Rate limits: 3 req/sec search, 5 req/min for deep completions
- Async error handling with retry logic for 429 errors
- Caching strategy to minimize API calls

**Data Layer:**
- Drizzle ORM for type-safe database queries
- Storage abstraction layer (`IStorage` interface) for flexibility
- Atomic operations for template creation/updates

### Data Storage

**Database:**
- PostgreSQL via Neon serverless driver
- Connection pooling for performance
- Migrations managed by Drizzle Kit

**Schema Design:**

**Templates Table:**
```typescript
{
  id: UUID (primary key)
  title: text
  category: text
  narrative: text
  promptContent: text (full generated prompt)
  trendIntensity: integer (0-100)
  energyScore: integer (0-100)
  remixCount: integer (tracks popularity)
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Users Table (authentication placeholder):**
```typescript
{
  id: UUID (primary key)
  username: text (unique)
  password: text (hashed)
}
```

**Design Rationale:**
- Simple relational model suitable for template management
- Denormalized for read performance (templates are standalone entities)
- Event-driven metadata (trendIntensity, energyScore) stored directly for fast queries
- Future extensibility: can add remix relationships, user favorites, version history

**Alternatives Considered:**
- Document store (MongoDB): Rejected due to need for structured queries and relational integrity
- Graph database: Over-engineered for current requirements, may revisit for complex remix networks

### Authentication & Authorization

**Current State:** Placeholder implementation
- User schema defined but not actively used
- Session middleware configured with connect-pg-simple
- Cookie-based sessions ready for authentication flow

**Planned Implementation:**
- Username/password authentication
- Session persistence in PostgreSQL
- Role-based access (creator vs. consumer)
- Edge-privacy personalization (client-side only, no server tracking)

### Build & Deployment

**Development:**
- Hot Module Replacement (HMR) via Vite
- Separate client/server TypeScript compilation
- Replit-specific plugins (error overlay, cartographer, dev banner)

**Production Build:**
- Client: Vite bundle to `dist/public`
- Server: esbuild bundle to `dist/index.js`
- Static asset serving from Express

**Environment Variables:**
- `DATABASE_URL`: PostgreSQL connection string (required)
- `PERPLEXITY_API_KEY`: API key for trend research (required)
- `NODE_ENV`: development/production flag

## External Dependencies

### Third-Party APIs

**Perplexity AI (Critical):**
- Purpose: Real-time trend research and template generation
- Model: `sonar` (2025 lightweight search-enabled model)
- Endpoint: `https://api.perplexity.ai/chat/completions`
- Rate limits: Free tier ~5k/month, Pro tier 50k/month
- Response time: 15-30 seconds per call (template generation uses 2 sequential calls)
- Error handling: Detailed error messages with backend error surfacing
- Fallback: Graceful error messages to user with retry capability

### Database Services

**Neon PostgreSQL (Critical):**
- Serverless PostgreSQL with HTTP interface
- Connection via `@neondatabase/serverless` driver
- Automatic connection pooling
- Configured via `DATABASE_URL` environment variable

**Drizzle ORM:**
- Type-safe query builder
- Schema-first design with TypeScript inference
- Migration tool: `drizzle-kit push`
- Zod integration for runtime validation

### UI Component Libraries

**Radix UI:**
- Headless accessible components (Dialog, Dropdown, Accordion, etc.)
- Used via Shadcn/ui wrapper layer
- Provides keyboard navigation, ARIA attributes, focus management

**Tailwind CSS:**
- Utility-first styling
- Custom theme extension in `tailwind.config.ts`
- JIT compilation for production builds
- PostCSS with autoprefixer

### Development Tools

**Replit Plugins:**
- Runtime error overlay for debugging
- Cartographer for code navigation
- Dev banner for environment awareness
- Only loaded in Replit development environment

### Asset Management

**Local Assets:**
- Hero banner image: `attached_assets/generated_images/Psychedelic_comix_banner_*.png`
- Attached research documents and Python scripts in `attached_assets/`
- Vite alias: `@assets` → `attached_assets/`

### Date & Time

**date-fns:**
- Client-side date formatting
- Used for "time ago" displays (e.g., "2h ago")
- Lightweight alternative to moment.js