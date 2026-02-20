import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section, StatCard } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Heart as _Heart,
  Calendar as _Calendar,
  MessageCircle as _MessageCircle,
  Sparkles as _Sparkles,
  Users as _Users,
  HelpCircle as _HelpCircle,
  BarChart3 as _BarChart3,
  ChevronRight as _ChevronRight,
} from '@tamagui/lucide-icons'

import {
  POD,
  PROFILES,
  ICE_BREAKERS,
  QUIZZES,
  getProfile,
  getPodMembers,
} from '../data/mock'
import type { MockPodMember } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Heart        = _Heart as IconFC
const Calendar     = _Calendar as IconFC
const MessageCircle = _MessageCircle as IconFC
const Sparkles     = _Sparkles as IconFC
const Users        = _Users as IconFC
const HelpCircle   = _HelpCircle as IconFC
const BarChart3    = _BarChart3 as IconFC
const ChevronRight = _ChevronRight as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDaysLeft(): number {
  const end = new Date(POD.endDate)
  const now = new Date('2026-02-20') // mock "today"
  const diff = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  return diff
}

function getCurrentDay(): number {
  const start = new Date(POD.startDate)
  const now = new Date('2026-02-20')
  return Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

function getMutualCount(): number {
  return POD.members.filter((m) => m.matchStatus === 'mutual').length
}

const MATCH_STATUS_COLORS: Record<string, string> = {
  mutual: '$green9',
  sent: '$purple7',
  received: '$orange9',
  none: '$gray8',
}

const MATCH_STATUS_LABELS: Record<string, string> = {
  mutual: 'Mutual',
  sent: 'Sent',
  received: 'Received',
  none: 'No request',
}

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------

export function HomePage() {
  const navigate = useNavigate()

  const daysLeft   = getDaysLeft()
  const currentDay = getCurrentDay()
  const mutualCount = getMutualCount()
  const podMembers = getPodMembers()
  const memberCount = POD.members.length

  const todayIceBreaker = ICE_BREAKERS.find((ib) => ib.day === currentDay)
  const todayQuiz       = QUIZZES.find((q) => q.day === currentDay)

  const progressPct = Math.round((currentDay / 7) * 100)

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title>{POD.name}</PageHeader.Title>
          <PageHeader.Subtitle>
            {daysLeft} days left in this pod
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Progress bar ──────────────────────────────── */}
      <Section padding="$4" gap="$2">
        <XStack alignItems="center" gap="$2">
          <Calendar size={14} color="$purple9" aria-hidden />
          <Text fontSize="$2" color="$gray11">
            Day {currentDay} of 7
          </Text>
        </XStack>
        <YStack
          height={6}
          borderRadius="$10"
          backgroundColor="$gray4"
          overflow="hidden"
        >
          <YStack
            height={6}
            borderRadius="$10"
            backgroundColor="$purple9"
            width={`${progressPct}%` as unknown as number}
          />
        </YStack>
      </Section>

      {/* ── Quick stats ───────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Section.Content flexDirection="row" flexWrap="wrap" gap="$3">
          <StatCard
            label="Members"
            value={String(memberCount)}
            flex={1}
            minWidth={120}
          />
          <StatCard
            label="Day"
            value={`${currentDay} / 7`}
            flex={1}
            minWidth={120}
          />
          <StatCard
            label="Mutual Matches"
            value={String(mutualCount)}
            flex={1}
            minWidth={120}
          />
        </Section.Content>
      </Section>

      {/* ── Today's activities ─────────────────────────── */}
      <Section title="Today's Activities" padding="$4" gap="$3">
        <Section.Content flexDirection="row" flexWrap="wrap" gap="$3">
          {/* Ice-breaker card */}
          {todayIceBreaker && (
            <Card
              flex={1}
              minWidth={240}
              padding="$3"
              gap="$2"
              onPress={() => navigate('/pod/icebreaker')}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
              bordered
              borderColor="$purple5"
              accessible
              role="button"
              aria-label="Go to today's ice-breaker"
            >
              <Card.Header>
                <XStack alignItems="center" gap="$2">
                  <HelpCircle size={16} color="$purple9" aria-hidden />
                  <Card.Title>Ice-Breaker</Card.Title>
                </XStack>
              </Card.Header>
              <Card.Content>
                <Card.Description numberOfLines={2}>
                  {todayIceBreaker.prompt}
                </Card.Description>
                <XStack alignItems="center" gap="$1" marginTop="$2">
                  <MessageCircle size={12} color="$gray9" aria-hidden />
                  <Text fontSize="$1" color="$gray9">
                    {todayIceBreaker.responses.length} responses
                  </Text>
                </XStack>
              </Card.Content>
            </Card>
          )}

          {/* Quiz card */}
          {todayQuiz && (
            <Card
              flex={1}
              minWidth={240}
              padding="$3"
              gap="$2"
              onPress={() => navigate('/pod/quiz')}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
              bordered
              borderColor="$purple5"
              accessible
              role="button"
              aria-label="Go to today's quiz"
            >
              <Card.Header>
                <XStack alignItems="center" gap="$2">
                  <BarChart3 size={16} color="$purple9" aria-hidden />
                  <Card.Title>Quiz</Card.Title>
                </XStack>
              </Card.Header>
              <Card.Content>
                <Card.Description numberOfLines={2}>
                  {todayQuiz.question}
                </Card.Description>
                <XStack alignItems="center" gap="$1" marginTop="$2">
                  <Users size={12} color="$gray9" aria-hidden />
                  <Text fontSize="$1" color="$gray9">
                    {todayQuiz.votes.length} votes
                  </Text>
                </XStack>
              </Card.Content>
            </Card>
          )}
        </Section.Content>
      </Section>

      {/* ── Pod member grid ────────────────────────────── */}
      <Section title="Pod Members" padding="$4" gap="$3">
        <Section.Content
          flexDirection="row"
          flexWrap="wrap"
          gap="$3"
        >
          {POD.members.map((member: MockPodMember) => {
            const profile = getProfile(member.profileId)
            if (!profile) return null
            return (
              <Card
                key={profile.id}
                width={150}
                padding="$3"
                gap="$2"
                alignItems="center"
                onPress={() => navigate(`/pod/member/${profile.id}`)}
                pressStyle={{ scale: 0.97, opacity: 0.9 }}
                bordered
                accessible
                role="button"
                aria-label={`View ${profile.name}'s profile`}
              >
                <Card.Content alignItems="center" gap="$2">
                  <Avatar name={profile.name} size="lg" />
                  <Text fontSize="$3" fontWeight="600" textAlign="center">
                    {profile.name.split(' ')[0]}
                  </Text>
                  <Text fontSize="$1" color="$gray9">
                    {profile.age}
                  </Text>
                  <XStack
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$10"
                    backgroundColor={
                      member.matchStatus === 'mutual' ? '$green3' :
                      member.matchStatus === 'sent' ? '$purple3' :
                      member.matchStatus === 'received' ? '$orange3' :
                      '$gray3'
                    }
                  >
                    <Text
                      fontSize="$1"
                      fontWeight="600"
                      color={MATCH_STATUS_COLORS[member.matchStatus]}
                    >
                      {MATCH_STATUS_LABELS[member.matchStatus]}
                    </Text>
                  </XStack>
                </Card.Content>
              </Card>
            )
          })}
        </Section.Content>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <YStack padding="$4" paddingBottom="$6">
        <Button
          onPress={() => navigate('/pod/icebreaker')}
          aria-label="See today's ice-breaker"
        >
          <Button.Icon>
            <Sparkles size={16} aria-hidden />
          </Button.Icon>
          <Button.Text>See today's ice-breaker</Button.Text>
          <Button.Icon>
            <ChevronRight size={16} aria-hidden />
          </Button.Icon>
        </Button>
      </YStack>
    </>
  )
}
