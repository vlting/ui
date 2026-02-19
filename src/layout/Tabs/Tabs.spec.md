# Component Spec — Tabs

## 1. Purpose

Provides a tabbed navigation interface that organizes related content into discrete panels, displaying one panel at a time. Used when content can be meaningfully categorized and users benefit from switching between categories without navigating away.

Use when: a view contains two or more distinct content sections that share the same context and level of hierarchy, and switching between them should be instant and stateful.

Do NOT use when: the sections represent separate pages (use routing), or when there are more than seven tabs (use a select/dropdown or overflow menu instead).

---

## 2. UX Intent

- Primary interaction goal: allow users to switch between related content panels within a single view without losing page context.
- Expected user mental model: physical tabbed folders — selecting a tab brings its content to the front while others slide behind.
- UX laws applied:
  - Hick's Law: limit tabs to a scannable number (2–7); more than 7 tabs significantly increases decision time.
  - Gestalt (figure/ground): the active tab visually "belongs" to the content panel below it.
  - Jakob's Law: the tab bar pattern is universally understood from OS and web conventions.
  - Miller's Law: group content into tabs to chunk information and reduce cognitive load.

---

## 3. Visual Behavior

- A tab list renders horizontally above (or vertically beside) the content panel.
- The active tab is visually distinct: it uses a primary/accent color token for the active indicator (underline, filled background, or border), and its label uses the primary text color token.
- Inactive tabs use a muted text color token.
- The content panel area renders below the tab list, displaying only the active panel.
- Tab labels are a consistent typography token (body/label scale); they do not wrap — long labels are truncated with ellipsis.
- A bottom border or background token separates the tab list from the content area.
- On small viewports where tabs overflow horizontally, a scroll affordance (fade + scroll) or overflow menu is applied.
- Consistent spacing between tabs uses space tokens.

---

## 4. Interaction Behavior

- Controlled pattern: active tab is driven by a `value` prop with an `onValueChange` callback. An uncontrolled `defaultValue` is also supported.
- Clicking or pressing a tab activates it and displays its associated panel.
- Keyboard behavior (follows ARIA Tabs pattern):
  - Tab key moves focus to the tab list, then to the active tab; a second Tab moves focus into the content panel.
  - Arrow Left / Arrow Right (horizontal tabs) moves focus between tab triggers and activates the focused tab.
  - Arrow Up / Arrow Down (vertical tabs) moves focus between tab triggers and activates the focused tab.
  - Home moves focus to the first tab; End moves focus to the last tab.
- Screen reader behavior: the tab list has `role="tablist"`; each tab has `role="tab"` with `aria-selected` and `aria-controls` pointing to the associated panel; each panel has `role="tabpanel"` with `aria-labelledby` pointing to its tab.
- Motion: content panel transitions (fade or slide) respect `prefers-reduced-motion`; animation is suppressed when preferred.

---

## 5. Accessibility Requirements

- Tab list carries `role="tablist"` with an `aria-label` or `aria-labelledby` describing the tab group.
- Each tab trigger carries `role="tab"`, `aria-selected="true/false"`, and `aria-controls` referencing the panel ID.
- Each content panel carries `role="tabpanel"` and `aria-labelledby` referencing its tab ID.
- Inactive panels must be hidden from the accessibility tree (`aria-hidden="true"` or not rendered).
- Focus management: activating a tab moves focus to the tab (not the panel); Tab from the tab moves focus into the active panel.
- Color contrast for active and inactive tab labels must meet WCAG AA (4.5:1).
- The active tab indicator must meet 3:1 contrast against its background.
- Do not convey active state through color alone — use a visible indicator (underline, border, shape change).

---

## 6. Theming Rules

- Required tokens: primary/accent token for active indicator, muted text token for inactive labels, primary text token for active label, background token for tab list area, border token for tab list bottom border, space tokens for tab padding and gap, typography token for labels.
- Prohibited: no hardcoded colors, pixel font sizes, or raw gap values.
- Dark mode: all tab indicator, text, and background tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- Tabs is a compound component; consumers supply tab definitions as children or props (tab trigger + panel pairs).
- Each panel content can contain any layout or content component.
- Tabs must not be nested inside another Tabs component — reorganize content hierarchy instead.
- Anti-patterns:
  - Do not use Tabs for primary page navigation (use TopNav or Sidebar).
  - Do not place more than 7 tabs in a single tab list.
  - Do not use Tabs when the panels represent steps in a wizard — use a Stepper pattern instead.

---

## 8. Performance Constraints

- Inactive tab panels should not render their children until the tab is first activated (lazy rendering).
- Once activated, a panel's content should remain mounted to preserve scroll position and form state across tab switches.
- The tab list itself is lightweight and does not require memoization.
- No virtualization applicable to the tab list; content panels manage their own performance.

---

## 9. Test Requirements

- Renders the tab list with all tab triggers.
- Displays the content panel corresponding to the active tab.
- Hides content panels for inactive tabs.
- Activates a tab and shows its panel on click/press.
- `onValueChange` fires with the correct tab value when a tab is activated.
- Arrow key navigation moves focus and activation through tabs.
- Home/End key moves focus to first/last tab.
- `role="tablist"`, `role="tab"`, and `role="tabpanel"` are correctly applied.
- `aria-selected` is `true` on the active tab and `false` on others.
- `aria-controls` and `aria-labelledby` associations are correct.
- Inactive panels are not in the accessibility tree.
- `prefers-reduced-motion` suppresses panel transition animation.
- Renders correctly in light and dark themes.
