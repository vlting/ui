# Implement `src/forms` Module Components

## Mandatory Pre-flight

Before touching any file, read:
- `AI_CONSTITUTION.md` (governing law — no business logic, all-token styling, accessibility mandatory)
- `DESIGN_CONSTITUTION.md` (UX laws, motion, contrast, accessibility)

For each component before implementing it, read:
- Its `*.spec.md` — follow it strictly
- Its `*.contract.md` — verify the public API contract

All commits must follow **Conventional Commits** (`feat(forms): ...`).

---

## Context

All 19 components in `src/forms/` are currently stubs — every `*.tsx` file uses a bare `styled(YStack, {})` placeholder with no real styling or behavior. This task replaces every stub with a real, spec-compliant Tamagui v2 implementation.

### Key Constraints

- **Tamagui v2 (2.0.0-rc.14)** — follow MEMORY.md gotchas strictly
- **All styling via design tokens** — no hardcoded colors, spacing, or font sizes
- **No new external dependencies** unless explicitly noted in Tier 9 below
- **Cross-platform** — web + React Native (via Tamagui)
- **Fully accessible** — WCAG AA, keyboard nav, ARIA, reduced-motion
- **Tests** — update each `*.test.tsx` to test real behavior per §9 of each spec

### Tamagui v2 Patterns

```tsx
// Simple text component
import { Text, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

const LabelFrame = styled(Text, {        // Text, not YStack
  fontSize: '$3',
  color: '$color',
  // token-based only — no hardcoded values
})
export type LabelProps = GetProps<typeof LabelFrame>
export const Label = LabelFrame

// Compound component
import { YStack, withStaticProperties, styled } from 'tamagui'

const Frame = styled(YStack, { gap: '$3' })
const Sub = styled(YStack, {})
export const Foo = withStaticProperties(Frame, { Sub })
export type FooProps = GetProps<typeof Frame>
```

- Use `Text` (not `YStack`) for all text-rendering elements
- Use `Input` from tamagui for text inputs
- Use `XStack` / `YStack` for layout containers
- **Do NOT** use `name:` in `styled()` — causes TS errors in v2 RC
- Use `type` intersections, **not** `interface extends GetProps<>`

---

## Implementation Order

Work through tiers in sequence (simple → complex). Within a tier, components are independent.

---

## Tier 1 — Simple Presentational Text Components

No state, no behavior. Replace `YStack` stubs with `styled(Text, { ... })`.

### `Label`

- Base: `styled(Text, { fontSize: '$3', fontWeight: '$5', color: '$color' })`
- Additional props: `htmlFor?: string` (web), `required?: boolean`, `optional?: boolean`
- Required indicator: a `Text` child with `*`, color `$red10`, `aria-hidden="true"`
- Optional indicator: a `Text` child with `(optional)`, color `$color2`
- Web: the outer element should render as `<label>` via `tag="label"` and pass through `htmlFor`
- Clicking the label on web focuses its associated input (native `<label>` behavior)

### `HelperText`

- Base: `styled(Text, { fontSize: '$2', color: '$color2' })`
- No variants needed — stateless muted caption text

### `InlineError`

- Base: `styled(Text, { fontSize: '$2', color: '$red10' })`
- Prop: `id?: string` (for `aria-describedby` on the related input)
- Render with `role="alert"` and `aria-live="assertive"` for screen reader announcements

### `ValidationMessage`

- Compound: `XStack` (icon + text side-by-side) with a `Text` sub-component
- Prop: `variant: 'error' | 'warning' | 'success' | 'info'`
- Icon: use `@tamagui/lucide-icons` — `AlertCircle`, `AlertTriangle`, `CheckCircle`, `Info`
- Token colors per variant: `$red10`, `$yellow10`, `$green10`, `$blue10`
- Icon is `aria-hidden="true"`; text carries the message for screen readers

---

## Tier 2 — Structural Compound Wrappers

### `FieldWrapper`

- Frame: `styled(YStack, { gap: '$2' })` — pure layout, no background or border
- Sub-components via `withStaticProperties`:
  - `FieldWrapper.Label` → `styled(YStack, {})` — slot that renders a `Label` child
  - `FieldWrapper.Input` → `styled(YStack, {})` — slot for any input control
  - `FieldWrapper.Error` → `styled(YStack, {})` — conditional slot for `InlineError`
  - `FieldWrapper.Helper` → `styled(YStack, {})` — conditional slot for `HelperText`
- No ARIA role on the wrapper; associations handled by child Label/InlineError

### `FormContainer`

