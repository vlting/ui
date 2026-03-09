# Dark Mode — FOUC Prevention

## Problem

STL delivers dark mode CSS variables via a `[data-color-mode="dark"]` CSS rule in the static stylesheet. The attribute is set by `StlProvider` at runtime (React). Until React hydrates, the page renders in light mode — causing a flash of light content if the user prefers dark mode.

## Solution

Add a **blocking script** in `<head>` that reads the stored color mode preference and sets the attribute before any CSS is painted.

### Vanilla / Vite

```html
<head>
  <!-- ... other head elements ... -->
  <script>
    (function() {
      var m = localStorage.getItem('stl-color-mode');
      if (m) document.documentElement.setAttribute('data-color-mode', m);
    })()
  </script>
</head>
```

### Next.js

In `app/layout.tsx` or `pages/_document.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=localStorage.getItem('stl-color-mode');if(m)document.documentElement.setAttribute('data-color-mode',m)})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### With `next-themes`

If using `next-themes` alongside STL, configure it to use `data-color-mode` instead of `class`:

```tsx
<ThemeProvider attribute="data-color-mode" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

This aligns `next-themes` with STL's attribute, eliminating the need for a separate blocking script.

## Persisting Color Mode

Store the user's preference when they toggle:

```ts
// When color mode changes
localStorage.setItem('stl-color-mode', colorMode)
```

`StlProvider` does not persist color mode automatically — this is consumer responsibility, allowing flexibility in storage strategy (localStorage, cookies, server-side).

## System Preference Detection

To respect `prefers-color-scheme` without JavaScript:

```html
<script>
  (function() {
    var stored = localStorage.getItem('stl-color-mode');
    if (stored) {
      document.documentElement.setAttribute('data-color-mode', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-color-mode', 'dark');
    }
  })()
</script>
```

## Technical Details

- **Attribute:** `data-color-mode` (exported as `COLOR_MODE_ATTR` from `@vlting/stl`)
- **Values:** `"light"` or `"dark"`
- **CSS rule:** `[data-color-mode="dark"] { ... }` in `stl.css` (build-time, via vanilla-extract)
- **Specificity:** `(0,1,0)` — same as `:root`, resolved by source order (dark rule appears after `:root`)
