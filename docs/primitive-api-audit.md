# Primitive API Audit: shadcn Equivalence

## Summary

All 7 primitives (Badge, Kbd, Label, Separator, Skeleton, Spinner, AspectRatio) provide feature parity with their shadcn equivalents. Two primitives (Kbd, Spinner) have no shadcn equivalent — they are novel additions. The remaining five match or exceed shadcn's API surface.

| Primitive | shadcn Equivalent | Parity Status |
|-----------|------------------|--------------|
| Badge | `Badge` | Enhanced (adds `tone`, `size`) |
| Kbd | None | Novel component |
| Label | `Label` | Enhanced (adds `size`, `required`) |
| Separator | `Separator` | Parity |
| Skeleton | `Skeleton` | Enhanced (adds `circle`, built-in animation) |
| Spinner | None | Novel component |
| AspectRatio | `AspectRatio` | Parity |

## Badge

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| `variant` prop | `default`, `secondary`, `destructive`, `outline` | `default`, `solid`, `secondary`, `destructive`, `outline`, `subtle` | Enhanced |
| `tone` prop | Not available | `neutral`, `primary`, `success`, `warning`, `danger` | Novel |
| `size` prop | Not available (use `className`) | `sm`, `md`, `lg` | Enhanced |
| `className` | Supported | Not available (use Tamagui style props) | Breaking |
| Cross-platform | Web only | Web + React Native | Enhanced |

**Implementation:** `styled(Text, {...})` with Tamagui v2 RC pattern. Extends shadcn with a semantic `tone` system for color variants and built-in size variants.

**Migration:**
```diff
- <Badge variant="destructive" className="text-sm">Error</Badge>
+ <Badge variant="destructive" size="sm">Error</Badge>
```

## Kbd

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| Component exists | No equivalent | `<Kbd>` renders `<kbd>` HTML element | Novel |
| `size` prop | N/A | `sm`, `md` | Novel |
| Semantic HTML | N/A | Uses `<kbd>` tag via `styledHtml('kbd')` | Novel |
| Styling | N/A | Monospace font, border-bottom depth effect | Novel |

**Implementation:** Function component wrapping `styledHtml('kbd', {...})`. No shadcn equivalent exists — this fills a gap for displaying keyboard shortcuts in documentation and UI.

**Usage:**
```tsx
<Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
```

## Label

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| `htmlFor` prop | Supported | Supported | Parity |
| `size` prop | Not available (use `className`) | `sm`, `md`, `lg` | Enhanced |
| `required` indicator | Not available | `required` prop renders red asterisk | Enhanced |
| `className` | Supported | Not available (use Tamagui style props) | Breaking |
| Cross-platform | Web only (Radix Label) | Web + React Native (`@tamagui/label`) | Enhanced |

**Implementation:** Function component wrapping `@tamagui/label`. Built-in `required` prop renders a styled red asterisk after the label text — no manual `<span className="text-red-500">*</span>` needed.

**Migration:**
```diff
- <Label htmlFor="email" className="text-sm">
-   Email <span className="text-red-500">*</span>
- </Label>
+ <Label htmlFor="email" size="sm" required>Email</Label>
```

## Separator

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| `orientation` prop | `horizontal`, `vertical` | `horizontal`, `vertical` | Parity |
| `decorative` prop | Supported | Supported (sets `accessibilityRole: 'none'`) | Parity |
| `asChild` prop | Supported (Radix) | Not available | Breaking |
| `className` | Supported | Not available (use Tamagui style props) | Breaking |
| `aria-orientation` | Manual | Automatic via variants | Enhanced |
| `role="separator"` | Radix-managed | Built-in | Parity |
| Cross-platform | Web only (Radix) | Web + React Native (`styled(View)`) | Enhanced |

**Implementation:** `styled(View, {...})` with `role='separator'`. Automatically sets `aria-orientation` based on the `orientation` variant. When `decorative` is true, sets `accessibilityRole: 'none'` for screen readers.

**Migration:**
```diff
- <Separator orientation="horizontal" className="my-4" />
+ <Separator orientation="horizontal" marginVertical="$4" />
```

## Skeleton

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| Sizing | Via `className` (`h-4 w-[250px]`) | Via `width`, `height` props | Breaking |
| Rounded | `className="rounded-full"` | `circle` variant prop | Enhanced |
| Animation | None (static `bg-muted`) | Built-in pulse (`animation: 'lazy'`, opacity 0.3→0.5) | Enhanced |
| `aria-hidden` | Manual | Automatic | Enhanced |
| `className` | Supported | Not available (use Tamagui style props) | Breaking |
| Cross-platform | Web only | Web + React Native | Enhanced |

**Implementation:** `styled(View, {...})` with built-in `lazy` animation. The `circle` boolean variant applies `borderRadius: '$full'`, replacing the need for `className="rounded-full"`.

**Migration:**
```diff
- <Skeleton className="h-12 w-12 rounded-full" />
- <Skeleton className="h-4 w-[250px]" />
+ <Skeleton circle width={48} height={48} />
+ <Skeleton width={250} height="$1" />
```

## Spinner

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| Component exists | No equivalent | 8-dot circular spinner | Novel |
| `size` prop | N/A | `sm` (20px), `md` (20px), `lg` (28px) | Novel |
| `color` prop | N/A | Accepts token or CSS color (default: `$color`) | Novel |
| Reduced motion | N/A | Respects `prefers-reduced-motion` via `useReducedMotion()` | Novel |
| Accessibility | N/A | `role="status"`, `aria-label="Loading"` | Novel |
| Cross-platform | N/A | Web + React Native | Novel |

**Implementation:** Function component rendering 8 dots positioned in a circle using CSS keyframe animation. Dots animate with staggered opacity for a rotating effect. When `prefers-reduced-motion` is active, animation is disabled.

**Usage:**
```tsx
<Spinner size="md" />
<Spinner size="lg" color="$blue10" />
```

## AspectRatio

| Feature | shadcn | @vlting/ui | Status |
|---------|--------|-----------|--------|
| `ratio` prop | Supported (number) | Supported (number, default: 1) | Parity |
| `children` | Supported | Supported | Parity |
| `asChild` prop | Supported (Radix) | Not available | Breaking |
| `className` | Supported | Not available (use `style` prop) | Breaking |
| Implementation | Radix AspectRatio | Pure CSS padding-bottom technique | Different |
| Cross-platform | Web only (Radix) | Web (CSS-based, no Tamagui) | Parity |

**Implementation:** Function component using the CSS padding-bottom technique: outer wrapper with `paddingBottom: (100 / ratio)%` and inner absolute-positioned content div. No Tamagui dependency — pure CSS for maximum compatibility.

**Migration:**
```diff
- <AspectRatio ratio={16 / 9} className="bg-muted">
-   <img src="..." className="object-cover" />
- </AspectRatio>
+ <AspectRatio ratio={16 / 9} style={{ backgroundColor: 'var(--color3)' }}>
+   <img src="..." style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
+ </AspectRatio>
```

## Conclusion

The @vlting/ui primitive layer provides full API coverage for all shadcn primitives. The primary breaking change across all primitives is the shift from `className`-based styling to Tamagui style props, which enables cross-platform support. Two novel primitives (Kbd, Spinner) fill gaps that shadcn does not address. Three primitives (Badge, Label, Skeleton) extend beyond shadcn with additional variants and built-in features.