- Frame: `styled(YStack, { padding: '$4', gap: '$6' })`
- Sub-components via `withStaticProperties`:
  - `FormContainer.Title` → `styled(Text, { fontSize: '$6', fontWeight: '$7', color: '$color' })`
  - `FormContainer.Description` → `styled(Text, { fontSize: '$3', color: '$color2' })`
  - `FormContainer.Actions` → `styled(XStack, { gap: '$3', justifyContent: 'flex-end' })`
- Web: outer element can use `tag="form"` + `role="form"` when wrapping a real form; `aria-labelledby` pointing at the Title

---

## Tier 3 — Display Indicator

### `PasswordStrengthMeter`

- Props: `strength: 0 | 1 | 2 | 3 | 4` (0=empty, 1=weak, 2=fair, 3=strong, 4=very strong)
- Layout: `YStack` containing an `XStack` of 4 segment `View`s + a `Text` label
- Segment fill per strength level:
  - 0: all `$color4` (unfilled)
  - 1: first `$red10`, rest `$color4`
  - 2: first two `$yellow10`, rest `$color4`
  - 3: first three `$green8`, last `$color4`
  - 4: all `$green10`
- Labels: `''` / `'Weak'` / `'Fair'` / `'Strong'` / `'Very Strong'`
- ARIA: outer `role="meter"`, `aria-valuenow={strength}`, `aria-valuemin={0}`, `aria-valuemax={4}`, `aria-label="Password strength"`
- A visually-hidden `aria-live="polite"` span announces the label text on change
- Not focusable — `tabIndex={-1}` / not in tab order
- Wrap with `React.memo`

---

## Tier 4 — Behavioral Inputs

### `OTPInput`

- Props: `length?: number` (default 6), `value?: string`, `onChange?: (val: string) => void`, `onComplete?: (val: string) => void`, `disabled?: boolean`, `error?: boolean`
- Layout: `XStack` with `gap: '$2'` containing `length` individual segment inputs
- Each segment: `styled(Input, { width: '$6', textAlign: 'center', maxLength: 1 })`
- Maintain an array of `length` refs (`useRef` array)
- Keyboard behavior (web):
  - Type a char → fill segment → advance focus to next ref
  - Backspace → clear current → move focus to previous ref
  - Arrow Left/Right → move focus between refs without clearing
  - Paste of a full string → distribute chars across all segments in order
- ARIA: wrap all segments in `View` with `role="group"`, `aria-label="Verification code"`; each input `aria-label="Digit {n} of {length}"`
- `onComplete` fires when all segments are filled
- Memoize each segment with `React.memo`

### `TagInput`

- Props: `value?: string[]`, `onChange?: (tags: string[]) => void`, `placeholder?: string`, `disabled?: boolean`, `maxTags?: number`
- Layout: `XStack` (wrapping) containing tag chips + an active `Input` at the end
- Tag chip: `XStack` with `Text` + lucide `X` icon `Pressable` (remove button)
- Remove button: `aria-label="Remove {tag}"`
- Keyboard:
  - Enter or comma creates a tag from current input text (trim, deduplicate, respect `maxTags`)
  - Backspace on empty input removes the last tag
- ARIA: wrap in `role="group"` with appropriate label

---

## Tier 5 — Dropdown Interactive Inputs

### `Combobox`

- Props: `options: { value: string; label: string; description?: string }[]`, `value?: string`, `onChange?: (val: string) => void`, `placeholder?: string`, `disabled?: boolean`, `error?: boolean`, `loading?: boolean`
- Layout: filterable `Input` + Tamagui `Popover` for the dropdown
- Inside the Popover: `YStack` of pressable `XStack` option items
- Filtering: `useMemo` filtering `options` by the typed input string (case-insensitive)
- Keyboard nav: Arrow Down/Up move highlight; Enter selects; Escape closes
- "No results": `Text` message inside dropdown when filtered list is empty
- "Loading": `Spinner` from tamagui inside dropdown
- ARIA:
  - Input: `role="combobox"`, `aria-expanded`, `aria-controls={listboxId}`, `aria-autocomplete="list"`, `aria-activedescendant`
  - Dropdown: `role="listbox"`
  - Options: `role="option"`, `aria-selected`
- Dropdown lazily mounted (only when open)
- For `options.length > 100`: render only a windowed slice (simple slice-based approach; no external virtualization lib)

### `MultiSelect`

- Props: `options: { value: string; label: string }[]`, `value?: string[]`, `onChange?: (vals: string[]) => void`, `placeholder?: string`, `disabled?: boolean`, `error?: boolean`
- Trigger: shows selected values as chips or a count label; opens Popover on press
- Inside Popover: scrollable `YStack` of options, each with a `Checkbox`-style indicator when selected
- Dropdown stays open on selection; closes on Escape or outside click
- ARIA: `role="listbox"`, `aria-multiselectable="true"`, options `role="option"` with `aria-selected`

