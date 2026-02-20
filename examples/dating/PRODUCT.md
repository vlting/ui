# Crushd — Product Requirements Document

> *"Your next crush is closer than you think."*

---

## 1. Overview

**Crushd** is a dating app that rejects the infinite-swipe paradigm. Instead of swiping through endless profiles, each week you are placed in a small group — a **"pod"** — of 8 people. For that week, the pod is your temporary micro-community.

**Core thesis:** Meaningful connections form through shared experiences, not snap judgments on photos. By interacting in a small group setting with daily activities, you see how people think, joke, and express themselves — before deciding if you want to connect one-on-one.

---

## 2. How It Works

### 2.1 Pod Formation (Weekly)

Every week (e.g., Monday morning), the matching algorithm places each user into a new pod of 8 members.

**Pod composition (heterosexual example):**
- 4 members who match your preferred gender
- 4 members of your own gender (including you)

The model generalizes to other gender/orientation configurations.

**Algorithm inputs:**
- Age range preferences
- Shared interests (weighted, not hard filters)
- Geographic proximity
- Deal-breakers (hard filters)
- Mutual filter compatibility

**Constraints:**
- You cannot be in a pod with someone you have previously been podded with (unless both opt in to the "Reunion" stretch feature)

### 2.2 Daily Activities

Each day, the pod receives two activities:

**Ice-breaker prompt**
An open-ended question or discussion topic. All pod members can respond, and everyone sees all responses.

Examples:
- "What's a hill you'll die on?"
- "Describe your ideal lazy Sunday."
- "What's the most underrated movie of all time?"

**Quiz**
A fun, light multiple-choice question. After everyone votes, results are revealed to the pod.

Examples:
- "Which of these travel destinations would you pick?"
- "Hot take: pineapple on pizza?"
- "What's the best decade for music?"

Activities are designed to reveal personality, values, humor, and compatibility in a low-pressure group setting.

### 2.3 Interaction

**Activity responses**
Respond to ice-breakers and quizzes. See everyone's responses. React to or reply to others' responses in a threaded conversation.

**Direct messages (DMs)**
At any time during the week, you can open a private conversation with any pod member. DMs are visible only to the two participants.

**Match requests**
At any time, you can send a match request to a pod member. This is **double-blind** — the other person is not notified unless they also send one. If both match, they become a "connection."

### 2.4 End-of-Week Review (e.g., Sunday Evening)

At the end of the pod's week:

1. You are shown all pod members
2. You are prompted: "Would you like to match with anyone from this week?"
3. You can select zero or more people
4. If a match is mutual (both selected each other, or one already sent a match request during the week), you become connections
5. The pod dissolves and a new one forms the following week

### 2.5 Connections

Mutual matches become **connections** — persistent relationships that survive beyond the weekly pod cycle.

- Connections have their own messaging thread (separate from pod DMs, which expire with the pod)
- You can view connection profiles, continue chatting, or unmatch at any time
- Connections are the "success state" of the app

---

## 3. User Profile

| Field | Details |
|-------|---------|
| Display name | Required |
| Age | Required, derived from date of birth |
| Photos | Up to 6 images |
| Bio | Short free-text description |
| Interests | Tag-based (e.g., "hiking", "cooking", "live music", "board games") |
| Prompts | 2–3 profile prompts with answers (e.g., "I'm convinced that...", "A perfect first date is...") |
| Location | City-level, not precise coordinates |

---

## 4. Preferences & Filters

Preferences drive the pod placement algorithm.

| Preference | Type | Behavior |
|------------|------|----------|
| Age range | Min/max slider | Hard filter |
| Location radius | Distance slider | Hard filter |
| Interests | Tag selection | Weighted (soft filter) |
| Deal-breakers | Multi-select | Hard filter (e.g., smoking, must have/not have kids) |
| Gender preferences | Selection | Determines pod composition |

---

## 5. Key Screens

| Route | Screen | Description | Primary Components |
|-------|--------|-------------|--------------------|
| `/` | Home | Current pod overview | `PodView`, `PodMemberCard`, `PodCountdown` |
| `/pod` | Pod detail | Full pod view with member grid and activities | `PodView`, `PodMemberCard`, `IceBreakerCard`, `QuizCard` |
| `/pod/icebreaker` | Ice-breaker | Today's prompt and responses | `IceBreakerCard`, `ActivityThread` |
| `/pod/quiz` | Quiz | Today's quiz and results | `QuizCard`, `ActivityThread` |
| `/pod/member/:id` | Pod member profile | View a pod member's profile | `ProfilePreviewCard`, `MatchRequestButton`, `MatchRequestBadge` |
| `/messages` | Messages | List of DM conversations | `ConversationList` |
| `/messages/:id` | DM thread | Conversation with a pod member | `DirectMessageThread` |
| `/connections` | Connections | Persistent matched connections | `ConnectionList`, `ConnectionCard` |
| `/connections/:id` | Connection profile | A matched connection's profile | `ProfilePreviewCard`, `MatchCard` |
| `/week-review` | Week review | End-of-week matching prompt | `WeekEndReview`, `PodMemberCard`, `MatchRequestButton` |
| `/profile` | Profile editor | Edit your own profile | `DatingProfileEditor`, `PhotoGalleryUploader`, `InterestSelector` |
| `/preferences` | Preferences | Set matching preferences and filters | `PreferenceEditor`, `AgeRangeSelector`, `LocationRadiusSelector`, `DealBreakerSelector` |
| `/onboarding` | Onboarding | First-time setup flow | `DatingProfileEditor`, `PhotoGalleryUploader`, `InterestSelector`, `PreferenceEditor` |

