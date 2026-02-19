# Component Spec — NotesEditor

## 1. Purpose

Provides a structured editing surface for composing or modifying freeform text notes. Serves as the primary writing area within a notes-taking workflow, accepting and displaying rich or plain text content.

Use when: a user needs to create or edit a note with a dedicated input surface, optionally supporting formatting controls.

Do NOT use when: only a single-line text input is needed (use a TextField instead), or when the content is read-only (use a NotesList or a text display component).

---

## 2. UX Intent

- Primary interaction goal: Allow the user to focus on writing with minimal distraction. The editor should feel immediately writable — clicking or tapping the surface begins input without an additional activation step.
- Expected user mental model: Users expect the editor to behave like a familiar text document or note-taking app surface — full-width, scrollable, with a blinking cursor on focus (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow text editor conventions users know from native apps (Notes, Notion, Docs).
  - Tesler's Law: The complexity of saving or formatting should be absorbed by the system, not imposed on the user. Auto-save behavior (when implemented) should be invisible.
  - Doherty Threshold: Keystrokes must reflect in the visible content within 400ms. There must be no perceptible input lag.
  - Fitts's Law: The entire editor surface is the tap/click target for initiating input.

---

## 3. Visual Behavior

- Layout rules:
  - The editor fills the width of its container.
  - Height grows with content (auto-expanding) or fills the available height in a fixed-height container with internal scrolling.
  - A placeholder string is displayed when the editor is empty and unfocused.
  - An optional toolbar above the editing area may house formatting controls; its presence does not shift the editor's content area.
- Spacing expectations: Internal padding uses space tokens to keep text away from the container edge. Consistent line-height from typography tokens.
- Typography rules: Body text uses the default body text token. Heading-formatted content uses heading tokens. All typography scales reference design tokens.
- Token usage: Background, text, border, placeholder text, and selection highlight colors must use design tokens.
- Responsive behavior: The editor adapts to its container width without horizontal scrolling. On mobile, the software keyboard must not obscure the active input line — the container must scroll or adjust when the keyboard is visible.

---

## 4. Interaction Behavior

- States:
  - Idle/Unfocused: Displays content or placeholder; no visible cursor; optional subtle border.
  - Focused: Cursor is visible; border or focus ring becomes prominent.
  - Editing: Active text input; character-by-character render.
  - Empty: Placeholder text visible.
  - Disabled: Non-interactive; de-emphasized visual treatment; cursor is not-allowed (web).
  - Read-only: Content is visible and selectable but not editable.
- Controlled vs uncontrolled: Supports both. In uncontrolled mode, the editor manages its own content state. In controlled mode, the parent supplies the value and an onChange handler.
- Keyboard behavior:
  - Standard text editing shortcuts apply (cut, copy, paste, undo, redo).
  - Tab key behavior must be configurable — either inserting a tab character or moving focus out of the editor, depending on context.
  - No keyboard traps — Escape or a configured key must be able to move focus out.
- Screen reader behavior:
  - The editor surface has `role="textbox"` with `aria-multiline="true"`.
  - Placeholder text is announced when the editor is empty.
  - Character and word count (if shown) is announced as a live region update.
- Motion rules: Focus transitions (border, glow) animate at under 150ms. No entrance animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - `role="textbox"`, `aria-multiline="true"`, `aria-label` or `aria-labelledby` referencing a visible label.
  - If a character limit exists, `aria-describedby` references the count indicator.
  - Disabled state uses `aria-disabled="true"`.
  - Read-only state uses `aria-readonly="true"`.
- Focus rules: Tapping or clicking the editor surface places focus directly within the editable area. The editor must be reachable via Tab. On mobile, focus triggers the software keyboard.
- Contrast expectations: Body text must meet 4.5:1. Placeholder text must meet 3:1. Focus ring must be clearly visible.
- Reduced motion behavior: Focus transition animations are instant.

---

## 6. Theming Rules

- Required tokens: editor background, editor border (idle and focused), text primary, text placeholder, selection background, focus ring, radius, space (padding), line-height.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Background shifts to a dark surface token. Text and placeholder tokens resolve to dark-mode values. Selection highlight is distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: NotesEditor is typically placed within a full-screen or split-pane layout. It may be wrapped by a container that also houses a title input field above it.
- What it may contain: The editor surface itself contains user-authored text content. An optional formatting toolbar may be composed alongside it as a sibling, not a child.
- Anti-patterns:
  - Do not nest interactive form controls inside the editor content area.
  - Do not use NotesEditor for single-line input — use a TextField primitive.
  - Do not hardcode font or color values inside the editor.

---

## 8. Performance Constraints

- Memoization rules: The editor frame must not re-render due to unrelated parent state changes. Value change callbacks must be debounced or throttled when triggering side effects (e.g., auto-save).
- Virtualization: For very long documents, content virtualization may be needed but is outside the scope of this presentation component.
- Render boundaries: The editor is an isolated render boundary. Typing in the editor must not cause sibling component re-renders.

---

## 9. Test Requirements

- What must be tested:
  - Placeholder is displayed when value is empty.
  - Typing updates the displayed content.
  - Disabled state prevents input.
  - Read-only state prevents input but allows selection and copying.
  - Controlled mode: value changes only when the parent updates the prop.
- Interaction cases:
  - Clicking/tapping the surface activates focus and shows the cursor.
  - Standard text editing shortcuts work correctly.
  - Tab key behavior matches the configured mode (insert tab or move focus).
  - Keyboard users can leave the editor without a trap.
- Accessibility checks:
  - `role="textbox"` and `aria-multiline="true"` are present.
  - Accessible label is present and correct.
  - Focus ring is visible on keyboard focus.
  - Placeholder text contrast passes 3:1.
  - Body text contrast passes 4.5:1.
  - Reduced motion suppresses transition animations.
