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

Card is a compound component created via `withStaticProperties`. It extends `@tamagui/card` `CardFrame` with custom variants. Sub-components stack vertically inside the root:

- **Card (root)** — A styled `TamaguiCardFrame` with border, radius, overflow hidden, and variants for `size`, `elevated`, and `interactive`. When `interactive` is `true`, the root gains `cursor: pointer`, `tabIndex: 0`, `role: "button"`, hover/press/focus styles, and `animation: 'fast'`.
- **Card.Header** — A `styled(YStack)` for top-aligned content. Provides horizontal padding, top padding, and a gap between children.
- **Card.Content** — A `styled(YStack)` for the main body. Uses `flex: 1` to fill available space and clips overflow.
- **Card.Footer** — A `styled(YStack)` for bottom-aligned content. Provides horizontal and bottom padding.
- **Card.Title** — A function component that wraps a `styled(Text)` inside an `<h3>` element. Uses `$heading` font family with size variants.
- **Card.Description** — A `styled(Text)` for secondary descriptive text. Uses `$body` font family and `$colorSubtitle` color with size variants.

> **TypeScript is the source of truth for props.** See `CardProps` in `Card.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — Renders with `$borderColor` border (1px), `borderRadius: '$4'`, and `overflow: 'hidden'`. Background comes from the Tamagui Card theme defaults.
- **Hover** (interactive only) — Background shifts to `$backgroundHover`.
- **Active/Press** (interactive only) — Background shifts to `$backgroundPress` with `scale: 0.99`, animated with the `fast` token.
- **Focus** (interactive only) — Visible 2px solid outline with `$outlineColor` and 2px offset.
- **Elevated** — Border is removed (`borderWidth: 0`). Intended for cards styled with shadow elevation.
- **Disabled** — Not applicable. Card does not have a disabled state.
- **Loading/Error** — Not applicable. Card is a layout container.

### Keyboard Interaction

- Not applicable by default. When `interactive` is `true`, the card sets `tabIndex: 0` and `role: "button"`, making it focusable and activatable via Enter/Space through native button semantics.

### Motion

- Interactive press animation uses the `fast` token (scale + background change).
- Must honor `prefers-reduced-motion` — when reduced motion is preferred, scale transition should be instant or omitted.

---

## 5. Accessibility

- **Semantic element:** Renders as a Tamagui Card frame (div-based). When `interactive` is `true`, `role="button"` and `tabIndex={0}` are set directly via the variant definition.
- **ARIA attributes:** None by default. Card is a structural container, not a widget. When `interactive` is `true`, `role="button"` is automatically applied by the variant.
- **Focus management:** Not focusable by default. When `interactive` is `true`, the focus style provides a visible outline ring.
- **Screen reader announcements:** When interactive, announces as a button.
- **Contrast:** Background and border colors must maintain sufficient contrast against the page background in both light and dark themes. Text within `Card.Title` and `Card.Description` must meet WCAG 2.1 AA ratios against the card background.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$borderColor`, `$backgroundHover`, `$backgroundPress`, `$outlineColor`, `$colorSubtitle`.
  - Font: `$heading` family for Title, `$body` family for Description.
  - Spacing: `$4` horizontal padding in Header/Content/Footer, `$2`-`$4` vertical padding, `$1` gap in Header.
  - Radius: `$4` on the root frame.
  - Size variant controls outer padding: `sm` = `$2`, `md`/`lg` = `$0`.
- **Responsive behavior:** Accepts Tamagui media query props. The card does not enforce its own width; it fills its parent container. Consumers control responsive width and layout.
- **Reduced motion:** Interactive press scale animation must degrade gracefully when `prefers-reduced-motion: reduce` is active.
- **Dark mode:** All visual tokens must resolve correctly in both light and dark themes. The card border, background, and text must remain legible and maintain contrast in both modes. No hardcoded values are used.

---

## 7. Composition

- **What can contain this component:** Any layout primitive (YStack, XStack, ScrollView). Grid or list containers. Links or pressable wrappers when the card needs to be a navigation target.
- **What this component can contain:** `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`. Any arbitrary children are also accepted within the frame or sub-components.
- **Anti-patterns:**
  - Do not nest cards inside cards.
  - Do not use `interactive` without ensuring appropriate keyboard and screen reader semantics (the variant provides `role="button"`, but consumers must ensure meaningful labeling).
  - Do not place competing interactive elements (multiple buttons, links) inside an interactive card without careful consideration of click target conflicts.
  - Do not use `elevated` without providing an actual shadow via theme or style props (otherwise the border is simply removed with no visual replacement).

---

## 8. Breaking Change Criteria

- Removing any variant (`size`, `elevated`, `interactive`) from the root frame.
- Removing any sub-component (`Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`).
- Changing the variant value sets (e.g., removing `'lg'` from `size`).
- Changing default variant values (currently `size: 'md'`).
- Removing `overflow: 'hidden'` from the root frame.
- Changing the root from `TamaguiCardFrame`-based to a different layout primitive.
- Changing the `CardProps` export type.

---

## 9. Test Requirements

- **Behavioral tests:**
  - Root frame renders with correct base styles (border, radius, overflow hidden).
  - Each size variant (`sm`, `md`, `lg`) applies correct padding.
  - `elevated` variant removes the border.
  - `interactive` variant adds cursor pointer, hover, press, and focus styles.
  - Non-interactive variant does not respond to hover or press.
  - All sub-components (`Header`, `Content`, `Footer`, `Title`, `Description`) render without errors.
  - `Card.Title` renders an `<h3>` element wrapping the styled text.
- **Accessibility tests:**
  - No ARIA roles are set by default (card is a generic container).
  - When `interactive` is applied, `role="button"` and `tabIndex={0}` are set.
  - Text contrast within title and description meets AA ratios against the card background.
- **Visual regression:**
  - Default, elevated, and interactive states.
  - Each size variant.
  - Interactive hover and press states.
