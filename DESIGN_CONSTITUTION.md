# Design Constitution

## Purpose

This document defines the **design philosophy**, **UX laws**, and **principles** that all UI components in the `vlt-ui` design system must uphold.

This file is **governing law** for UI design choices, UX patterns, and accessibility requirements.  
If a change would violate any principle here, it must be revised or explicitly justified.

---

# 1. Design Philosophy

Design in `vlt-ui` must be:

- **Useful** — solves real user needs  
- **Usable** — easy to understand and interact with  
- **Accessible** — usable by all people, including those with disabilities  
- **Consistent** — predictable across screens and modules  
- **Maintainable** — simple patterns that scale  
- **Familiar** — conforms to widely recognized UX conventions  

Design should **minimize cognitive load** and prioritize clarity over novelty.

---

# 2. The UX Laws We Uphold

These laws are distilled from established UX research and applied to every component and pattern.

## 2.1 Jakob’s Law  
Users prefer your product to work the same way similar products do.

- Follow familiar interface patterns.
- Users shouldn’t relearn basic interactions.

## 2.2 Hicks Law  
Decision time increases with complexity.

- Reduce the number of choices.
- Prefer simple, clear actions.

## 2.3 Fitts’s Law  
The time to acquire a target is a function of distance and size.

- Make interactive elements large enough.
- Primary actions should be easy to target.

## 2.4 Gestalt Principles  
Users perceive interface elements as part of structured wholes.

- Group related elements.
- Use alignment, proximity, and common styles.

## 2.5 Miller’s Law  
People can hold only ~7 items (±2) in short-term memory.

- Chunk information.
- Avoid overloading screens.

## 2.6 Tesler’s Law (Law of Conservation of Complexity)  
Complexity must go somewhere.

- Don’t push unnecessary complexity onto users.
- Keep flows as simple as possible.

## 2.7 Doherty Threshold  
Productivity increases when systems respond quickly (< 400ms).

- Provide instant feedback.
- Loading states should feel fast and clear.

## 2.8 Aesthetic-Usability Effect  
Users perceive aesthetically pleasing design as easier to use.

- Good aesthetics should support usability, not replace it.

## 2.9 Peak-End Rule  
People judge experiences based on peak and ending moments.

- Ensure completion states are clear and satisfying.
- Error recoveries matter as much as success flows.

---

# 3. Core UX Principles

These principles guide how components and layouts should behave.

## 3.1 Clarity over Cleverness

- Avoid ambiguity in labels, icons, and flows.
- Use familiar vocabulary and interactions.
- Clever solutions must improve clarity, not reduce it.

## 3.2 Progressive Disclosure

- Show only what’s needed at the moment.
- Avoid overwhelming screens.
- Reveal complexity as users ask for it.

## 3.3 Feedback & Responsiveness

- Always acknowledge user actions.
- Use loaders, disabled states, and transitions.
- Avoid jarring or unexpected jumps.

## 3.4 Predictability

- Keep UI behavior consistent across contexts.
- Actions should have consistent outcomes.

## 3.5 Forgiveness & Error Tolerance

- Allow undo where appropriate.
- Provide clear, recoverable error messages.

## 3.6 Primary Actions First

- Highlight the most important action on a screen.
- Avoid multiple competing primary calls to action.

---

# 4. Accessibility Principles

Accessibility here is **not optional**.

All UI must:

### 4.1 Keyboard Accessibility

- All interactive elements must be focusable
- Focus order must be logical
- Skip links where appropriate

### 4.2 Screen Reader Support

- Use semantic elements when possible
- Provide ARIA labels where needed
- Ensure meaningful alt text for non-decorative images

### 4.3 Visual Contrast

- Meet WCAG contrast ratios
- Avoid color alone to convey meaning

### 4.4 Motion Sensitivity

- Honor `prefers-reduced-motion`
- Use animation only to support comprehension

### 4.5 Form Accessibility

- Associate labels with inputs
- Communicate errors clearly
- Group related fields

