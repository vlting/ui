# Social Interaction Playbook

## 1. Problem Space

Social interaction patterns cover any flow where users create, react to, comment on, share, or moderate user-generated content. Primary modules: `social` (feed, posts, reactions), `community` (threads, voting, moderation), `collaboration` (comments, mentions, co-presence), `messaging` (chat, voice messages). Secondary modules that embed social patterns: `dating` (match cards, profiles), `marketing` (user-generated content).

---

## 2. UX Laws Applied

- **Doherty Threshold** — Social feeds must feel instantaneous. Optimistic updates (reactions, votes) must apply immediately in the UI before server confirmation. Use `ReactionBar` with optimistic state.
- **Peak-End Rule** — The emotional high of a positive interaction (a like, a match, a reply) must be rewarding. Completion micro-interactions matter. The pain of receiving a moderation action must be communicated clearly and compassionately.
- **Gestalt Proximity** — Reaction controls, author attribution, and share actions belong visually attached to the content they act on. Do not let them float ambiguously.
- **Jakob's Law** — Social interactions follow familiar conventions: heart/thumbs for reactions, speech bubble for comments, share icon for sharing. Follow these conventions — do not invent new iconography.
- **Fitts's Law** — Reaction buttons and reply targets must be large enough for mobile touch. The "React" target on `ReactionBar` must meet 44px minimum.
- **Miller's Law** — Limit visible reaction types to 5–7 in a `ReactionBar`. Do not surface all possible emoji reactions by default.

---

## 3. Standard Layout Pattern

### Feed Page Structure
```
<AppShell>
  <PageHeader title="Feed" />
  <Section>
    <PostComposer />                 {/* top of feed */}
    <InfiniteFeedList
      renderItem={(post) => (
        <PostCard>
          <PostMediaGallery />       {/* if post has media */}
          <ReactionBar />
          <CommentThread />          {/* collapsed by default */}
        </PostCard>
      )}
    />
  </Section>
</AppShell>
```

### Thread/Community Page Structure
```
<AppShell>
  <PageHeader title="Community" />
  <Section>
    <ThreadComposer />
    <ThreadList
      renderItem={(thread) => (
        <ThreadCard>
          <VoteControl />
          <NestedCommentTree />      {/* collapsed by default */}
        </ThreadCard>
      )}
    />
  </Section>
</AppShell>
```

### Header Pattern
- `PageHeader` with the feed/community name.
- No filters at the top level unless there are distinct content categories (then use `Tabs`).
- `TagFilterBar` (community module) for filtering by topic/tag.

### Filters
- `TagFilterBar` for tag/category-based filtering of community content.
- Avoid complex multi-criteria filters on social feeds — the feed algorithm handles relevance.

### Primary CTA
- `PostComposer` or `ThreadComposer` at the top of the feed — always visible, never hidden.
- Composing is the primary action on social surfaces.

### Secondary CTA
- `ShareModal` triggered from within `PostCard` or `ThreadCard`.
- `ReportContentModal` accessible from an overflow menu on each post/thread.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Infinite scrolling content feed | `InfiniteFeedList` |
| Individual post card | `PostCard` |
| Post creation composer | `PostComposer` |
| Media within a post | `PostMediaGallery` |
| Like / emoji reactions | `ReactionBar` |
| Share to external or internal | `ShareModal` |
| Comment thread on a post | `CommentThread` |
| Single comment item | `CommentItem` |
| Community thread card | `ThreadCard` |
| Thread creation composer | `ThreadComposer` |
| List of community threads | `ThreadList` |
| Upvote/downvote control | `VoteControl` |
| Nested replies tree | `NestedCommentTree` |
| Topic / tag filter bar | `TagFilterBar` |
| Report inappropriate content | `ReportContentModal` |
| Moderator tools panel | `ModerationPanel` |
| Moderator toolbar for thread | `ModeratorToolbar` |

**Flagged missing components:**
- No `NotificationFeed` component exists — apps consuming `social` will need to build this above `vlt-ui`.
- No `ProfileCard` for social context (outside `dating`/`auth`). Community/social module may need one added.

---

## 5. Accessibility Rules

- `InfiniteFeedList` must announce newly loaded content to screen readers using `aria-live="polite"` on the container.
- `PostComposer` and `ThreadComposer` must be reachable by keyboard and announce character limits via `aria-describedby`.
- `ReactionBar` reaction buttons must have `aria-label` describing the reaction and current count: "Heart reaction, 42 reactions. Press to react."
- `VoteControl` must communicate current vote state via `aria-pressed` on each button.
- `NestedCommentTree` must use proper list semantics (`<ul>`/`<li>`) and not rely on visual indentation alone to communicate nesting.
- `ReportContentModal` must trap focus when open and restore focus to the trigger on close.
- `ModerationPanel` actions (approve, remove, ban) must require confirmation to prevent accidental misuse.
- Images in `PostMediaGallery` must have meaningful `alt` text (or a note that user-generated content images require app-level alt text provision).

---

## 6. Anti-Patterns

- **Auto-play video in feed** — `PostMediaGallery` with video must not autoplay with sound. Autoplay muted is acceptable; always provide a play control.
- **Infinite scroll with no escape** — `InfiniteFeedList` must have a way for keyboard users to exit the list and reach subsequent page sections (skip link or focus management).
- **Optimistic update without rollback** — If a reaction or vote fails server-side, the UI must revert to the previous state and show a non-blocking error (toast/snackbar). Never silently keep an incorrect optimistic state.
- **Exposing moderation tools to non-moderators** — `ModerationPanel` and `ModeratorToolbar` must only render when the user has the moderator role. Role checks belong in the consuming app, but these components must accept a clear `isVisible` prop rather than rendering empty invisibly.
- **Composing in a modal** — For long-form content (`RichTextEditor`-based posts), do not embed the composer in a small modal. Use a full-page or full-screen `Sheet`.
- **Ambiguous reaction states** — If the user has already reacted, the `ReactionBar` must visually distinguish the active reaction from inactive ones. Never use only color to show this distinction.
- **Collapsing threads by default on community pages** — `NestedCommentTree` should show at least one level of replies expanded on thread detail pages. Collapsed-by-default is appropriate in feed summaries only.

---

## 7. Variants

### Density Increase
- Compact feed mode: `PostCard` without media preview, collapsed `CommentThread` (show count only).
- `ThreadList` in compact mode: title + vote count only, no preview text.
- `ReactionBar` compact: show only the top 2 reactions + count, expand on hover/tap.

### Mobile Behavior
- `PostComposer` opens as a full-screen `Sheet` on mobile for better keyboard handling.
- `InfiniteFeedList` uses pull-to-refresh on mobile (ensure the gesture doesn't conflict with the browser's native pull-to-refresh).
- `ShareModal` on mobile: use native share sheet via `navigator.share` when available; fall back to `ShareModal`.
- `ReactionBar` on mobile: long-press on the primary reaction button to reveal the full reaction picker.
- `NestedCommentTree`: limit nesting to 2 levels visible on mobile; "View more replies" to expand further.

### Edge Cases
- **Empty feed**: Show a `PostComposer` prominently with an encouraging prompt ("Be the first to post in this community").
- **Single post view**: `PostCard` on a detail page should show expanded `CommentThread` with all comments loaded (paginated if >20).
- **Content deleted while in view**: If a post is deleted mid-session, replace its card with a "This post has been removed" placeholder — do not silently remove it from the list (avoids layout jump confusion).
- **High-volume feeds**: Pause new content from injecting mid-scroll. Use a "X new posts" notification at the top that the user clicks to refresh to the top.