---

## Tier 6 — Multi-Step Form

### `MultiStepForm`

- Props:
  - `steps: { title: string; description?: string; content: ReactNode }[]`
  - `currentStep?: number` (controlled); internal state for uncontrolled
  - `onStepChange?: (step: number) => void`
  - `onSubmit?: () => void`
  - `isValid?: boolean` (whether the current step passes validation — parent-controlled)
- Layout: `YStack` with:
  1. Step indicator: `XStack` of numbered step dots (active / completed / pending)
  2. Step content area: `YStack` with `role="group"`, `aria-labelledby={stepTitleId}`
  3. Navigation: `XStack` with Back + Next/Submit buttons
- Step indicator token colors: active → `$blue10`, completed → `$green10`, pending → `$color4`
- Focus management: on step change, move focus to the step title
- Live region: `aria-live="polite"` announces `"Step {n} of {total}: {title}"` on transition
- Inactive steps: unmount (not just hide) to prevent stale focus traps
- Last step: Next button label changes to "Submit" and calls `onSubmit`
- Back hidden on step 0
- Reduced motion: no slide/fade — immediate content switch

---

## Tier 7 — File & Upload Components

### `DragAndDropZone`

- Props: `onDrop?: (files: File[]) => void`, `accept?: string[]`, `disabled?: boolean`, `children?: ReactNode`
- Web: `View` with drag event handlers — `onDragOver`, `onDragEnter`, `onDragLeave`, `onDrop`
  - Prevent default on `dragOver` to allow drop
  - Filter dropped files by `accept` extensions if provided
  - Visual states: idle / dragging-over (dashed border, accent background tint) / disabled
  - Border: `borderStyle: 'dashed'`, color `$color5` → `$blue10` on drag-over — all via tokens
- Native: render a pressable zone that opens the native file picker (platform file picker via `expo-document-picker` if available, otherwise a `TODO` comment)
- ARIA: `role="region"`, `aria-label="File drop zone"`, drag instructions in a visually-hidden `aria-describedby` text node

### `FileUploader`

- Props: `accept?: string`, `multiple?: boolean`, `maxSize?: number`, `onSelect?: (files: File[]) => void`, `disabled?: boolean`, `error?: string`
- Wraps `DragAndDropZone` + a "Browse files" `Button` trigger
- Hidden `<input type="file">` (web only) triggered on button press
- File list preview: `YStack` of selected file names with `X` remove buttons per file
- Size validation: if `maxSize` exceeded, surface error via `InlineError` for that file
- Cleared files: pressing remove calls `onSelect` with the remaining file list

### `MultiImageUploader`

- Props: `value?: string[]` (preview URLs), `onChange?: (files: File[]) => void`, `maxImages?: number`, `disabled?: boolean`
- Layout: wrapping `XStack` of image thumbnail tiles + an "Add image" tile (if under `maxImages`)
- Thumbnail: `Image` (from tamagui or react-native `Image`) with an overlay `X` remove button
- Remove button: `aria-label="Remove image {n}"`
- Add tile: `Pressable` `YStack` with a `+` / camera icon; opens image-only file picker on press

---

## Tier 8 — Date & Time Pickers

> ⚠️ Build with Tamagui primitives + native `Date` API only — no external date picker library.

### `DatePicker`

- Props: `value?: Date`, `onChange?: (date: Date) => void`, `minDate?: Date`, `maxDate?: Date`, `disabled?: boolean`, `placeholder?: string`
- Layout: formatted `Text` trigger (or `Input` display) → Tamagui `Popover` containing a calendar
- Calendar:
  - Header row: `XStack` with prev-month button, `"Month YYYY"` title, next-month button
  - Weekday header row: `XStack` of 7 `Text` labels (Mon–Sun)
  - Day grid: 6-row × 7-col `YStack`/`XStack` of day `Pressable` cells
  - Day cell states: normal / today (token border) / selected (token fill) / out-of-month (muted) / disabled
- Month navigation: prev/next change the displayed month (local state)
- Keyboard in calendar: Arrow keys navigate days; Enter selects; Page Up/Down change month; Escape closes
- ARIA: calendar Popover `role="dialog"`, `aria-label="Choose date"`; grid `role="grid"`; cells `role="gridcell"`; current day `aria-current="date"`; selected `aria-selected="true"`

### `TimePicker`