---

## 6. Component Inventory

### 6.1 Kept from Existing Scaffolds (8)

| Component | Purpose |
|-----------|---------|
| `MatchCard` | Displays a matched connection |
| `MatchList` | Lists persistent matches/connections |
| `ProfilePreviewCard` | View a pod member's or connection's profile |
| `DatingProfileEditor` | Profile creation and editing |
| `InterestSelector` | Interest tag picker (drives pod placement) |
| `PhotoGalleryUploader` | Profile photo management |
| `LocationRadiusSelector` | Geographic proximity preference |
| `BlockUserModal` | Block a user (safety feature) |

### 6.2 Removed from Existing Scaffolds (4)

| Component | Reason |
|-----------|--------|
| `SwipeDeck` | No swiping in this concept |
| `SwipeCard` | No swiping in this concept |
| `BoostBadge` | Tinder-specific pay-to-win feature |
| `SuperLikeIndicator` | Tinder-specific feature |

### 6.3 New Components (18)

| Component | Pattern | Description |
|-----------|---------|-------------|
| `PodView` | Compound (`.Header`, `.MemberGrid`, `.Activity`, `.Countdown`) | Main weekly pod container — the central hub |
| `PodMemberCard` | Compound (`.Photo`, `.Name`, `.Bio`, `.MatchButton`) | Individual member tile within a pod |
| `PodCountdown` | Simple + behavioral TODO | Timer showing when current pod expires |
| `IceBreakerCard` | Compound (`.Prompt`, `.ResponseList`, `.Input`) | Daily ice-breaker topic and response area |
| `QuizCard` | Compound (`.Question`, `.Options`, `.Results`) | Daily quiz display and voting |
| `ActivityThread` | Compound (`.Header`, `.Messages`, `.Input`) | Threaded conversation for activity interactions |
| `MatchRequestButton` | Simple + behavioral TODO | Send/cancel a match request to a pod member |
| `MatchRequestBadge` | Simple | Visual indicator of match status (none / pending / mutual) |
| `WeekEndReview` | Compound (`.MemberList`, `.MatchPrompt`, `.Summary`) | End-of-week UI for matching with pod members |
| `DirectMessageThread` | Compound (`.Header`, `.Messages`, `.Input`) | DM conversation with a pod member |
| `ConversationList` | Simple | List of active DM conversations |
| `ConnectionCard` | Compound (`.Photo`, `.Name`, `.LastMessage`) | Card for a persistent matched connection |
| `ConnectionList` | Simple | List of persistent post-match connections |
| `PreferenceEditor` | Compound (`.AgeRange`, `.Interests`, `.Location`, `.DealBreakers`) | Comprehensive preference editor for pod placement |
| `AgeRangeSelector` | Simple + behavioral TODO | Dual-handle range slider for age preferences |
| `DealBreakerSelector` | Simple + behavioral TODO | Multi-select for must-have / must-not-have traits |
| `PodIntro` | Compound (`.Welcome`, `.Members`, `.FirstActivity`) | Introduction screen for new weekly pod |
| `SafetyReportModal` | Simple + behavioral TODO | Report a user for inappropriate behavior |

**Total: 26 components** (8 kept + 18 new)

---

## 7. Safety & Moderation

- **`BlockUserModal`** — Block a user (removes them from your view; they cannot DM you)
- **`SafetyReportModal`** — Report inappropriate behavior with categorized reasons
- All DMs and activity responses are subject to content moderation
- Pod members can be removed by moderation mid-week if violations occur
- Blocked users are excluded from future pod placement

---

## 8. Stretch Goals

The following features are noted for future consideration but are **out of scope** for the initial build:

| Feature | Description |
|---------|-------------|
| Reunion pods | Opt in to be re-podded with someone from a past week |
| Pod vibes | Anonymous end-of-week survey on how the pod felt as a group |
| Icebreaker voting | Pod members vote on which ice-breaker prompt they want |
| Voice/video prompts | Respond to ice-breakers with short audio or video clips |
| Wingman mode | A friend can view your pod and nudge you toward matches |

---

## 9. Design Principles

Crushd's design should feel **warm, approachable, and low-pressure**. The UI should encourage genuine interaction over gamified engagement.

- **No infinite scroll** — content is bounded by the pod (8 people, 2 daily activities)
- **No urgency mechanics** — no "boost" or "super like" pay-to-win features
- **Group-first, then one-on-one** — the pod is the primary context, not individual profiles
- **Double-blind matching** — reduces pressure; you only learn about mutual interest
- **Weekly cadence** — natural rhythm that prevents burnout and doom-scrolling
