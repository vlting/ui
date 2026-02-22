# Component Spec — Card

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
  - **Aesthetic-Usability Effect** — Clean border, radius, and spacing tokens contribute to perceived ease of use.

---

## 3. Visual Behavior

- **Layout:** Vertical flex container (`YStack`). Sub-components stack top-to-bottom: Header, Content, Footer. Content area uses `flex: 1` to fill available space.
- **Spacing:** Sub-components define their own internal padding using tokens (`$4` horizontal, `$2`-`$4` vertical). The root frame's `size` variant controls outer padding (`sm` = `$2`, `md`/`lg` = `$0`).
- **Typography:** `Card.Title` uses `$heading` font family with `$4` weight. `Card.Description` uses `$body` font family with `$colorSubtitle` color. Font sizes scale with the `size` variant.
- **Token usage:** All colors, spacing, radii, and fonts resolve from Tamagui design tokens. Border radius is `$4`. No hardcoded values.
- **Responsive behavior:** Accepts Tamagui media query props. The card does not enforce its own width; it fills its parent container. Consumers control responsive width and layout.

---

## 4. Interaction Behavior

- **States:**
  - **Idle** — Renders with `$background` fill, 1px `$borderColor` border, and `$4` border radius.
  - **Hover** (interactive only) — Background shifts to `$backgroundHover`.
  - **Active/Press** (interactive only) — Background shifts to `$backgroundPress` with `scale: 0.99`, animated with the `fast` token.
  - **Elevated** — Border is removed (`borderWidth: 0`). Intended for cards styled with shadow elevation.
  - **Disabled** — Not applicable. Card does not have a disabled state.
  - **Loading/Error** — Not applicable. Card is a layout container.
- **Controlled vs uncontrolled:** Card is purely presentational. It manages no internal state.
- **Keyboard behavior:** Not applicable by default. When `interactive` is `true`, the consumer is responsible for adding `role`, `tabIndex`, and keyboard handlers (e.g., Enter/Space to activate).
- **Screen reader behavior:** No ARIA roles are set. Card is a generic container. When `interactive`, the consumer must add appropriate semantics.
- **Motion rules:** Interactive press animation uses the `fast` token. Must honor `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- **ARIA requirements:** None by default. Card is a structural container, not a widget. When `interactive` is `true`, consumers must add `role="button"` or wrap in an appropriate interactive element and provide keyboard handling.
- **Focus rules:** Not focusable by default. When interactive, the consumer must manage focusability.
- **Contrast expectations:** Background and border colors must maintain sufficient contrast against the page background in both light and dark themes. Text within `Card.Title` and `Card.Description` must meet WCAG 2.1 AA ratios against the card background.
- **Reduced motion behavior:** Interactive press scale animation must degrade gracefully when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- **Required tokens:** `$background`, `$borderColor`, `$backgroundHover`, `$backgroundPress` (for interactive), `$heading` (font family), `$body` (font family), `$colorSubtitle`.
- **Prohibited hardcoded values:** No raw hex colors, pixel spacing, or font sizes. All values must reference tokens.
- **Dark mode expectations:** All visual tokens must resolve correctly in both light and dark themes. The card border, background, and text must remain legible and maintain contrast in both modes.

---

## 7. Composition Rules

- **What can wrap it:** Any layout primitive (YStack, XStack, ScrollView). Grid or list containers. Links or pressable wrappers when the card needs to be a navigation target.
- **What it may contain:** `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`. Any arbitrary children are also accepted within the frame or sub-components.
- **Anti-patterns:**
  - Do not nest cards inside cards.
  - Do not use `interactive` without providing appropriate ARIA roles and keyboard handlers.
  - Do not place competing interactive elements (multiple buttons, links) inside an interactive card without careful consideration of click target conflicts.
  - Do not use `elevated` without providing an actual shadow via theme or style props (otherwise the border is simply removed with no visual replacement).

---

## 8. Performance Constraints

- **Memoization rules:** Card and its sub-components are static Tamagui styled components. No memoization is needed at the component level. Consumers rendering long lists of cards should consider list-level optimizations.
- **Virtualization:** When rendering many cards in a scrollable list, consumers should use virtualized list components (e.g., `FlatList`). The card itself does not impose virtualization.
- **Render boundaries:** Card sub-components are independently styled and do not force re-renders on siblings. `overflow: 'hidden'` on the root clips all children to the border radius.

---

## 9. Test Requirements

- **What must be tested:**
  - Root frame renders with correct base styles (background, border, radius).
  - Each size variant (`sm`, `md`, `lg`) applies correct padding.
  - `elevated` variant removes the border.
  - `interactive` variant adds hover and press styles.
  - Non-interactive variant does not respond to hover or press.
  - All sub-components (`Header`, `Content`, `Footer`, `Title`, `Description`) render without errors.
  - `overflow: 'hidden'` is applied on the root.
- **Interaction cases:**
  - Interactive card responds to hover with background change.
  - Interactive card responds to press with background change and scale.
  - Non-interactive card does not show pointer cursor.
- **Accessibility checks:**
  - No ARIA roles are set by default (card is a generic container).
  - When `interactive` is applied, verify that consumers can add `role` and keyboard props.
  - Text contrast within title and description meets AA ratios against the card background.
