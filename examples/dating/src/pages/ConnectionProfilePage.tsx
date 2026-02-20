import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ArrowLeft as _ArrowLeft,
  Briefcase as _Briefcase,
  Calendar as _Calendar,
  Heart as _Heart,
  MapPin as _MapPin,
  MessageCircle as _MessageCircle,
  ShieldCheck as _ShieldCheck,
  UserMinus as _UserMinus,
} from '@tamagui/lucide-icons'

import {
  CONNECTIONS,
  getConnectionProfile,
} from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ArrowLeft    = _ArrowLeft as IconFC
const Briefcase    = _Briefcase as IconFC
const Calendar     = _Calendar as IconFC
const Heart        = _Heart as IconFC
const MapPin       = _MapPin as IconFC
const MessageCircle = _MessageCircle as IconFC
const ShieldCheck  = _ShieldCheck as IconFC
const UserMinus    = _UserMinus as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMatchDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// ConnectionProfilePage
// ---------------------------------------------------------------------------

export function ConnectionProfilePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const connection = CONNECTIONS.find((c) => c.id === id)
  const profile = connection ? getConnectionProfile(connection) : undefined

  if (!connection || !profile) {
    return (
      <>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title>Connection Not Found</PageHeader.Title>
            <PageHeader.Subtitle>This profile could not be loaded.</PageHeader.Subtitle>
          </PageHeader.Body>
        </PageHeader>
        <YStack padding="$4">
          <Button variant="secondary" onPress={() => navigate('/connections')}>
            <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
            <Button.Text variant="secondary">Back to Connections</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  // Find conversation for this profile if one exists
  const conversationRoute = `/messages`

  return (
    <>
      {/* Back button */}
      <YStack padding="$3">
        <Button
          variant="tertiary"
          size="sm"
          onPress={() => navigate('/connections')}
          alignSelf="flex-start"
          aria-label="Back to connections"
        >
          <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
          <Button.Text variant="tertiary">Back to Connections</Button.Text>
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

            {/* Matched on badge */}
            <XStack
              alignItems="center"
              gap="$2"
              paddingHorizontal="$3"
              paddingVertical="$1.5"
              borderRadius="$10"
              backgroundColor="$purple2"
              borderWidth={1}
              borderColor="$purple5"
            >
              <Calendar size={14} color="$purple9" aria-hidden />
              <Text fontSize="$2" fontWeight="600" color="$purple9">
                Matched on {formatMatchDate(connection.matchedAt)}
              </Text>
            </XStack>
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
          {/* Message */}
          <Button
            onPress={() => navigate(conversationRoute)}
            aria-label={`Message ${profile.name}`}
          >
            <Button.Icon>
              <MessageCircle size={16} aria-hidden />
            </Button.Icon>
            <Button.Text>Message</Button.Text>
          </Button>

          {/* Unmatch */}
          <Button
            variant="destructive"
            aria-label={`Unmatch with ${profile.name}`}
          >
            <Button.Icon>
              <UserMinus size={16} aria-hidden />
            </Button.Icon>
            <Button.Text>Unmatch</Button.Text>
          </Button>
        </YStack>
      </Section>
    </>
  )
}
