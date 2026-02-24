# Front-of-Frontend Guide for AI Agents

A reference for generating high-quality "front of frontend" UI code in `@vlting/ui`.

**Audience:** AI agents (Claude) working on this codebase.
**Scope:** Semantic HTML, CSS, accessibility, design systems, performance, DOM structure.

---

## 1. What "Front of Frontend" Means

### The Original Distinction

Brad Frost coined "front of the front-end" in 2019 to distinguish two disciplines within frontend development:

| Front of Frontend | Back of Frontend |
|---|---|
| Semantic HTML | State management |
| CSS / design tokens | Data fetching |
| Accessibility | Build tooling |
| Design systems | Routing |
| Performance (DOM, CLS) | Authentication |
| Browser APIs / DOM structure | Business logic |

> **Source:** bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/

Chris Coyier expanded on this in "The Great Divide" (CSS-Tricks, 2019), arguing that the JavaScript-heavy hiring culture was pushing out developers whose core expertise was HTML, CSS, and accessibility — the people who made interfaces actually work for users.

### Why This Matters for AI-Assisted Development

AI code generation has a systematic bias toward "back of frontend" concerns:

1. **Markup quality is an afterthought.** AI defaults to `<div>` soup with click handlers instead of semantic elements (`<button>`, `<nav>`, `<dialog>`).
2. **Accessibility is omitted unless explicitly requested.** The CodeA11y study (CHI 2025) confirmed this — LLMs skip manual accessibility steps, require explicit prompting, and leave a verification gap even when they do produce ARIA attributes.
3. **DOM structure mirrors component structure, not document structure.** AI nests wrappers to match component boundaries rather than producing clean, minimal DOM output.
4. **CSS is over-specified.** Inline styles, arbitrary values, and redundant properties appear instead of token-based, systematic styling.

**This project (`@vlting/ui`) is entirely a "front of frontend" concern.** It contains no business logic, no data fetching, no routing. Every file in this repo lives squarely in the left column of the table above. AI agents working here must treat markup quality, accessibility, and DOM optimization as primary — not secondary — concerns.

---

## 2. Prompting Strategies for High-Quality UI Output

### The CodeA11y Finding

The CodeA11y study (CHI 2025, Carnegie Mellon) tested LLM-generated UI code across multiple models and found three consistent problems:

1. **Explicit prompting required.** Without the word "accessible" or a specific WCAG criterion in the prompt, models omit accessibility features — even when constitution/system files exist.
2. **Manual steps overlooked.** Keyboard navigation, focus management, and screen reader announcements are rarely generated unless specifically requested.
3. **Verification gap.** Even when accessibility code is produced, it is often incomplete or incorrect. Generated ARIA attributes may not match the actual interaction pattern.

### The Core Principle

> **Always request accessibility explicitly — even with constitution files.**

Constitution files (like `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md`) set the baseline, but they are system-level context that can be deprioritized by the model when a task prompt is specific about functionality but silent about quality. Always include accessibility requirements in the task itself.

### Prompt Templates

#### Creating a New Component

```
Create a [ComponentName] component that:
- Renders as a semantic <[element]> (or explain why a div with ARIA is necessary)
- Is keyboard operable: [Tab to focus, Enter/Space to activate, Escape to dismiss, Arrow keys for…]
- Announces [state/role] to screen readers via [specific ARIA pattern from APG]
- Uses design tokens for all visual values (no hardcoded colors, spacing, or sizes)
- Meets WCAG 2.2 AA: [specific criteria relevant to this component]
- Supports prefers-reduced-motion
- Minimizes DOM nesting — inspect the rendered output, not just the JSX
```

#### Modifying an Existing Component

```
Modify [ComponentName] to [change]. Preserve:
- Semantic HTML element choices
- Keyboard behavior: [list current keyboard interactions]
- ARIA attributes and screen reader announcements
- Focus management (focus must [stay/move/return to…])
- Design token usage (no hardcoded values)

After the change, verify with AccessLint audit_html on the rendered markup.
```

#### Reviewing Generated Code

