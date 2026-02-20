import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  MessageCircle as _MessageCircle,
} from '@tamagui/lucide-icons'

import {
  CONVERSATIONS,
  getConversationPartner,
} from '../data/mock'
import type { MockConversation } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const MessageCircle = _MessageCircle as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTimestamp(ts: string): string {
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

function getLastMessage(conv: MockConversation): { text: string; timestamp: string; isMe: boolean } {
  const last = conv.messages[conv.messages.length - 1]
  return {
    text: last.text,
    timestamp: last.timestamp,
    isMe: last.senderId === 'me',
  }
}

function hasUnread(conv: MockConversation): boolean {
  const last = conv.messages[conv.messages.length - 1]
  return last.senderId !== 'me'
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}

// ---------------------------------------------------------------------------
// MessagesPage
// ---------------------------------------------------------------------------

export function MessagesPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <MessageCircle size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Messages</PageHeader.Title>
          <PageHeader.Subtitle>
            {CONVERSATIONS.length} active conversations
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Conversation list ───────────────────────────── */}
      <Section padding="$4" gap="$2">
        <Section.Content gap="$2">
          {CONVERSATIONS.length === 0 && (
            <Card padding="$5" bordered alignItems="center" gap="$3">
              <Card.Content alignItems="center" gap="$3">
                <MessageCircle size={32} color="$gray7" aria-hidden />
                <Text fontSize="$4" fontWeight="600" color="$gray9" textAlign="center">
                  No conversations yet
                </Text>
                <Text fontSize="$3" color="$gray8" textAlign="center">
                  Match with someone in your pod to start chatting.
                </Text>
              </Card.Content>
            </Card>
          )}

          {CONVERSATIONS.map((conv: MockConversation) => {
            const partner = getConversationPartner(conv)
            if (!partner) return null

            const last = getLastMessage(conv)
            const unread = hasUnread(conv)
            const previewText = last.isMe
              ? `You: ${truncateText(last.text, 60)}`
              : truncateText(last.text, 70)

            return (
              <Card
                key={conv.id}
                padding="$3"
                bordered
                onPress={() => navigate(`/messages/${conv.id}`)}
                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                accessible
                role="button"
                aria-label={`Conversation with ${partner.name}${unread ? ', unread message' : ''}`}
              >
                <Card.Content>
                  <XStack gap="$3" alignItems="center">
                    {/* Avatar */}
                    <YStack position="relative">
                      <Avatar name={partner.name} size="lg" />
                      {unread && (
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
                          fontWeight={unread ? '700' : '500'}
                          color="$gray12"
                        >
                          {partner.name}
                        </Text>
                        <Text
                          fontSize="$1"
                          color={unread ? '$purple9' : '$gray8'}
                          fontWeight={unread ? '600' : '400'}
                        >
                          {formatTimestamp(last.timestamp)}
                        </Text>
                      </XStack>

                      <Text
                        fontSize="$2"
                        color={unread ? '$gray12' : '$gray9'}
                        fontWeight={unread ? '500' : '400'}
                        numberOfLines={1}
                      >
                        {previewText}
                      </Text>
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
