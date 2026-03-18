<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
<!-- depends-on: 001,002,003,006 -->
# Task: Integration — Jest Config + Playground Sections

## Goal
Remove test ignore patterns, add playground sections, wire into App.tsx.

## Files
- `jest.config.js`
- `apps/playground/src/sections/HeadingSection.tsx` (create)
- `apps/playground/src/sections/SeparatorSection.tsx` (create)
- `apps/playground/src/sections/ButtonGroupSection.tsx` (create)
- `apps/playground/src/sections/index.ts` (update)
- `apps/playground/src/App.tsx` (update SECTIONS array + imports)

## Part 1: Jest Config
Remove these entries from `testPathIgnorePatterns` in `jest.config.js`:
- `Typography` (line ~55)
- `ButtonGroup` (line ~14)
- `Direction` (line ~26)

**Do NOT remove entries for other components.** Only these three.

Note: Separator may not be in testPathIgnorePatterns — check first.

## Part 2: Playground Sections

Follow the established pattern from existing sections (AlertSection, CardSection, ItemSection, etc.):
- Import from `@vlting/ui` (not relative paths)
- Use DemoCard, SectionHeading, and shared utilities from `./shared`

### HeadingSection.tsx
Show all heading levels:
```tsx
<Heading.H1>Heading 1</Heading.H1>
<Heading.H2>Heading 2</Heading.H2>
// ... H3-H6
```

### SeparatorSection.tsx
Show horizontal and vertical separators, decorative vs semantic.

### ButtonGroupSection.tsx
Show horizontal and vertical button groups:
```tsx
<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
<ButtonGroup orientation="vertical">
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>
```

## Part 3: Wire into App.tsx

Read `apps/playground/src/App.tsx` first. Find the SECTIONS array and SECTION_COMPONENTS map. Add:
- `'Heading'` to SECTIONS array
- `'Separator'` to SECTIONS array
- `'ButtonGroup'` to SECTIONS array
- Import and map each section component

## Part 4: Update sections/index.ts
Export the new sections from the barrel.

## Acceptance Criteria
- `npm test` runs Typography/ButtonGroup/Direction tests (no longer ignored)
- Playground shows Heading section with all H1-H6 levels
- Playground shows Separator section with horizontal/vertical
- Playground shows ButtonGroup section with orientation variants
- Dev server starts without errors
- No TypeScript errors
