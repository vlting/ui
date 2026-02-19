# Commit History

- 3efaf37 docs: Add 9 UX playbooks to docs/playbooks/
- bcaadba chore: Merge feat/ux-playbooks into v2/scaffold

---

# 3️⃣ vlt-ui — Create UX Playbooks
## Recommended Level
Playbooks should exist at:
```
/docs/playbooks/
```

Playbooks define patterns across modules, not features.

## Required Playbooks
Based on module coverage:
- forms-playbook.md
- data-display-playbook.md
- navigation-playbook.md
- dashboards-playbook.md
- social-interaction-playbook.md
- commerce-playbook.md
- media-playbook.md
- maps-playbook.md
- admin-b2b-playbook.md

## Rules
- Do not invent new components.
- Only reference existing vlt-ui primitives.
- If a component is missing, flag it.


# Required Playbook Structure

```markdown
# <Playbook Name>

## 1. Problem Space

What types of modules use this pattern.

---

## 2. UX Laws Applied

Which UX laws apply and why.

---

## 3. Standard Layout Pattern

- Page structure
- Header pattern
- Filters
- Primary CTA
- Secondary CTA

---

## 4. Component Mapping

Which vlt-ui components must be used.

---

## 5. Accessibility Rules

Flow-level accessibility requirements.

---

## 6. Anti-Patterns

Common mistakes to avoid.

---

## 7. Variants

When density increases.
Mobile behavior.
Edge cases.
```