```
Review this component for front-of-frontend quality:
1. Is the root element semantically correct, or should it be a different HTML element?
2. Can a keyboard-only user operate every interactive feature?
3. Does a screen reader announce the correct role, state, and name?
4. Are there redundant wrapper <div>s that could be eliminated?
5. Are all visual values from design tokens?
6. Does it honor prefers-reduced-motion?
```

### Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Better Approach |
|---|---|---|
| "Create a dropdown component" | No element choice, no keyboard spec, no ARIA pattern | "Create a dropdown using the disclosure pattern (APG). Render as `<button>` + `<ul>`. Arrow keys navigate options." |
| "Make it accessible" | Too vague — model adds random `aria-label`s | Specify the exact ARIA pattern, keyboard interactions, and focus behavior |
| "Add ARIA to the dialog" | ARIA without the interaction is decoration | "Implement the dialog pattern: `role=dialog`, `aria-modal=true`, focus trap, Escape to close, return focus to trigger" |
| "Style it nicely" | Produces hardcoded colors and spacing | "Style using `$color`, `$space`, and `$radius` tokens from the design system" |
| "Fix the accessibility" | No target, no verification | "Fix: the button has no accessible name. Add `aria-label` or visible text. Verify with AccessLint `audit_html`." |

---

## 3. Key Quality Dimensions

### 3.1 Semantic HTML

**What it means:** Using the correct HTML element for its intended purpose, not just its visual appearance.

**Why it matters:**
- Screen readers use element semantics to announce roles and navigate
- Browser built-in behaviors (focus, form submission, keyboard activation) come free with correct elements
- Search engines and parsers understand content structure
- Less JavaScript needed to replicate native behavior

**Key rules:**
- Use `<button>` for actions, `<a>` for navigation, `<input>` for data entry
- Use landmark elements: `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`, `<section>` (with accessible name)
- Use `<h1>`–`<h6>` for heading hierarchy — never skip levels, never use headings for visual sizing alone
- Use `<ul>`/`<ol>` for lists, `<table>` for tabular data, `<form>` for form groups
- Use `<dialog>` for modals (native focus trapping, Escape handling, backdrop)
- Use `<details>`/`<summary>` for simple disclosure widgets

**How to verify:**
1. Inspect rendered DOM output — Tamagui may render different elements than the JSX implies (see Section 6)
2. Run AccessLint `audit_html` on the rendered markup
3. Check that no `<div>` has a click handler without `role`, `tabIndex`, and keyboard event handling — this is a sign a semantic element should have been used instead

### 3.2 Accessibility (WCAG 2.2 AA)

**What it means:** All users, including those with disabilities, can perceive, understand, navigate, and interact with the interface.

**Why it matters:**
- Legal requirement in many jurisdictions
- This project's constitutions make it non-negotiable (`AI_CONSTITUTION.md` §2.5, `DESIGN_CONSTITUTION.md` §4)
- Assistive technology users represent a significant portion of the population

**Key areas:**

**Keyboard operability:**
- Every interactive element must be reachable via Tab
- Logical tab order (follows DOM order, not visual order)
- Standard key bindings: Enter/Space for activation, Escape for dismissal, Arrow keys for navigation within composite widgets
- Focus must be visible (2px outline, `$outlineColor` token, 2px offset — per Button.spec.md pattern)
- Focus must be managed: move to opened content, return to trigger on close

**ARIA usage:**
- Prefer native semantics over ARIA (`<button>` over `<div role="button">`)
- When ARIA is needed, follow the APG pattern exactly — partial ARIA is worse than none
- Required ARIA for common patterns:
  - Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
  - Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
  - Combobox: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `aria-controls`
  - Menu: `role="menu"`, `role="menuitem"`, `aria-expanded`
- Always test that ARIA states update dynamically (e.g., `aria-expanded` toggles)

**Contrast:**
- Normal text: 4.5:1 ratio minimum
- Large text (18px+ or 14px bold): 3:1 ratio minimum
- UI components and graphical objects: 3:1 ratio against adjacent colors
- Use AccessLint `analyze_color_pair` when choosing colors

**Screen reader testing:**
- Verify that content is announced in a logical reading order
- Verify that dynamic changes are announced (live regions, or focus movement)
- Verify that decorative elements are hidden (`aria-hidden="true"`, empty `alt=""`)

