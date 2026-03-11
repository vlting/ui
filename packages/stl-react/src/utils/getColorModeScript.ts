/**
 * Returns a blocking `<script>` tag for SSR `<head>` injection to prevent FOUC.
 *
 * Reads stored preference from localStorage, falls back to system preference,
 * then falls back to `defaultMode`. Sets `data-color-mode` on `<html>` before
 * first paint.
 */
export function getColorModeScript(defaultMode: 'light' | 'dark' = 'light'): string {
  const script = `(function(){try{var m=localStorage.getItem('stl-color-mode');if(m==='light'||m==='dark'){document.documentElement.setAttribute('data-color-mode',m);return}}catch(e){}try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-color-mode','dark');return}}catch(e){}document.documentElement.setAttribute('data-color-mode','${defaultMode}')})()`
  return `<script>${script}</script>`
}
