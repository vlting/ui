import { styled } from '@vlting/stl-react'
import { Badge, Button } from '@vlting/ui'

// ─── Phone Shell ────────────────────────────────────────────────────────────

const Showcase = styled('div', {
  stl: {
    display: 'flex',
    gap: '$40',
    justifyContent: 'center',
    alignItems: 'center',
    py: '$48',
    px: '$24',
    flexWrap: 'wrap',
  },
  styleName: 'DemoShowcase',
})

const Phone = styled('div', {
  stl: {
    width: '375px',
    height: '812px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: '0',
    borderRadius: '48px',
    borderWidth: '8px',
    borderStyle: 'solid',
    borderColor: '$neutralAlpha4',
    bg: '$background1',
    boxShadow: '$2xl',
  },
  styleName: 'DemoPhone',
})

const Notch = styled('div', {
  stl: {
    position: 'absolute',
    top: '$0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '28px',
    borderRadius: '0 0 16px 16px',
    bg: '$neutralAlpha4',
    zIndex: '10',
  },
  styleName: 'PhoneNotch',
})

const StatusBar = styled('div', {
  stl: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: '$20',
    pt: '32px',
    pb: '$4',
    fontSize: '11px',
    color: '$neutralText2',
    fontWeight: '$600',
    flexShrink: '0',
  },
  styleName: 'PhoneStatusBar',
})

const PhoneBody = styled('div', {
  stl: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  styleName: 'PhoneBody',
})

const HomeIndicator = styled('div', {
  stl: {
    width: '120px',
    height: '4px',
    bg: '$neutralAlpha5',
    borderRadius: '9999px',
    mx: 'auto',
    mt: 'auto',
    mb: '$8',
    flexShrink: '0',
  },
  styleName: 'HomeIndicator',
})

// ─── Shared Inner Pieces ────────────────────────────────────────────────────

const ScreenHeader = styled('div', {
  stl: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: '$16',
    py: '$10',
    flexShrink: '0',
  },
  styleName: 'ScreenHeader',
})

const ScreenTitle = styled('h3', {
  stl: {
    fontSize: '$h4',
    fontWeight: '$700',
    fontFamily: '$heading',
    color: '$color12',
    m: '$0',
  },
  styleName: 'ScreenTitle',
})

const NavIcon = styled('div', {
  stl: {
    width: '20px',
    height: '20px',
    borderRadius: '$4',
    bg: '$neutralAlpha4',
  },
  variants: {
    active: {
      true: { bg: '$primary9' },
    },
  },
  styleName: 'NavIcon',
})

const AvatarCircle = styled('div', {
  stl: {
    borderRadius: '$full',
    flexShrink: '0',
  },
  variants: {
    size: {
      sm: { width: '32px', height: '32px' },
      md: { width: '44px', height: '44px' },
      lg: { width: '64px', height: '64px' },
      xl: { width: '100px', height: '100px' },
    },
  },
  styleName: 'AvatarCircle',
})

// ─── Screen 1: Profile / Swipe ──────────────────────────────────────────────

const ProfileHero = styled('div', {
  stl: {
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    backgroundImage: 'var(--stl-gradient-primary, linear-gradient(135deg, var(--stl-color-primary5, hsl(320,85%,50%)), var(--stl-color-secondary6, hsl(345,80%,40%))))',
    backgroundSize: 'cover',
  },
  styleName: 'ProfileHero',
})

const ProfileOverlay = styled('div', {
  stl: {
    linearGradient: 'to top, hsla(0,0%,0%,0.85) 0%, hsla(0,0%,0%,0.3) 50%, transparent 100%',
    p: '$16',
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
  },
  styleName: 'ProfileOverlay',
})

const ProfileName = styled('h2', {
  stl: {
    fontSize: '$h3',
    fontWeight: '$700',
    fontFamily: '$heading',
    color: 'white',
    m: '$0',
  },
  styleName: 'ProfileName',
})

