# Component Spec — PrivacySettingsPanel

## 1. Purpose

PrivacySettingsPanel presents a grouped collection of toggles, selects, and informational text that allow the user to review and modify their privacy-related preferences — such as profile visibility, data sharing consent, activity tracking, and contact discoverability.

Use it on account settings pages within a dedicated privacy section.

Do NOT use it for security-related settings (passwords, MFA — those belong in separate panels), notification preferences, or application-level configuration unrelated to user privacy.

---

## 2. UX Intent

- Primary interaction goal: give the user clear, honest control over their privacy choices with no dark patterns.
- Expected user mental model: a list of labeled settings with binary (on/off) or enumerated (everyone/friends/nobody) options — mirrors OS privacy settings and GDPR-compliant preference centers (Jakob's Law).
- UX laws applied:
  - Jakob's Law: follow established settings panel conventions with group headings and toggle rows.
  - Hick's Law: group settings into logical sections (e.g., "Profile Visibility", "Data & Analytics") to prevent overwhelming the user.
  - Tesler's Law: complex privacy implications are summarized in plain language adjacent to each control; the user should never need to read a legal document to understand a setting.
  - Doherty Threshold: changes persist or queue within 400ms of interaction; a success indicator confirms saves.

---

## 3. Visual Behavior

- Layout: vertically stacked sections, each with a section heading, a list of setting rows, and an optional section description.
- Each setting row: label (left-aligned), optional description/hint below the label, control (toggle or select, right-aligned).
- Section headings use heading-scale typography; row labels use body-scale; hints use caption-scale.
- Dividers separate sections; optional dividers separate rows within a section.
- The panel has a defined max-width; on wide viewports it does not stretch full-width.
- Spacing between rows and sections uses space tokens.
- Disabled settings are visually de-emphasized (reduced opacity) with a tooltip or explanation if applicable.

---

## 4. Interaction Behavior

- States per setting: idle, focused, active (changing), disabled.
- Toggle controls switch between on/off immediately; select controls open a dropdown.
- Changes may be applied immediately (optimistic) or queued and saved via a global "Save changes" button — the pattern is controlled via props.
- Keyboard behavior:
  - `Tab` / `Shift+Tab` navigate through all interactive controls in document order.
  - Toggle rows: `Space` or `Enter` toggles the value.
  - Select rows: `Space` or `Enter` opens the dropdown; arrow keys navigate options; `Enter` selects; `Escape` closes.
- Screen reader behavior: each row announces label, current value, and any description. Toggle announces "on" or "off". Disabled settings announce "unavailable" or the reason.
- Motion: toggle transitions use a short animation; reduced motion suppresses it to instant state change.

---

## 5. Accessibility Requirements

- Each toggle has an associated `aria-label` or is associated with its visible label via `aria-labelledby`.
- Each select has an associated label.
- Disabled controls have `aria-disabled="true"`.
- Section headings use appropriate heading hierarchy (`h2`, `h3`, etc.) relative to the page structure.
- Setting descriptions / hints are linked to their control via `aria-describedby`.
- All interactive controls meet WCAG AA contrast (3:1 for UI components, 4.5:1 for text).
- Focus ring is visible on all interactive controls.
- Reduced motion: no toggle slide animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: surface background, row background (hover/selected), section heading color, label color, hint/description color, divider color, toggle track color (off/on), toggle thumb color, select background, focus ring color, disabled opacity token.
- Prohibited hardcoded values: no raw colors, no pixel spacing, no hardcoded font sizes.
- Dark mode: toggle on/off states and section headings must remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: settings page containers, tabbed settings layouts, modal settings panels.
- May contain: section headings, setting rows (each with a label, optional description, and a toggle or select control), section descriptions, dividers, an optional global save/cancel action row.
- Anti-patterns:
  - Do not perform API calls or persist settings inside this component.
  - Do not mix privacy settings with unrelated settings (security, notifications) in the same panel instance.
  - Do not use free-text inputs for privacy settings; use toggles or selects only.

---

## 8. Performance Constraints

- Individual setting row components should be memoized so that toggling one setting does not re-render unrelated rows.
- If the setting list exceeds 30 items, consider lazy-rendering sections below the fold.
- No virtualization required for typical privacy settings counts.

---

## 9. Test Requirements

- Renders all provided setting rows with correct labels and initial values.
- Toggle rows switch value on click/Space/Enter and fire the change callback.
- Select rows open on activation, allow option selection, and fire the change callback.
- Disabled rows do not respond to interaction and are announced as disabled.
- Section headings render with the correct text and heading level.
- Hint/description text renders below the relevant label.
- Save action (if present) fires with all current setting values.
- Keyboard: Tab navigates all controls; toggles respond to Space/Enter; selects respond to arrow keys.
- Accessibility: no axe violations; all controls have accessible labels; descriptions are linked.
- Reduced motion: no toggle animation when `prefers-reduced-motion` is active.
