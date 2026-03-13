import type { ComponentType, ReactNode } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const CardJsx = Card as AnyFC
const InputJsx = Input as AnyFC

// -- Types --

export type ChatInterfaceBlockVariant = 'standard' | 'bubble' | 'support'

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'other'
  author?: { name: string; avatar?: string }
  timestamp: string
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error'
}

export interface ChatInterfaceBlockProps extends BlockProps {
  variant: ChatInterfaceBlockVariant
  messages: ChatMessage[]
  title?: string
  subtitle?: string
  placeholder?: string
  inputValue?: string
  onInputChange?: (value: string) => void
  onSend?: (text: string) => void
  onRetry?: (id: string) => void
  avatar?: string
  isTyping?: boolean
  headerAction?: ReactNode
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Helpers --

function StatusIndicator({ status }: { status?: ChatMessage['status'] }) {
  if (!status || status === 'sending') return null
  const labels: Record<string, string> = {
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓',
    error: '!',
  }
  return (
    <span
      style={{
        fontSize: 11,
        color:
          status === 'read'
            ? 'var(--color10)'
            : status === 'error'
              ? 'var(--colorError)'
              : 'var(--colorSubtitle)',
      }}
      aria-label={`Message ${status}`}
    >
      {labels[status] ?? ''}
    </span>
  )
}

function ChatInput({
  placeholder = 'Type a message...',
  inputValue,
  onInputChange,
  onSend,
}: {
  placeholder?: string
  inputValue?: string
  onInputChange?: (value: string) => void
  onSend?: (text: string) => void
}) {
  return (
    <div
      style={{
        ...row,
        gap: 8,
        padding: 12,
        borderTop: '1px solid var(--borderColor)',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}>
        <InputJsx
          placeholder={placeholder}
          value={inputValue ?? ''}
          onChangeText={onInputChange}
          aria-label="Message input"
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && inputValue?.trim()) {
              onSend?.(inputValue.trim())
            }
          }}
        />
      </div>
      <ButtonJsx
        variant="solid"
        onPress={() => {
          if (inputValue?.trim()) onSend?.(inputValue.trim())
        }}
        aria-label="Send message"
      >
        Send
      </ButtonJsx>
    </div>
  )
}

// -- Main component --

export function ChatInterfaceBlock(props: ChatInterfaceBlockProps) {
  switch (props.variant) {
    case 'standard':
      return <StandardChat {...props} />
    case 'bubble':
      return <BubbleChat {...props} />
    case 'support':
      return <SupportChat {...props} />
  }
}

// -- Standard variant --

function StandardChat({
  messages,
  title = 'Chat',
  subtitle,
  placeholder,
  inputValue,
  onInputChange,
  onSend,
  headerAction,
  isTyping,
}: ChatInterfaceBlockProps) {
  return (
    <CardJsx style={{ width: '100%', maxWidth: 600, overflow: 'hidden', padding: 0 }}>
      <div style={{ ...col, height: 500 }}>
        {/* Header */}
        <div
          style={{
            ...row,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--borderColor)',
          }}
        >
          <div style={{ ...col, gap: 2 }}>
            <span
              style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{ fontSize: 12, opacity: 0.6, fontFamily: 'var(--font-body)' }}
              >
                {subtitle}
              </span>
            )}
          </div>
          {headerAction}
        </div>
        {/* Messages */}
        <div
          style={{ ...col, flex: 1, overflow: 'auto', padding: 16, gap: 16 }}
          role="log"
          aria-label="Chat messages"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user'
            return (
              <div
                key={msg.id}
                style={{
                  ...col,
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  gap: 4,
                }}
              >
                {msg.author && !isUser && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      opacity: 0.7,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {msg.author.name}
                  </span>
                )}
                <div
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius4)',
                    maxWidth: '75%',
                    backgroundColor: isUser
                      ? 'var(--color10)'
                      : 'var(--background2)',
                    color: isUser
                      ? 'var(--colorOnAccent)'
                      : 'var(--color)',
                  }}
                >
                  <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
                    {msg.text}
                  </span>
                </div>
                <div style={{ ...row, gap: 6, alignItems: 'center' }}>
                  <span
                    style={{ fontSize: 11, opacity: 0.5, fontFamily: 'var(--font-body)' }}
                  >
                    {msg.timestamp}
                  </span>
                  {isUser && <StatusIndicator status={msg.status} />}
                </div>
              </div>
            )
          })}
          {isTyping && (
            <div style={{ ...col, alignItems: 'flex-start' }}>
              <div
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius4)',
                  backgroundColor: 'var(--background2)',
                }}
              >
                <span
                  style={{ fontSize: 14, opacity: 0.5, fontFamily: 'var(--font-body)' }}
                >
                  Typing...
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <ChatInput
          placeholder={placeholder}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSend={onSend}
        />
      </div>
    </CardJsx>
  )
}

// -- Bubble variant --

