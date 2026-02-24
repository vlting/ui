> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Empty

## 1. Purpose

- Provides a consistent empty state pattern for no-data, no-results, and first-time-use scenarios.
- Use when a container has no content to display (empty tables, no search results, empty inboxes).
- Do NOT use for error states — use Alert or a dedicated error component instead.

---

## 2. UX Intent

- **Primary interaction goal:** Communicate that an area is intentionally empty and optionally guide the user toward a next action.
- **Expected user mental model:** A centered message with optional icon and call-to-action, similar to empty states in modern apps.
- **UX laws applied:**
  - **Jakob's Law** — follows the common empty state pattern (icon + title + description + CTA).
  - **Tesler's Law** — handles centering, spacing, and max-width internally; consumers just compose sub-components.

---

## 3. Anatomy

- **Empty** (Root) — Centered flex container with `role="status"` for assistive technology.
- **Empty.Media** — Slot for icon or illustration (muted opacity, centered).
- **Empty.Title** — Heading text (`<h3>` via `styledHtml`), centered.
- **Empty.Description** — Body text (muted color, max-width 400px for readability), centered.
- **Empty.Action** — Slot for CTA button or custom action content.

> **TypeScript is the source of truth for props.** See the exported types in `Empty.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Empty** — Default state; displays the composed sub-components centered.
- No interactive states — Empty is a presentational component. Interactivity comes from children (e.g., a Button in the Action slot).

### Keyboard Interaction

- No keyboard interaction on the Empty component itself. Focus flows naturally to any interactive children (e.g., buttons in Action).

### Motion

- No animations.

---

## 5. Accessibility

- **Semantic element:** Root renders `role="status"` so screen readers announce the empty state. Title renders `<h3>`.
- **ARIA attributes:** `role="status"` on Root.
- **Focus management:** Standard tab order for any interactive children.
- **Screen reader announcements:** The `role="status"` landmark ensures the empty state content is announced.

---

## 6. Styling

- **Design tokens used:** `$color` for title text; `$colorSubtitle` for description text; `$body` font family. Spacing uses fixed pixel values from token-equivalent sizes.
- **Responsive behavior:** Max-width 400px on Description ensures readability on wide containers. Content is always center-aligned.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Card, Dialog, Table body, standalone page sections, any container that may have no content.
- **What this component can contain:** Media accepts any ReactNode (icons, illustrations). Action accepts any ReactNode (buttons, links).
- **Anti-patterns:** Do not nest Empty components. Do not use for loading states (use Skeleton or Spinner instead).

---

## 8. Breaking Change Criteria

- Removing any sub-component (Root, Media, Title, Description, Action).
- Removing the `role="status"` from Root.
- Changing the Title semantic element from `<h3>`.
- Removing the max-width constraint on Description.

---

## 9. Test Requirements

- **Behavioral tests:** All sub-components render; Title and Description display text; Media and Action render children.
- **Accessibility tests:** `role="status"` on Root; `<h3>` for Title.
- **Visual regression:** Full empty state with all sub-components, minimal (title-only), with action button.
