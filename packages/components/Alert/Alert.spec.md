# Component Spec — Alert

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Static notification banner for important messages, warnings, or status.
- Use for system alerts, form validation summaries, or persistent status messages.
- Do NOT use for transient notifications (use Toast). Do NOT use for inline field errors (use error text on the input).

---

## 2. UX Intent

- **Peak-End Rule** — clear, prominent alerts ensure users notice critical information.
- Alerts are non-interactive display components — the user reads them but does not interact with them directly.

---

## 3. Anatomy

Compound component with custom styled sub-components:
- `Alert.Root` — container. `role="status"` for all themes except `error` which gets `role="alert"`.
- `Alert.Content` — flex column wrapper for Title and Description (`div`).
- `Alert.Title` — bold heading text (`h5`).
- `Alert.Description` — body text (`p`).
- `Alert.Icon` — optional leading icon (`span`).

Props:
- `theme: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'` (default `'primary'`)
- `variant: 'solid' | 'subtle' | 'outline'` (default `'outline'`)
- `elevation: 'flat' | 'raised'` (default `'flat'`)

Variant axis:
- `solid` — full-strength palette background (`$<scale>9`) with contrasting text (`$<scale>Text9`)
- `subtle` — tinted background (`$<scale>3`) with palette text, no border
- `outline` — tinted background with muted border (`$<scale>5`)

Elevation axis:
- `flat` — no shadow (default)
- `raised` — `$md` box shadow for floating alerts

> **TypeScript is the source of truth for props.** See source files in `Alert/` for the full typed API.

---

## 4. Behavior

### States

Non-interactive. Alert is a static display component. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Alert is not focusable.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** `div` with role attribute.
- **ARIA attributes:** `role="alert"` (error theme) or `role="status"` (all other themes). Both are live regions — content is announced to screen readers when it appears.
- **Screen reader announcements:** Alert content is announced automatically due to live region semantics.
- **Contrast:** Each theme uses `$<scale>3` background with `$<scale>Text3` text — token pairing ensures contrast.

---

## 6. Styling

- **Theme tokens:** Each theme uses `$<scale>3` (bg), `$<scale>` (border), `$<scale>Text3` (text) from the STL token scale.
- **Dark mode:** Token resolution handles automatically.
- **Layout:** Flex row with `$16` gap, `px: $24` / `py: $16` padding, `$field` border-radius.

---

## 7. Composition

- **What can contain this component:** Page layouts, form containers, card sections.
- **What this component can contain:** Alert.Content (wrapping Title/Description), Alert.Icon in any order.
- **Anti-patterns:** Do not use Alert for success confirmations that should disappear (use Toast). Do not make Alert dismissible without providing an alternative way to access the information.

---

## 8. Breaking Change Criteria

- Removing sub-components (Content, Title, Description, Icon).
- Removing `theme`, `variant`, or `elevation` props or changing their values.
- Removing `role="alert"` from error theme.
- Changing role mapping logic.

---

## 9. Test Requirements

- **Rendering:** Verify Title, Description, and Icon render correctly.
- **Role mapping:** Verify `role="status"` for default (primary) theme. Verify `role="alert"` for error theme. Verify `role="status"` for all non-error themes.
- **Themes:** Verify each theme value renders without error.
- **Variants:** Verify `solid`, `subtle`, and `outline` render correctly.
- **Elevation:** Verify `flat` (no shadow) and `raised` (shadow) render correctly.
- **Accessibility:** Verify live region semantics. Verify not focusable.