function BubbleChat({
  messages,
  title = 'Chat',
  subtitle,
  placeholder,
  inputValue,
  onInputChange,
  onSend,
  isTyping,
}: ChatInterfaceBlockProps) {
  return (
    <CardJsx style={{ width: '100%', maxWidth: 600, overflow: 'hidden', padding: 0 }}>
      <div style={{ ...col, height: 500 }}>
        {/* Header */}
        <div
          style={{
            ...row,
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--borderColor)',
            gap: 12,
          }}
        >
          <div style={{ ...col, gap: 2 }}>
            <span
              style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{ fontSize: 12, opacity: 0.6, fontFamily: 'var(--font-body)' }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {/* Messages */}
        <div
          style={{ ...col, flex: 1, overflow: 'auto', padding: 16, gap: 12 }}
          role="log"
          aria-label="Chat messages"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user'
            const initials = msg.author?.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            return (
              <div
                key={msg.id}
                style={{
                  ...row,
                  gap: 8,
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                {!isUser && msg.author && (
                  <Avatar size="sm" src={msg.author.avatar} fallback={initials ?? '?'} />
                )}
                <div style={{ ...col, gap: 2, maxWidth: '70%' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: isUser
                        ? 'var(--radius4) var(--radius4) var(--radius1) var(--radius4)'
                        : 'var(--radius4) var(--radius4) var(--radius4) var(--radius1)',
                      backgroundColor: isUser
                        ? 'var(--color10)'
                        : 'var(--background2)',
                      color: isUser
                        ? 'var(--colorOnAccent)'
                        : 'var(--color)',
                    }}
                  >
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
                      {msg.text}
                    </span>
                  </div>
                  <div
                    style={{
                      ...row,
                      gap: 4,
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        opacity: 0.5,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {msg.timestamp}
                    </span>
                    {isUser && <StatusIndicator status={msg.status} />}
                  </div>
                </div>
              </div>
            )
          })}
          {isTyping && (
            <div style={{ ...row, gap: 8, alignItems: 'flex-end' }}>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius:
                    'var(--radius4) var(--radius4) var(--radius4) var(--radius1)',
                  backgroundColor: 'var(--background2)',
                }}
              >
                <span style={{ fontSize: 14, opacity: 0.5 }}>...</span>
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <ChatInput
          placeholder={placeholder}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSend={onSend}
        />
      </div>
    </CardJsx>
  )
}

// -- Support variant --

function SupportChat({
  messages,
  title = 'Support',
  subtitle = 'We typically reply within minutes',
  placeholder = 'Describe your issue...',
  inputValue,
  onInputChange,
  onSend,
  avatar,
  isTyping,
}: ChatInterfaceBlockProps) {
  return (
    <CardJsx style={{ width: '100%', maxWidth: 420, overflow: 'hidden', padding: 0 }}>
      <div style={{ ...col, height: 520 }}>
        {/* Header */}
        <div
          style={{
            ...col,
            padding: '16px 16px',
            gap: 8,
            backgroundColor: 'var(--color10)',
            color: 'var(--colorOnAccent)',
          }}
        >
          <div style={{ ...row, gap: 12, alignItems: 'center' }}>
            {avatar && <Avatar size="md" src={avatar} fallback="S" />}
            <div style={{ ...col, gap: 2 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {title}
              </span>
              <span
                style={{ fontSize: 13, opacity: 0.85, fontFamily: 'var(--font-body)' }}
              >
                {subtitle}
              </span>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div
          style={{ ...col, flex: 1, overflow: 'auto', padding: 16, gap: 12 }}
          role="log"
          aria-label="Support chat messages"
        >
          {messages.length === 0 && (
            <div
              style={{ ...col, alignItems: 'center', padding: 24, gap: 8, opacity: 0.5 }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                }}
              >
                Send us a message and we will get back to you shortly.
              </span>
            </div>
          )}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user'
            return (
              <div
                key={msg.id}
                style={{
                  ...col,
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius4)',
                    maxWidth: '80%',
                    backgroundColor: isUser
                      ? 'var(--color10)'
                      : 'var(--background2)',
                    color: isUser
                      ? 'var(--colorOnAccent)'
                      : 'var(--color)',
                  }}
                >
                  <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
                    {msg.text}
                  </span>
                </div>
                <span
                  style={{ fontSize: 10, opacity: 0.5, fontFamily: 'var(--font-body)' }}
                >
                  {msg.timestamp}
                </span>
              </div>
            )
          })}
          {isTyping && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius4)',
                backgroundColor: 'var(--background2)',
                alignSelf: 'flex-start',
              }}
            >
              <span
                style={{ fontSize: 14, opacity: 0.5, fontFamily: 'var(--font-body)' }}
              >
                Agent is typing...
              </span>
            </div>
          )}
        </div>
        {/* Input */}
        <ChatInput
          placeholder={placeholder}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSend={onSend}
        />
      </div>
    </CardJsx>
  )
}
