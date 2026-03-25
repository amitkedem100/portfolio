---
alwaysApply: true
---

# PROJECT PROFILE – Portfolio  
# Product Designer & Vibe Coder Portfolio

---------------------------------------------------------
PROJECT CONTEXT
---------------------------------------------------------

This project is a responsive portfolio for a mid-level UI/UX and Product Designer.

The portfolio is intended for hiring managers, product managers, and HR, on both desktop and mobile.

The portfolio presents a clean, mature, and precise product-oriented experience, emphasizing:
- Systemic thinking  
- High execution pace  
- Turning complexity into simplicity  

The portfolio is intended for salaried Product Designer positions in technology product companies with strong design culture and modern working environments.

This project does not include backend.

---------------------------------------------------------
TECH STACK
---------------------------------------------------------

- Next.js + React + TypeScript (App Router)
- Global CSS under src/app
- No Bootstrap

---------------------------------------------------------
DESIGN TOKENS – PORTFOLIO DESIGN SYSTEM
---------------------------------------------------------

- All design tokens must live in:

  src/app/globals.css  

- Official token area:

  /* PORTFOLIO DESIGN SYSTEM */

  (Typography, Colors, Radii, Shadows, Spacing, Grid)

- Do NOT use hard-coded:
  - font-family  
  - font-size  
  - line-height  
  - colors  
  - hex values  

- Always use existing PORTFOLIO tokens.

If a value is missing:
1. Propose a token name  
2. Add it under the relevant PORTFOLIO section  
3. Then use it

---------------------------------------------------------
LANGUAGE / RTL
---------------------------------------------------------

- Portfolio language: English only  
- No RTL support required

---------------------------------------------------------
CSS ORGANIZATION
---------------------------------------------------------

- Plain `.css` files only (no CSS Modules)
- Feature-scoped CSS files (e.g., home.css, project.css)
- Prefix-based class names

Examples:
.page-header  
.page-section  
.project-hero  
.home-project-grid  

- Layout CSS may live in page file initially
- Extract shared styles later when stable

---------------------------------------------------------
UI PRIMITIVES
---------------------------------------------------------

- Prefer existing Portfolio components under:

  src/app/portfolio/components

If a primitive is missing (Button, Card, Input, etc.):

1. Ask before creating  
2. Create Portfolio-prefixed component  
3. Use tokens only  
4. No external UI libraries

---------------------------------------------------------
GRID & LAYOUT RULES
---------------------------------------------------------

- Global 8-column grid system
- Tokens defined in globals.css

  --portfolio-grid-columns  
  --portfolio-grid-margin-inline  
  --portfolio-grid-gutter  

Rules:
- One main grid per page
- Define skeleton using grid-template-areas
- Each major section declares its grid-area
- Avoid numeric column spans for skeleton
- Use Flex for inner layout

Vertical rhythm is handled via spacing tokens (not grid rows).

---------------------------------------------------------
SPACING RULES
---------------------------------------------------------

Horizontal (4px scale):
--portfolio-space-x-4  
--portfolio-space-x-8  
--portfolio-space-x-12  
--portfolio-space-x-16  

Vertical (8px scale):
--portfolio-space-y-8  
--portfolio-space-y-16  
--portfolio-space-y-24  
--portfolio-space-y-32  

Rules:
- Use spacing variables by default
- No invented spacing values
- No %, vw, clamp for component spacing
- fr and grid-column only allowed at page layout level

---------------------------------------------------------
COMPONENT PLACEMENT
---------------------------------------------------------

Global layout components:
src/app/portfolio/components/

Reusable project components:
src/app/portfolio/components/

Page-only components:
src/app/portfolio/<page>/components/

Example (Basilar case study):
src/app/portfolio/basilar/components/

---------------------------------------------------------
COMPONENT RESPONSIBILITY
---------------------------------------------------------

- Pages: structure + data preparation
- Components: UI only
- Keep components small and focused
- Avoid over-abstraction

---------------------------------------------------------
DATA & CONTENT ARCHITECTURE (No Backend)
---------------------------------------------------------

- Data utilities are plain async/sync functions
- Read from local JSON / MD
- Return data only (no UI, no side effects)

UI components must not load or parse data.

Pages:
- Fetch data
- Prepare props
- Pass into components

Naming examples:
getProjects()  
getProjectBySlug()

---------------------------------------------------------
STATE MANAGEMENT
---------------------------------------------------------

- Prefer Server Components + props
- useState for local state
- Global state only for:
  theme  
  language  
  navigation  
  cursor mode  
  motion preferences  

If global state needed:
- Small React Context
- No reducers or state machines

State should live where it is owned.

---------------------------------------------------------
TYPESCRIPT RULES
---------------------------------------------------------

- Use TypeScript
- Prefer type over interface
- Add types only when they add clarity

Example types:
Project  
ProjectMeta  
MediaItem  
CaseStudySection  

Avoid enums for simple strings.

---------------------------------------------------------
CSS & CLASS NAMING
---------------------------------------------------------

- kebab-case only
- Page namespaces:

home-...  
project-...  
about-...

No generic class names:
.card  
.container  
.wrapper  

Document new classes.

---------------------------------------------------------
HANDLERS & LOGIC
---------------------------------------------------------

- Small readable handlers
- No logic inside JSX
- Extract to named functions when needed

---------------------------------------------------------
DO NOT HIDE ELEMENTS
---------------------------------------------------------

If element should not be usable:
- Keep rendered
- Disable
- Add title / tooltip

Never hide elements silently.

---------------------------------------------------------
END OF PROJECT PROFILE
---------------------------------------------------------