const ProfileBio = styled('p', {
  stl: {
    fontSize: '$small',
    color: 'hsla(0,0%,100%,0.7)',
    m: '$0',
    lineHeight: '$spaced',
  },
  styleName: 'ProfileBio',
})

const ProfileActions = styled('div', {
  stl: {
    display: 'flex',
    justifyContent: 'center',
    gap: '$12',
    py: '$12',
    px: '$16',
    flexShrink: '0',
  },
  styleName: 'ProfileActions',
})

const ActionCircle = styled('button', {
  stl: {
    width: '48px',
    height: '48px',
    borderRadius: '$full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
  },
  variants: {
    kind: {
      muted: { bg: '$neutralAlpha4', color: '$neutralText3' },
      primary: { bg: '$primary9', color: 'white' },
      accent: { bg: '$secondary9', color: 'white' },
    },
  },
  styleName: 'ActionCircle',
})

const FloatingBadges = styled('div', {
  stl: {
    position: 'absolute',
    top: '$16',
    left: '$0',
    right: '$0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '$8',
    px: '$12',
  },
  styleName: 'FloatingBadges',
})

function ProfileScreen() {
  return (
    <>
      <ProfileHero>
        <FloatingBadges>
          <Badge size="sm" theme="primary" variant="solid">Nearby</Badge>
          <Badge size="sm" theme="secondary" variant="solid">Active</Badge>
        </FloatingBadges>
        <ProfileOverlay>
          <ProfileName>Maya, 24</ProfileName>
          <ProfileBio>Coffee lover, part-time traveler exploring stories...</ProfileBio>
        </ProfileOverlay>
      </ProfileHero>
      <ProfileActions>
        <ActionCircle kind="muted" aria-label="Skip">
          <XIcon />
        </ActionCircle>
        <ActionCircle kind="primary" aria-label="Like">
          <HeartIcon />
        </ActionCircle>
        <ActionCircle kind="accent" aria-label="Message">
          <ChatIcon />
        </ActionCircle>
      </ProfileActions>
    </>
  )
}

// ─── Screen 2: Chat List ────────────────────────────────────────────────────

const ChatList = styled('div', {
  stl: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  styleName: 'ChatList',
})

const ChatItem = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    gap: '$12',
    px: '$16',
    py: '$10',
    ':interact': { bg: '$neutralAlpha3' },
    cursor: 'pointer',
  },
  styleName: 'ChatItem',
})

