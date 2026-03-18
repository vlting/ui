<!-- auto-queue -->
# Commit History
- `976b3fc` docs(a11y): replace styledHtml/inline-style examples with asChild pattern
- `c33e9bf` merge commit into fix/quality-audit

# Update AI Constitution to document the `asChild` pattern for interactive elements

## Problem

The AI Constitution §2.8 "No layout wrappers inside interactive elements" rule currently shows two "Good" approaches:
1. Inline `style` with CSS custom variables for third-party components (React Router `<Link>`)
2. `styledHtml('button', {...})` for native elements

Both work but have downsides — inline styles bypass Tamagui's token system, and `styledHtml` requires `as any` casts due to Tamagui v2 RC type bugs.

The preferred approach is the **`asChild` pattern**: use a Tamagui layout component (e.g., `XStack`) as the outer wrapper with `asChild`, which tells Tamagui to clone the child (the interactive element) and apply resolved styles directly to it. This preserves Tamagui token resolution, avoids extra DOM nodes, and is already the standard pattern used throughout the component library (Dialog.Trigger, Tooltip.Trigger, etc.).

## Scope

- `AI_CONSTITUTION.md` (§2.8 DOM Optimization Rules)

## Instructions

1. Read `AI_CONSTITUTION.md` in full
2. In **§2.8 → DOM Optimization Rules**, find the existing "No layout wrappers inside interactive elements" bullet and its examples
3. **Replace** the two "Good" examples with a single preferred approach using `asChild`, plus a fallback note. The updated rule should:

   - Keep the existing "Bad" example as-is
   - Replace both "Good" examples with a single **"Good (`asChild` pattern)"** example:

   **Good (`asChild` pattern — preferred):**
   ```tsx
   <XStack asChild padding="$2" gap="$1">
     <Link to="/page" style={{ textDecoration: 'none', color: 'inherit' }}>
       <Text>Label</Text>
     </Link>
   </XStack>
   ```
   Renders: `<a style="padding…"><span>Label</span></a>` — Tamagui clones the `<Link>`, merges resolved styles onto it, and discards the wrapper. Tokens resolve normally.

   Also show the `<button>` variant:
   ```tsx
   <XStack asChild padding="$2" gap="$1">
     <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
       <Text>Label</Text>
     </button>
   </XStack>
   ```

   - Add a brief note after the examples explaining *when* to use `asChild`:
     > Use `asChild` whenever a Tamagui layout component wraps a single interactive child (`<a>`, `<button>`, `<Link>`, or any element that must be the outermost DOM node for semantic/accessibility reasons). The Tamagui component provides token-resolved styles; `asChild` ensures they're applied to the child instead of creating a wrapper `<div>`.

   - Optionally keep a brief fallback note: "For cases where `asChild` isn't supported, use `styledHtml()` for native elements or inline `style` with CSS custom properties for third-party components."

4. Do NOT change the introductory sentence of the rule ("No layout wrappers inside interactive elements: `<a>` and `<button>` elements must own their own spacing…")
5. Do NOT restructure or rewrite other existing content in §2.8

## Verification

- The "Bad" example is unchanged
- The "Good" examples now show the `asChild` pattern as the primary approach
- The rule still applies to both native elements and third-party components
- Existing content outside this bullet point is unchanged

## Task Progress
<!-- lat: 2026-02-26T07:41:36Z -->
<!-- agent-pid: 52795 -->
<!-- worktree: .worktrees/002 -->
<!-- branch: q/002 -->

### Checklist
- [x] Read task instructions
- [ ] **ACTIVE** → Read AI_CONSTITUTION.md, update §2.8 with asChild pattern
- [ ] Verify no existing content was modified unintentionally
- [ ] Commit and merge
