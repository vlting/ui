import type { ReactNode } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Separator } from '../../primitives/Separator'
import type { BlockProps } from '../_shared/types'

// -- Types --

export type FeedBlockVariant = 'timeline' | 'notifications' | 'comments'

export interface TimelineEvent {
  id: string
  title: string
  description?: string
  date: string
  icon?: ReactNode
  status?: 'completed' | 'current' | 'upcoming'
}

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp: string
  read: boolean
  icon?: ReactNode
  onPress?: () => void
}

export interface CommentItem {
  id: string
  author: { name: string; avatar?: string }
  text: string
  timestamp: string
  likes?: number
  liked?: boolean
  replies?: CommentItem[]
}

export interface FeedBlockProps extends BlockProps {
  variant: FeedBlockVariant
  title?: string
  events?: TimelineEvent[]
  notifications?: NotificationItem[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  comments?: CommentItem[]
  onReply?: (parentId: string, text: string) => void
  onLike?: (id: string) => void
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Main component --

export function FeedBlock(props: FeedBlockProps) {
  switch (props.variant) {
    case 'timeline':
      return <TimelineFeed {...props} />
    case 'notifications':
      return <NotificationsFeed {...props} />
    case 'comments':
      return <CommentsFeed {...props} />
  }
}

// -- Timeline variant --

function TimelineFeed({ title, events = [] }: FeedBlockProps) {
  return (
    <Card style={{ width: '100%', maxWidth: 600, padding: 16 }}>
      <div style={{ ...col, gap: 16 }}>
        {title && <span style={{ fontSize: 18, fontWeight: 600 }}>{title}</span>}
        <div
          style={{ ...col, gap: 0, paddingLeft: 12 }}
          role="feed"
          aria-label={title ?? 'Timeline'}
        >
          {events.map((event, i) => {
            const isLast = i === events.length - 1
            const dotColor =
              event.status === 'completed'
                ? 'var(--green10)'
                : event.status === 'current'
                  ? 'var(--color10)'
                  : 'var(--borderColor)'

            return (
              <div key={event.id} style={{ ...row, gap: 12 }}>
                <div style={{ ...col, alignItems: 'center', width: 24 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: dotColor,
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  />
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        width: 2,
                        backgroundColor: 'var(--borderColor)',
                        minHeight: 40,
                      }}
                    />
                  )}
                </div>
                <div style={{ ...col, flex: 1, gap: 2, paddingBottom: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{event.title}</span>
                  {event.description && (
                    <span style={{ fontSize: 14, opacity: 0.6 }}>
                      {event.description}
                    </span>
                  )}
                  <span style={{ fontSize: 12, opacity: 0.5 }}>{event.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

// -- Notifications variant --

function NotificationsFeed({
  title = 'Notifications',
  notifications = [],
  onMarkRead,
  onMarkAllRead,
}: FeedBlockProps) {
  return (
    <Card style={{ width: '100%', maxWidth: 500, padding: 16 }}>
      <div style={{ ...col, gap: 12 }}>
        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>{title}</span>
          {onMarkAllRead && (
            <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
              <Button.Text>Mark all read</Button.Text>
            </Button>
          )}
        </div>
        <div style={{ ...col }} role="feed" aria-label={title}>
          {notifications.map((item, i) => (
            <div key={item.id}>
              {i > 0 && <Separator />}
              <div
                role="article"
                aria-label={item.title}
                style={{
                  ...row,
                  gap: 12,
                  padding: 12,
                  alignItems: 'flex-start',
                  opacity: item.read ? 0.6 : 1,
                  cursor: item.onPress ? 'pointer' : 'default',
                  borderRadius: 4,
                }}
                onClick={() => {
                  item.onPress?.()
                  if (!item.read) onMarkRead?.(item.id)
                }}
              >
                {item.icon && (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 2,
                    }}
                  >
                    {item.icon}
                  </div>
                )}
                <div style={{ ...col, flex: 1, gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: item.read ? 400 : 500 }}>
                    {item.title}
                  </span>
                  {item.description && (
                    <span style={{ fontSize: 12, opacity: 0.6 }}>
                      {item.description}
                    </span>
                  )}
                  <span style={{ fontSize: 11, opacity: 0.5 }}>{item.timestamp}</span>
                </div>
                {!item.read && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color10)',
                      marginTop: 4,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// -- Comments variant --

function CommentsFeed({ title = 'Comments', comments = [], onLike }: FeedBlockProps) {
  return (
    <Card style={{ width: '100%', maxWidth: 600, padding: 16 }}>
      <div style={{ ...col, gap: 16 }}>
        {title && <span style={{ fontSize: 18, fontWeight: 600 }}>{title}</span>}
        <div style={{ ...col, gap: 12 }} role="feed" aria-label={title}>
          {comments.map((comment) => (
            <CommentNode key={comment.id} comment={comment} onLike={onLike} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function CommentNode({
  comment,
  onLike,
  depth = 0,
}: {
  comment: CommentItem
  onLike?: (id: string) => void
  depth?: number
}) {
  const initials = comment.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div style={{ ...col, gap: 8, paddingLeft: depth > 0 ? 16 : undefined }}>
      <div style={{ ...row, gap: 10, alignItems: 'flex-start' }}>
        <Avatar size="sm" src={comment.author.avatar} fallback={initials} />
        <div style={{ ...col, flex: 1, gap: 4 }}>
          <div style={{ ...row, gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>
              {comment.author.name}
            </span>
            <span style={{ fontSize: 12, opacity: 0.5 }}>{comment.timestamp}</span>
          </div>
          <span style={{ fontSize: 14 }}>{comment.text}</span>
          <div style={{ ...row, gap: 12, paddingTop: 2 }}>
            {onLike && (
              <Button variant="ghost" size="sm" onClick={() => onLike(comment.id)}>
                <Button.Text>
                  {comment.liked ? '❤' : '♡'} {comment.likes ?? 0}
                </Button.Text>
              </Button>
            )}
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ ...col, gap: 8 }}>
          {comment.replies.map((reply) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              onLike={onLike}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
