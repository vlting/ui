# Commit History

- `ee3cf66` feat(examples): polish Crushd app — navigation overhaul and UX improvements

---

# Task 007 — Crushd Example App: Polish, Navigation Overhaul, and Real UX

## Overview

The `examples/dating/` (Crushd) app needs significant UX and structural polish to actually feel like a real dating app. The pages exist but may not be rendering properly or may feel empty/disconnected. This task addresses 7 specific issues plus a general directive to make the app feel real.

**Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` at repo root before making any changes.**

---

## Issue 1 — Remove Command Palette

This is a dating app, not a documentation site or productivity tool. Remove all Command Palette functionality.

**Changes:**
- `AppShellLayout.tsx`: Remove `CommandPalette` import, the `CMD_ITEMS` array, the `CMD_PATHS` map, the `cmdOpen` state, the `Cmd+K` keyboard listener (`useEffect`), the `<CommandPalette>` JSX, and the "Search Cmd+K" trigger button from `TopNav.Trailing`
- Do NOT remove the `CommandPalette` component from the design system library itself — only from this example app

---

## Issue 2 — Populate Pages with Real Mock Data + Interactive UX

The app should feel alive. Every page must render with meaningful content.

**Verify and fix:**
1. **Run the app** (`cd examples/dating && npm run dev` or equivalent) and verify each page actually renders. Fix any import errors, missing dependencies, or Tamagui v2 RC type issues that prevent rendering.
2. **Ensure all pages use mock data from `src/data/mock.ts`**. If pages are rendering empty, identify why (missing data bindings, broken imports, component API mismatches) and fix.
3. **Interactive features that MUST work:**
   - **Pod page**: User can see all 8 pod members with their photos, names, ages, and match statuses. The countdown showing days remaining in the pod MUST be visible and prominent.
   - **Ice-breaker page**: User can read the daily prompt, see other members' responses, and type + submit their own response (local state is fine — it should append to the visible list).
   - **Quiz page**: User can vote on quiz options and see results after voting.
   - **Pod member profile**: User can send a match request (button toggles state). If the member already sent one to the user, the button should say "Match back!" or similar.
   - **Messages page**: Shows existing DM conversations with last message preview, unread indicators, and timestamps.
   - **DM thread**: User can read message history and type + send new messages (appended locally).
   - **Connections page**: Shows mutual matches with last message and "matched X days ago" context.
   - **Week review page**: User can select/deselect pod members to match with, with a confirmation/celebration flow.
   - **Profile page**: User can edit their bio, prompts, and see their photo grid.
   - **Preferences page** (accessed from Profile — see Issue 5): User can adjust age range, distance, interests, deal-breakers.
   - **Settings page** (accessed from Profile — see Issue 5): Theme toggle, notifications, privacy, account management.

---

## Issue 3 — Remove Home Page

There should be no separate Home page. The Pod page IS the home/landing page.

**Changes:**
- `router.tsx`: Change the `/` route to render `PodPage` instead of `HomePage`. Remove the `/pod` route (it's now `/`).
- Update all `/pod` references in the codebase to `/`:
  - `AppShellLayout.tsx`: Nav items, bottom tabs
  - Any page that links/navigates to `/pod` (check all pages for `navigate('/pod')` or `to="/pod"` links)
  - Update sub-routes: `/pod/icebreaker` → `/icebreaker`, `/pod/quiz` → `/quiz`, `/pod/member/:id` → `/member/:id`
- Delete `HomePage.tsx` (or repurpose it — but prefer deletion since PodPage replaces it)
- The default landing route `/` should show the pod

---

## Issue 4 — Rename "My Pod" to "Pod"

Everywhere the label "My Pod" appears, change it to just "Pod".

**Check and update:**
- `AppShellLayout.tsx`: `NAV_ITEMS` label
- Any page headers or breadcrumbs that say "My Pod"
- The bottom tab label

---

## Issue 5 — Navigation Overhaul: Single-Layer Nav

The current app has too many navigation layers (TopNav + Sidebar on desktop, TopNav + Drawer + BottomTabs on mobile). Simplify to match how real dating apps work.

### Mobile layout:
- **Bottom tabs ONLY** — no TopNav header, no hamburger menu, no Drawer
- Bottom tab items: **Pod** (users icon), **Messages** (message-circle icon), **Connections** (heart icon), **Profile** (user icon) — that's 4 tabs
- No Preferences or Settings tabs — these are accessed from the Profile page (add navigation links/buttons in ProfilePage to go to `/preferences` and `/settings`)
- The top of the screen should just be the page content (no header bar). Individual pages can have their own inline titles if needed.

### Desktop layout:
- **TopNav header ONLY** — no Sidebar
- The TopNav should contain the Crushd brand mark (heart + "Crushd" text) on the left
- Nav links in the center or right area: **Pod**, **Messages**, **Connections**, **Profile**
- Active nav link should use brand purple (see Issue 6)
- User avatar in trailing position opens the user sheet (profile/preferences/settings/sign out)
- No Sidebar at all — remove the `<AppShell.Sidebar>` section and the `SidebarNav` component entirely

### General:
- Remove the `Drawer` component entirely (was for mobile hamburger menu — no longer needed)
- Remove the `SidebarNav` sub-component
- Remove all Sidebar-related imports
- The theme toggle (light/dark) should move to the Settings page (it's already there) — remove it from the nav

---

## Issue 6 — Brand Purple Selected State for Nav

Nav buttons/tabs should clearly show which page is active using the brand purple color (`#7c3aed` / `$purple7`).

