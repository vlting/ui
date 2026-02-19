# AI Constitution

This document governs all AI-assisted changes in this repository.

`vlt-ui` is a cross-platform design system and component library built on Tamagui.
It must remain stable, predictable, accessible, and framework-agnostic.

This repository contains **no business logic**.

---

# 1. Core Purpose

`vlt-ui` exists to provide:

- A consistent cross-platform design system
- Accessible, composable UI components
- Strong prop contracts
- Predictable layout primitives
- Theme and token infrastructure

It must:

- Never contain business rules
- Never contain feature logic
- Never contain direct data access
- Never depend on Supabase
- Never depend on Jotai
- Never contain module-specific behavior

---

# 2. Non-Negotiable Rules

## 2.1 No Business Logic

Components must not:

- Fetch data
- Call APIs
- Import feature modules
- Enforce RBAC
- Contain domain logic
- Assume app context

All components must be presentation-only.

---

## 2.2 Strict Separation of Concerns

`vlt-ui` may include:

- Primitives
- Composed UI components
- Layout systems
- Theming
- Tokens
- Accessibility utilities

It must not include:

- Feature-specific flows
- Supabase calls
- Auth logic
- Multi-tenancy logic
- App routing logic

---

## 2.3 Composability Over Configuration

Prefer:

- Small, composable components
- Clear prop contracts
- Predictable composition patterns

Avoid:

- Overly configurable mega-components
- Excessive boolean prop combinations
- Implicit magic behavior

---

## 2.4 No Over-Engineering

- Do not create abstraction layers unless duplication is clear.
- Do not introduce internal plugin systems.
- Do not invent patterns beyond common industry practice.
- Prefer conventional component architecture.

Familiar > clever.

---

## 2.5 Accessibility Is Mandatory

All components must:

- Be keyboard accessible
- Use semantic HTML where possible
- Provide ARIA roles only when needed
- Preserve focus management
- Expose necessary accessibility props
- Maintain color contrast
- Support reduced motion

Accessibility must be testable.

---

## 2.6 Theming Discipline

- All styling must use design tokens.
- No hardcoded colors.
- No hardcoded spacing values outside tokens.
- No arbitrary font sizes.
- Must support light/dark themes.
- Must support extension without breaking contracts.

---

## 2.7 Stability Over Novelty

Components must:

- Follow widely understood UX conventions.
- Avoid novelty for its own sake.
- Avoid “design experiments.”
- Match familiar patterns (e.g., standard modal behavior, standard form layouts).

---

# 3. Component Design Standards

## 3.1 Prop Contracts

Every component must:

- Have strictly typed props.
- Avoid `any`.
- Support controlled and uncontrolled variants where appropriate.
- Avoid prop explosion.
- Document required vs optional props clearly.

If a component becomes overly complex:
- Split it.

---

## 3.2 State in Components

Allowed:
- Local UI state (e.g., open/closed state).
- Controlled state via props.

Not allowed:
- Cross-component shared state.
- App-level global state.

---

## 3.3 Layout System Rules

- AppShell must be layout-only.
- Sidebar must not assume auth state.
- Navigation components must be structure-only.
- No hardcoded routes.

---

## 3.4 Performance

- Avoid unnecessary re-renders.
- Memoize only when justified.
- Use virtualization for large lists.
- Avoid premature optimization.

---

# 4. Testing Standards

All components must:

- Use React Testing Library.
- Test behavior, not implementation.
- Test accessibility basics.
- Test keyboard interaction.
- Test controlled/uncontrolled modes.

Avoid:

- Snapshot-only testing.
- Testing internal DOM structure unnecessarily.

---

# 5. Documentation Requirements

Every component must include:

- Description
- Intended use cases
- Prop table
- Accessibility notes
- Example usage

Documentation must reflect real-world usage patterns.

---

# 6. Versioning & Stability

- Breaking changes require explicit version bumps.
- Do not change prop contracts silently.
- Deprecate before removing.

---

# 7. AI Operating Rules for vlt-ui

If:

- A request includes business logic
- A request includes Supabase integration
- A request includes RBAC or domain logic

You must respond:

> This belongs in `vlt-app`, not `vlt-ui`.

If unsure:
- Ask.

Never guess.
