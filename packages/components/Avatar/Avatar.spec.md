# Component Spec — Avatar

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Circular user or entity representation showing an image or text fallback.
- Use for user profiles, participant lists, comment authors, and entity icons.
- Do NOT use for decorative images (use Image). Do NOT use as a button (wrap in Pressable).

---

## 2. UX Intent

- **Gestalt Principles** — circular shape distinguishes avatars from rectangular content, creating immediate recognition.
- **Jakob's Law** — circular avatars are a well-established pattern across social and productivity apps.

---

## 3. Anatomy

Dual API — supports both single-prop and compound patterns:

**Single-prop API:**
- `Avatar` — renders image with `src`/`alt`, falls back to `fallback` text on error.

**Compound API:**
- `Avatar` (Root) — circular container.
- `Avatar.Image` — image element.
- `Avatar.Fallback` — text or icon fallback.

Props: `src`, `alt`, `fallback`, `size` (`'sm'`/`'md'`/`'lg'`/`'xl'`).

> **TypeScript is the source of truth for props.** See source files in `Avatar/` for the full typed API.

---

## 4. Behavior

### States

- **Image loaded** — shows the image.
- **Image error/missing** — shows the fallback text (initials or icon).

### Keyboard Interaction

None — Avatar is non-interactive.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Image with `role="img"`.
- **ARIA attributes:** `aria-label` for the accessible name. Image has `alt` text.
- **Screen reader announcements:** Reads the `alt` text or `aria-label`.
- **Contrast:** Fallback text/background must meet 4.5:1 contrast.

---

## 6. Styling

- **Design tokens used:** `$color4` for fallback background, `$color` for fallback text, `borderRadius: 1000` (circle).
- **Size variants:** `sm` (32px), `md` (40px), `lg` (56px), `xl` (72px).
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** User cards, comment threads, headers, navigation.
- **What this component can contain:** Image or Fallback sub-components in compound mode.
- **Anti-patterns:** Do not use empty alt text with no fallback (avatar needs an accessible name). Do not use as a standalone link/button.

---

## 8. Breaking Change Criteria

- Removing a size variant.
- Removing the compound API (Image, Fallback sub-components).
- Changing the fallback mechanism.
- Removing `role="img"` or `aria-label`.

---

## 9. Test Requirements

- **Behavioral tests:** Verify image renders when `src` is valid. Verify fallback renders on image error. Verify each size variant applies correct dimensions. Verify compound API (Image + Fallback).
- **Accessibility tests:** Verify `role="img"` is present. Verify `alt` or `aria-label` provides accessible name. Verify fallback text contrast.
