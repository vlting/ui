import { styled } from '@vlting/stl-react'
import { Badge, Button } from '@vlting/ui'

// ─── Phone Shell ────────────────────────────────────────────────────────────

const Showcase = styled('div', {
  display: 'flex',
  gap: '$40',
  justifyContent: 'center',
  alignItems: 'center',
  py: '$48',
  px: '$24',
  flexWrap: 'wrap',
}, { name: 'DemoShowcase' })

const Phone = styled('div', {
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
}, { name: 'DemoPhone' })

const Notch = styled('div', {
  position: 'absolute',
  top: '$0',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '120px',
  height: '28px',
  borderRadius: '0 0 16px 16px',
  bg: '$neutralAlpha4',
  zIndex: '10',
}, { name: 'PhoneNotch' })

const StatusBar = styled('div', {
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
}, { name: 'PhoneStatusBar' })

const PhoneBody = styled('div', {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
}, { name: 'PhoneBody' })

const HomeIndicator = styled('div', {
  width: '120px',
  height: '4px',
  bg: '$neutralAlpha5',
  borderRadius: '9999px',
  mx: 'auto',
  mt: 'auto',
  mb: '$8',
  flexShrink: '0',
}, { name: 'HomeIndicator' })

// ─── Shared Inner Pieces ────────────────────────────────────────────────────

const ScreenHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '$16',
  py: '$10',
  flexShrink: '0',
}, { name: 'ScreenHeader' })

const ScreenTitle = styled('h3', {
  fontSize: '$h4',
  fontWeight: '$700',
  fontFamily: '$heading',
  color: '$color12',
  m: '$0',
}, { name: 'ScreenTitle' })

const NavIcon = styled('div', {
  width: '20px',
  height: '20px',
  borderRadius: '$4',
  bg: '$neutralAlpha4',
}, {
  name: 'NavIcon',
  variants: {
    active: {
      true: { bg: '$primary9' },
    },
  },
})

const AvatarCircle = styled('div', {
  borderRadius: '$full',
  flexShrink: '0',
}, {
  name: 'AvatarCircle',
  variants: {
    size: {
      sm: { width: '32px', height: '32px' },
      md: { width: '44px', height: '44px' },
      lg: { width: '64px', height: '64px' },
      xl: { width: '100px', height: '100px' },
    },
  },
})

// ─── Screen 1: Profile / Swipe ──────────────────────────────────────────────

const ProfileHero = styled('div', {
  flex: '1',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  backgroundImage: 'var(--stl-gradient-primary, linear-gradient(135deg, var(--stl-color-primary5, hsl(320,85%,50%)), var(--stl-color-secondary6, hsl(345,80%,40%))))',
  backgroundSize: 'cover',
}, { name: 'ProfileHero' })

const ProfileOverlay = styled('div', {
  linearGradient: 'to top, hsla(0,0%,0%,0.85) 0%, hsla(0,0%,0%,0.3) 50%, transparent 100%',
  p: '$16',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
}, { name: 'ProfileOverlay' })

const ProfileName = styled('h2', {
  fontSize: '$h3',
  fontWeight: '$700',
  fontFamily: '$heading',
  color: 'white',
  m: '$0',
}, { name: 'ProfileName' })

const ProfileBio = styled('p', {
  fontSize: '$small',
  color: 'hsla(0,0%,100%,0.7)',
  m: '$0',
  lineHeight: '$spaced',
}, { name: 'ProfileBio' })

const ProfileActions = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$12',
  py: '$12',
  px: '$16',
  flexShrink: '0',
}, { name: 'ProfileActions' })

const ActionCircle = styled('button', {
  width: '48px',
  height: '48px',
  borderRadius: '$full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
}, {
  name: 'ActionCircle',
  variants: {
    kind: {
      muted: { bg: '$neutralAlpha4', color: '$neutralText3' },
      primary: { bg: '$primary9', color: 'white' },
      accent: { bg: '$secondary9', color: 'white' },
    },
  },
})

const FloatingBadges = styled('div', {
  position: 'absolute',
  top: '$16',
  left: '$0',
  right: '$0',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$8',
  px: '$12',
}, { name: 'FloatingBadges' })

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
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
}, { name: 'ChatList' })

const ChatItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  px: '$16',
  py: '$10',
  ':interact': { bg: '$neutralAlpha3' },
  cursor: 'pointer',
}, { name: 'ChatItem' })

const ChatMeta = styled('div', {
  flex: '1',
  minWidth: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
}, { name: 'ChatMeta' })

const ChatName = styled('span', {
  fontSize: '$p',
  fontWeight: '$600',
  color: '$color12',
}, { name: 'ChatName' })

const ChatPreview = styled('span', {
  fontSize: '$small',
  color: '$neutralText4',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}, { name: 'ChatPreview' })

const ChatTime = styled('span', {
  fontSize: '11px',
  color: '$neutralText4',
  flexShrink: '0',
}, { name: 'ChatTime' })

const UnreadDot = styled('div', {
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
}, { name: 'UnreadDot' })

const TabRow = styled('div', {
  display: 'flex',
  gap: '$8',
  px: '$16',
  pb: '$10',
  flexShrink: '0',
}, { name: 'TabRow' })

const InlineRow = styled('div', {
  display: 'flex', gap: '$8', alignItems: 'center',
}, { name: 'InlineRow' })

const ChatEndCol = styled('div', {
  display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '$4',
}, { name: 'ChatEndCol' })

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
        <Button size="sm" theme="primary" variant="solid">All</Button>
        <Button size="sm" theme="neutral" variant="ghost">Unread</Button>
        <Button size="sm" theme="neutral" variant="ghost">Pinned</Button>
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
  flex: '1',
  display: 'grid',
  gap: '$12',
  px: '$16',
  py: '$8',
  overflowY: 'auto',
}, { name: 'DiscoverGrid' })

const GlassCard = styled('div', {
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
}, { name: 'GlassCard' })

const CardRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
}, { name: 'CardRow' })

const CardName = styled('span', {
  fontSize: '$p',
  fontWeight: '$600',
  color: '$color12',
}, { name: 'CardName' })

const CardDetail = styled('span', {
  fontSize: '$small',
  color: '$neutralText4',
}, { name: 'CardDetail' })

const TagRow = styled('div', {
  display: 'flex',
  gap: '$6',
  flexWrap: 'wrap',
}, { name: 'TagRow' })

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
  fontSize: '$h3',
  fontWeight: '$700',
  fontFamily: '$heading',
  color: '$color12',
  m: '$0',
  mb: '$8',
  textAlign: 'center',
}, { name: 'DemoSectionHeading' })

const SectionSub = styled('p', {
  fontSize: '$p',
  color: '$neutralText4',
  m: '$0',
  mb: '$32',
  textAlign: 'center',
}, { name: 'DemoSectionSub' })

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
