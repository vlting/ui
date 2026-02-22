# Component Audit: @vlting/ui vs shadcn/ui, Radix UI, Chakra UI

## Summary

@vlting/ui currently has **22 modules** (8 primitives, 5 styled components, 3 headless, 3 hooks, 3 utilities). Industry-standard libraries typically ship 50-70+ components. Our biggest gaps are in **form controls** (Select, Radio, Switch, Slider), **overlays** (Popover, Tooltip, Dropdown Menu, Sheet/Drawer), **feedback** (Alert, Toast, Progress, Skeleton), and **data display** (Badge, Avatar, Table). The headless layer is also thin — only 3 headless components vs Radix's 28+ primitives.

Tamagui v2 provides built-in equivalents for some of these (Sheet, Popover, Toast via @tamagui/toast), which should be leveraged where possible rather than building from scratch.

---

## Component Matrix

### Legend
- **✓** = Available
- **—** = Not available
- **~** = Partial / similar concept exists
- **Radix** column indicates whether a Radix primitive exists (relevant for headless layer)

| Component | shadcn | Radix | Chakra | @vlting/ui | Status | Priority |
|---|---|---|---|---|---|---|
| **Primitives / Layout** | | | | | | |
| Box | — | — | ✓ | ✓ | Done | — |
| Stack (V/H) | — | — | ✓ | ✓ | Done | — |
| Text | ~ | — | ~ | ✓ | Done | — |
| Heading | ~ | — | ~ | ✓ | Done | — |
| Divider / Separator | ✓ | ✓ | ✓ | ✓ | Done | — |
| Spacer | — | — | ~ | ✓ | Done | — |
| Icon | — | — | ✓ | ✓ | Done | — |
| Portal | — | ✓ | ✓ | ✓ | Done | — |
| Aspect Ratio | ✓ | ✓ | ✓ | — | Missing | Low |
| Center | — | — | ✓ | ~ (Box centered) | Done | — |
| Container | — | — | ✓ | — | Missing | Low |
| Grid / SimpleGrid | — | — | ✓ | — | Missing | Medium |
| Wrap | — | — | ✓ | — | Missing | Low |
| Visually Hidden | — | ✓ | ✓ | — | Missing | Medium |
| **Form Controls** | | | | | | |
| Button | ✓ | — | ✓ | ✓ | Done | — |
| Input | ✓ | — | ✓ | ✓ | Done | — |
| Checkbox | ✓ | ✓ | ✓ | ✓ (headless) | Headless only | Medium |
| Select | ✓ | ✓ | ✓ | — | Missing | **High** |
| Radio Group | ✓ | ✓ | ✓ | — | Missing | **High** |
| Switch | ✓ | ✓ | ✓ | — | Missing | **High** |
| Slider | ✓ | ✓ | ✓ | — | Missing | **High** |
| Textarea | ✓ | — | ✓ | — | Missing | Medium |
| Toggle | ✓ | ✓ | — | — | Missing | Medium |
| Toggle Group | ✓ | ✓ | — | — | Missing | Medium |
| Label | ✓ | ✓ | ~ | ~ (Input.Label) | Partial | Low |
| Form / Field | ✓ | ✓ | ✓ | — | Missing | Medium |
| Number Input | — | — | ✓ | — | Missing | Low |
| Pin Input / OTP | ✓ | — | ✓ | — | Missing | Low |
| Range Slider | — | — | ✓ | — | Missing | Low |
| Editable | — | — | ✓ | — | Missing | Low |
| Combobox | ✓ | — | — | — | Missing | Medium |
| **Data Display** | | | | | | |
| Card | ✓ | — | ✓ | ✓ | Done | — |
| Badge | ✓ | — | ✓ | — | Missing | **High** |
| Avatar | ✓ | ✓ | ✓ | — | Missing | **High** |
| Table | ✓ | — | ✓ | — | Missing | Medium |
| List | — | — | ✓ | — | Missing | Low |
| Kbd | ✓ | — | ✓ | — | Missing | Low |
| Code | — | — | ✓ | — | Missing | Low |
| Tag | — | — | ✓ | ~ (Badge) | Missing | Low |
| Stat | — | — | ✓ | — | Missing | Low |
| **Feedback** | | | | | | |
| Alert | ✓ | — | ✓ | — | Missing | **High** |
| Toast / Sonner | ✓ | ✓ | ✓ | — | Missing | **High** |
| Progress | ✓ | ✓ | ✓ | — | Missing | Medium |
| Skeleton | ✓ | — | ✓ | — | Missing | Medium |
| Spinner | ✓ | — | ✓ | ~ (in Button) | Partial | Medium |
| Circular Progress | — | — | ✓ | — | Missing | Low |
| **Overlays** | | | | | | |
| Dialog / Modal | ✓ | ✓ | ✓ | ✓ | Done | — |
| Tabs | ✓ | ✓ | ✓ | ✓ | Done | — |
| Popover | ✓ | ✓ | ✓ | — | Missing | **High** |
| Tooltip | ✓ | ✓ | ✓ | — | Missing | **High** |
| Dropdown Menu | ✓ | ✓ | ✓ | — | Missing | **High** |
| Context Menu | ✓ | ✓ | — | — | Missing | Medium |
| Sheet / Drawer | ✓ | — | ✓ | — | Missing | **High** |
| Hover Card | ✓ | ✓ | — | — | Missing | Low |
| Alert Dialog | ✓ | ✓ | ✓ | — | Missing | Medium |
| Command | ✓ | — | — | — | Missing | Medium |
| **Navigation** | | | | | | |
| Breadcrumb | ✓ | — | ✓ | — | Missing | Medium |
| Accordion | ✓ | ✓ | ✓ | — | Missing | **High** |
| Navigation Menu | ✓ | ✓ | — | — | Missing | Medium |
| Menubar | ✓ | ✓ | — | — | Missing | Low |
| Pagination | ✓ | — | — | — | Missing | Medium |
| Stepper | — | — | ✓ | — | Missing | Low |
| Link | — | — | ✓ | — | Missing | Low |
| Skip Nav | — | — | ✓ | — | Missing | Low |
| **Misc** | | | | | | |
| Scroll Area | ✓ | ✓ | — | — | Missing | Medium |
| Collapsible | ✓ | ✓ | — | — | Missing | Medium |
| Resizable | ✓ | — | — | — | Missing | Low |
| Carousel | ✓ | — | — | — | Missing | Low |

