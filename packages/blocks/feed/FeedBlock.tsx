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
    <Card style={{ width: '100%', maxWidth: 600, padding: '16px' }}>
      <div style={{ ...col, gap: '16px' }}>
        {title && <span style={{ fontSize: '18px', fontWeight: 600 }}>{title}</span>}
        <div style={{ ...col, gap: '0', paddingLeft: '12px' }}>
          {events.map((event, i) => {
            const isLast = i === events.length - 1
            const dotColor = event.status === 'completed' ? 'green' : event.status === 'current' ? 'var(--color10, #0066ff)' : '#d1d5db'

            return (
              <div key={event.id} style={{ ...row, gap: '12px' }}>
                <div style={{ ...col, alignItems: 'center', width: '24px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: dotColor, marginTop: '4px', flexShrink: 0 }} />
                  {!isLast && <div style={{ flex: 1, width: '2px', backgroundColor: 'var(--borderColor, #e5e7eb)', minHeight: '40px' }} />}
                </div>
                <div style={{ ...col, flex: 1, gap: '2px', paddingBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 500 }}>{event.title}</span>
                  {event.description && <span style={{ fontSize: '14px', opacity: 0.6 }}>{event.description}</span>}
                  <span style={{ fontSize: '12px', opacity: 0.5 }}>{event.date}</span>
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

function NotificationsFeed({ title = 'Notifications', notifications = [], onMarkRead, onMarkAllRead }: FeedBlockProps) {
  return (
    <Card style={{ width: '100%', maxWidth: 500, padding: '16px' }}>
      <div style={{ ...col, gap: '12px' }}>
        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>{title}</span>
          {onMarkAllRead && (
            <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
              <Button.Text>Mark all read</Button.Text>
            </Button>
          )}
        </div>
        <div style={{ ...col }}>
          {notifications.map((item, i) => (
            <div key={item.id}>
              {i > 0 && <Separator />}
              <div
                style={{
                  ...row,
                  gap: '12px',
                  padding: '12px',
                  alignItems: 'flex-start',
                  opacity: item.read ? 0.6 : 1,
                  cursor: item.onPress ? 'pointer' : 'default',
                  borderRadius: '4px',
                }}
                onClick={() => {
                  item.onPress?.()
                  if (!item.read) onMarkRead?.(item.id)
                }}
              >
                {item.icon && (
                  <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                    {item.icon}
                  </div>
                )}
                <div style={{ ...col, flex: 1, gap: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: item.read ? 400 : 500 }}>{item.title}</span>
                  {item.description && <span style={{ fontSize: '12px', opacity: 0.6 }}>{item.description}</span>}
                  <span style={{ fontSize: '11px', opacity: 0.5 }}>{item.timestamp}</span>
                </div>
                {!item.read && (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color10, #0066ff)', marginTop: '4px' }} />
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
    <Card style={{ width: '100%', maxWidth: 600, padding: '16px' }}>
      <div style={{ ...col, gap: '16px' }}>
        {title && <span style={{ fontSize: '18px', fontWeight: 600 }}>{title}</span>}
        <div style={{ ...col, gap: '12px' }}>
          {comments.map((comment) => (
            <CommentNode key={comment.id} comment={comment} onLike={onLike} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function CommentNode({ comment, onLike, depth = 0 }: { comment: CommentItem; onLike?: (id: string) => void; depth?: number }) {
  const initials = comment.author.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{ ...col, gap: '8px', paddingLeft: depth > 0 ? '16px' : undefined }}>
      <div style={{ ...row, gap: '10px', alignItems: 'flex-start' }}>
        <Avatar size="sm" src={comment.author.avatar} fallback={initials} />
        <div style={{ ...col, flex: 1, gap: '4px' }}>
          <div style={{ ...row, gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{comment.author.name}</span>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>{comment.timestamp}</span>
          </div>
          <span style={{ fontSize: '14px' }}>{comment.text}</span>
          <div style={{ ...row, gap: '12px', paddingTop: '2px' }}>
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
        <div style={{ ...col, gap: '8px' }}>
          {comment.replies.map((reply) => (
            <CommentNode key={reply.id} comment={reply} onLike={onLike} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
