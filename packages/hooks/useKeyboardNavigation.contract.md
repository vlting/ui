# Component Contract -- useKeyboardNavigation

## 1. Public API

### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `number` | Yes | -- | Total number of navigable items. Used to calculate boundary wrapping. |
| `activeIndex` | `number` | Yes | -- | The currently active (focused) item index. |
| `setActiveIndex` | `(index: number) => void` | Yes | -- | Callback to update the active index. Called with the computed next index on arrow key presses. |
| `options` | `UseKeyboardNavigationOptions` | No | `{}` | Configuration object (see below). |

### Options Object (`UseKeyboardNavigationOptions`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical' \| 'both'` | No | `'vertical'` | Determines which arrow keys navigate. `'vertical'` uses `ArrowUp`/`ArrowDown`. `'horizontal'` uses `ArrowLeft`/`ArrowRight`. `'both'` uses all four arrow keys. |
| `loop` | `boolean` | No | `true` | Whether navigation wraps around at boundaries. When `true`, navigating past the last item wraps to the first, and vice versa. When `false`, navigation clamps at boundaries. |
| `onSelect` | `(index: number) => void` | No | `undefined` | Callback invoked when `Enter` or `Space` is pressed. Receives the current `activeIndex`. |

### Return Value

| Type | Description |
|------|-------------|
| `(e: React.KeyboardEvent) => void` | A keyDown event handler to attach to the container element. |

---

## 2. Behavioral Guarantees

- **Arrow key mapping by orientation**:
  - `'vertical'`: `ArrowUp` moves backward, `ArrowDown` moves forward.
  - `'horizontal'`: `ArrowLeft` moves backward, `ArrowRight` moves forward.
  - `'both'`: `ArrowUp` and `ArrowLeft` move backward, `ArrowDown` and `ArrowRight` move forward.
- **Loop behavior**: When `loop` is `true` (default), moving backward from index 0 wraps to `items - 1`, and moving forward from `items - 1` wraps to 0. When `loop` is `false`, the index clamps at 0 and `items - 1` respectively.
- **Home/End support**: `Home` sets the index to 0. `End` sets the index to `items - 1`.
- **Select support**: `Enter` and `Space` invoke `onSelect(activeIndex)` if provided, and return early without calling `setActiveIndex`.
- **preventDefault**: All handled keys (`Arrow*`, `Home`, `End`, `Enter`, `Space`) call `e.preventDefault()`. Unhandled keys do not.
- **No-op on unhandled keys**: Keys not in the handled set fall through to the `default` case and return without side effects.
- **Handler stability**: The returned handler is memoized via `useCallback` with dependencies `[activeIndex, items, loop, onSelect, orientation, setActiveIndex]`.
- **React hook rules apply**: Must be called at the top level of a React function component or custom hook. Cannot be called conditionally.

---

## 3. Accessibility Guarantees

- **WAI-ARIA keyboard navigation pattern**: Implements the standard arrow key navigation pattern for composite widgets (listboxes, menus, tabs, toolbars) per WAI-ARIA Authoring Practices.
- **Orientation-aware**: Correctly maps arrow keys based on the widget's orientation, matching ARIA expectations for horizontal vs. vertical widgets.
- **Home/End keys**: Provides standard Home/End key support for jumping to first/last items.
- **Enter/Space selection**: Supports the standard activation keys for interactive items.
- **preventDefault on handled keys**: Prevents default browser scrolling behavior when arrow keys are used for navigation within the widget.

---

## 4. Styling Guarantees

N/A -- this is a behavioral hook with no styling concerns.

---

## 5. Breaking Change Criteria

- Changing the function signature (parameter order, required vs. optional).
- Changing the return type from a single keyDown handler function.
- Changing the default `orientation` from `'vertical'`.
- Changing the default `loop` from `true`.
- Changing which keys are handled (currently: arrow keys per orientation, `Home`, `End`, `Enter`, `Space`).
- Changing the `onSelect` invocation behavior (currently called with `activeIndex` on `Enter`/`Space`).
- Removing `preventDefault` calls on handled keys.