**How to verify:**
1. AccessLint `audit_html` for static analysis
2. WCAG MCP `get-criterion` for specific requirements
3. Playwright MCP `browser_snapshot` for accessibility tree inspection
4. a11y-mcp `audit_webpage` for axe-core live audit
5. Keyboard-only walkthrough via Playwright `browser_press_key`

### 3.3 DOM Optimization

**What it means:** The rendered DOM is as flat and minimal as possible while maintaining semantic structure.

**Why it matters:**
- Deeper DOM trees increase style recalculation time
- Extra nodes increase memory usage and slow down querySelector/layout operations
- Assistive technology must traverse the entire tree — bloated DOM means slower screen reader navigation
- Google Lighthouse flags excessive DOM size (>800 elements warning, >1400 elements error)

**Key rules:**
- Inspect **rendered output**, not JSX source. Tamagui adds wrapper elements.
- Question every `<div>` — does it serve a semantic or layout purpose?
- Avoid "wrapper tax": `<div><div><div><span>text</span></div></div></div>` → `<p>text</p>`
- Combine styling and semantics on one element where possible
- Avoid conditional wrappers (`{condition ? <Wrapper><Child/></Wrapper> : <Child/>}`) — prefer conditional props

**How to verify:**
1. Playwright MCP `browser_snapshot` — inspect the live accessibility tree
2. Playwright MCP `browser_evaluate` with `document.querySelectorAll('*').length` for element count
3. Lighthouse MCP `run_audit` for DOM size metrics

### 3.4 CSS / Token Discipline

**What it means:** All visual values (colors, spacing, sizes, radii, typography) come from design tokens, never hardcoded values.

**Why it matters:**
- Tokens are the single source of truth for the design system
- Theme switching (light/dark) only works when components use token references
- Consistency across components is maintained automatically
- Brand customization becomes possible by swapping token definitions

**Key rules from the constitutions:**
- No hardcoded colors (`AI_CONSTITUTION.md` §2.6)
- No hardcoded spacing values outside tokens
- No arbitrary font sizes
- Must support light/dark themes
- Tokens must be named semantically (`DESIGN_CONSTITUTION.md` §5)

**Token categories in `@vlting/ui`:**
- `$color` / `$colorN` — color palette tokens
- `$space` / `$spaceN` — spacing scale (0–16)
- `$size` / `$sizeN` — element sizing scale (0–16)
- `$radius` / `$radiusN` — border radius scale (0–16)
- `$zIndex` / `$zIndexN` — stacking order
- `$heading`, `$body` — font family tokens
- `$1`–`$10` — font size tokens

**Responsive design:**
- Tamagui media query props: `$sm`, `$md`, `$lg`, `$xl`
- Mobile-first approach (`DESIGN_CONSTITUTION.md` §8)
- Honor breakpoints, avoid awkward wrapping

**Reduced motion:**
- All animation must respect `prefers-reduced-motion`
- Use Tamagui animation tokens that degrade gracefully
- Never animate layout properties that affect CLS

**How to verify:**
1. Search rendered styles for hex values, `px` values, or `rgb()` — these indicate hardcoded values
2. ESLint MCP for lint rules catching style violations
3. Biome a11y rules for related checks

### 3.5 Touch Targets & Sizing

**What it means:** Interactive elements must be large enough to tap or click accurately.

**Why it matters:**
- WCAG 2.5.8 Target Size (Minimum) requires 24x24 CSS px minimum
- WCAG 2.5.5 Target Size (Enhanced) recommends 44x44 CSS px
- Fitts's Law: smaller targets = slower, more error-prone interaction (`DESIGN_CONSTITUTION.md` §2.3)
- Mobile users interact with fingers, not pixel-precise cursors

**Key rules:**
- All interactive elements: minimum 24x24px target size
- Primary actions (submit buttons, main CTAs): 44x44px preferred
- If the visual element is smaller than 24px, use padding or `::after` pseudo-element to extend the hit area
- Inline links in text are exempt (WCAG 2.5.8 exception) but should still have adequate line-height
- Spacing between adjacent targets: at least 8px to prevent mis-taps

**Size variants in `@vlting/ui`:**
- `sm` — compact contexts (toolbars, dense UIs), must still meet 24px minimum
- `md` — default, should meet 44px for primary actions
- `lg` — mobile-first / primary actions, always meets 44px

