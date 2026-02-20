import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Calendar as _Calendar,
  Heart as _Heart,
  HelpCircle as _HelpCircle,
  BarChart3 as _BarChart3,
  MessageCircle as _MessageCircle,
  Send as _Send,
  Users as _Users,
  CheckCircle as _CheckCircle,
  Clock as _Clock,
} from '@tamagui/lucide-icons'

import {
  POD,
  ICE_BREAKERS,
  QUIZZES,
  getProfile,
} from '../data/mock'
import type { MockPodMember, MockIceBreaker, MockQuiz } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Calendar     = _Calendar as IconFC
const Heart        = _Heart as IconFC
const HelpCircle   = _HelpCircle as IconFC
const BarChart3    = _BarChart3 as IconFC
const MessageCircle = _MessageCircle as IconFC
const Send         = _Send as IconFC
const Users        = _Users as IconFC
const CheckCircle  = _CheckCircle as IconFC
const Clock        = _Clock as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDaysLeft(): number {
  const end = new Date(POD.endDate)
  const now = new Date('2026-02-20')
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
}

function getCurrentDay(): number {
  const start = new Date(POD.startDate)
  const now = new Date('2026-02-20')
  return Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

const MATCH_BG: Record<string, string> = {
  mutual: '$green3',
  sent: '$purple3',
  received: '$orange3',
  none: '$gray3',
}

const MATCH_COLOR: Record<string, string> = {
  mutual: '$green9',
  sent: '$purple9',
  received: '$orange9',
  none: '$gray9',
}

const MATCH_LABEL: Record<string, string> = {
  mutual: 'Mutual match',
  sent: 'Request sent',
  received: 'Wants to match',
  none: 'No request',
}

const MATCH_ICON: Record<string, React.ReactNode> = {
  mutual: <CheckCircle size={12} color="$green9" aria-hidden />,
  sent: <Send size={12} color="$purple9" aria-hidden />,
  received: <Heart size={12} color="$orange9" aria-hidden />,
  none: <Clock size={12} color="$gray9" aria-hidden />,
}

// ---------------------------------------------------------------------------
// PodPage
// ---------------------------------------------------------------------------

export function PodPage() {
  const navigate = useNavigate()

  const daysLeft   = getDaysLeft()
  const currentDay = getCurrentDay()
  const memberCount = POD.members.length

  // Activities up to current day
  const completedIceBreakers = ICE_BREAKERS.filter((ib) => ib.day <= currentDay)
  const completedQuizzes     = QUIZZES.filter((q) => q.day <= currentDay)

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <Users size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>{POD.name}</PageHeader.Title>
          <PageHeader.Subtitle>
            {memberCount} members · {daysLeft} days left
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Countdown banner ──────────────────────────── */}
      <Section padding="$4" gap="$2">
        <Card padding="$3" backgroundColor="$purple2" bordered borderColor="$purple5">
          <Card.Content>
            <XStack alignItems="center" gap="$2">
              <Calendar size={16} color="$purple9" aria-hidden />
              <Text fontSize="$3" fontWeight="600" color="$purple11">
                Day {currentDay} of 7 — {daysLeft} days remaining
              </Text>
            </XStack>
            <Text fontSize="$2" color="$purple9" marginTop="$1">
              Pod ends {POD.endDate}. Make the most of it!
            </Text>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Member grid ───────────────────────────────── */}
      <Section title="Pod Members" padding="$4" gap="$3">
        <Section.Content flexDirection="row" flexWrap="wrap" gap="$3">
          {POD.members.map((member: MockPodMember) => {
            const profile = getProfile(member.profileId)
            if (!profile) return null
            return (
              <Card
                key={profile.id}
                flex={1}
                minWidth={200}
                maxWidth={320}
                padding="$3"
                gap="$3"
                bordered
                onPress={() => navigate(`/member/${profile.id}`)}
                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                accessible
                role="button"
                aria-label={`View ${profile.name}'s profile`}
              >
                <Card.Content gap="$2">
                  <XStack alignItems="center" gap="$3">
                    <Avatar name={profile.name} size="lg" />
                    <YStack flex={1} gap="$1">
                      <Text fontSize="$4" fontWeight="600">
                        {profile.name}
                      </Text>
                      <Text fontSize="$2" color="$gray9">
                        {profile.age} · {profile.location}
                      </Text>
                      <Text fontSize="$2" color="$gray9" numberOfLines={1}>
                        {profile.occupation}
                      </Text>
                    </YStack>
                  </XStack>

                  {/* Match status badge */}
                  <XStack
                    alignSelf="flex-start"
                    alignItems="center"
                    gap="$1"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$10"
                    backgroundColor={MATCH_BG[member.matchStatus]}
                  >
                    {MATCH_ICON[member.matchStatus]}
                    <Text fontSize="$1" fontWeight="600" color={MATCH_COLOR[member.matchStatus]}>
                      {MATCH_LABEL[member.matchStatus]}
                    </Text>
                  </XStack>

                  {/* Match request button (only for none / received) */}
                  {(member.matchStatus === 'none' || member.matchStatus === 'received') && (
                    <Button
                      size="sm"
                      onPress={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation()
                        // demo only — no state mutation
                      }}
                      aria-label={`Send match request to ${profile.name}`}
                    >
                      <Button.Icon>
                        <Heart size={14} aria-hidden />
                      </Button.Icon>
                      <Button.Text>
                        {member.matchStatus === 'received' ? 'Match back' : 'Send request'}
                      </Button.Text>
                    </Button>
                  )}
                </Card.Content>
              </Card>
            )
          })}
        </Section.Content>
      </Section>

      {/* ── Activity feed ─────────────────────────────── */}
      <Section title="Activity Feed" padding="$4" gap="$3">
        <Section.Content gap="$2">
          {/* Ice-breakers */}
          {completedIceBreakers.map((ib: MockIceBreaker) => (
            <Card
              key={ib.id}
              padding="$3"
              gap="$1"
              bordered
              onPress={() => navigate('/icebreaker')}
              pressStyle={{ opacity: 0.9 }}
              accessible
              role="button"
              aria-label={`Ice-breaker day ${ib.day}: ${ib.prompt}`}
            >
              <Card.Content>
                <XStack alignItems="center" gap="$2">
                  <HelpCircle size={14} color="$purple9" aria-hidden />
                  <Text fontSize="$2" fontWeight="600" color="$purple11">
                    Day {ib.day} Ice-Breaker
                  </Text>
                </XStack>
                <Text fontSize="$3" fontWeight="500" marginTop="$1">
                  {ib.prompt}
                </Text>
                <XStack alignItems="center" gap="$1" marginTop="$1">
                  <MessageCircle size={12} color="$gray9" aria-hidden />
                  <Text fontSize="$1" color="$gray9">
                    {ib.responses.length} responses
                  </Text>
                </XStack>
              </Card.Content>
            </Card>
          ))}

          {/* Quizzes */}
          {completedQuizzes.map((q: MockQuiz) => (
            <Card
              key={q.id}
              padding="$3"
              gap="$1"
              bordered
              onPress={() => navigate('/quiz')}
              pressStyle={{ opacity: 0.9 }}
              accessible
              role="button"
              aria-label={`Quiz day ${q.day}: ${q.question}`}
            >
              <Card.Content>
                <XStack alignItems="center" gap="$2">
                  <BarChart3 size={14} color="$purple9" aria-hidden />
                  <Text fontSize="$2" fontWeight="600" color="$purple11">
                    Day {q.day} Quiz
                  </Text>
                </XStack>
                <Text fontSize="$3" fontWeight="500" marginTop="$1">
                  {q.question}
                </Text>
                <XStack alignItems="center" gap="$1" marginTop="$1">
                  <Users size={12} color="$gray9" aria-hidden />
                  <Text fontSize="$1" color="$gray9">
                    {q.votes.length} votes
                  </Text>
                </XStack>
              </Card.Content>
            </Card>
          ))}
        </Section.Content>
      </Section>
    </>
  )
}
