import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, PageHeader } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ChevronLeft as _ChevronLeft,
  Send as _Send,
} from '@tamagui/lucide-icons'

import {
  CONVERSATIONS,
  getConversationPartner,
} from '../data/mock'
import type { MockMessage } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ChevronLeft = _ChevronLeft as IconFC
const Send        = _Send as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMessageTime(ts: string): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ---------------------------------------------------------------------------
// DMThreadPage
// ---------------------------------------------------------------------------

export function DMThreadPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [draft, setDraft] = useState('')
  const [localMessages, setLocalMessages] = useState<MockMessage[]>([])

  const conversation = CONVERSATIONS.find((c) => c.id === id)
  const partner = conversation ? getConversationPartner(conversation) : undefined

  if (!conversation || !partner) {
    return (
      <>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title>Conversation Not Found</PageHeader.Title>
            <PageHeader.Subtitle>This conversation could not be loaded.</PageHeader.Subtitle>
          </PageHeader.Body>
        </PageHeader>
        <YStack padding="$4">
          <Button variant="secondary" onPress={() => navigate('/messages')}>
            <Button.Icon><ChevronLeft size={16} aria-hidden /></Button.Icon>
            <Button.Text variant="secondary">Back to Messages</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  const allMessages = [...conversation.messages, ...localMessages]

  const handleSend = () => {
    if (draft.trim().length === 0) return
    const newMsg: MockMessage = {
      id: `local-${Date.now()}`,
      senderId: 'me',
      text: draft.trim(),
      timestamp: new Date().toISOString(),
    }
    setLocalMessages((prev) => [...prev, newMsg])
    setDraft('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <YStack flex={1} minHeight="100vh">
      {/* ── Header ──────────────────────────────────────── */}
      <XStack
        padding="$3"
        alignItems="center"
        gap="$3"
        borderBottomWidth={1}
        borderBottomColor="$gray4"
        backgroundColor="$background"
      >
        <Button
          variant="tertiary"
          size="sm"
          onPress={() => navigate('/messages')}
          aria-label="Back to messages"
        >
          <Button.Icon><ChevronLeft size={20} aria-hidden /></Button.Icon>
        </Button>

        <Avatar name={partner.name} size="md" />

        <YStack flex={1} gap="$0.5">
          <Text fontSize="$4" fontWeight="600">{partner.name}</Text>
          <XStack
            alignSelf="flex-start"
            paddingHorizontal="$2"
            paddingVertical="$0.5"
            borderRadius="$10"
            backgroundColor="$purple2"
          >
            <Text fontSize="$1" fontWeight="600" color="$purple9">
              in your pod
            </Text>
          </XStack>
        </YStack>
      </XStack>

      {/* ── Messages area ───────────────────────────────── */}
      <YStack flex={1} padding="$3" gap="$2">
        {/* Date divider */}
        <XStack alignItems="center" gap="$3" paddingVertical="$2">
          <YStack flex={1} height={1} backgroundColor="$gray4" />
          <Text fontSize="$1" color="$gray8" fontWeight="500">Today</Text>
          <YStack flex={1} height={1} backgroundColor="$gray4" />
        </XStack>

        {/* Message bubbles */}
        {allMessages.map((msg: MockMessage) => {
          const isMe = msg.senderId === 'me'
          return (
            <XStack
              key={msg.id}
              justifyContent={isMe ? 'flex-end' : 'flex-start'}
              paddingVertical="$1"
            >
              <YStack
                maxWidth="75%"
                gap="$1"
              >
                <YStack
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                  borderRadius="$4"
                  backgroundColor={isMe ? '$purple9' : '$gray3'}
                  borderBottomRightRadius={isMe ? '$1' : '$4'}
                  borderBottomLeftRadius={isMe ? '$4' : '$1'}
                >
                  <Text
                    fontSize="$3"
                    color={isMe ? 'white' : '$gray12'}
                    lineHeight="$3"
                  >
                    {msg.text}
                  </Text>
                </YStack>
                <Text
                  fontSize="$1"
                  color="$gray8"
                  alignSelf={isMe ? 'flex-end' : 'flex-start'}
                  paddingHorizontal="$1"
                >
                  {formatMessageTime(msg.timestamp)}
                </Text>
              </YStack>
            </XStack>
          )
        })}
      </YStack>

      {/* ── Input area ──────────────────────────────────── */}
      <XStack
        padding="$3"
        gap="$2"
        borderTopWidth={1}
        borderTopColor="$gray4"
        backgroundColor="$background"
        alignItems="flex-end"
      >
        <YStack flex={1}>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${partner.name.split(' ')[0]}...`}
            rows={1}
            aria-label={`Message to ${partner.name}`}
            style={{
              padding: '10px 14px',
              borderRadius: 20,
              border: '1px solid var(--gray6, #d2d8e6)',
              fontSize: 14,
              fontFamily: 'inherit',
              width: '100%',
              resize: 'none',
              background: 'transparent',
              color: 'inherit',
              minHeight: 40,
            }}
          />
        </YStack>
        <Button
          size="sm"
          onPress={handleSend}
          disabled={draft.trim().length === 0}
          aria-label="Send message"
          borderRadius={9999}
          width={40}
          height={40}
        >
          <Button.Icon>
            <Send size={16} aria-hidden />
          </Button.Icon>
        </Button>
      </XStack>
    </YStack>
  )
}
