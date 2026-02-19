# Component Spec — MessageInput

## 1. Purpose

Provides the message composition area at the bottom of a chat thread, including a text input, attachment trigger, emoji picker trigger, and send button.

Use when: allowing a user to compose and send a message in a conversation thread.

Do NOT use when: composing multi-paragraph rich text documents (use a document editor) or composing email (use `EmailTemplateEditor`).

---

## 2. UX Intent

- Primary interaction goal: allow users to compose and send messages as quickly and effortlessly as possible.
- Expected user mental model: a single-line (expandable) text field with attachment and emoji buttons on the left and a send button on the right — consistent with WhatsApp, iMessage, and Slack.
- UX laws applied:
  - **Jakob's Law** — input bar layout matches conventions from all major messaging apps.
  - **Fitts's Law** — send button is the largest and most prominent action; it is reachable at the trailing edge of the input row.
  - **Doherty Threshold** — sending a message must provide immediate feedback (sent state, input cleared) within 400 ms.
  - **Tesler's Law** — the component handles newline vs. send behavior so the user does not need to think about it.

---

## 3. Visual Behavior

- Layout: horizontal row — optional leading action buttons (attachment, emoji), a flex-grow text field, and a trailing send button.
- Text field: grows vertically up to a max-height token; scrolls internally when content exceeds the max height.
- Attachment previews: rendered in a row above the input field when files are staged.
- Send button: disabled when the input is empty; active when text or attachments are present.
- Spacing: input padding, button sizes, and gaps reference space and size tokens.
- Typography: input text uses body token; placeholder uses muted/body token.
- Token usage: input background, border, button colors, and placeholder colors reference theme tokens only.
- Responsive behavior: input bar is sticky at the bottom of its container on all viewports.

---

## 4. Interaction Behavior

- States:
  - **empty**: send button disabled; placeholder visible.
  - **composing**: send button enabled; text present.
  - **with attachments**: attachment previews visible above the input.
  - **sending**: brief sending indicator; input may be temporarily disabled.
  - **error**: if send fails, an error message appears and the input is re-enabled.
  - **disabled**: entire input bar non-interactive; reduced opacity.
- Controlled/uncontrolled: text value and attachment list may be controlled externally or managed internally.
- Keyboard behavior: `Enter` sends the message (configurable); `Shift+Enter` inserts a newline; `Escape` may clear the input or close the emoji picker if open.
- Screen reader behavior: the text field has a clear label ("Message [contact name]"); the send button has a descriptive `aria-label`; send success is announced via a live region.
- Motion rules: sending animation and attachment chip entrance respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: the text field has a visible or `aria-label` describing the conversation (e.g., "Message Alice"); send button has `aria-label="Send message"`; attachment button has `aria-label="Attach file"`; emoji button has `aria-label="Insert emoji"`.
- Send button communicates disabled state via `aria-disabled`.
- Send success and error outcomes are announced via `aria-live="polite"` region.
- Contrast: all text, placeholder, and button colors meet WCAG 2.1 AA.
- Focus: on send, focus remains in the text field; if the emoji picker opens, focus moves to it and returns on close.
- Reduced motion: suppress sending animation.

---

## 6. Theming Rules

- Required tokens: `background` (input), `borderColor`, `borderColorFocus`, `color`, `colorMuted` (placeholder), `colorPrimary` (send button), `backgroundSend`, `focusStyle`, `space`, `borderRadius`, `size` (button dimensions).
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or max-height values.
- Dark mode: input background, border, and send button tokens must resolve with sufficient contrast in dark themes.

---

## 7. Composition Rules

- Placed inside `ChatLayout.Input` or directly at the bottom of a `ChatThread` view.
- Triggers `EmojiPicker` as a floating child; the picker is composed by the consumer or by this component.
- `AttachmentPreview` instances for staged files are composed within the input area.
- Fires `onSend` with message text and attachment list; does not perform the network request.
- Anti-patterns:
  - Do not implement message sending API calls inside this component.
  - Do not hardcode the conversation context (recipient name) inside the component.
  - Do not use the input bar as a search field.

---

## 8. Performance Constraints

- Text input changes must not cause re-renders of the parent thread or sidebar.
- Attachment list updates must be isolated to the input area.
- No internal data fetching; attachment files are received from a file picker callback.

---

## 9. Test Requirements

- Send button is disabled when the input is empty.
- Send button is enabled when text is present.
- Pressing send fires `onSend` with the current text value and clears the input.
- `Shift+Enter` inserts a newline without sending.
- Attachment button fires `onAttachmentTrigger` callback.
- Staged attachments render `AttachmentPreview` chips above the input.
- Emoji button opens the emoji picker; selecting an emoji inserts it into the text field.
- Send failure renders an error message via the live region.
- Disabled state renders all controls as non-interactive.
- All action buttons have correct accessible labels.
- Passes axe accessibility audit in empty, composing, and disabled states.
