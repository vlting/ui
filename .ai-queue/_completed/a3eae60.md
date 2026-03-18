<!-- LAT: 2026-03-10T04:50:00Z -->
<!-- PID: 29574 -->
<!-- auto-queue -->
<!-- target-branch: test/component-quality/test-hardening -->
# Task: Harden tests — interactive form components

## Goal
Upgrade test files for interactive form components with keyboard navigation, ARIA state assertions, and focus management tests.

## Instructions

1. For each component, read the existing test file and its spec.md if it exists.

2. Upgrade these test files (touch ONLY these files):
- packages/components/Button/Button.test.tsx
- packages/components/Input/Input.test.tsx
- packages/components/Checkbox/Checkbox.test.tsx
- packages/components/Switch/Switch.test.tsx
- packages/components/Select/Select.test.tsx
- packages/components/RadioGroup/RadioGroup.test.tsx
- packages/components/Slider/Slider.test.tsx
- packages/components/Textarea/Textarea.test.tsx

3. Ensure these test categories exist:
   - Renders correctly
   - Keyboard navigation (Tab, Space/Enter, Escape)
   - ARIA states (aria-checked, aria-selected, aria-disabled, etc.)
   - Focus management
   - Disabled state

4. Use @testing-library/react patterns.

5. Do NOT modify component source — test files only.