const ChatMeta = styled('div', {
  stl: {
    flex: '1',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
  styleName: 'ChatMeta',
})

const ChatName = styled('span', {
  stl: {
    fontSize: '$p',
    fontWeight: '$600',
    color: '$color12',
  },
  styleName: 'ChatName',
})

const ChatPreview = styled('span', {
  stl: {
    fontSize: '$small',
    color: '$neutralText4',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  styleName: 'ChatPreview',
})

const ChatTime = styled('span', {
  stl: {
    fontSize: '11px',
    color: '$neutralText4',
    flexShrink: '0',
  },
  styleName: 'ChatTime',
})

const UnreadDot = styled('div', {
  stl: {
    width: '18px',
    height: '18px',
    borderRadius: '$full',
    bg: '$primary9',
    color: 'white',
    fontSize: '10px',
    fontWeight: '$700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  },
  styleName: 'UnreadDot',
})

const TabRow = styled('div', {
  stl: {
    display: 'flex',
    gap: '$8',
    px: '$16',
    pb: '$10',
    flexShrink: '0',
  },
  styleName: 'TabRow',
})

const InlineRow = styled('div', {
  stl: { display: 'flex', gap: '$8', alignItems: 'center' },
  styleName: 'InlineRow',
})

const ChatEndCol = styled('div', {
  stl: { display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '$4' },
  styleName: 'ChatEndCol',
})

const CHATS: readonly { name: string; msg: string; time: string; unread?: number; typing?: boolean }[] = [
  { name: 'Alex Carter', msg: "Hey, how's today?", time: '12:20 AM', unread: 2 },
  { name: 'Liam Brooks', msg: 'Coffee or travel?', time: '11:40 AM', unread: 1 },
  { name: 'Sofia Lane', msg: 'Typing...', time: '1:40 PM', unread: 3, typing: true },
  { name: 'Ethan Cole', msg: "What's your vibe?", time: '8:30 AM' },
  { name: 'Aria Stone', msg: 'Just saying hi', time: '12:28 PM' },
]

function ChatScreen() {
  return (
    <>
      <ScreenHeader>
        <ScreenTitle>Messages</ScreenTitle>
        <InlineRow>
          <NavIcon />
          <NavIcon />
        </InlineRow>
      </ScreenHeader>

      <TabRow>
        <Button size="xs" theme="primary" variant="solid">All</Button>
        <Button size="xs" theme="neutral" variant="ghost">Unread</Button>
        <Button size="xs" theme="neutral" variant="ghost">Pinned</Button>
      </TabRow>

      <ChatList>
        {CHATS.map((c) => (
          <ChatItem key={c.name}>
            <AvatarCircle
              size="md"
              stl={{ bg: '$primary5' }}
            />
            <ChatMeta>
              <ChatName>{c.name}</ChatName>
              <ChatPreview stl={c.typing ? { color: '$primary9' } : undefined}>{c.msg}</ChatPreview>
            </ChatMeta>
            <ChatEndCol>
              <ChatTime>{c.time}</ChatTime>
              {c.unread && <UnreadDot>{c.unread}</UnreadDot>}
            </ChatEndCol>
          </ChatItem>
        ))}
      </ChatList>
    </>
  )
}

// ─── Screen 3: Discover / Glass ─────────────────────────────────────────────

const DiscoverGrid = styled('div', {
  stl: {
    flex: '1',
    display: 'grid',
    gap: '$12',
    px: '$16',
    py: '$8',
    overflowY: 'auto',
  },
  styleName: 'DiscoverGrid',
})

const GlassCard = styled('div', {
  stl: {
    bg: 'var(--stl-glass-tint, hsla(0,0%,100%,0.06))',
    backdropFilter: 'blur(var(--stl-glass-blur, 8px))',
    borderRadius: '$16',
    p: '$12',
    borderWidth: '$widthMin',
    borderStyle: '$styleDefault',
    borderColor: '$neutralAlpha4',
    backgroundImage: 'var(--stl-glass-gradient, none)',
    display: 'flex',
    flexDirection: 'column',
    gap: '$8',
  },
  styleName: 'GlassCard',
})

const CardRow = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    gap: '$10',
  },
  styleName: 'CardRow',
})

const CardName = styled('span', {
  stl: {
    fontSize: '$p',
    fontWeight: '$600',
    color: '$color12',
  },
  styleName: 'CardName',
})

const CardDetail = styled('span', {
  stl: {
    fontSize: '$small',
    color: '$neutralText4',
  },
  styleName: 'CardDetail',
})

const TagRow = styled('div', {
  stl: {
    display: 'flex',
    gap: '$6',
    flexWrap: 'wrap',
  },
  styleName: 'TagRow',
})

const PROFILES = [
  { name: 'Roxane, 21', location: 'Seattle, WA', tags: ['3.4 km', 'Student'] },
  { name: 'Jordan, 26', location: 'Portland, OR', tags: ['1.2 km', 'Designer'] },
  { name: 'Kai, 23', location: 'Vancouver, BC', tags: ['5.1 km', 'Musician'] },
] as const

