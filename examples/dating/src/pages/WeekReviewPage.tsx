import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Calendar as _Calendar,
  Check as _Check,
  Heart as _Heart,
  PartyPopper as _PartyPopper,
  Sparkles as _Sparkles,
} from '@tamagui/lucide-icons'

import { POD, getProfile } from '../data/mock'
import type { MockPodMember } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Calendar    = _Calendar as IconFC
const Check       = _Check as IconFC
const Heart       = _Heart as IconFC
const PartyPopper = _PartyPopper as IconFC
const Sparkles    = _Sparkles as IconFC

// ---------------------------------------------------------------------------
// WeekReviewPage
// ---------------------------------------------------------------------------

export function WeekReviewPage() {
  const navigate = useNavigate()

  // Members who already have mutual matches are locked in
  const mutualIds = new Set(
    POD.members
      .filter((m) => m.matchStatus === 'mutual')
      .map((m) => m.profileId),
  )

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(mutualIds),
  )
  const [submitted, setSubmitted] = useState(false)

  const toggleMember = useCallback(
    (profileId: string) => {
      // Cannot deselect mutual matches
      if (mutualIds.has(profileId)) return

      setSelectedIds((prev) => {
        const next = new Set(prev)
        if (next.has(profileId)) {
          next.delete(profileId)
        } else {
          next.add(profileId)
        }
        return next
      })
    },
    [mutualIds],
  )

  const selectableCount = selectedIds.size - mutualIds.size
  const totalSelected = selectedIds.size

  const handleSubmit = () => {
    if (totalSelected === 0) return
    setSubmitted(true)
  }

  // ── Celebration view ───────────────────────────────────
  if (submitted) {
    const matchedCount = totalSelected
    return (
      <>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          padding="$6"
          gap="$5"
          minHeight={500}
        >
          {/* Celebration icon */}
          <YStack
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor="$purple2"
            alignItems="center"
            justifyContent="center"
          >
            <PartyPopper size={40} color="$purple9" aria-hidden />
          </YStack>

          {/* Title */}
          <YStack alignItems="center" gap="$2">
            <Text fontSize="$8" fontWeight="800" color="$purple11" textAlign="center">
              You matched with {matchedCount} {matchedCount === 1 ? 'person' : 'people'}!
            </Text>
            <Text fontSize="$4" color="$gray9" textAlign="center" lineHeight="$4">
              Your match requests have been sent. When both of you choose each other,
              you will become connections.
            </Text>
          </YStack>

          {/* Matched avatars */}
          <XStack flexWrap="wrap" gap="$3" justifyContent="center">
            {POD.members
              .filter((m) => selectedIds.has(m.profileId))
              .map((m) => {
                const profile = getProfile(m.profileId)
                if (!profile) return null
                return (
                  <YStack key={profile.id} alignItems="center" gap="$1">
                    <YStack
                      borderWidth={2}
                      borderColor="$purple9"
                      borderRadius={999}
                      padding="$0.5"
                    >
                      <Avatar name={profile.name} size="lg" />
                    </YStack>
                    <Text fontSize="$2" fontWeight="500" color="$gray11">
                      {profile.name.split(' ')[0]}
                    </Text>
                  </YStack>
                )
              })}
          </XStack>

          {/* Stars decoration text */}
          <XStack alignItems="center" gap="$2">
            <Sparkles size={16} color="$purple7" aria-hidden />
            <Text fontSize="$2" color="$purple9" fontWeight="500">
              See you in the next pod!
            </Text>
            <Sparkles size={16} color="$purple7" aria-hidden />
          </XStack>

          {/* Back button */}
          <Button
            variant="secondary"
            onPress={() => navigate('/')}
            aria-label="Back to home"
          >
            <Button.Text variant="secondary">Back to Home</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  // ── Selection view ─────────────────────────────────────
  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <Calendar size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>This week's pod is ending!</PageHeader.Title>
          <PageHeader.Subtitle>
            Who would you like to match with?
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Banner ──────────────────────────────────────── */}
      <Section padding="$4" gap="$2">
        <Card padding="$3" backgroundColor="$purple2" bordered borderColor="$purple5">
          <Card.Content>
            <XStack alignItems="center" gap="$2">
              <Heart size={16} color="$purple9" aria-hidden />
              <Text fontSize="$3" fontWeight="600" color="$purple11">
                Select the members you want to match with
              </Text>
            </XStack>
            <Text fontSize="$2" color="$purple9" marginTop="$1">
              If they select you too, you will become connections and can keep chatting
              beyond the pod.
            </Text>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Member grid ─────────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Section.Content
          flexDirection="row"
          flexWrap="wrap"
          gap="$3"
        >
          {POD.members.map((member: MockPodMember) => {
            const profile = getProfile(member.profileId)
            if (!profile) return null

            const isMutual = mutualIds.has(profile.id)
            const isSelected = selectedIds.has(profile.id)

            return (
              <Card
                key={profile.id}
                width={155}
                padding="$3"
                gap="$2"
                alignItems="center"
                bordered
                borderColor={isSelected ? '$purple7' : '$gray5'}
                borderWidth={isSelected ? 2 : 1}
                backgroundColor={isSelected ? '$purple1' : undefined}
                onPress={() => toggleMember(profile.id)}
                pressStyle={isMutual ? undefined : { scale: 0.97, opacity: 0.9 }}
                opacity={isMutual ? 1 : undefined}
                accessible
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`${profile.name}${isMutual ? ', already matched' : isSelected ? ', selected' : ''}`}
              >
                <Card.Content alignItems="center" gap="$2">
                  {/* Avatar with checkmark overlay */}
                  <YStack position="relative">
                    <Avatar name={profile.name} size="lg" />
                    {isSelected && (
                      <YStack
                        position="absolute"
                        bottom={-2}
                        right={-2}
                        width={22}
                        height={22}
                        borderRadius={11}
                        backgroundColor="$purple9"
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={2}
                        borderColor="$background"
                      >
                        <Check size={12} color="white" aria-hidden />
                      </YStack>
                    )}
                  </YStack>

                  {/* Name + age */}
                  <Text fontSize="$3" fontWeight="600" textAlign="center">
                    {profile.name.split(' ')[0]}
                  </Text>
                  <Text fontSize="$1" color="$gray9">
                    {profile.age}
                  </Text>

                  {/* Already matched badge */}
                  {isMutual && (
                    <XStack
                      paddingHorizontal="$2"
                      paddingVertical="$0.5"
                      borderRadius="$10"
                      backgroundColor="$green3"
                    >
                      <Text fontSize="$1" fontWeight="600" color="$green9">
                        Already matched
                      </Text>
                    </XStack>
                  )}
                </Card.Content>
              </Card>
            )
          })}
        </Section.Content>
      </Section>

      {/* ── Summary + submit ────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <YStack gap="$3">
          {/* Summary */}
          <XStack alignItems="center" justifyContent="center" gap="$2">
            <Heart size={16} color="$purple9" aria-hidden />
            <Text fontSize="$3" fontWeight="600" color="$gray11">
              {totalSelected} {totalSelected === 1 ? 'member' : 'members'} selected
              {mutualIds.size > 0 && (
                <Text fontSize="$2" color="$gray8">
                  {' '}({mutualIds.size} already matched)
                </Text>
              )}
            </Text>
          </XStack>

          {/* Submit button */}
          <Button
            onPress={handleSubmit}
            disabled={totalSelected === 0}
            aria-label={`Submit matches for ${totalSelected} members`}
          >
            <Button.Icon>
              <Heart size={16} aria-hidden />
            </Button.Icon>
            <Button.Text>Submit Matches</Button.Text>
          </Button>
        </YStack>
      </Section>
    </>
  )
}