**How to verify:**
1. Playwright MCP `browser_evaluate` to measure element dimensions
2. Inspect padding and minimum height/width in rendered styles
3. WCAG MCP `get-criterion 2.5.8` for the full requirement

### 3.6 Performance

**What it means:** The UI renders efficiently without causing layout shifts, excessive repaints, or DOM bloat.

**Why it matters:**
- Layout stability (CLS) is a Core Web Vital
- Excessive DOM size degrades all browser operations
- Unnecessary re-renders waste CPU and battery
- The AI Constitution §3.4 requires attention to performance

**Key rules:**
- Keep component DOM output minimal (see §3.3)
- Avoid layout-triggering CSS properties in animations (prefer `transform`, `opacity`)
- Reserve explicit dimensions for elements that load async content (prevent CLS)
- Memoize only when justified — premature optimization is an anti-pattern
- Use virtualization for lists > 50 items (`AI_CONSTITUTION.md` §3.4)
- Do not create abstraction layers unless duplication is clear

**How to verify:**
1. Lighthouse MCP `run_audit` for CLS, DOM size, and performance score
2. Playwright MCP `browser_evaluate` for runtime measurements
3. Manual inspection of animation properties (no `width`/`height`/`top`/`left` animations)

---

## 4. Available Tooling in This Project

This project has MCP (Model Context Protocol) servers configured for accessibility and quality verification. Use them during the coding loop — not just at the end.

### 4.1 AccessLint MCP (`accesslint`)

**Purpose:** Static HTML accessibility auditing.

**When to use:**
- After creating or modifying component markup — `audit_html`
- When fixing accessibility issues — `diff_html` to verify the fix introduces no regressions
- When choosing colors — `analyze_color_pair` for contrast ratios

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `audit_html` | HTML string | Audit rendered markup for accessibility violations |
| `audit_file` | File path | Audit an HTML file on disk |
| `audit_url` | URL | Audit a live page |
| `diff_html` | Before/after HTML | Verify a fix didn't introduce regressions |
| `list_rules` | — | See all available audit rules |

**Best practice:** When a violation includes a "Browser hint," follow up with Playwright MCP to inspect the live behavior.

### 4.2 WCAG MCP (`wcag`)

**Purpose:** Look up WCAG 2.2 success criteria, techniques, and glossary terms.

**When to use:**
- When unsure about a specific accessibility requirement
- When you need the exact wording of a success criterion
- When looking for recommended techniques for a pattern

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `get-criterion` | Criterion ID (e.g., `2.4.7`) | Full details on a specific criterion |
| `search-wcag` | Keywords | Find relevant criteria by topic |
| `get-techniques-for-criterion` | Criterion ID | Implementation techniques |
| `get-criteria-by-level` | `A`, `AA`, or `AAA` | List all criteria at a conformance level |
| `get-full-criterion-context` | Criterion ID | Criterion + techniques + failures |
| `whats-new-in-wcag22` | — | WCAG 2.2 additions |

### 4.3 ESLint MCP (`eslint`)

**Purpose:** JavaScript/TypeScript linting with configured rules.

**When to use:**
- After writing or modifying JS/TS files
- To catch code quality issues before committing

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `lint-files` | File paths | Run ESLint on specific files |

### 4.4 Playwright MCP (`playwright`)

**Purpose:** Browser automation for live interaction testing and accessibility snapshots.

**When to use:**
- Verifying interactive behavior (keyboard navigation, focus management)
- Inspecting the rendered DOM / accessibility tree
- Taking screenshots of component states
- Measuring element dimensions for touch target compliance

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `browser_navigate` | URL | Open a page in the browser |
| `browser_snapshot` | — | Get the accessibility tree of the current page |
| `browser_click` | Selector | Click an element |
| `browser_press_key` | Key | Test keyboard interaction |
| `browser_take_screenshot` | — | Visual verification |
| `browser_evaluate` | JS expression | Measure DOM, count elements, check styles |
| `browser_fill_form` | Selector + value | Test form inputs |

**Best practice:** Use `browser_snapshot` (accessibility tree) rather than `browser_take_screenshot` (visual) when verifying structure and semantics.