---

# 5. Design Tokens & Theming

Design tokens must:

- Be named semantically
- Apply consistently across components
- Support light and dark themes
- Support extension without breaking consuming apps

Tokens must **never** be hardcoded in components.

---

# 6. Component Design Requirements

Every component must:

- Be composable
- Have a clear purpose
- Support controlled/uncontrolled modes where appropriate
- Use proper spacing, typography, and layout patterns
- Respect design tokens
- Support accessibility by default
- Include usage examples

Components must **never make assumptions** about business logic, data fetching, or app structure.

---

# 7. Interaction & Motion

Use motion to:

- Show state changes
- Indicate hierarchy
- Provide smooth transitions

Avoid:

- Unnecessary or distracting motion
- Motion that interferes with task completion

Always provide reduced-motion alternatives.

---

# 8. Layout Behavior

Responsive design must:

- Support small to large screens
- Respect breakpoints
- Avoid awkward wrapping
- Prioritize content flow

Mobile first, scalable layouts are preferred.

---

# 9. Internationalization (i18n) & Localization (l10n)

All textual content must support translation.

Design must:

- Respect text expansion
- Support RTL languages
- Avoid UI breakage due to localization

---

# 10. Usability, Performance & Feedback

- UI should feel fast and fluid
- Provide instant visual feedback
- Avoid locking users behind long wait times
- Use optimistic updates when safe

---

# 11. Documentation Requirements

Every component must include:

- Clear purpose
- Examples
- Prop definitions
- Accessibility notes
- UX rationale
- Theming guidelines

---

# 12. Hard Boundaries

`vlt-ui` MUST NOT:

- Contain business logic
- Make backend calls
- Manage global app state
- Contain routing logic
- Contain multi-tenancy logic

If any of the above is required, it belongs in `vlt-app`, not `vlt-ui`.

---

# 13. Enforcement via AI

AI-assisted changes **must**:

- Respect this constitution
- Ask for clarification when necessary
- Propose violations only with explicit tradeoff discussion

This constitution is a **hard rule** for UI design in the system.

## 13.1 Accessibility & UI Quality Tooling

The following MCP servers are available to AI agents for verifying accessibility and UI quality during the coding loop:

### Static Analysis (Use During Development)
- **AccessLint MCP** (`accesslint`) — Use `audit_html` after creating or modifying component markup. Use `diff_html` when fixing accessibility issues to verify no regressions. Use `calculate_contrast_ratio` and `analyze_color_pair` when choosing colors.
- **WCAG MCP** (`wcag`) — Look up WCAG 2.2 requirements when unsure about a specific pattern or success criterion.
- **ESLint MCP** (`eslint`) — Available for running ESLint rules if configured.
- **Biome** — Already configured with `recommended` rules including the `a11y` category.

### Live Testing (Use With Dev Server Running)
- **Playwright MCP** (`playwright`) — Navigate and interact with pages via structured accessibility snapshots. Use for verifying layout, interactive behavior, and page structure.
- **a11y-mcp** (`a11y`) — Run axe-core accessibility audits on live webpages with WCAG tag filtering.
- **Lighthouse MCP** (`lighthouse`) — Full audits for accessibility, performance, best practices, and SEO.

### When to Use Each Tool
| Scenario | Tool |
|----------|------|
| Creating/modifying component markup | AccessLint `audit_html` |
| Fixing a11y issues (regression check) | AccessLint `diff_html` |
| Choosing colors | AccessLint `calculate_contrast_ratio`, `analyze_color_pair` |
| Unsure about WCAG requirements | WCAG MCP `get-criterion`, `search-wcag` |
| Full page-level audit | Lighthouse MCP |
| Interactive behavior verification | Playwright MCP |
| Targeted live a11y audit | a11y-mcp |

---

# 14. Final Rule

When a design decision is unclear:

- Default to **clarity**
- Default to **accessibility**
- Default to **familiar UX**
- Ask instead of guessing
