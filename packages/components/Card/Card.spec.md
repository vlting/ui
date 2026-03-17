# Component Spec — Card

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Provides a visually grouped container for related content, establishing a clear boundary and hierarchy.
- Should be used to present discrete units of content (profiles, summaries, settings groups, media items) that benefit from visual containment.
- Should NOT be used as a generic layout wrapper where a plain `YStack` suffices. Should NOT be used for full-page sections or as a replacement for page-level layout primitives.

---

## 2. UX Intent

- **Primary interaction goal:** Visually group related information so the user perceives it as a single unit. When `interactive` is enabled, communicate that the entire card is a tappable surface.
- **Expected user mental model:** "This is a self-contained block of related content." If interactive, "I can tap/click the whole thing."
- **UX laws applied:**
  - **Gestalt Principles (Proximity & Common Region)** — The card's border and background create a common region that groups its child elements into a perceived whole.
  - **Jakob's Law** — Cards follow the widely established card pattern (header/content/footer structure) familiar from material design and similar systems.
  - **Fitts's Law** — When `interactive` is `true`, the entire card surface acts as the target, maximizing hit area.

---

## 3. Anatomy

Card is a compound component. Sub-components stack vertically inside the root:

- **Card (root)** — A styled `article` with radius, overflow hidden, and variants for `theme`, `size`, `elevation`, and `interactive`. When `interactive` is `true`, the root gains `cursor: pointer`, `tabIndex: 0`, `role: "button"`, and theme-specific hover/press/focus styles.
- **Card.Header** — A styled `header` for top-aligned content. Provides padding and a gap between children.
- **Card.Content** — A styled `section` for the main body. Uses `flex: 1` to fill available space.
- **Card.Footer** — A styled `footer` for bottom-aligned content.
- **Card.Title** — A styled `h3` for heading text.
- **Card.Description** — A styled `p` for secondary descriptive text.

> **TypeScript is the source of truth for props.** See `CardProps` in `Card.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — Renders with `borderRadius: '$4'` and `overflow: 'hidden'`. Background is `$background1`.
- **Hover** (interactive only) — Background shifts to theme-specific hover token (e.g., `$neutral3` for neutral, `$primary3` for primary).
- **Active/Press** (interactive only) — Background shifts to theme-specific press token (e.g., `$neutral4` for neutral) with `scale(0.98)`.
- **Focus** (interactive only) — Visible outline ring using the outline scale shorthand (e.g., `outline: '$neutral'` for neutral, `outline: '$primary'` for primary). Uses `$offsetDefault` offset.
- **Elevation: flat** — No shadow. Has a border — defaults to `$borderColor`, but with a theme-specific subtle color (`$<theme>5`) via compound variants.
- **Elevation: normal** (default) — Shadow `$md` applied, no border.
- **Elevation: raised** — Larger shadow `$xl` for higher Z-axis appearance.
- **Disabled** — Not applicable. Card does not have a disabled state.
- **Loading/Error** — Not applicable. Card is a layout container.

### Keyboard Interaction

- Not applicable by default. When `interactive` is `true`, the card sets `tabIndex: 0` and `role: "button"`, making it focusable and activatable via Enter/Space through native button semantics.

### Motion

- Interactive press animation uses the `fast` token (scale + background change).
- Must honor `prefers-reduced-motion` — when reduced motion is preferred, scale transition should be instant or omitted.

---

## 5. Accessibility

- **Semantic element:** Renders as an `article`. When `interactive` is `true`, `role="button"` and `tabIndex={0}` are set via `mapProps`.
- **ARIA attributes:** None by default. Card is a structural container, not a widget. When `interactive` is `true`, `role="button"` is automatically applied.
- **Focus management:** Not focusable by default. When `interactive` is `true`, the focus style provides a visible outline ring.
- **Screen reader announcements:** When interactive, announces as a button.
- **Contrast:** Background and border colors must maintain sufficient contrast against the page background in both light and dark themes. Text within `Card.Title` and `Card.Description` must meet WCAG 2.1 AA ratios against the card background.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$background1` (background). Flat border uses `$borderColor` (default) or theme-specific `$neutral5`/`$primary5`/`$secondary5`. Interactive states use `$<theme>3`/`$<theme>4`.
  - Outline: Theme-specific outline scale tokens (`$neutral`, `$primary`, `$secondary`) with `$offsetDefault` offset.
  - Shadow: `$md` (normal elevation), `$xl` (raised elevation).
  - Font: `$body` family for body text, `$neutralText3` for Title, `$neutralText4` for Description.
  - Spacing: `$16` padding in Header/Content/Footer, `$4` gap in Header.
  - Radius: `$4` on the root frame.
  - Size variant controls outer padding: `sm` = `$8`, `md` = `$16`, `lg` = `$20`.
- **Responsive behavior:** Accepts STL media query props. The card does not enforce its own width; it fills its parent container.
- **Reduced motion:** Interactive press scale animation must degrade gracefully when `prefers-reduced-motion: reduce` is active.
- **Dark mode:** All visual tokens must resolve correctly in both light and dark themes.

---

## 7. Composition

- **What can contain this component:** Any layout primitive (YStack, XStack, ScrollView). Grid or list containers.
- **What this component can contain:** `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`. Any arbitrary children.
- **Anti-patterns:**
  - Do not nest cards inside cards.
  - Do not use `interactive` without ensuring meaningful labeling for screen readers.
  - Do not place competing interactive elements inside an interactive card without careful consideration of click target conflicts.

---

## 8. Breaking Change Criteria

- Removing any variant (`theme`, `size`, `elevation`, `interactive`) from the root frame.
- Removing any sub-component (`Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`).
- Changing the variant value sets (e.g., removing `'lg'` from `size`, removing `'raised'` from `elevation`).
- Changing default variant values (currently `size: 'md'`, `elevation: 'normal'`, `theme: 'neutral'`).
- Removing `overflow: 'hidden'` from the root frame.
- Changing the `CardProps` export type.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Root frame renders with correct base styles (radius, overflow hidden).
  - Each size variant (`sm`, `md`, `lg`) applies correct padding.
  - Each elevation variant (`flat`, `normal`, `raised`) renders correctly.
  - `interactive` variant adds cursor pointer, hover, press, and focus styles.
  - Non-interactive variant does not respond to hover or press.
  - Each `theme` variant (`primary`, `secondary`, `neutral`) renders without error.
  - Flat elevation + theme shows theme-specific border.
  - Interactive + theme compound variant renders correctly.
  - All sub-components (`Header`, `Content`, `Footer`, `Title`, `Description`) render without errors.
  - `Card.Title` renders an `<h3>` element.
- **Accessibility tests:**
  - No ARIA roles are set by default (card is a generic container).
  - When `interactive` is applied, `role="button"` and `tabIndex={0}` are set.
  - Text contrast within title and description meets AA ratios against the card background.
- **Visual regression:**
  - Default, flat, raised, and interactive states.
  - Each size variant and theme variant.
  - Flat cards with each theme (themed borders).
  - Interactive hover and press states per theme.
