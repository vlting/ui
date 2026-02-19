# Component Spec — ShareModal

## 1. Purpose

Provides a modal dialog for sharing a piece of content (post, article, or item) with others. Offers sharing options such as copying a link, sharing to social platforms, sending via direct message, or embedding. Serves as the primary sharing surface triggered from a share action.

Use when: a user initiates a share action from a PostCard, content detail page, or any shareable item.

Do NOT use when: only a single copy-link action is needed (use a CopyLinkButton inline component), or when the sharing action should be handled natively by the OS share sheet (that integration lives in the host app, not the design system).

---

## 2. UX Intent

- Primary interaction goal: Allow users to choose how and where they want to share a piece of content with minimal steps.
- Expected user mental model: Users expect a share modal to behave like the native iOS/Android share sheet or the web share dialog on platforms like Twitter/X, YouTube, or Medium (Jakob's Law) — a list of share destinations with a prominent copy-link option.
- UX laws applied:
  - Jakob's Law: Follow the share sheet / social sharing dialog pattern from established platforms.
  - Hick's Law: Present a curated, limited set of share destinations. Avoid overwhelming the user with every possible platform.
  - Fitts's Law: Share destination options must be large, clearly labeled targets. The copy-link action should be the most prominent option.
  - Doherty Threshold: The modal must open and be interactive within 400ms.

---

## 3. Visual Behavior

- Layout rules:
  - A modal dialog with a header (title: "Share", close/X button), a prominent copy-link section at the top (URL display + copy button), and a list or grid of share destination options below.
  - Each share destination is represented by an icon and a label.
  - An optional "Share as message" or direct message section may appear below the destination list.
  - A success toast or inline confirmation appears briefly after the link is copied.
- Spacing expectations: Modal internal padding uses a medium space token. Gap between share destination items uses a small space token. The copy-link section has its own internal padding.
- Typography rules: Modal title uses a heading token. Share destination labels use a caption or small body token. The URL in the copy-link section uses a monospace or body token.
- Token usage: Modal background, scrim, copy section background, destination icon and label colors, copy button, and all text must use design tokens.
- Responsive behavior: On narrow viewports, the modal expands to full screen or a bottom sheet. Destination options reflow from a grid to a vertical list on narrow widths.

---

## 4. Interaction Behavior

- States:
  - Idle: Share options visible; copy button ready.
  - Copied: Copy button shows a brief "Copied!" confirmation state; the URL is highlighted.
  - Sharing (destination selected): A brief loading or confirmation feedback after selecting a destination.
- Controlled vs uncontrolled: The modal's open/closed state is controlled by the parent. The copy action's success state may be managed internally.
- Keyboard behavior:
  - Focus moves to the modal on open (title or first interactive element).
  - Tab cycles through the copy button, share destination items, and the close button.
  - Enter or Space activates the focused share destination or the copy button.
  - Escape closes the modal.
  - Focus is trapped within the modal while it is open.
- Screen reader behavior:
  - The modal uses `role="dialog"` with `aria-modal="true"` and `aria-labelledby` referencing the title.
  - The copy button announces "Link copied to clipboard" via a live region on success.
  - Each share destination button has a descriptive `aria-label` (e.g., "Share on Twitter/X").
  - Close button has `aria-label` ("Close share dialog").
- Motion rules: Modal open/close uses a brief fade or scale animation. The "Copied!" confirmation transitions briefly. Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (modal title).
  - Copy button: `aria-label` ("Copy link"), `aria-live` region for the "Copied!" announcement.
  - Each share destination: `role="button"` with descriptive `aria-label`.
  - Close button: `aria-label` ("Close share dialog").
- Focus rules: On open, focus moves to the modal title or first interactive element. Focus is trapped within the modal while it is open. On close, focus returns to the triggering share button on the content item.
- Contrast expectations: Modal title must meet 4.5:1. Share destination labels must meet 4.5:1. Copy button text must meet 4.5:1. The URL text in the copy section must meet 4.5:1.
- Reduced motion behavior: Modal open/close animation and "Copied!" confirmation transition are instant.

---

## 6. Theming Rules

- Required tokens: modal background, scrim/overlay color, copy section background and border, URL text color, copy button tokens, share destination icon color, share destination label color, hover state for destination items, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Modal background and copy section resolve to dark-mode tokens. Share destination icons and labels maintain contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: A modal portal at the application root. Triggered from PostCard.Actions share button, a content detail share button, or any shareable item.
- What it may contain: A modal header, a copy-link section, a share destination list or grid, and an optional direct message section.
- Anti-patterns:
  - Do not include more than 6–8 share destinations in the visible list without a "More" expansion.
  - Do not use ShareModal for content that is not shareable (private or restricted items).
  - Do not nest another modal inside ShareModal.

---

## 8. Performance Constraints

- Memoization rules: Share destination items are static content and do not require memoization. The copy action's state is ephemeral and internal to the modal.
- Virtualization: Not applicable — the share destination list is always small.
- Render boundaries: The modal is rendered in a portal, isolated from the host page's render tree.

---

## 9. Test Requirements

- What must be tested:
  - Modal renders on open with the copy-link section and share destination list.
  - Copying the link fires the copy callback and shows the "Copied!" confirmation.
  - Each share destination button fires its callback with the correct destination identifier.
  - Close button and Escape close the modal and return focus to the trigger.
- Interaction cases:
  - Tab cycles through all interactive elements within the modal.
  - Enter/Space activates the copy button and share destination buttons.
  - Escape closes the modal.
  - Focus is trapped within the modal while open.
  - Focus returns to the triggering share button on close.
- Accessibility checks:
  - `role="dialog"`, `aria-modal`, `aria-labelledby` are present.
  - Copy button announces "Link copied" via a live region.
  - Share destination buttons have descriptive accessible labels.
  - Close button has accessible label.
  - Focus moves to dialog on open; returns to trigger on close.
  - Focus is trapped while modal is open.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all animations.
