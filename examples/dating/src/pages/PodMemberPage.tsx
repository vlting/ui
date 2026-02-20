import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ArrowLeft as _ArrowLeft,
  Briefcase as _Briefcase,
  Flag as _Flag,
  Heart as _Heart,
  MapPin as _MapPin,
  MessageCircle as _MessageCircle,
  Shield as _Shield,
  ShieldCheck as _ShieldCheck,
  User as _User,
} from '@tamagui/lucide-icons'

import { POD, getProfile } from '../data/mock'
import type { MockPodMember } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ArrowLeft    = _ArrowLeft as IconFC
const Briefcase    = _Briefcase as IconFC
const Flag         = _Flag as IconFC
const Heart        = _Heart as IconFC
const MapPin       = _MapPin as IconFC
const MessageCircle = _MessageCircle as IconFC
const Shield       = _Shield as IconFC
const ShieldCheck  = _ShieldCheck as IconFC
const User         = _User as IconFC

// ---------------------------------------------------------------------------
// Match status helpers
// ---------------------------------------------------------------------------

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
  received: 'Wants to match with you',
  none: 'No match request yet',
}

// ---------------------------------------------------------------------------
// PodMemberPage
// ---------------------------------------------------------------------------

export function PodMemberPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const profile = getProfile(id ?? '')
  const podMember: MockPodMember | undefined = POD.members.find(
    (m) => m.profileId === id,
  )

  const [matchRequested, setMatchRequested] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)

  if (!profile) {
    return (
      <>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title>Member Not Found</PageHeader.Title>
            <PageHeader.Subtitle>This profile could not be loaded.</PageHeader.Subtitle>
          </PageHeader.Body>
        </PageHeader>
        <YStack padding="$4">
          <Button variant="secondary" onPress={() => navigate('/pod')}>
            <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
            <Button.Text variant="secondary">Back to Pod</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  const matchStatus = matchRequested
    ? 'sent'
    : (podMember?.matchStatus ?? 'none')

  const showMatchButton = matchStatus === 'none' || matchStatus === 'received'

  return (
    <>
      {/* Back button */}
      <YStack padding="$3">
        <Button
          variant="tertiary"
          size="sm"
          onPress={() => navigate('/pod')}
          alignSelf="flex-start"
          aria-label="Back to pod"
        >
          <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
          <Button.Text variant="tertiary">Back to Pod</Button.Text>
        </Button>
      </YStack>

      {/* ── Hero section ──────────────────────────────── */}
      <Section padding="$4" gap="$4">
        <Card padding="$4" bordered gap="$4" alignItems="center">
          <Card.Content alignItems="center" gap="$3">
            {/* Large photo placeholder */}
            <YStack
              width={200}
              height={200}
              borderRadius="$6"
              backgroundColor="$gray4"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              <Avatar name={profile.name} size="xl" />
            </YStack>

            {/* Name and age */}
            <YStack alignItems="center" gap="$1">
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$7" fontWeight="700">
                  {profile.name}
                </Text>
                <Text fontSize="$5" color="$gray9">
                  {profile.age}
                </Text>
              </XStack>

              {/* Verified badge */}
              {profile.verified && (
                <XStack alignItems="center" gap="$1">
                  <ShieldCheck size={14} color="$purple9" aria-hidden />
                  <Text fontSize="$2" color="$purple9" fontWeight="600">
                    Verified
                  </Text>
                </XStack>
              )}
            </YStack>

            {/* Location + occupation */}
            <YStack alignItems="center" gap="$1">
              <XStack alignItems="center" gap="$1">
                <MapPin size={14} color="$gray9" aria-hidden />
                <Text fontSize="$3" color="$gray9">{profile.location}</Text>
              </XStack>
              <XStack alignItems="center" gap="$1">
                <Briefcase size={14} color="$gray9" aria-hidden />
                <Text fontSize="$3" color="$gray9">{profile.occupation}</Text>
              </XStack>
            </YStack>

            {/* Match status */}
            {podMember && (
              <XStack
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius="$10"
                backgroundColor={MATCH_BG[matchStatus]}
              >
                <Text fontSize="$2" fontWeight="600" color={MATCH_COLOR[matchStatus]}>
                  {MATCH_LABEL[matchStatus]}
                </Text>
              </XStack>
            )}
          </Card.Content>
        </Card>
      </Section>

      {/* ── Bio ───────────────────────────────────────── */}
      <Section title="About" padding="$4" gap="$3">
        <Card padding="$3" bordered>
          <Card.Content>
            <Text fontSize="$3" color="$gray12" lineHeight="$4">
              {profile.bio}
            </Text>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Prompt answers ────────────────────────────── */}
      {profile.prompts.length > 0 && (
        <Section title="Prompts" padding="$4" gap="$3">
          <Section.Content gap="$3">
            {profile.prompts.map((prompt, idx) => (
              <Card key={idx} padding="$3" bordered gap="$2">
                <Card.Header>
                  <Card.Title fontSize="$2" color="$purple9">
                    {prompt.question}
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <Text fontSize="$3" color="$gray12" lineHeight="$3">
                    {prompt.answer}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </Section.Content>
        </Section>
      )}

      {/* ── Interests ─────────────────────────────────── */}
      {profile.interests.length > 0 && (
        <Section title="Interests" padding="$4" gap="$3">
          <XStack flexWrap="wrap" gap="$2">
            {profile.interests.map((interest) => (
              <XStack
                key={interest}
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius="$10"
                backgroundColor="$purple2"
                borderWidth={1}
                borderColor="$purple5"
              >
                <Text fontSize="$2" fontWeight="500" color="$purple11">
                  {interest}
                </Text>
              </XStack>
            ))}
          </XStack>
        </Section>
      )}

      {/* ── Action buttons ────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <YStack gap="$3">
          {/* Match request */}
          {showMatchButton && (
            <Button
              onPress={() => setMatchRequested(true)}
              aria-label={`Send match request to ${profile.name}`}
            >
              <Button.Icon>
                <Heart size={16} aria-hidden />
              </Button.Icon>
              <Button.Text>
                {matchStatus === 'received' ? 'Match Back' : 'Send Match Request'}
              </Button.Text>
            </Button>
          )}

          {matchStatus === 'mutual' && (
            <Button
              onPress={() => navigate('/messages')}
              aria-label={`Message ${profile.name}`}
            >
              <Button.Icon>
                <MessageCircle size={16} aria-hidden />
              </Button.Icon>
              <Button.Text>Send Message</Button.Text>
            </Button>
          )}

          {matchStatus === 'sent' && !matchRequested && (
            <Button variant="secondary" disabled>
              <Button.Icon>
                <Heart size={16} aria-hidden />
              </Button.Icon>
              <Button.Text variant="secondary">Request Pending</Button.Text>
            </Button>
          )}

          {matchRequested && (
            <Card padding="$3" backgroundColor="$green2" bordered borderColor="$green5">
              <Card.Content>
                <Text fontSize="$3" color="$green9" fontWeight="600" textAlign="center">
                  Match request sent to {profile.name}!
                </Text>
              </Card.Content>
            </Card>
          )}

          {/* Block / Report */}
          <XStack gap="$3">
            <Button
              variant="secondary"
              flex={1}
              onPress={() => setReportDialogOpen(!reportDialogOpen)}
              aria-label={`Report ${profile.name}`}
            >
              <Button.Icon>
                <Flag size={14} aria-hidden />
              </Button.Icon>
              <Button.Text variant="secondary">Report</Button.Text>
            </Button>
            <Button
              variant="destructive"
              flex={1}
              aria-label={`Block ${profile.name}`}
            >
              <Button.Icon>
                <Shield size={14} aria-hidden />
              </Button.Icon>
              <Button.Text>Block</Button.Text>
            </Button>
          </XStack>

          {reportDialogOpen && (
            <Card padding="$3" bordered borderColor="$orange5" backgroundColor="$orange2">
              <Card.Content gap="$2">
                <Text fontSize="$3" fontWeight="600" color="$orange11">
                  Report this profile?
                </Text>
                <Text fontSize="$2" color="$orange9">
                  If this person is making you uncomfortable, our safety team will review your report within 24 hours.
                </Text>
                <XStack gap="$2" marginTop="$2">
                  <Button
                    variant="destructive"
                    size="sm"
                    flex={1}
                    onPress={() => setReportDialogOpen(false)}
                  >
                    <Button.Text>Confirm Report</Button.Text>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    flex={1}
                    onPress={() => setReportDialogOpen(false)}
                  >
                    <Button.Text variant="secondary">Cancel</Button.Text>
                  </Button>
                </XStack>
              </Card.Content>
            </Card>
          )}
        </YStack>
      </Section>
    </>
  )
}