### 4.5 a11y-mcp (`a11y`)

**Purpose:** axe-core accessibility audits on live webpages.

**When to use:**
- Full accessibility audit of a running page
- Targeted audits with WCAG tag filtering
- When you need axe-core's specific violation details and remediation guidance

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `audit_webpage` | URL + optional tags | Run axe-core audit with WCAG filtering |
| `get_summary` | URL | Quick accessibility summary |

### 4.6 Lighthouse MCP (`lighthouse`)

**Purpose:** Full performance, accessibility, best practices, and SEO audits.

**When to use:**
- Comprehensive page-level auditing
- Checking performance metrics (CLS, DOM size)
- Getting an overall accessibility score

**Key tools:**
| Tool | Input | Use Case |
|---|---|---|
| `run_audit` | URL + categories | Full Lighthouse audit |
| `get_performance_score` | URL | Quick performance check |

### 4.7 Biome (Built-in)

**Purpose:** Fast linter and formatter with built-in accessibility rules.

**When to use:**
- Runs automatically as part of the project's lint pipeline
- Catches basic accessibility issues in JSX (missing alt text, invalid ARIA, etc.)
- Configured with `recommended` rules including the `a11y` category

**How it differs from other tools:** Biome operates on source code (JSX), not rendered HTML. It catches issues at authoring time but cannot verify runtime behavior.

### Tool Selection Matrix

| Scenario | Primary Tool | Secondary Tool |
|---|---|---|
| Creating new component markup | AccessLint `audit_html` | WCAG MCP for pattern lookup |
| Fixing a11y violation | AccessLint `diff_html` | WCAG MCP `get-techniques-for-criterion` |
| Choosing colors / contrast | AccessLint `analyze_color_pair` | — |
| Verifying keyboard navigation | Playwright `browser_press_key` | Playwright `browser_snapshot` |
| Checking rendered DOM structure | Playwright `browser_snapshot` | Playwright `browser_evaluate` |
| Full page audit | Lighthouse `run_audit` | a11y-mcp `audit_webpage` |
| Looking up WCAG requirement | WCAG MCP `get-criterion` | WCAG MCP `search-wcag` |
| Measuring touch targets | Playwright `browser_evaluate` | — |
| Linting source code | ESLint `lint-files` | Biome (automatic) |

---

## 5. Reference Resources

These are authoritative references for front-of-frontend patterns. Consult them when implementing complex interactive components.

### 5.1 WAI-ARIA Authoring Practices Guide (APG)

**URL:** w3.org/WAI/ARIA/apg/

The definitive source for ARIA widget patterns. Every interactive component in this library should follow the corresponding APG pattern. Key patterns used in `@vlting/ui`:

- **Button** — keyboard activation, disabled state
- **Dialog (Modal)** — focus trap, Escape to close, aria-modal
- **Tabs** — arrow key navigation, automatic/manual activation
- **Combobox** — listbox popup, filtering, selection
- **Menu** — menubar, menuitem, arrow navigation
- **Accordion** — disclosure pattern, heading + button
- **Listbox** — single/multi select, typeahead
- **Radio Group** — arrow key cycling, roving tabindex
- **Switch** — toggle pattern, checked state
- **Tooltip** — hover/focus trigger, dismissal
- **Disclosure** — show/hide, expanded state

### 5.2 The A11Y Project

**URL:** a11yproject.com

Practical, community-maintained accessibility resource. Useful for:
- Quick references on common patterns
- Checklist for WCAG compliance
- Myth-busting accessibility misconceptions

### 5.3 Inclusive Components (Heydon Pickering)

**URL:** inclusive-components.design

Deep dives into building accessible versions of common UI patterns. Each article walks through the semantic HTML, ARIA, keyboard, and screen reader considerations. Particularly valuable for:
- Toggle buttons
- Menus and menu buttons
- Data tables
- Notifications and toasts
- Tabbed interfaces
- Collapsible sections

### 5.4 GOV.UK Design System

**URL:** design-system.service.gov.uk

The gold standard for accessible component implementation. Every component is tested with real assistive technology users. Reference for:
- Form patterns (error handling, validation, grouping)
- Navigation patterns
- Content structure
- Accessibility-first component API design

