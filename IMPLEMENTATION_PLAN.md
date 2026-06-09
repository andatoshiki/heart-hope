# Heart to Heart Site Implementation Plan

## 1. Scope And Design Inventory

The attached `Heart to Heart.fig` file was inspected as the source of truth.
It contains 9 desktop frames at a 1440 px design width:

| Figma frame | Planned route or behavior | Design size |
| --- | --- | --- |
| Home | `/` | 1440 x 4042 |
| About us | `/about` | 1440 x 2279 |
| Contact us | `/contact` | 1440 x 1673 |
| 101 | `/art-healing` | 1440 x 2859 |
| Box | `/toolbox` | 1440 x 2413 |
| Box Details | `/toolbox/draw-the-music` | 1440 x 2365 |
| Resource Guide | `/resources` | 1440 x 2544 |
| The "Right Now" Corridor | `/corridor` | 1440 x 2383 |
| The "Right Now" Corridor overlay | Contribution modal on `/corridor` | 1440 x 900 |

The archive also contains 20 image assets used by the hero, activity cards,
resource cards, editorial sections, and Corridor gallery.

### Visual Language

- Quiet editorial art-wellness presentation with generous whitespace.
- Warm off-white canvas and cream section surfaces.
- Black, soft brown, olive, and muted gold accents.
- Large photographic cards with rounded corners and restrained shadows.
- Expressive serif headings paired with compact sans-serif navigation and copy.
- Shared desktop header and footer across every route.

### Exact Font Families From Figma

- `Playfair Display`: Regular, Italic, Bold, Bold Italic
- `Inter`: Extra Light, Regular, Italic, Medium, Semi Bold, Bold
- `Montserrat`: Medium, used sparingly for small labels

Self-host the required font files so rendering does not depend on a third-party
font request. Match Figma's weights, italics, letter spacing, and line heights.

### Core Color Tokens

Start with the exact recurring Figma colors and expand only when a component
requires another measured value:

```css
--color-canvas: #fdfcfb;
--color-surface: #f5f2ed;
--color-ink: #121212;
--color-ink-strong: #1a1a1a;
--color-ink-soft: #57534e;
--color-olive: #5a5a40;
--color-gold: #c5a059;
--color-hero-blue: #bdd3d7;
--color-white: #ffffff;
```

## 2. Framework Decision

Use **Astro with TypeScript, React islands, and Tailwind CSS**.

### Why Astro

- The site is a content-heavy, multi-page design showcase with no SSR need.
- Astro generates static HTML for every route by default.
- Static Astro components ship no client JavaScript unless explicitly hydrated.
- React islands support the few stateful interactions without turning the whole
  site into a client-rendered application.
- Astro's asset pipeline can optimize the embedded Figma images at build time.

### Why React Islands

Use React only for:

- Toolbox category filtering.
- Corridor contribution modal and contribution type selection.
- Contact form showcase validation and success feedback.
- Optional lightweight share/like feedback on the activity detail page.

Use Astro components for the header, footer, page shells, cards, sections, and
all other static presentation.

### Why Tailwind CSS

- Provides consistent token-backed spacing and responsive layout primitives.
- Keeps repeated page patterns aligned without adopting a visually opinionated
  component library.
- Allows exact Figma values through theme tokens and occasional arbitrary values.

Do not use Material UI, Chakra, Bootstrap, or a pre-styled component framework.
They would add unnecessary runtime and fight the bespoke Figma styling. Use
native semantic elements and extracted Figma vectors for icons.

## 3. Proposed Project Structure

```text
src/
  assets/
    images/
    icons/
  components/
    layout/
      SiteHeader.astro
      SiteFooter.astro
      PageShell.astro
    ui/
      Button.astro
      PageHeading.astro
      SectionHeading.astro
      ActivityCard.astro
      ResourceCard.astro
      QuotePanel.astro
      FormField.astro
    sections/
      home/
      about/
      art-healing/
      toolbox/
      resources/
      corridor/
      contact/
    react/
      ToolboxFilter.tsx
      CorridorSubmissionDialog.tsx
      ContactFormDemo.tsx
  content/
    activities/
  data/
    navigation.ts
    resources.ts
    corridor.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    about.astro
    art-healing.astro
    toolbox/
      index.astro
      [slug].astro
    resources.astro
    corridor.astro
    contact.astro
  styles/
    global.css
    tokens.css
```

## 4. Component Architecture Rules

