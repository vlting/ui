# Component Spec — SessionExpiredModal

## 1. Purpose

SessionExpiredModal informs the user that their authenticated session has ended and prompts them to sign in again. It is a blocking overlay that prevents further interaction with the application until the user acknowledges the expiry and initiates re-authentication.

Use it when a session timeout or server-side invalidation event is detected and the user is still on an authenticated page.

Do NOT use it for expected sign-out flows (use a confirmation dialog), for general error states, or for network failures unrelated to session expiry.

---

## 2. UX Intent

- Primary interaction goal: clearly communicate session expiry and give the user a direct, low-friction path back to authentication.
- Expected user mental model: a blocking modal dialog with a clear message, a "Sign in again" primary action, and an optional "Save my work" secondary action if the application supports it (Jakob's Law for modal interruption patterns).
- UX laws applied:
  - Fitts's Law: the primary "Sign in again" button is prominently sized and easy to tap.
  - Hick's Law: at most two actions — sign in again and optionally dismiss/save; no additional choices.
  - Doherty Threshold: the modal must appear immediately on session expiry detection without delay.
  - Tesler's Law: the complexity of session management is invisible to the user; the message is simple and actionable.

---

## 3. Visual Behavior

- Layout: centered modal dialog with a backdrop overlay covering the full viewport.
- Modal contains: an icon (lock or clock), a heading ("Your session has expired" or equivalent), a brief explanatory sentence, and action button(s).
- Primary action button ("Sign in again") is full-width or prominently wide.
- Optional secondary action ("Dismiss" or "Save work") is de-emphasized.
- Modal width is constrained (max ~480px); it does not grow to fill wide viewports.
- The backdrop dims the background content to focus attention on the modal.
- The modal is not dismissible by clicking the backdrop or pressing Escape (it is blocking by design).

---

## 4. Interaction Behavior

- States: visible, signing-in (primary button loading state).
- The modal blocks all interaction with content underneath while visible.
- Primary action fires the sign-in callback; during sign-in, the button shows a loading indicator and is disabled.
- Secondary action (if present) fires its callback without blocking.
- Keyboard behavior:
  - Focus is trapped inside the modal while it is visible.
  - `Tab` / `Shift+Tab` cycle through the action buttons only.
  - `Escape` does NOT close the modal (it is blocking).
  - `Enter` / `Space` on the focused button fires its action.
- Screen reader behavior: on appearance, focus moves into the modal and the heading is announced. The modal has `role="alertdialog"` with `aria-labelledby` (heading) and `aria-describedby` (body text). The dialog is announced as blocking/modal.
- Motion: modal entrance uses a short fade/scale animation; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- `role="alertdialog"` on the modal container.
- `aria-labelledby` pointing to the modal heading.
- `aria-describedby` pointing to the explanatory body text.
- `aria-modal="true"` to prevent screen readers from accessing background content.
- Focus is trapped inside the dialog; focus moves to the heading or first button on open.
- Backdrop prevents pointer events to background elements.
- All text meets WCAG AA contrast (4.5:1).
- Action buttons meet 3:1 contrast for their boundaries.
- Reduced motion: modal entrance is instant when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: modal surface background, backdrop overlay color and opacity, heading text color, body text color, primary button background, primary button text, secondary button/link color, border/shadow token for modal elevation, icon color.
- Prohibited hardcoded values: no raw colors, no pixel font sizes, no hardcoded z-index values (use zIndex tokens).
- Dark mode: backdrop, modal surface, and button colors all resolve correctly in dark theme.

---

## 7. Composition Rules

- May be wrapped by: application root, portal layer, auth provider wrapper.
- May contain: icon, heading text, body/description text, primary action button, optional secondary action button or link.
- Anti-patterns:
  - Do not make the modal dismissible without authentication.
  - Do not embed a full login form inside this modal; redirect to LoginForm separately.
  - Do not use this component for non-session-expiry interruptions.
  - Do not stack multiple SessionExpiredModals.

---

## 8. Performance Constraints

- The modal is conditionally rendered (not hidden via CSS); unmount it when the session is valid to avoid background DOM and event listener overhead.
- The focus trap must be set up and torn down cleanly on mount/unmount.
- No virtualization or memoization concerns beyond standard render isolation.

---

## 9. Test Requirements

- Renders heading, body text, and primary action button when visible.
- Primary action button fires the sign-in callback on click and Enter/Space.
- Secondary action (if present) fires its callback.
- Sign-in loading state disables the primary button and shows a loading indicator.
- Focus is trapped inside the modal; Tab cycles through action buttons only.
- Escape does not close the modal.
- Focus moves to the modal on mount.
- `role="alertdialog"` is present with correct `aria-labelledby` and `aria-describedby`.
- Backdrop is present and covers the viewport.
- Accessibility: no axe violations; focus trap works; screen reader announces the dialog correctly.
- Reduced motion: no animation on entrance when `prefers-reduced-motion` is active.