function DiscoverScreen() {
  return (
    <>
      <ScreenHeader>
        <ScreenTitle>Discover</ScreenTitle>
        <NavIcon />
      </ScreenHeader>

      <DiscoverGrid>
        {PROFILES.map((p) => (
          <GlassCard key={p.name}>
            <CardRow>
              <AvatarCircle size="md" stl={{ bg: '$secondary5' }} />
              <div>
                <CardName>{p.name}</CardName>
                <CardDetail>{p.location}</CardDetail>
              </div>
            </CardRow>
            <TagRow>
              {p.tags.map((t) => (
                <Badge key={t} size="sm" theme="neutral" variant="outline">{t}</Badge>
              ))}
            </TagRow>
          </GlassCard>
        ))}
      </DiscoverGrid>
    </>
  )
}

// ─── Mini Icons ─────────────────────────────────────────────────────────────

const HeartIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
  </svg>
)

const XIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.586L16.95 5.636L18.364 7.05L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.05L7.05 5.636L12 10.586Z" />
  </svg>
)

const ChatIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 8.99374C2 5.68349 4.67 3 8 3H16C19.33 3 22 5.68 22 8.99V14.99C22 18.3 19.33 20.98 16 20.98H8L3.29 22.98C2.68 23.23 2 22.78 2 22.12V8.99374Z" />
  </svg>
)

const SignalIcon = () => (
  <svg width={14} height={10} viewBox="0 0 14 10" fill="currentColor" opacity={0.5}>
    <rect x="0" y="7" width="2" height="3" rx="0.5" />
    <rect x="4" y="4" width="2" height="6" rx="0.5" />
    <rect x="8" y="2" width="2" height="8" rx="0.5" />
    <rect x="12" y="0" width="2" height="10" rx="0.5" />
  </svg>
)

const BatteryIcon = () => (
  <svg width={18} height={10} viewBox="0 0 18 10" fill="currentColor" opacity={0.5}>
    <rect x="0" y="0" width="15" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
    <rect x="2" y="2" width="10" height="6" rx="1" />
    <rect x="16" y="3" width="2" height="4" rx="0.5" />
  </svg>
)

// ─── Export ─────────────────────────────────────────────────────────────────

const SectionHeading = styled('h2', {
  stl: {
    fontSize: '$h3',
    fontWeight: '$700',
    fontFamily: '$heading',
    color: '$color12',
    m: '$0',
    mb: '$8',
    textAlign: 'center',
  },
  styleName: 'DemoSectionHeading',
})

const SectionSub = styled('p', {
  stl: {
    fontSize: '$p',
    color: '$neutralText4',
    m: '$0',
    mb: '$32',
    textAlign: 'center',
  },
  styleName: 'DemoSectionSub',
})

export function DemoSection() {
  return (
    <div>
      <SectionHeading>Mobile App Demo</SectionHeading>
      <SectionSub>Theme-aware mockups — switch themes to see gradient and glass effects</SectionSub>

      <Showcase>
        <div>
          <Phone>
            <Notch aria-hidden="true" />
            <StatusBar>
              <span>9:41</span>
              <InlineRow>
                <SignalIcon />
                <BatteryIcon />
              </InlineRow>
            </StatusBar>
            <PhoneBody>
              <ProfileScreen />
            </PhoneBody>
            <HomeIndicator />
          </Phone>
        </div>

        <div>
          <Phone>
            <Notch aria-hidden="true" />
            <StatusBar>
              <span>9:41</span>
              <InlineRow>
                <SignalIcon />
                <BatteryIcon />
              </InlineRow>
            </StatusBar>
            <PhoneBody>
              <ChatScreen />
            </PhoneBody>
            <HomeIndicator />
          </Phone>
        </div>

        <div>
          <Phone>
            <Notch aria-hidden="true" />
            <StatusBar>
              <span>9:41</span>
              <InlineRow>
                <SignalIcon />
                <BatteryIcon />
              </InlineRow>
            </StatusBar>
            <PhoneBody>
              <DiscoverScreen />
            </PhoneBody>
            <HomeIndicator />
          </Phone>
        </div>
      </Showcase>
    </div>
  )
}
