# Component Contract -- useFocusTrap

## 1. Public API

### Generic Type Parameter

- `T extends HTMLElement` -- The type of the container element the ref will be attached to.

### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `true` | Whether the focus trap is active. When `false`, no keyboard listener is attached and no auto-focus occurs. |

### Return Value

| Type | Description |
|------|-------------|
| `React.RefObject<T>` | A ref to attach to the container element that should trap focus. Created via `useRef<T>(null)`. |

---

## 2. Behavioral Guarantees

- **Focus cycling on Tab**: When active, pressing `Tab` on the last focusable element moves focus to the first focusable element. Pressing `Shift+Tab` on the first focusable element moves focus to the last focusable element.
- **Focusable element detection**: Uses the selector: `a[href]`, `button:not([disabled])`, `input:not([disabled])`, `select:not([disabled])`, `textarea:not([disabled])`, `[tabindex]:not([tabindex="-1"])`. Only elements matching this selector within the ref container are considered focusable.
- **Auto-focus on activation**: When `active` becomes `true` and the ref is attached, the first focusable element inside the container is automatically focused.
- **No-op when inactive**: When `active` is `false`, no `keydown` listener is registered and no auto-focus occurs.
- **No-op when no focusable elements**: If the container has zero focusable elements, the `Tab`/`Shift+Tab` handler returns early without preventing default behavior.
- **Document-level listener**: The `keydown` listener is attached to `document`, not to the container element. This means it intercepts Tab presses globally when active.
- **Cleanup on deactivation**: The `keydown` listener is removed when `active` becomes `false` or the component unmounts.
- **Dynamic focusable elements**: Focusable elements are queried on each `Tab` keypress, so dynamically added/removed elements are accounted for.
- **React hook rules apply**: Must be called at the top level of a React function component or custom hook. Cannot be called conditionally.

---

## 3. Accessibility Guarantees

- **Tab key cycling**: Prevents focus from escaping the container when pressing `Tab` or `Shift+Tab`, which is essential for modal dialogs, dropdown menus, and other overlay patterns per WAI-ARIA dialog guidelines.
- **Auto-focus**: Automatically focuses the first focusable element when the trap activates, ensuring keyboard users have an immediate focus target.
- **Disabled element exclusion**: Elements with the `disabled` attribute and elements with `tabindex="-1"` are excluded from the focus cycle.
- **preventDefault on boundary**: `e.preventDefault()` is called only when focus would escape the container (on first/last element boundary), allowing normal Tab behavior within the container.

---

## 4. Styling Guarantees

N/A -- this is a behavioral hook with no styling concerns.

---

## 5. Breaking Change Criteria

- Changing the return type from a ref object.
- Changing the focusable element selector (would alter which elements participate in the trap).
- Removing auto-focus behavior on activation.
- Changing the default value of `active` from `true`.
- Changing from document-level to container-level event listening (would alter interception scope).
- Removing the generic type parameter constraint (`T extends HTMLElement`).