- Props: `value?: string` (24-hour HH:MM), `onChange?: (time: string) => void`, `use24Hour?: boolean`, `minuteStep?: number` (default 1), `disabled?: boolean`
- Layout: `Input` display (shows formatted time) → `Popover` with two scrollable columns (hours | minutes)
- Hour column: 0–23 (24h) or 1–12 (12h)
- Minute column: 0–59 stepping by `minuteStep`
- AM/PM toggle if `use24Hour` is false (a `XStack` of two pressable options)
- Keyboard: Arrow Up/Down scrolls the focused column; Enter commits; Escape cancels

### `DateRangePicker`

- Props: `startDate?: Date`, `endDate?: Date`, `onChange?: (range: { start: Date; end: Date }) => void`, `minDate?: Date`, `maxDate?: Date`, `disabled?: boolean`
- Layout: two `Input`-style triggers (Start / End) → single `Popover` with two side-by-side month calendars
- Selection mode: first tap sets start; second tap sets end; range days highlighted with a background token
- Clicking a new start after a full range is set resets the range
- Reuse the calendar grid logic from `DatePicker` as a shared internal helper

---

## Tier 9 — Rich Text Editor

> ⚠️ Web-first only. Native support is out of scope for this pass.
> Add a `// TODO: React Native — requires platform-appropriate rich text solution` comment in the native code path.

**New dependencies to install** (the only additions allowed for this task):
```
yarn add @tiptap/react @tiptap/starter-kit
```

### `RichTextEditor`

- Props: `value?: string` (HTML string), `onChange?: (html: string) => void`, `placeholder?: string`, `disabled?: boolean`, `error?: boolean`, `minHeight?: number`, `maxHeight?: number`
- Wrap Tiptap's `useEditor` + `EditorContent` in a Tamagui `YStack` styled container
- Toolbar: `XStack` of formatting `Pressable` icon buttons
  - Bold, Italic, Underline, BulletList, OrderedList, Link
  - Icons from `@tamagui/lucide-icons`: `Bold`, `Italic`, `Underline`, `List`, `ListOrdered`, `Link`
  - Each button: `aria-label` describing the action, `aria-pressed` reflecting active state
  - Toolbar: `role="toolbar"`, `aria-label="Text formatting"`
- Content area: `role="textbox"`, `aria-multiline="true"`, `aria-label` or `aria-labelledby`
- Keyboard shortcuts: Cmd/Ctrl+B, I, U handled natively by Tiptap
- `onChange` debounced at 300ms (use `useCallback` + a `setTimeout` ref)
- Error state: container border token changes to `$red10`
- Disabled: set Tiptap `editable: false`; apply `opacity: 0.5`
- Memoize the toolbar (`React.memo` or `useMemo`)
- On reduced motion: suppress any Tiptap transition animations

---

## Testing Requirements

Update each `*.test.tsx` to cover §9 of its component's spec. Use `src/__test-utils__/` custom render (wraps `TamaguiProvider`):

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Import from src/__test-utils__/ for the wrapped render
```

Test priorities per component:
1. Renders correctly with props
2. Controlled vs uncontrolled state
3. Keyboard interactions
4. ARIA attributes present and correct
5. Error / disabled states
6. Reduced-motion behavior where applicable

---

## Commit Strategy

One commit per tier (or per component when diffs are large):

```
feat(forms): implement Label, HelperText, InlineError, ValidationMessage
feat(forms): implement FormContainer and FieldWrapper
feat(forms): implement PasswordStrengthMeter
feat(forms): implement OTPInput
feat(forms): implement TagInput
feat(forms): implement Combobox
feat(forms): implement MultiSelect
feat(forms): implement MultiStepForm
feat(forms): implement DragAndDropZone, FileUploader, MultiImageUploader
feat(forms): implement DatePicker, TimePicker, DateRangePicker
feat(forms): implement RichTextEditor
```

Each commit includes both `*.tsx` and `*.test.tsx` changes.
All work on a dedicated worktree branch; merge to `v2/scaffold` when the full module is complete.

---

## Definition of Done

- [ ] All 19 `*.tsx` stubs replaced with real Tamagui v2 implementations
- [ ] All 19 `*.test.tsx` files updated with behavioral tests (no snapshot-only tests)
- [ ] `yarn typecheck` — zero TypeScript errors
- [ ] `yarn lint` — zero linting errors
- [ ] `yarn test src/forms` — all tests pass
- [ ] No hardcoded colors, spacing, or font sizes — all design tokens
- [ ] No business logic, data fetching, or global state
- [ ] All accessibility requirements met per each component's spec
- [ ] Tiptap packages installed only if RichTextEditor is implemented