- Prefer composition and named slots over boolean-heavy component APIs.
- Create explicit variants such as `ActivityFeatureCard` and
  `ActivitySummaryCard` when layouts materially differ.
- Keep state inside the React island that owns the interaction.
- Avoid global state; these interactions do not need it.
- Keep static arrays and configuration outside component render functions.
- Hydrate islands only when needed using the least eager suitable directive.
- Animate only `transform` and `opacity`, and respect reduced-motion settings.

React Native-specific packages and APIs are not appropriate for this desktop
site. Apply only its transferable principles: minimal state subscriptions,
stable list rendering, exact font setup, optimized images, and GPU-friendly
animation properties.

## 5. Implementation Phases

### Phase 1: Foundation And Asset Preparation

- Initialize Astro with strict TypeScript, React integration, and Tailwind CSS.
- Configure fully static output and package scripts.
- Extract the 20 Figma image assets into stable, descriptive filenames.
- Extract or recreate the small Figma vector icons as accessible SVGs.
- Self-host the exact font families and required weights.
- Add design tokens for color, typography, spacing, radius, shadows, and layout.
- Establish a centered desktop content grid matching the 1440 px reference.

### Phase 2: Shared Site Shell

- Implement the shared 81 px desktop header and active navigation states.
- Implement the shared 456 px editorial footer and newsletter field.
- Add reusable page headings, buttons, section labels, cards, and quote panels.
- Build semantic focus states and keyboard behavior before page composition.

### Phase 3: Static Pages

Build in this order so shared patterns are established early:

1. Home: hero, About preview, Toolbox cards, Art Healing 101, Corridor preview.
2. About: story content, large image, quote and Explore/Heal/Connect panel.
3. Art Healing 101: alternating image/text sections and disclaimer panel.
4. Resources: organization, artist, book, and disclaimer cards.
5. Contact: contact details and styled form shell.

### Phase 4: Toolbox Routes

- Model activities as structured content with category, title, summary, image,
  materials, steps, and related activity references.
- Build `/toolbox` from the activity collection.
- Add the category filter as a small React island.
- Build static activity detail routes from `src/content/activities`.
- Match the Draw the Music detail frame first, then make the template reusable.

### Phase 5: Corridor And Showcase Interactions

- Build the current theme panel and gallery layout.
- Implement the accessible contribution modal with native dialog semantics.
- Support Photo, Text, and Sound presentation states without backend upload.
- Add clear demo-only success feedback.
- Keep Contact submission client-only because this is a design showcase.

### Phase 6: Responsive Interpretation

The Figma file contains desktop frames only. Preserve pixel-level parity at
1440 px first, then create a responsive interpretation:

- Desktop: exact Figma composition.
- Tablet: reduce gutters and move asymmetric pairs into balanced grids.
- Mobile: stack sections, use a keyboard-accessible menu, and preserve content
  order and hierarchy.
- Avoid shrinking desktop layouts into unreadable miniature versions.

### Phase 7: Verification And Polish

- Compare every route against the Figma reference at 1440 px.
- Verify layout at common tablet and mobile widths.
- Run `astro check`, linting, and the production static build.
- Add browser screenshot checks for all routes.
- Audit keyboard navigation, dialog focus management, form labels, contrast,
  reduced motion, target sizes, and image alternative text.
- Confirm no unnecessary React bundles or hydration directives are shipped.
- Confirm optimized images preserve the Figma crops and do not cause layout shift.

## 6. Acceptance Criteria

- All 8 routes and the Corridor modal match the supplied desktop designs.
- The exact Figma font families and required styles are self-hosted and used.
- Every route is generated as static HTML during the production build.
- JavaScript is limited to intentional interactive islands.
- Header, footer, navigation, forms, filters, and dialog are keyboard accessible.
- The site remains coherent and usable below the original 1440 px design width.
- Production build, type checks, visual checks, and accessibility audit pass.

## 7. Known Decisions And Risks

- The connected Figma account could not be enumerated by filename alone, so the
  attached `.fig` archive is the inspected design source of truth.
- The source contains no mobile frames; responsive layouts require deliberate
  interpretation after desktop parity.
- Contact and Corridor submissions remain showcase interactions unless a real
  form or storage provider is requested later.
- Self-hosted versions of the named fonts may have tiny metric differences from
  the Figma font build; visual comparison will catch and correct those cases.
- Preserve source copy during the first fidelity pass, including existing wording,
  then handle editorial corrections as a separate review.