**Mobile (BottomTabs):**
- Active tab icon and label should be purple (`$purple7` or `#7c3aed`)
- Inactive tabs should be a muted neutral color
- If the `BottomTabs` component from `@vlting/ui/layout` supports an active color prop, use it. If not, style the individual items directly.

**Desktop (TopNav links):**
- Active nav link text should be purple and bold (weight 600)
- Inactive nav links should be standard text color
- Consider a subtle bottom border or background on the active link for additional clarity

---

## Issue 7 — Make It Feel Real (Creative Directive)

The agent should think holistically about user flows and make creative decisions to make Crushd feel like a real, polished dating app. Some specific ideas (the agent should go beyond these):

### User flows to consider:
- **First open**: If the user hasn't onboarded, redirect to `/onboarding`. After onboarding, land on the Pod page.
- **Pod page as home**: When the user opens the app, they immediately see their pod — who's in it, what's happening today (today's ice-breaker and quiz with response counts), and how many days are left. This should feel exciting and social.
- **Natural discovery**: From the pod, users naturally tap into a member's profile, send a match request, or open today's activity. The flow should feel intuitive without instructions.
- **Unread indicators**: Messages and connections tabs should show unread badges/dots if there are unread conversations.
- **Match celebration**: When a match becomes mutual (either through match-back or week review), there should be a visual celebration moment (confetti, animation, or at minimum an exciting confirmation screen).
- **Empty states**: If a user has no connections yet, show an encouraging empty state ("Your connections will appear here after mutual matches").

### Visual polish ideas:
- Pod member cards should feel warm and inviting — rounded photos, clear names, subtle match status indicators
- The ice-breaker prompt should feel like a conversation starter — large, prominent, maybe with a fun icon
- Message bubbles should use purple for the user's messages, neutral for others (already may be the case — verify)
- The pod countdown should create gentle urgency without anxiety — e.g., "2 days left in this pod" with a friendly timer icon, not a scary red countdown

### Mock data quality:
- Verify the existing mock data in `src/data/mock.ts` creates a believable scenario. The 20 profiles should have diverse, realistic names, ages, occupations, and bios. The conversations should feel like real dating app messages.
- The "logged-in user" is Jamie Rivera — make sure their profile data is consistent across pages.
- Pod "Starlight Pod" (Week 12) should feel like an active, mid-week pod with varied match statuses.

---

## Important Implementation Notes

- **Do NOT modify `src/dating/` component library files** — only modify files within `examples/dating/`
- **Follow existing patterns**: Use Tamagui primitives (`Text`, `XStack`, `YStack`, `styled`), the `_jsx-compat.ts` workaround pattern, and existing component APIs
- **Tamagui v2 RC bugs**: Remember to use `// @ts-expect-error Tamagui v2 RC` where needed, cast icon components as `IconFC`, and avoid `GetProps<>` intersection patterns (see project memory for full list)
- **Test by running the app**: After making changes, run `cd examples/dating && npx vite` (or the project's dev command) and verify all pages render correctly in a browser
- **Keep it simple**: This is a demo/example app. Don't over-engineer state management. Local React state + mock data is perfectly fine. No need for a backend, API calls, or complex state libraries.
- **Responsive**: All pages should work on both mobile and desktop breakpoints. Use `useMedia()` from Tamagui for responsive logic.
