# Component Spec — Kbd

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Renders keyboard key indicators using the semantic `<kbd>` HTML element.
- Use to display keyboard shortcuts, hotkeys, and key combinations in UI and documentation.
- Do NOT use for code snippets (use `<code>`) or general monospace text.

---

## 2. UX Intent

- **Jakob's Law** — keyboard shortcut indicators follow established OS/browser conventions (rounded key caps with subtle depth).
- The bottom border is thicker to create a 3D key-cap effect, matching user mental models of physical keyboard keys.

---

## 3. Anatomy

Single element — `styledHtml('kbd')` with size variants, wrapped in a function component for JSX compatibility.

- `size`: `'sm'` | `'md'` (default: `md`).
- `children`: string content (the key label).

Uses `styledHtml()` to ensure correct `<kbd>` element rendering.

> **TypeScript is the source of truth for props.** See `KbdProps` in `Kbd.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Kbd is a display element, not an interactive control.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<kbd>` — the correct HTML element for representing keyboard input.
- **ARIA attributes:** None needed — `<kbd>` has implicit semantics recognized by assistive technology.
- **Screen reader announcements:** Screen readers announce `<kbd>` content as keyboard input when the user explores document structure.

---

## 6. Styling

- **Design tokens used:**
  - `backgroundColor: '$color2'`, `color: '$color'`, `borderColor: '$borderColor'`
  - `borderRadius: '$2'`
  - `borderBottomWidth: 2` (3D key-cap effect)
  - Font: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` (system monospace stack)
- **Size variants:** `sm` (11px font, 20px min-width) and `md` (12px font, 24px min-width).
- **Cross-platform note:** Uses `styledHtml('kbd')` — web-only. Font stack uses system fonts for consistency across platforms.
- **Dark mode:** Color tokens resolve automatically.

---

## 7. Composition

- **What can contain this component:** Any text context — paragraphs, headings, tooltips, menu items, documentation blocks.
- **What this component can contain:** String content only — typically a single key label (e.g., "Ctrl", "Enter", "K").
- **Anti-patterns:** Do not nest Kbd inside Kbd. For key combinations, render separate Kbd elements with a separator (e.g., `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`).

---

## 8. Breaking Change Criteria

- Changing the rendered element from `<kbd>`.
- Removing a size variant.
- Changing default size from `md`.
- Changing the font stack.

---

## 9. Test Requirements

- **Behavioral tests:** Verify renders `<kbd>` element. Verify each size variant applies correct dimensions and font size. Verify default size is `md`. Verify string children render correctly.
- **Accessibility tests:** Verify semantic `<kbd>` element is in the DOM. Verify no unexpected ARIA attributes.
