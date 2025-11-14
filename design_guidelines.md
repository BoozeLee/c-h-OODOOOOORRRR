# Amphetamemes Enhanced Template System - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from underground comix culture (R. Crumb, S. Clay Wilson), psychedelic poster art, and modern experimental web design (Bruno Simon's portfolio, Awwwards experimental sites), blended with Material Design's structure for the data-heavy template management interface.

**Core Design Principle**: "Controlled Chaos" - Embrace the psychedelic, rebellious aesthetic while maintaining usability through clear information hierarchy and consistent interaction patterns.

---

## Typography

**Display Typography** (Headers, Template Titles):
- Primary: "Rubik Glitch" or "Bungee" (Google Fonts) - Bold, distorted, psychedelic feel
- Sizes: text-5xl to text-7xl for heroes, text-3xl to text-4xl for section headers
- Weight: 700-900 (extra bold)
- Transform: uppercase for impact headlines
- Letter-spacing: tracking-wide for breathing room

**Body Typography** (Descriptions, Metadata):
- Primary: "Space Grotesk" or "DM Sans" (Google Fonts) - Clean, modern, readable
- Sizes: text-base to text-lg for body, text-sm for metadata
- Weight: 400 regular, 600 semibold for emphasis
- Line-height: leading-relaxed (1.625)

**Code/Technical Typography** (Prompts, JSON):
- Monospace: "JetBrains Mono" or "Fira Code"
- Sizes: text-sm to text-base
- Background treatment: subtle darker background with border

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Micro spacing: space-2, gap-4 (elements within components)
- Component spacing: p-6, p-8 (card padding, section internal)
- Section spacing: py-16, py-20, py-24 (vertical section separation)
- Macro spacing: py-32 (major section breaks)

**Grid System**:
- Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Template Gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Dashboard Layouts: 2-column split (sidebar + main) on desktop
- Mobile: Always single column, stack everything

**Asymmetric Layouts**: Break the grid intentionally for visual interest
- Stagger template cards with alternating sizes
- Diagonal section dividers with SVG shapes
- Overlapping elements (cards, badges, decorative elements)

---

## Component Library

### Navigation
- Sticky header with glassmorphism effect (backdrop-blur-lg, semi-transparent)
- Logo: Bold, distorted text treatment or comic-style icon
- Navigation links with underline animation on hover
- "Create Template" CTA button - prominent, high contrast

### Hero Section
**Large Hero Image**: Full-width psychedelic illustration showcasing multiple template examples in collage format
- Height: min-h-screen or 80vh
- Image treatment: Subtle animated grain overlay, chromatic aberration effect
- Content overlay: Centered text with blurred background (backdrop-blur-md bg-black/40)
- Headline: "Psychedelic Truth-Revealing Art Prompts That Evolve With Culture"
- Sub-headline: Brief explanation of the adaptive system
- Dual CTAs: "Explore Templates" (primary) + "How It Works" (secondary)

### Template Cards
- Card structure: Overflow-hidden, rounded-2xl, border-2 with bold accent
- Header: Category badge + trend intensity meter (visual bar)
- Body: Template title (text-2xl), current narrative tag, mood indicators
- Footer: Evolution history preview, remix count, energy score
- Hover state: Lift effect (translate-y-1), stronger border, subtle glow
- Card backgrounds: Subtle gradient overlays matching category colors

### Interactive Template Editor
- Split-pane layout: Code/JSON on left, Live Preview on right
- Live Preview: Render prompt as styled card with psychedelic treatment
- Monaco Editor integration for code editing
- Real-time syntax highlighting for template structure
- Preview shows: Ben-Day dots overlay, halftone pattern, distortion effects

### Event Hooks Dashboard
- Timeline visualization of registered hooks
- Each hook as a card showing: trigger type, target templates, activation history
- Visual connection lines between related events (SVG paths)
- "Add Hook" floating action button (bottom-right, circular, large)

### Data Visualization
- Trend intensity: Horizontal bars with neon gradients
- Evolution history: Vertical timeline with branch points
- Cultural relevance: Radial progress meters with psychedelic fills
- Energy scores: Animated counter with particle effects

### Template Gallery/Browse
- Masonry grid layout (varying heights based on content)
- Filter sidebar: Category checkboxes, mood sliders, trend intensity range
- Sort options: Trending, Energy Score, Recently Updated, Most Remixed
- Search bar with real-time filtering and tag suggestions

### Export Modal
- Tabbed interface: JSON, CSV, Midjourney Prompt, DALL-E Prompt
- Code block with syntax highlighting and copy button
- Download button with format icon
- "Share Template" social buttons

---

## Visual Effects & Patterns

**Psychedelic Treatments** (applied selectively for impact):
- Ben-Day dots: SVG pattern overlay on hero images and template previews
- Halftone gradients: For backgrounds and card hover states
- Chromatic aberration: Subtle RGB split on headlines (1-2px offset)
- Animated grain texture: Looping noise overlay on hero section
- Distortion effects: CSS filter for slight wave/ripple on scroll triggers

**Interaction Animations** (minimal, purposeful):
- Card hover: transform scale(1.02) + shadow enhancement
- Button press: transform scale(0.98)
- Page transitions: Subtle fade + slight slide (50ms delay between elements)
- Modal entry: Scale from 0.9 to 1.0 with backdrop fade-in
- Loading states: Psychedelic spinner with rotating gradients

**Decorative Elements**:
- Scattered geometric shapes (circles, stars, lightning bolts) in section backgrounds
- Comic-style speech bubbles for tooltips and notifications
- Hand-drawn arrow SVGs pointing to CTAs
- Dripping/melting effects on section dividers (SVG paths)

---

## Images

**Hero Section**: 
Large horizontal banner (1920x800px) showing a collage of 3-4 Amphetamemes template examples in psychedelic style - overlapping, rotated at angles, with bold linework and neon colors. Should feel chaotic but composed, like an underground comix cover.

**Template Category Icons**: 
Small (128x128px) badge-style illustrations for each of the 10 categories - hand-drawn aesthetic, single-color icons matching category themes.

**How It Works Section**: 
3 illustrative diagrams showing: 1) Template browsing, 2) AI-powered evolution with trend data, 3) Edge-privacy personalization - infographic style with arrows and annotations.

**Empty States**: 
Comic-style illustration of a character creating templates, used when user has no saved templates or filtered results are empty.

---

## Section Layout

1. **Hero**: Full-screen with large background image, centered overlay content
2. **Quick Stats Bar**: Single row showing "10 Core Templates | 1000+ Remixes | Real-Time Evolution"
3. **Featured Templates Showcase**: 3-column grid of most popular/trending templates
4. **How The System Works**: 3-column explanation (Adaptive Metadata, Event Hooks, Edge Privacy)
5. **Template Categories**: Masonry grid showcasing all 10 categories with preview cards
6. **Interactive Demo**: Embedded template editor showing live preview
7. **Pricing Tiers**: 3-column pricing table (Individual, Bundle, Custom)
8. **Community Showcase**: User-generated remixes and custom templates (if applicable)
9. **Footer**: Newsletter signup, social links, quick navigation, platform links (Gumroad, Etsy)

---

## Responsive Behavior

**Desktop (lg:)**: Multi-column layouts, sidebar navigation, split-pane editor
**Tablet (md:)**: 2-column grids, collapsible sidebar, stacked editor panes
**Mobile**: Single column, bottom navigation bar, full-width cards, simplified visualizations

All interactive elements maintain 44x44px minimum touch targets on mobile.