---

## Recommended Component Tiers

### Tier 1 — Primitives (layout, typography, utility)
Already mostly complete. Gaps to fill:

| Component | Notes |
|---|---|
| VisuallyHidden | Screen-reader-only content; trivial to implement |
| Grid | CSS Grid wrapper; useful for dashboard layouts |
| Container | Max-width constrained wrapper; trivial |

### Tier 2 — Simple Styled Components (single-purpose, self-contained)
Components that are standalone, have minimal state, and do not require complex positioning:

| Component | Notes |
|---|---|
| Badge | Inline status indicator; very common in production apps |
| Avatar | User representation; image + fallback pattern |
| Alert | Static message container with tone variants (info, success, warning, error) |
| Textarea | Multi-line text input; extends Input patterns |
| Spinner | Standalone loading indicator (currently only inside Button) |
| Progress | Determinate progress bar |
| Skeleton | Loading placeholder |
| Label | Standalone form label (currently only as Input.Label) |
| Separator | Already have Divider; may add semantic role |
| Kbd | Keyboard shortcut indicator |
| Toggle | Two-state button (on/off) |

### Tier 3 — Complex Composed Components (multi-part, stateful, need headless layer)
Components requiring a headless behavior layer + styled wrapper, often with positioning/portaling:

| Component | Headless needed | Notes |
|---|---|---|
| Select | Yes | Dropdown list selection; Radix primitive available |
| Radio Group | Yes | Single-choice group; Radix primitive available |
| Switch | Yes | Toggle control; Radix primitive available |
| Slider | Yes | Range input; Radix primitive available |
| Popover | Yes | Anchored floating content; Tamagui has built-in Popover |
| Tooltip | Yes | Hover info popup; Tamagui has built-in Tooltip |
| Dropdown Menu | Yes | Action menu; Radix primitive available |
| Sheet/Drawer | Yes | Side panel overlay; Tamagui has built-in Sheet |
| Toast | Yes | Timed notifications; @tamagui/toast exists |
| Accordion | Yes | Expandable sections; Radix primitive available |
| Alert Dialog | Yes | Confirmation modal; extends Dialog pattern |
| Toggle Group | Yes | Multi-toggle selection; Radix primitive available |
| Collapsible | Yes | Show/hide panel; Radix primitive available |
| Combobox | Yes | Autocomplete input; complex positioning |
| Context Menu | Yes | Right-click menu; extends Dropdown Menu |
| Breadcrumb | No | Navigation trail; stateless composed component |
| Pagination | No | Page navigation; stateless composed component |
| Table | No | Data table; stateless composed layout |
| Scroll Area | Yes | Custom scrollbar; Radix primitive available |
| Navigation Menu | Yes | Complex nav with submenus; Radix primitive available |
| Command | Yes | Command palette / search; complex |

---

## Tamagui v2 Built-in Components

These Tamagui v2 packages can be leveraged instead of building from scratch:

