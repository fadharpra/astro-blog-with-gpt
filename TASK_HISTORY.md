# TASK_HISTORY.md

Catatan ringkas perubahan yang dilakukan oleh Codex.

---

## [2025-06-08] Add Table of Contents Component
- Created `src/components/TableOfContents.astro`
- Implemented nested anchor list for `<h2>` and `<h3>` headings
- Styled ToC similar to Astro Starlight using TailwindCSS:
  - `h2` as main items
  - `h3` as indented subitems with smaller font and lighter color
  - Added hover underline effect
- Injected ToC into `src/pages/blog/[...slug].astro` beside the blog content
- Applied `sticky top-24` and `overflow-auto` to the sidebar
- Used `rehype-slug` and `rehype-autolink-headings` in `astro.config.mjs` to support heading anchors
- Smooth scrolling enabled on anchor click
- ToC hidden on mobile using `hidden lg:block`
