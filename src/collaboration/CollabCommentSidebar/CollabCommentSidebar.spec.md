# Component Spec — CollabCommentSidebar

## 1. Purpose

Provides a persistent or togglable side panel for viewing and composing inline comments on a shared document or collaborative workspace. Comments are anchored to specific locations or selections within a document.

Use when: Users need to review, add, or respond to inline comments alongside document content without leaving the primary editing surface.

Do NOT use when: Comments are not anchored to document content (use a general discussion or chat component instead), or when the surface is too narrow to support a sidebar layout.

---

## 2. UX Intent

- Primary interaction goal: Let users read and participate in contextual document discussions without losing their place in the document.
- Expected user mental model: A sidebar panel familiar from tools like Google Docs or Figma — visible alongside the document, containing threaded comment discussions anchored to document positions.
- UX laws applied:
  - Jakob's Law: Follows the widely recognized document comment sidebar convention.
  - Proximity (Gestalt): Comments should be visually grouped per anchor/thread, making it clear which comments relate to each other.
  - Fitts's Law: Reply and resolve actions must be large enough targets to activate without precision effort.

---

## 3. Visual Behavior

- Layout: Vertical stack panel, fixed or scrollable, positioned to the side of the primary document content. Each comment thread is visually grouped.
- Spacing: Clear vertical separation between threads. Within a thread, replies are indented or visually nested using spacing tokens.
- Typography: Author name is emphasized; comment body is body text weight; timestamp is muted/secondary.
- Token usage: Panel background, border, thread container backgrounds, text colors, and interactive state colors must all reference theme tokens.
- Responsive behavior: On narrow viewports, the sidebar collapses into a drawer or bottom sheet. Width is constrained with a minimum and maximum using size tokens.

---

## 4. Interaction Behavior

- States:
  - Idle: Displays list of comment threads anchored to document.
  - Empty: Displays a message indicating no comments exist yet.
  - Loading: Accepts a loading prop; renders placeholder skeletons for comment threads.
  - Focused thread: The thread corresponding to the active document selection is visually highlighted.
  - Resolved: Resolved threads are visually distinguished (e.g., muted appearance) and may be hidden or collapsed by default.
- Controlled vs uncontrolled: Fully controlled. Parent supplies comment threads, selected anchor, and callbacks.
- Keyboard behavior: Tab moves between threads and within threads. Enter/Space activates reply inputs. Escape closes an open reply composer.
- Screen reader behavior: The sidebar has a landmark region label (e.g., "Document comments"). Each thread is announced as a group. Comment count is communicated.
- Motion rules: Opening/closing the sidebar animates with a slide. Reduced motion: instant show/hide instead.

---

## 5. Accessibility Requirements

- ARIA requirements: Sidebar container uses `role="complementary"` with an `aria-label` of "Document comments" or equivalent. Each thread uses `role="group"` with a label. Reply buttons have descriptive labels.
- Focus rules: When the sidebar opens, focus moves to the first active thread or the sidebar container. Closing the sidebar returns focus to the trigger element.
- Contrast expectations: All comment text and UI controls meet WCAG AA contrast against the sidebar background.
- Reduced motion behavior: Slide animations are suppressed; sidebar appears/disappears instantly.

---

## 6. Theming Rules

- Required tokens: panel background color, surface elevation color, border color, primary text, secondary/muted text, accent color for active/highlighted thread, interactive state colors (hover, focus ring), spacing scale, radius tokens for thread containers.
- Prohibited hardcoded values: No hardcoded colors, spacing, border widths, or font sizes.
- Dark mode expectations: Panel background adjusts to dark surface token. Comment bubbles, borders, and text adapt via theme tokens.

---

## 7. Composition Rules

- What can wrap it: Intended to be placed adjacent to a `DocumentEditor` or similar content editing surface within a split-panel layout.
- What it may contain: Comment thread groups, each containing one or more comment items, a reply composer, and resolve/action controls. May contain an `ActivityFeed` as an optional activity tab.
- Anti-patterns:
  - Do not embed data-fetching inside this component.
  - Do not use this as a general-purpose chat panel — it is specifically designed for anchored document comments.
  - Do not allow the sidebar to obscure the primary document content without providing a toggle to collapse it.

---

## 8. Performance Constraints

- Memoization rules: Individual comment threads should be memoized. The sidebar should not re-render all threads when a single thread is updated.
- Virtualization: If the number of threads is large, the parent should supply a virtualized list. The sidebar must support rendering virtualized children.
- Render boundaries: No data-fetching. All comment data is provided via props.

---

## 9. Test Requirements

- What must be tested:
  - Renders correctly with a list of comment threads.
  - Renders the empty state when no threads exist.
  - Renders a loading state with skeletons.
  - Highlights the active thread when a document anchor is selected.
  - Resolved threads are visually distinguished.
- Interaction cases:
  - Tab navigation through threads and reply controls.
  - Keyboard activation of reply composer.
  - Escape closes the reply composer.
  - Sidebar open/close animation is triggered correctly.
- Accessibility checks:
  - `role="complementary"` and `aria-label` present on container.
  - Thread groups have descriptive ARIA labels.
  - Focus management on open/close.
  - Reduced motion: animations suppressed.
