# Component Spec — OfflineIndicator

## 1. Purpose

Notifies the user that their device or application has lost its network connection, preventing data from being saved, synced, or fetched. It surfaces this system-level condition persistently until connectivity is restored.

Use when: the application detects that the user is offline and wants to communicate this clearly to prevent data loss or user confusion.

Do NOT use when: connectivity is fine, or when a specific request fails (use an Alert or inline error for individual request failures instead).

---

## 2. UX Intent

- Primary interaction goal: immediately and persistently communicate the offline state so the user understands why actions may be unavailable or queued.
- Expected user mental model: a system status indicator — similar to a "No internet connection" banner in mobile operating systems or web apps.
- UX laws applied:
  - Doherty Threshold: the indicator appears immediately when connectivity is lost; delayed notification causes confusion.
  - Gestalt (Figure/Ground): a distinct background token and persistent placement distinguish it from normal page content.
  - Jakob's Law: follows familiar patterns from mobile OS offline banners and PWA connectivity indicators.

---

## 3. Visual Behavior

- Layout: full-width horizontal strip, typically anchored at the top or bottom of the viewport or app shell. Does not overlap content; adjusts layout to remain visible.
- Contains: an offline/disconnected icon and a brief status message (e.g., "You are offline").
- Typography: message text uses a body or caption scale token.
- Icon: uses a network-off or signal-none semantic icon.
- Spacing: internal padding driven by space tokens; icon and text are vertically centered.
- Token usage: background uses a warning or muted semantic color token; text and icon use high-contrast tokens against the background.
- Responsive behavior: adapts to narrow viewports; message text may be truncated with a tooltip for the full message.
- Transition: when connectivity is restored, the indicator should animate out (or show a brief "Back online" state before dismissing), respecting reduced-motion preferences.

---

## 4. Interaction Behavior

- States:
  - Offline: indicator is visible and persistent.
  - Reconnecting: optional variant showing a reconnection attempt in progress.
  - Back online: brief confirmation state before the indicator dismisses.
  - Dismissed: indicator is hidden (only if user-dismissible; by default it should be persistent while offline).
- The indicator is non-interactive by default; there is no user action required.
- If a retry action is provided, it is keyboard-reachable and activatable.
- Keyboard behavior: Tab reaches any interactive element (retry); Enter or Space activates it.
- Screen reader behavior: uses `role="status"` or `role="alert"` to announce the offline condition. When connectivity is restored, the restoration is also announced.
- Motion rules: entrance and exit animations respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="alert"` when going offline (immediate announcement needed); `role="status"` when restored (non-disruptive announcement). An accessible label describes the connection state.
- Focus: focus is not forcibly moved to the indicator; it is a non-modal status display.
- Contrast: icon and text meet WCAG AA contrast ratios against the indicator background token.
- Color alone: offline state must not be communicated by color alone; icon and/or text must also convey the status.
- Reduced motion: entrance and exit animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: indicator background (offline state), icon color, text color, reconnecting/restored state variant tokens.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: app shell root, page layout containers.
- What it may contain: an icon slot, a message text slot, an optional retry action slot.
- Anti-patterns:
  - Do not use OfflineIndicator for individual request failures (use Alert).
  - Do not stack multiple OfflineIndicators.
  - Do not place OfflineIndicator inside scrollable content where it would scroll out of view.

---

## 8. Performance Constraints

- Memoization: the indicator should only re-render when the connectivity state changes.
- Virtualization: not applicable.
- Render boundaries: leaf-level display component; connectivity state is passed as a prop from an external observer.

---

## 9. Test Requirements

- Render: indicator renders with icon and message when offline; is not rendered (or hidden) when online.
- Restoration: "Back online" state renders briefly when connectivity returns; indicator dismisses after restoration.
- Accessibility: `role="alert"` is present when going offline; `role="status"` when restored; icon has accessible label; text meets contrast requirements.
- Keyboard: retry action (if present) is reachable via Tab and activatable via Enter/Space.
- Theming: tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: entrance/exit animations are suppressed when reduced motion preference is active.
