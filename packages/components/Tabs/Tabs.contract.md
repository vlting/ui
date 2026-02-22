# Component Contract -- Tabs

## 1. Public API

Compound component exported as a plain object `{ Root, List, Trigger, Content }`. Each sub-component wraps its corresponding headless primitive from `packages/headless/Tabs` with Tamagui styled visuals.

### Tabs.Root

Delegates entirely to `HeadlessTabs.Root`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Child components (List, Trigger, Content). |
| value | `string` | No | -- | Controlled selected tab value. |
| defaultValue | `string` | No | -- | Uncontrolled initial selected tab value. |
| onValueChange | `(value: string) => void` | No | -- | Callback when the selected tab changes. |
| orientation | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Tab navigation orientation. Affects keyboard navigation direction in the headless layer. |

Supports both controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) patterns via `useControllableState` in the headless layer.

### Tabs.List

Styled wrapper around `HeadlessTabs.List`. Wraps children in a `StyledList` (`styled(XStack)`).

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Tab trigger elements. |
| size | `'sm' \| 'md' \| 'lg'` | No | -- | Size variant on `StyledList` (currently empty style objects -- reserved for future sizing). |
| className | `string` | No | -- | Passed through to the headless List `div`. |

Base styles on `StyledList`: `borderBottomWidth: 1`, `borderBottomColor: '$borderColor'`, `gap: '$0'`.

### Tabs.Trigger

Styled wrapper around `HeadlessTabs.Trigger`.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Trigger label content. |
| value | `string` | Yes | -- | Unique identifier for this tab. Must match a corresponding `Tabs.Content` value. |
| disabled | `boolean` | No | -- | When `true`, the tab trigger cannot be selected. |
| size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls padding on the trigger. `sm` = `$2`/`$1`, `md` = `$3`/`$2`, `lg` = `$4`/`$3`. |

Note: The `StyledTrigger` and `StyledTriggerText` styled components are defined but the current `Trigger` function only renders via `HeadlessTabs.Trigger`, passing `children` through directly. The styled trigger frame has an `active` variant (`true` sets `borderBottomColor: '$color10'`) and hover style (`backgroundColor: '$backgroundHover'`).

### Tabs.Content

Styled wrapper around `HeadlessTabs.Content`. Wraps children in a `StyledContent` (`styled(View)`).

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Panel content for this tab. |
| value | `string` | Yes | -- | Must match the corresponding `Tabs.Trigger` value. |
| className | `string` | No | -- | Passed through to the headless Content `div`. |

Base styles on `StyledContent`: `paddingVertical: '$3'`.

Only the content panel matching the active tab value is rendered; others return `null` (handled in headless layer).

---

## 2. Behavioral Guarantees

- All state management and interaction logic is delegated to the headless layer (`packages/headless/Tabs`).
- The styled layer adds only visual presentation (Tamagui styled components) and never manages selection state itself.
- `Tabs.Root` supports both controlled and uncontrolled selection via `useControllableState`.
- Only one `Tabs.Content` panel is rendered at a time -- the one matching the active `value`. All others return `null`.
- Tab triggers register themselves with the headless context on mount, enabling keyboard navigation.
- Clicking a non-disabled trigger selects that tab.
- The component will never manage routing, lazy loading, or panel caching.

---

## 3. Accessibility Guarantees

- The headless List renders with `role="tablist"` and `aria-orientation` matching the `orientation` prop.
- Each headless Trigger renders as a `<button>` with `role="tab"`, `aria-selected`, `aria-controls` (linking to its panel), and `tabIndex` (0 for selected, -1 for unselected).
- Each headless Content renders with `role="tabpanel"`, `aria-labelledby` (linking to its trigger), and `tabIndex={0}`.
- Keyboard navigation is handled in the headless List via `useKeyboardNavigation`:
  - Arrow keys move between tabs (direction based on `orientation`).
  - Navigation loops when reaching the end.
  - Enter/Space selects the focused tab (via `onSelect`).
- Disabled triggers cannot be selected via click.
- Tab/panel IDs follow the pattern `tab-{value}` / `tabpanel-{value}`.

---

## 4. Styling Guarantees

- All spacing and color values use Tamagui design tokens.
- List has a bottom border using `$borderColor` token.
- Active trigger is indicated by a 2px bottom border using `$color10` token (via `StyledTrigger` `active` variant).
- Active trigger text uses `$color10`; inactive uses `$colorSubtitle` (via `StyledTriggerText` `active` variant).
- Typography uses `$body` font family and `$3` font weight tokens.
- Theme tokens resolve from the active Tamagui theme.
- Hover style on triggers uses `$backgroundHover` token.
- Content padding uses `$3` token.

---

## 5. Breaking Change Criteria

- Removing any sub-component (`Root`, `List`, `Trigger`, `Content`).
- Removing the `value`/`defaultValue`/`onValueChange` controlled/uncontrolled API on Root.
- Removing the `orientation` prop from Root.
- Removing the `value` prop from Trigger or Content.
- Removing the `disabled` prop from Trigger.
- Removing `role="tablist"`, `role="tab"`, or `role="tabpanel"` from the headless layer.
- Removing keyboard navigation support (arrow keys, looping).
- Removing `aria-selected`, `aria-controls`, or `aria-labelledby` attributes.
- Changing from single-panel rendering to all-panels-rendered (would change mount/unmount behavior).
- Changing the headless layer delegation.
