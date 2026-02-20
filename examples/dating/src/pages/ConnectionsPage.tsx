import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Heart as _Heart,
  Clock as _Clock,
} from '@tamagui/lucide-icons'

import {
  CONNECTIONS,
  getConnectionProfile,
} from '../data/mock'
import type { MockConnection } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Heart = _Heart as IconFC
const Clock = _Clock as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDaysAgo(dateStr: string): number {
  const matched = new Date(dateStr)
  const now = new Date('2026-02-20T12:00:00Z')
  return Math.floor((now.getTime() - matched.getTime()) / (1000 * 60 * 60 * 24))
}

function formatLastMessageTime(ts?: string): string {
  if (!ts) return ''
  const date = new Date(ts)
  const now = new Date('2026-02-20T20:00:00Z')
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}

// ---------------------------------------------------------------------------
// ConnectionsPage
// ---------------------------------------------------------------------------

export function ConnectionsPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <Heart size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Connections</PageHeader.Title>
          <PageHeader.Subtitle>
            {CONNECTIONS.length} matches
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Connection list ─────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Section.Content gap="$3">
          {CONNECTIONS.length === 0 && (
            <Card padding="$5" bordered alignItems="center" gap="$3">
              <Card.Content alignItems="center" gap="$3">
                <Heart size={32} color="$gray7" aria-hidden />
                <Text fontSize="$4" fontWeight="600" color="$gray9" textAlign="center">
                  No connections yet
                </Text>
                <Text fontSize="$3" color="$gray8" textAlign="center">
                  When you and someone in your pod both send match requests, you will appear here.
                </Text>
              </Card.Content>
            </Card>
          )}

          {CONNECTIONS.map((conn: MockConnection) => {
            const profile = getConnectionProfile(conn)
            if (!profile) return null

            const daysAgo = getDaysAgo(conn.matchedAt)

            return (
              <Card
                key={conn.id}
                padding="$3"
                bordered
                onPress={() => navigate(`/connections/${conn.id}`)}
                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                accessible
                role="button"
                aria-label={`${profile.name}, matched ${daysAgo} days ago${conn.unread ? ', has unread message' : ''}`}
              >
                <Card.Content>
                  <XStack gap="$3" alignItems="center">
                    {/* Avatar with unread indicator */}
                    <YStack position="relative">
                      <Avatar name={profile.name} size="lg" />
                      {conn.unread && (
                        <YStack
                          position="absolute"
                          top={0}
                          right={0}
                          width={12}
                          height={12}
                          borderRadius={6}
                          backgroundColor="$purple9"
                          borderWidth={2}
                          borderColor="$background"
                          aria-label="Unread"
                        />
                      )}
                    </YStack>

                    {/* Content */}
                    <YStack flex={1} gap="$1">
                      <XStack alignItems="center" justifyContent="space-between">
                        <Text
                          fontSize="$4"
                          fontWeight={conn.unread ? '700' : '500'}
                          color="$gray12"
                        >
                          {profile.name}
                        </Text>
                        {conn.lastMessageTime && (
                          <Text
                            fontSize="$1"
                            color={conn.unread ? '$purple9' : '$gray8'}
                            fontWeight={conn.unread ? '600' : '400'}
                          >
                            {formatLastMessageTime(conn.lastMessageTime)}
                          </Text>
                        )}
                      </XStack>

                      {/* Matched duration */}
                      <XStack alignItems="center" gap="$1">
                        <Clock size={12} color="$gray8" aria-hidden />
                        <Text fontSize="$1" color="$gray8">
                          Matched {daysAgo} days ago
                        </Text>
                      </XStack>

                      {/* Last message preview */}
                      {conn.lastMessage && (
                        <Text
                          fontSize="$2"
                          color={conn.unread ? '$gray12' : '$gray9'}
                          fontWeight={conn.unread ? '500' : '400'}
                          numberOfLines={1}
                          marginTop="$0.5"
                        >
                          {truncateText(conn.lastMessage, 65)}
                        </Text>
                      )}
                    </YStack>
                  </XStack>
                </Card.Content>
              </Card>
            )
          })}
        </Section.Content>
      </Section>
    </>
  )
}
