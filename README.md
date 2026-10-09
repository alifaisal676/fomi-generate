# Fomi - AI Generation Workspace

A responsive, production-style implementation of the Fomi image/video generation screen, built for the Tarum frontend assessment (Part A).

**Live demo:** _add your Vercel URL here_

## Stack

Next.js (App Router) - JavaScript - Tailwind CSS - Radix UI primitives (Popover, Dialog) - lucide-react

## What it does

- **Workspace layout** matching the mockup: header with nav and progress bar, floating history strip over the feed, generator panel, and a feed of prompt cards beside result grids.
- **Generator panel:** Image/Video toggle, prompt box with the Generate button inside it, count / aspect-ratio / model pickers, and collapsible Advance and Styles sections.
- **Mock API** (`/api/generations`): `GET` returns past batches, `POST` returns a new batch after a realistic delay (images, or a video in video mode). A prompt containing the word `fail` returns an error so the error state can be demoed.
- **Generation flow:** skeleton tiles while loading, header progress bar that fills during generation, new batch animates in, error state with Retry / Dismiss, empty state with example prompts, and a load-error state.
- **Results:** hover toolbar (favorite, copy prompt, download, expand), videos preview on hover, and a lazy-loaded lightbox with keyboard navigation.
- **History strip:** wheel-to-horizontal scrolling; selecting a thumbnail scrolls to and highlights its batch (older items load their prompt back into the generator).
- **Nav menus:** hover / click / keyboard disclosure menus for Image, Video and Templates, with tooltips on the icons.
- **Responsive:** large displays, desktop, tablet, and a phone layout with a bottom tab bar, a floating prompt bar and a bottom-sheet generator.
- **Light and dark themes**, persisted without a flash on reload.

## Architecture

```
src/
  app/                 layout, page, global tokens/animations, API route
  components/
    layout/            Header, Logo, ProgressBar, ThemeToggle, HeaderActions
    nav/               NavTabs, NavIconButton, MegaMenu, MenuCard (+ config/data)
    history/           HistoryStrip, HistoryThumb
    generator/         GeneratorPanel, PromptBox, pickers, Advanced/Styles
    feed/              GenerationFeed, GenerationBatch, PromptCard, MediaTile, MediaLightbox, EmptyState
    workspace/         Workspace (composition root), MobileComposer
    ui/                SegmentedControl, PickerPopover, CollapsibleSection, MediaImage, Toast, Avatar
  hooks/               useGenerations, useGeneratorSettings, useTheme, useCommitOnPick
  data/                aspect ratios, models, styles, defaults
  lib/                 api client, mock data
```

Design tokens (colors sampled from the mockup) live as CSS variables in `globals.css` and are mapped into Tailwind, so theming is a variable swap.

## Decisions and deliberate tweaks

- **Contrast:** white text on the peach Generate button fails WCAG AA, so button text and the link color use darker tokens.
- **Default aspect ratio is 2:3**, the closest listed ratio to the mockup's portrait tiles (3:4 is not in the ratio list).
- **Placeholder copy** corrected from "you imaginations to be converted to piece of art" to "your imagination to be turned into a piece of art".
- **Model pill** shows the model's icon and name (full name in the accessible label), because real model names do not fit beside the "Model:" prefix in a narrow panel.
- **Generate stays clickable when the prompt is empty** (`aria-disabled`) so it can focus the field, shake, and explain why.
- **Progress bar:** shows a resting segment as in the mockup, and reflects real generation progress while a request is running.
- **Unbuilt destinations** (Home, Library, Gallery, Support, tool pages) show a "coming soon" toast instead of dead buttons.

## Accessibility

Semantic landmarks and a skip link, labelled controls, native radio inputs behind the pickers (arrow keys, Tab behavior, screen-reader semantics), visible focus rings, focus returned after closing the lightbox and menus, `aria-live` status messages, reduced-motion support. Checked with axe-core (WCAG 2 A/AA) on light and dark themes, with menus open, and in the mobile sheet.

## Performance

`next/image` with `sizes`, first-batch images preloaded, lazy-loaded lightbox via `next/dynamic`, memoized feed and tiles (typing in the prompt does not re-render results), video clips load only on hover, and skeletons for perceived speed.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Media

Place assets in `public/mock/` (missing files fall back to a neutral tile):

```
results/portrait-01..08.webp         (~768x1024)
results/video-01..03.mp4 + .webp     (clips + posters)
history/h-01..14.webp                (square thumbnails)
avatar.webp                          (optional)
```

## Known limitations

The API is mocked and stateless between reloads, favorites are local to the session, and non-image pages are intentionally out of scope.
