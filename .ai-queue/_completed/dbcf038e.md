<!-- LAT: 2026-03-18T19:06:00Z -->
<!-- PID: $PPID -->
<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/content-components -->

# Task: Audit 8 implemented component specs

## Goal
For each implemented component with a playground page, read the `.tsx` source and diff against the `.spec.md`. Fix factual deviations only. Do NOT restructure into a new template — keep current format.

## Components
- Alert
- Avatar
- Badge
- Button
- Card
- Empty
- Item
- Progress

## Checklist
- [ ] Alert: read `Alert.tsx` + `Alert.spec.md`, fix deviations
- [ ] Avatar: read `Avatar.tsx` + `Avatar.spec.md`, fix deviations
- [ ] Badge: read `Badge.tsx` + `Badge.spec.md`, fix deviations
- [ ] Button: read `Button.tsx` + `Button.spec.md`, fix deviations
- [ ] Card: read `Card.tsx` + `Card.spec.md`, fix deviations
- [ ] Empty: read `Empty.tsx` + `Empty.spec.md`, fix deviations
- [ ] Item: read `Item.tsx` + `Item.spec.md`, fix deviations
- [ ] Progress: read `Progress.tsx` + `Progress.spec.md`, fix deviations
- [ ] Commit with conventional message

## Files
- `packages/components/Alert/Alert.spec.md`
- `packages/components/Avatar/Avatar.spec.md`
- `packages/components/Badge/Badge.spec.md`
- `packages/components/Button/Button.spec.md`
- `packages/components/Card/Card.spec.md`
- `packages/components/Empty/Empty.spec.md`
- `packages/components/Item/Item.spec.md`
- `packages/components/Progress/Progress.spec.md`

## Rules
- Fix props, variants, tokens, anatomy that don't match code
- Do NOT add new sections or restructure
- Do NOT hallucinate token values — verify in source
- If spec says something code doesn't do, remove it
- If code does something spec doesn't mention, add it