### 5.5 Open UI

**URL:** open-ui.org

W3C Community Group documenting standard component behaviors across platforms. Useful for:
- Understanding user expectations for common widgets (Jakob's Law)
- Resolving ambiguity about how a component "should" behave
- Comparing implementations across design systems

### 5.6 Headless Accessible Primitives

**Radix UI** — radix-ui.com/primitives
- Headless, accessible React primitives
- Reference implementation for keyboard behavior and ARIA patterns
- Components: Dialog, Dropdown Menu, Popover, Tabs, Accordion, etc.

**React Aria** (Adobe) — react-spectrum.adobe.com/react-aria/
- Hooks-based accessible UI primitives
- Extremely thorough keyboard and screen reader support
- Particularly strong for: date pickers, comboboxes, grid navigation

Use these as behavioral references when implementing the corresponding `@vlting/ui` components. The interaction model and ARIA pattern should match, even though the styling and API will differ.

---

## 6. Tamagui-Specific Gotchas

Tamagui v2 RC has several behaviors that directly impact front-of-frontend quality. These are confirmed bugs or design decisions that you must work around.

### 6.1 The `tag` Prop Does NOT Change the Rendered HTML Element

**The bug:** `styled(XStack, { tag: 'button' })` renders `<div tag="button">`, NOT `<button>`. The `tag` value goes to `defaultProps`, not `staticConfig.Component`.

**Impact:** Components that appear to use semantic elements in source code actually render as `<div>` in the browser. Screen readers see a generic container, not a button/link/nav/form.

**The fix:** Use native HTML elements for semantics and wrap Tamagui styled components inside for visual styling:

```tsx
// WRONG — renders <div tag="button">
const StyledButton = styled(XStack, { tag: 'button' })

// CORRECT — renders actual <button>
const ButtonFrame = styled(XStack, { /* visual styles only */ })

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...props}>
    <ButtonFrame>
      {props.children}
    </ButtonFrame>
  </button>
))
```

**Alternative:** `styledHtml('button', { ... })` correctly sets the HTML element, but uses a different API and loses Tamagui layout primitive features (XStack/YStack alignment, media queries, etc.).

**Components that MUST use this pattern:** Any component with semantic HTML requirements — buttons, links, form inputs, labels, nav, headings, lists, tables, dialogs.

### 6.2 `GetProps<>` Index Signature Bug

**The bug:** Any type using `GetProps<typeof StyledComponent>` resolves all props as `undefined` due to an index signature issue in Tamagui v2 RC.

**Impact:** Intersecting `GetProps<>` with additional props (e.g., `children?: ReactNode`) breaks the entire type — all props become `undefined`.

**The fix:** Define component props from scratch instead of extending `GetProps`:

```tsx
// WRONG — all props resolve as undefined
type ButtonProps = GetProps<typeof ButtonFrame> & { loading?: boolean }

// CORRECT — define props manually
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  children?: React.ReactNode
}
```

### 6.3 JSX Token Prop Resolution Bug

**The bug:** `GetFinalProps<>` in Tamagui v2 RC resolves all token-string values as `undefined` when components are used in JSX.

**Impact:** Passing token values as props (e.g., `<Component size="$4" />`) causes TypeScript errors even though the runtime behavior is correct.

**The fix:** Use the `_jsx-compat.ts` pattern — re-export the component cast as `ComponentType<Record<string, unknown>>`:

```tsx
// src/forms/_jsx-compat.ts
import { Input as _Input } from './Input'
import type { ComponentType } from 'react'

export const Input = _Input as ComponentType<Record<string, unknown>>
```

Use the compat export in JSX composition, and the original export for type-safe programmatic usage.

### 6.4 `styled()` Token Defaults Bug

**The bug:** `styled()` calls with non-empty token defaults in the variants or base styles cause TypeScript errors in v2 RC.

**The fix:** Add `// @ts-expect-error Tamagui v2 RC` before each affected `styled()` call:

```tsx
// @ts-expect-error Tamagui v2 RC
const CardFrame = styled(YStack, {
  padding: '$4',
  borderRadius: '$4',
  backgroundColor: '$background',
})
```

### 6.5 Sub-Component Children Type Bug

**The bug:** Compound component sub-parts like `Popover.Trigger` and `Popover.Content` have `children` typed as `undefined`.

**The fix:** Cast sub-components before use:

```tsx
const PopoverTrigger = Popover.Trigger as React.ComponentType<Record<string, unknown>>
const PopoverContent = Popover.Content as React.ComponentType<Record<string, unknown>>
```

### 6.6 `{/* @ts-expect-error */}` in JSX Is Not a TS Directive

**The bug:** JSX comments (`{/* @ts-expect-error */}`) are not TypeScript directives — they have no effect on type checking.

**The fix:** Use line-level `// @ts-expect-error` comments or cast sub-components to `ComponentType<Record<string, unknown>>` (aliased as `AnyFC` in some files):

```tsx
// WRONG — JSX comment has no effect
{/* @ts-expect-error */}
<Popover.Trigger>{children}</Popover.Trigger>

// CORRECT — line-level TS directive
// @ts-expect-error Tamagui v2 RC children type
const trigger = <Popover.Trigger>{children}</Popover.Trigger>

// ALSO CORRECT — cast the component
const PopoverTrigger = Popover.Trigger as ComponentType<Record<string, unknown>>
<PopoverTrigger>{children}</PopoverTrigger>
```

### 6.7 Lucide Icons `size` Prop

**The bug:** `@tamagui/lucide-icons` icons fail with `size: number` in Tamagui v2 RC.

**The fix:** Re-export with a simplified type:

```tsx
type IconFC = ComponentType<{ size?: number; color?: string }>
export const ChevronDown = _ChevronDown as IconFC
```

### 6.8 Semantic HTML Verification Checklist for Tamagui

Given these bugs, always verify rendered output. After implementing any component with semantic requirements:

1. **Check the rendered DOM** — Does the correct HTML element appear? (`<button>`, not `<div tag="button">`)
2. **Check the accessibility tree** — Does the correct role appear? (Playwright `browser_snapshot`)
3. **Check keyboard behavior** — Does the element receive focus? Does Enter/Space activate it?
4. **Check screen reader announcement** — Is the correct role and name announced?

If any check fails, the component likely needs the native HTML element wrapper pattern from §6.1.

---

## 7. Component Specification Format

This project uses `.spec.md` files to define component contracts. Every component should have one. The format covers:

1. **Purpose** — What the component does and does not do
2. **UX Intent** — Which UX laws apply and why
3. **Visual Behavior** — Layout, spacing, typography, token usage, responsive behavior
4. **Interaction Behavior** — States, keyboard, screen reader, motion rules
5. **Accessibility Requirements** — ARIA, focus, contrast, reduced motion
6. **Theming Rules** — Required tokens, prohibited hardcoded values, dark mode
7. **Composition Rules** — What wraps it, what it contains, anti-patterns
8. **Performance Constraints** — Memoization, virtualization, render boundaries
9. **Test Requirements** — Behavioral tests, interaction tests, accessibility checks

**Before modifying any component:** Check for a `.spec.md` file. If one exists, follow it strictly. If a change would violate the spec, propose a spec update first.

**Before creating a new component:** Write the `.spec.md` first. This forces you to think about semantics, keyboard behavior, and accessibility before writing any implementation code.

---

## 8. Workflow Summary

When working on any front-of-frontend task in `@vlting/ui`:

### Before Coding
1. Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md`
2. Check for a `.spec.md` file for the component
3. Look up the APG pattern for the widget type
4. Identify which WCAG criteria apply

### During Coding
5. Use semantic HTML elements (verify with Tamagui gotchas in §6)
6. Use design tokens for all visual values
7. Implement keyboard behavior per the APG pattern
8. Add ARIA attributes that match the interaction pattern
9. Support `prefers-reduced-motion`
10. Minimize DOM nesting

### After Coding
11. Run AccessLint `audit_html` on rendered markup
12. Test keyboard navigation via Playwright
13. Inspect accessibility tree via Playwright `browser_snapshot`
14. Verify touch target sizes meet 24px minimum
15. Check for hardcoded visual values in rendered styles

### If Issues Are Found
16. Fix the issue
17. Run AccessLint `diff_html` to verify no regressions
18. Re-test the specific interaction affected
