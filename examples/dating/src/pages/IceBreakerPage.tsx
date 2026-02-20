import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ArrowLeft as _ArrowLeft,
  HelpCircle as _HelpCircle,
  MessageCircle as _MessageCircle,
  Send as _Send,
  Sparkles as _Sparkles,
} from '@tamagui/lucide-icons'

import { ICE_BREAKERS, getProfile } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ArrowLeft      = _ArrowLeft as IconFC
const HelpCircle     = _HelpCircle as IconFC
const MessageCircle  = _MessageCircle as IconFC
const Send           = _Send as IconFC
const Sparkles       = _Sparkles as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCurrentDay(): number {
  const start = new Date('2026-02-16')
  const now   = new Date('2026-02-20')
  return Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

// ---------------------------------------------------------------------------
// IceBreakerPage
// ---------------------------------------------------------------------------

export function IceBreakerPage() {
  const navigate = useNavigate()
  const currentDay = getCurrentDay()
  const todayIceBreaker = ICE_BREAKERS.find((ib) => ib.day === currentDay)

  const [myResponse, setMyResponse] = useState('')
  const [submitted, setSubmitted]   = useState(false)

  if (!todayIceBreaker) {
    return (
      <>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title>No Ice-Breaker Today</PageHeader.Title>
            <PageHeader.Subtitle>Check back tomorrow!</PageHeader.Subtitle>
          </PageHeader.Body>
        </PageHeader>
        <YStack padding="$4">
          <Button variant="secondary" onPress={() => navigate('/')}>
            <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
            <Button.Text variant="secondary">Back to Home</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  const handleSubmit = () => {
    if (myResponse.trim().length > 0) {
      setSubmitted(true)
    }
  }

  return (
    <>
      {/* Back button */}
      <YStack padding="$3">
        <Button
          variant="tertiary"
          size="sm"
          onPress={() => navigate('/')}
          alignSelf="flex-start"
          aria-label="Back to home"
        >
          <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
          <Button.Text variant="tertiary">Back</Button.Text>
        </Button>
      </YStack>

      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <HelpCircle size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Day {currentDay} Ice-Breaker</PageHeader.Title>
          <PageHeader.Subtitle>
            {todayIceBreaker.responses.length} pod members have responded
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Prompt card ───────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Card
          padding="$5"
          backgroundColor="$purple2"
          bordered
          borderColor="$purple5"
          alignItems="center"
          gap="$3"
        >
          <Card.Content alignItems="center" gap="$3">
            <Sparkles size={24} color="$purple9" aria-hidden />
            <Text
              fontSize="$6"
              fontWeight="700"
              textAlign="center"
              color="$purple11"
            >
              {todayIceBreaker.prompt}
            </Text>
            <XStack alignItems="center" gap="$1">
              <MessageCircle size={14} color="$gray9" aria-hidden />
              <Text fontSize="$2" color="$gray9">
                {todayIceBreaker.responses.length}{submitted ? ' + 1' : ''} responses
              </Text>
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Responses ─────────────────────────────────── */}
      <Section title="Responses" padding="$4" gap="$3">
        <Section.Content gap="$3">
          {todayIceBreaker.responses.map((response) => {
            const profile = getProfile(response.profileId)
            if (!profile) return null
            return (
              <Card key={`${response.profileId}-${response.timestamp}`} padding="$3" bordered>
                <Card.Content>
                  <XStack gap="$3" alignItems="flex-start">
                    <Avatar name={profile.name} size="md" />
                    <YStack flex={1} gap="$1">
                      <XStack alignItems="center" gap="$2">
                        <Text fontSize="$3" fontWeight="600">
                          {profile.name}
                        </Text>
                        <Text fontSize="$1" color="$gray9">
                          {new Date(response.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </XStack>
                      <Text fontSize="$3" color="$gray12" lineHeight="$3">
                        {response.text}
                      </Text>
                    </YStack>
                  </XStack>
                </Card.Content>
              </Card>
            )
          })}

          {/* Submitted response preview */}
          {submitted && (
            <Card padding="$3" bordered borderColor="$purple5" backgroundColor="$purple1">
              <Card.Content>
                <XStack gap="$3" alignItems="flex-start">
                  <Avatar name="You" size="md" />
                  <YStack flex={1} gap="$1">
                    <XStack alignItems="center" gap="$2">
                      <Text fontSize="$3" fontWeight="600">
                        You
                      </Text>
                      <Text fontSize="$1" color="$gray9">
                        Just now
                      </Text>
                    </XStack>
                    <Text fontSize="$3" color="$gray12" lineHeight="$3">
                      {myResponse}
                    </Text>
                  </YStack>
                </XStack>
              </Card.Content>
            </Card>
          )}
        </Section.Content>
      </Section>

      {/* ── Your response input ───────────────────────── */}
      {!submitted && (
        <Section padding="$4" gap="$3">
          <Card padding="$3" bordered gap="$3">
            <Card.Header>
              <Card.Title>Your Response</Card.Title>
            </Card.Header>
            <Card.Content gap="$3">
              <textarea
                value={myResponse}
                onChange={(e) => setMyResponse(e.target.value)}
                placeholder="Share your answer with the pod..."
                rows={3}
                aria-label="Your ice-breaker response"
                style={{
                  padding: '12px',
                  borderRadius: 8,
                  border: '1px solid var(--gray6, #d2d8e6)',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  width: '100%',
                  resize: 'vertical',
                  background: 'transparent',
                  color: 'inherit',
                }}
              />
              <Button
                onPress={handleSubmit}
                disabled={myResponse.trim().length === 0}
                aria-label="Submit your response"
              >
                <Button.Icon>
                  <Send size={16} aria-hidden />
                </Button.Icon>
                <Button.Text>Share Response</Button.Text>
              </Button>
            </Card.Content>
          </Card>
        </Section>
      )}

      {submitted && (
        <YStack padding="$4" alignItems="center">
          <Text fontSize="$3" color="$green9" fontWeight="600">
            Response shared with your pod!
          </Text>
        </YStack>
      )}
    </>
  )
}
