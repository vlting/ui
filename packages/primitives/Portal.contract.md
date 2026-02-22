# Component Contract — Portal

## 1. Public API

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | Yes | The content to render inside the portal. |

**Exported type:** `PortalProps = { children: React.ReactNode }`

**Note:** `Portal` is a thin wrapper around Tamagui's `Portal`. It does not accept Tamagui style props.

---

## 2. Behavioral Guarantees

- Renders `children` inside a Tamagui `Portal`, which mounts content outside the normal component tree (typically at the document root on web).
- Does not add any wrapper element around the children.
- Does not manage any internal state.
- Does not intercept or modify children.
- Relies entirely on Tamagui's `Portal` implementation for mount target and behavior.

---

## 3. Accessibility Guarantees

- Does not set any accessibility role or attributes.
- Portal content maintains its own accessibility tree position as determined by the Tamagui `Portal` implementation.
- Consumers are responsible for managing focus and screen reader announcements for portal content (e.g., modals, tooltips, overlays).

---

## 4. Styling Guarantees

- Does not apply any styles to the portal container or children.
- Styling is entirely the responsibility of the children rendered inside the portal.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `children` prop.
- Changing the underlying portal implementation (e.g., switching from Tamagui `Portal` to a different portal mechanism).
- Adding wrapper elements around children.
- Adding default styles or accessibility attributes to the portal container.
