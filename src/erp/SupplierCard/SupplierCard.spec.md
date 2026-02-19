# Component Spec — SupplierCard

## 1. Purpose

Displays a summarized, scannable overview of a supplier entity — including identifying information (name, ID), contact details, and relevant status indicators — in a card layout suitable for lists and grids.

Use when: presenting a collection of suppliers in a browsable grid or list, or as a summary panel in a supplier detail sidebar.

Do NOT use when: full supplier details must be shown (use a detail page or drawer), or when data density requires a tabular layout (use InventoryTable or a supplier table).

---

## 2. UX Intent

- Primary interaction goal: allow operators to quickly identify and select a supplier from a set without opening each record.
- Expected user mental model: a business card or directory entry — a familiar container that holds a snapshot of entity information.
- UX laws applied:
  - Jakob's Law: card layout mirrors conventions from contact directories and entity list UIs.
  - Gestalt (Proximity): related supplier attributes are grouped within the card boundary; whitespace separates distinct attribute groups.
  - Fitts's Law: the card's interactive surface (if selectable) is large enough to activate easily on touch.
  - Hick's Law: surface only the most operationally relevant supplier attributes; secondary details are accessed via drill-down.

---

## 3. Visual Behavior

- Layout: vertical stack within a bounded card container. Card has a background, border, and corner radius driven by tokens.
- Sections: header (supplier name, logo/avatar slot), body (contact info, status indicators, key metrics), optional footer (action slots).
- Typography: supplier name uses a heading or label scale token; secondary attributes use a body or caption scale token.
- Spacing: internal padding and gap between sections driven by space tokens.
- Token usage: card background, border, shadow, text, and status indicator colors all sourced from theme tokens.
- Responsive behavior: cards in a grid collapse to a single-column stack on narrow viewports. Card minimum width is defined by a size token.

---

## 4. Interaction Behavior

- States:
  - Idle: default card appearance.
  - Hover (web): card receives a subtle background or border color shift via tokens.
  - Focus: keyboard-focused card receives a visible focus ring.
  - Selected: selected card receives a distinct border or background token.
  - Disabled: non-selectable cards are visually de-emphasized.
- Controlled vs uncontrolled: selection state may be controlled (prop) or uncontrolled (internal).
- Keyboard behavior: if the card is interactive, it is focusable via Tab; Enter or Space triggers the primary action.
- Screen reader behavior: the card announces its name and key attributes. If interactive, it has an accessible label describing the action (e.g., "View supplier: Acme Corp").
- Motion rules: hover/focus transitions respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: interactive cards use `role="button"` or are wrapped in an anchor/button element with an accessible label. Non-interactive cards use `role="article"` or `role="listitem"` within a list context.
- Focus: focus ring is visible and meets contrast requirements.
- Contrast: all text, icons, and status indicators meet WCAG AA contrast ratios against the card background.
- Reduced motion: hover and selection transitions are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: card background, card border, card shadow, heading text, body text, caption text, status indicator tokens, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, border radii, or font sizes.
- Dark mode: card background, border, and shadow tokens must resolve to visually distinct and accessible values in dark mode.

---

## 7. Composition Rules

- What can wrap it: grid layout containers, list containers, sidebar panels.
- What it may contain: avatar/logo slot, supplier name, contact detail slots, StockLevelIndicator, status badges, action button slots.
- Anti-patterns:
  - Do not nest SupplierCard inside another SupplierCard.
  - Do not use SupplierCard for non-supplier entities; use a generic Card component for other entity types.
  - Do not place large data tables inside a SupplierCard; use a detail view for that level of information.

---

## 8. Performance Constraints

- Memoization: SupplierCard should be memoized to prevent re-renders when unrelated parent state changes.
- Virtualization: when rendering large supplier lists, the list container (not the card itself) should implement windowed rendering.
- Render boundaries: the card is a leaf display component; avoid internal state subscriptions.

---

## 9. Test Requirements

- Render: card renders supplier name, contact details, and status indicators correctly.
- Interactive: hover and focus states apply correct token-based styles.
- Selection: selected state renders correctly in controlled and uncontrolled modes.
- Accessibility: accessible label is present for interactive cards; role is correct for the usage context.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: hover/selection transitions are suppressed when reduced motion preference is active.