| Tamagui Package | Equivalent | Notes |
|---|---|---|
| `@tamagui/popover` | Popover | Built-in positioning, portal support |
| `@tamagui/tooltip` | Tooltip | Built-in hover detection, positioning |
| `@tamagui/sheet` | Sheet/Drawer | Bottom sheet with snap points |
| `@tamagui/toast` | Toast | Timed notifications |
| `@tamagui/select` | Select | Styled select with portal |
| `@tamagui/switch` | Switch | Toggle switch |
| `@tamagui/slider` | Slider | Range input |
| `@tamagui/radio-group` | Radio Group | Single-choice group |
| `@tamagui/accordion` | Accordion | Expandable sections |
| `@tamagui/scroll-view` | Scroll Area | Cross-platform scroll |
| `@tamagui/toggle-group` | Toggle Group | Multi-toggle |
| `@tamagui/avatar` | Avatar | Image + fallback |
| `@tamagui/alert-dialog` | Alert Dialog | Confirmation modal |
| `@tamagui/label` | Label | Form label |
| `@tamagui/progress` | Progress | Progress bar |
| `@tamagui/separator` | Separator | Divider with a11y |

---

## Implementation Priority

### Phase 1 — Essential (High Priority)
Core components missing from virtually every production app:

1. **Select** (headless + styled) — Tamagui has @tamagui/select
2. **Radio Group** (headless + styled) — Tamagui has @tamagui/radio-group
3. **Switch** (headless + styled) — Tamagui has @tamagui/switch
4. **Badge** (styled only) — Simple; no headless needed
5. **Avatar** (styled only) — Tamagui has @tamagui/avatar
6. **Alert** (styled only) — Static feedback container
7. **Toast** (headless + styled) — Tamagui has @tamagui/toast
8. **Popover** (headless + styled) — Tamagui has @tamagui/popover
9. **Tooltip** (headless + styled) — Tamagui has @tamagui/tooltip
10. **Dropdown Menu** (headless + styled) — No Tamagui built-in; needs custom headless
11. **Sheet/Drawer** (headless + styled) — Tamagui has @tamagui/sheet
12. **Accordion** (headless + styled) — Tamagui has @tamagui/accordion

### Phase 2 — Common (Medium Priority)
Frequently needed but not blocking:

13. **Slider** (headless + styled) — Tamagui has @tamagui/slider
14. **Textarea** (styled only) — Extends Input patterns
15. **Checkbox** (styled) — Already have headless; need styled wrapper
16. **Toggle / Toggle Group** (headless + styled) — Tamagui has @tamagui/toggle-group
17. **Progress** (styled) — Tamagui has @tamagui/progress
18. **Skeleton** (styled only)
19. **Spinner** (styled only) — Extract from Button
20. **Table** (styled only) — Stateless layout
21. **Breadcrumb** (styled only) — Stateless navigation
22. **Pagination** (styled only)
23. **Alert Dialog** (headless + styled) — Extends Dialog
24. **Collapsible** (headless + styled)
25. **Context Menu** (headless + styled)
26. **Combobox** (headless + styled) — Complex; depends on Select + Input
27. **Scroll Area** (headless + styled)
28. **Form / Field** (styled only) — Form validation wrapper
29. **Grid** (primitive)
30. **VisuallyHidden** (primitive)

### Phase 3 — Nice to Have (Low Priority)

31. **Command** — Command palette
32. **Navigation Menu** — Complex multi-level nav
33. **Hover Card** — Link preview card
34. **Menubar** — Desktop-style menu bar
35. **Number Input** — Specialized numeric input
36. **Pin Input / OTP** — Specialized code input
37. **Range Slider** — Multi-thumb slider
38. **Kbd** — Keyboard shortcut display
39. **Stepper** — Multi-step wizard indicator
40. **Resizable** — Resizable panels
41. **Carousel** — Image/content carousel
42. **Container** — Max-width wrapper
43. **Aspect Ratio** — Fixed aspect ratio container
44. **Editable** — Inline editable text
45. **Code** — Code display

---

## Key Recommendations

1. **Leverage Tamagui v2 packages** for Tier 3 components where available. Build a headless wrapper + styled layer on top rather than implementing behavior from scratch.

2. **Prioritize form controls** (Select, Radio, Switch, Slider) — these block real app development more than any other category.

3. **Badge, Avatar, Alert are quick wins** — simple styled components with no complex behavior that immediately improve the library's production-readiness.

4. **The headless layer needs significant expansion** — from 3 to ~15+ primitives to properly support the styled component tier.

5. **Consider wrapping Radix primitives** for web-only headless components where Tamagui doesn't have a cross-platform equivalent (e.g., Dropdown Menu, Context Menu, Command).
