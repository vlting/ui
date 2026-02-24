# Component Spec — Alert

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Static notification banner for important messages, warnings, or destructive status.
- Use for system alerts, form validation summaries, or persistent status messages.
- Do NOT use for transient notifications (use Toast). Do NOT use for inline field errors (use error text on the input).

---

## 2. UX Intent

- **Peak-End Rule** — clear, prominent alerts ensure users notice critical information.
- Alerts are non-interactive display components — the user reads them but does not interact with them directly.

---

## 3. Anatomy

Compound component with custom styled sub-components:
- `Alert` (Root) — container with `role="alert"` (destructive) or `role="status"` (default).
- `Alert.Title` — bold heading text.
- `Alert.Description` — body text.
- `Alert.Icon` — optional leading icon.

Props: `variant` (`'default'` | `'destructive'`).

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

- **Semantic element:** Renders XStack-based container.
- **ARIA attributes:** `role="alert"` (destructive variant) or `role="status"` (default variant). Both are live regions — content is announced to screen readers when it appears.
- **Screen reader announcements:** Alert content is announced automatically due to live region semantics.
- **Contrast:** Destructive variant uses `$red10` border — verify contrast.

---

## 6. Styling

- **Design tokens used:** `$borderColor`, `$background`, `$color` for default. `$red10` border, light red background for destructive. Padding and gap from token scale.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Page layouts, form containers, card sections.
- **What this component can contain:** Alert.Title, Alert.Description, Alert.Icon in any order.
- **Anti-patterns:** Do not use Alert for success confirmations that should disappear (use Toast). Do not make Alert dismissible without providing an alternative way to access the information.

---

## 8. Breaking Change Criteria

- Removing sub-components (Title, Description, Icon).
- Removing `variant` prop or changing variant names.
- Removing `role="alert"` from destructive variant.

---

## 9. Test Requirements

- **Behavioral tests:** Verify default variant renders with `role="status"`. Verify destructive variant renders with `role="alert"`. Verify Title, Description, and Icon render correctly.
- **Accessibility tests:** Verify live region semantics. Verify not focusable. Verify text contrast for both variants.
