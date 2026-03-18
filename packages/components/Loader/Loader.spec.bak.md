# Component Spec — Loader (Deprecated)

> **DEPRECATED:** Use `Spinner` directly. This component will be removed in a future major version.
>
> Migration: `<Loader variant="min" />` → `<Spinner theme="min" />`

## Purpose

Thin compatibility wrapper that forwards to `Spinner`. Exists only for backwards compatibility.

## Migration Guide

| Loader prop | Spinner equivalent |
|---|---|
| `variant="primary"` | `theme="primary"` |
| `variant="min"` | `theme="min"` |
| `variant="max"` | `theme="max"` |
| `size="sm\|md\|lg"` | `size="sm\|md\|lg"` (same) |

## Test Requirements

- Verify deprecated wrapper still renders correctly.
- Verify no double `role="status"` in DOM.
- Verify variant→theme mapping works for all variants.
