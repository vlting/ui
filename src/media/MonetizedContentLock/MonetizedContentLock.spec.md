# Component Spec — MonetizedContentLock

## 1. Purpose

Renders a paywall or access-gate overlay that prevents unauthorized users from viewing premium or monetized content, communicating that a purchase or subscription is required.

Use when: a media asset, article, or piece of content is restricted to paying or subscribed users and access must be gated in the UI.

Do NOT use when: content is freely accessible, or when an authentication check alone (rather than payment) is the gate (use an auth guard pattern instead).

---

## 2. UX Intent

- Primary interaction goal: clearly communicate that content is locked and prompt the user to take an action to unlock it (subscribe, purchase, or sign in), without frustrating users who arrive without context.
- Expected user mental model: a blurred or obscured content preview with a prominent call-to-action card overlaid — similar to paywalls on news sites and streaming platforms.
- UX laws applied:
  - **Gestalt (Figure/Ground)** — the lock overlay is visually distinct from the blurred content beneath, making the gating obvious.
  - **Jakob's Law** — the lock icon and "Subscribe" or "Unlock" CTA follow familiar paywall conventions.
  - **Doherty Threshold** — the lock state must render immediately; no deferred overlay.
  - **Hick's Law** — a single primary CTA minimizes decision time; secondary actions (e.g., "Learn more") are visually subordinate.

---

## 3. Visual Behavior

- Layout: a positioned overlay centered over the content area; a blurred or gradient-faded preview of the content may appear beneath.
- Overlay card: lock icon, headline ("Premium content"), optional description, and a primary CTA button.
- The underlying content preview must be visually obfuscated (blur, gradient, or pixelation) so it cannot be read or viewed.
- Spacing: overlay card padding and internal gaps reference space tokens.
- Typography: headline uses a heading token; description uses body token; CTA uses button label token.
- Token usage: overlay background, blur intensity (via token if configurable), CTA button colors, and text colors reference theme tokens only.
- Responsive behavior: overlay card remains centered and fully visible at all viewport widths.

---

## 4. Interaction Behavior

- States:
  - **locked**: overlay visible; content beneath is obfuscated.
  - **unlocked**: overlay is not rendered; content is shown normally.
  - **loading**: while access check is pending, a skeleton or spinner is shown in place of the CTA.
  - **error**: if the access check fails, an error message is shown with a retry option.
- Controlled: locked/unlocked state is controlled externally; the component renders the lock or passes through children.
- Keyboard behavior: CTA button is reachable by Tab and activates on Enter and Space; the underlying content is not keyboard-reachable while locked.
- Screen reader behavior: when locked, the overlay is announced with a descriptive label; underlying content is hidden from the accessibility tree (aria-hidden).
- Motion rules: overlay entrance does not animate when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility Requirements

- ARIA: overlay container uses `role="region"` or `role="dialog"` (if it demands user action) with an `aria-label` (e.g., "Premium content — subscription required").
- Locked content beneath the overlay must be `aria-hidden="true"` to prevent screen readers from announcing hidden/blurred content.
- CTA button must have a clear, descriptive accessible label (not just "Click here").
- Contrast: all overlay card text and controls meet WCAG 2.1 AA.
- Focus: when locked, focus must not reach the obscured content; Tab moves only to controls within the overlay.
- Reduced motion: suppress overlay entrance animations.

---

## 6. Theming Rules

- Required tokens: `background` (overlay card), `backgroundOverlay` (scrim/blur backdrop), `color`, `borderRadius`, `space`, `focusStyle`.
- CTA button styling references button theme tokens, not hardcoded colors.
- Blur or gradient obfuscation values must be token-driven where configurable.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or blur values.
- Dark mode: overlay card and scrim tokens must resolve correctly; CTA must maintain contrast.

---

## 7. Composition Rules

- Wraps the content it gates as children; when unlocked, renders children normally; when locked, renders the overlay and hides/obfuscates children.
- CTA button action is provided as an `onUnlock` or `onSubscribe` callback by the consumer.
- Anti-patterns:
  - Do not implement payment processing or subscription logic inside this component.
  - Do not allow locked content to be reachable by keyboard or screen reader.
  - Do not use this component for authentication-only gates.

---

## 8. Performance Constraints

- No internal API calls; access state is determined externally.
- The locked overlay should not render the full child content in the DOM when it must be completely hidden; use conditional rendering to avoid rendering sensitive content to unauthenticated users.
- Note: complete security enforcement must happen server-side; this component is a UI gate only.

---

## 9. Test Requirements

- When locked, renders the overlay with lock icon, headline, and CTA button.
- When locked, the underlying content is not reachable by keyboard or screen reader (`aria-hidden`).
- When unlocked, renders children without any overlay.
- CTA button fires `onUnlock` callback when activated.
- Loading state renders a visible loading indicator.
- Error state renders an error message with a retry option.
- Focus does not reach obscured content while locked.
- Screen reader announces the overlay region with its descriptive label.
- Passes axe accessibility audit in locked, unlocked, and loading states.
