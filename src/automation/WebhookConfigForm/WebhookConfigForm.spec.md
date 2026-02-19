# Component Spec — WebhookConfigForm

## 1. Purpose

WebhookConfigForm presents the configuration UI for defining an outbound or inbound webhook within an automation rule. It collects endpoint URL, HTTP method, optional headers, optional payload configuration, and authentication settings (e.g., a secret token).

Use it within automation action configuration panels when the selected action type is "Webhook" or "HTTP request", or within trigger configuration when the trigger is an inbound webhook.

Do NOT use it for general API settings, OAuth configuration, or non-webhook HTTP integrations that have a more specific configuration component.

---

## 2. UX Intent

- Primary interaction goal: allow a technically literate user to configure a webhook endpoint accurately without making errors in URL format, method selection, or authentication.
- Expected user mental model: a structured form with labeled sections — URL, method, headers, body, auth — familiar from tools like Postman, Zapier's webhook action, or Stripe webhook configuration (Jakob's Law).
- UX laws applied:
  - Tesler's Law: hide advanced options (custom headers, payload template) behind an expansion toggle; present essential fields (URL, method) upfront.
  - Hick's Law: HTTP method dropdown shows only the most relevant options (POST, GET, PUT, PATCH, DELETE).
  - Doherty Threshold: URL format validation fires within 400ms of the user pausing; test request result appears within the threshold or with a clear loading indicator.
  - Fitts's Law: the "Send test request" button is clearly sized and reachable without scrolling.

---

## 3. Visual Behavior

- Layout: vertical form sections:
  1. Endpoint URL field (full-width).
  2. HTTP Method selector (dropdown, inline with URL or below it).
  3. Authentication section: dropdown to select auth type (None, Bearer token, Basic, HMAC secret), with contextual fields based on selection.
  4. Headers section (expandable): a list of key-value pair rows with add/remove controls.
  5. Payload/body section (expandable): a structured template input or raw JSON input.
  6. Test section: a "Send test request" button with inline result display (status code, response preview).
- Each section has a heading label.
- Expandable sections collapse by default to reduce visual complexity.
- Inline error messages appear below invalid fields.
- Test result area shows status (success/error) with appropriate color tokens.
- Spacing uses space tokens; max-width is constrained for readability.

---

## 4. Interaction Behavior

- States: idle, filling, testing (awaiting test request result), test-success, test-error, disabled.
- Controlled via structured `value` prop and `onChange` callback per section.
- Auth type selection shows/hides contextual fields (e.g., token input for Bearer, username+password for Basic).
- Header key-value rows: add row appends an empty row; remove row fires onChange without that row.
- Expandable sections open/close on heading activation; state may be uncontrolled internally.
- Keyboard behavior:
  - `Tab` navigates all inputs, selects, and buttons in document order.
  - Expandable section headings are keyboard-activatable via `Enter` or `Space`.
  - Add/remove header row buttons are keyboard-accessible.
  - "Send test request" button is keyboard-accessible.
- Screen reader behavior: each section heading announces its label and expanded/collapsed state. Field errors are linked via `aria-describedby`. Test result is announced via a live region.
- Motion: section expand/collapse uses a short animation; test result appearance uses a short fade; reduced motion suppresses both.

---

## 5. Accessibility Requirements

- Each input has an associated label linked via `for`/`id` or `aria-labelledby`.
- Expandable section headings have `role="button"` (or are `<button>` elements) with `aria-expanded` and `aria-controls` pointing to the section content.
- Header key-value row inputs have accessible labels (e.g., "Header name 1", "Header value 1").
- Remove row buttons have `aria-label="Remove header [n]"`.
- Required fields have `aria-required="true"`.
- Field errors use `aria-invalid="true"` on the input and `aria-describedby` linking to the error message.
- Test result area uses `aria-live="polite"` or `role="status"`.
- Secret/token fields use `type="password"` with a show/hide toggle.
- All elements meet WCAG AA contrast.
- Reduced motion: no expand/collapse or fade animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, section heading color, expandable section background, button background (test), button text, test result success background/text, test result error background/text, key-value row background, remove button color, divider color.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing.
- Dark mode: test result success/error states and section backgrounds remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: automation action configuration panels, webhook trigger configuration sheets, integration setup wizards.
- May contain: URL input, HTTP method dropdown, auth type selector with contextual inputs, headers key-value editor, payload input, test button and result display.
- Anti-patterns:
  - Do not perform actual HTTP requests inside this component; the test request is initiated via a callback prop.
  - Do not combine this form with unrelated action configuration fields.
  - Do not embed a full code editor for payload templates unless the design explicitly calls for it.

---

## 8. Performance Constraints

- Each header row should be memoized to prevent full-list re-renders on single-row edits.
- Validation of the URL field is debounced (minimum 300ms after the user stops typing).
- No virtualization required for typical header counts (under 20 rows).

---

## 9. Test Requirements

- Renders URL input and HTTP method selector with provided values.
- Fires `onChange` with the updated URL when the URL field is edited.
- HTTP method dropdown renders all supported methods and fires `onChange` on selection.
- Auth type dropdown shows the correct contextual fields for each auth type.
- Expandable sections open and close on heading activation (click, Enter, Space).
- Header rows: adding a row appends an empty row; removing fires `onChange` without the row.
- "Send test request" button fires the test callback; testing state shows a loading indicator.
- Test success state renders a success message with status code.
- Test error state renders an error message.
- URL format error renders below the URL field and links via `aria-describedby`.
- Keyboard: Tab order is correct; all interactive elements are reachable.
- Accessibility: no axe violations; section headings have `aria-expanded`; errors are linked; test result is announced.
- Reduced motion: no animation on expand/collapse or result appearance when `prefers-reduced-motion` is active.
