import type { ComponentType, ReactNode } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Separator } from '../../primitives/Separator'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC
const CardJsx = Card as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const AvatarJsx = Avatar as AnyFC
const SeparatorJsx = Separator as AnyFC

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
    <CardJsx width="100%" style={{ maxWidth: 600 }} padding="$4">
      <YStackJsx gap="$4">
        {title && (
          <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
            {title}
          </TextJsx>
        )}
        <YStackJsx gap="$0" paddingLeft="$3">
          {events.map((event, i) => {
            const isLast = i === events.length - 1
            const dotColor =
              event.status === 'completed'
                ? '$green10'
                : event.status === 'current'
                  ? '$color10'
                  : '$colorSubtle'

            return (
              <XStackJsx key={event.id} gap="$3">
                <YStackJsx alignItems="center" width={24}>
                  <ViewJsx
                    width={10}
                    height={10}
                    borderRadius="$full"
                    backgroundColor={dotColor}
                    marginTop="$1"
                  />
                  {!isLast && (
                    <ViewJsx
                      flex={1}
                      width={2}
                      backgroundColor="$borderColor"
                      minHeight={40}
                    />
                  )}
                </YStackJsx>
                <YStackJsx flex={1} gap="$0.5" paddingBottom="$4">
                  <TextJsx fontSize="$4" fontWeight="$3" fontFamily="$body" color="$color">
                    {event.title}
                  </TextJsx>
                  {event.description && (
                    <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
                      {event.description}
                    </TextJsx>
                  )}
                  <TextJsx fontSize="$2" fontFamily="$body" color="$colorSubtle">
                    {event.date}
                  </TextJsx>
                </YStackJsx>
              </XStackJsx>
            )
          })}
        </YStackJsx>
      </YStackJsx>
    </CardJsx>
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
    <CardJsx width="100%" style={{ maxWidth: 500 }} padding="$4">
      <YStackJsx gap="$3">
        <XStackJsx justifyContent="space-between" alignItems="center">
          <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
            {title}
          </TextJsx>
          {onMarkAllRead && (
            <ButtonJsx variant="ghost" size="sm" onPress={onMarkAllRead}>
              <ButtonTextJsx>Mark all read</ButtonTextJsx>
            </ButtonJsx>
          )}
        </XStackJsx>

        <YStackJsx gap="$0">
          {notifications.map((item, i) => (
            <ViewJsx key={item.id}>
              {i > 0 && <SeparatorJsx />}
              <XStackJsx
                gap="$3"
                padding="$3"
                alignItems="flex-start"
                opacity={item.read ? 0.6 : 1}
                cursor={item.onPress ? 'pointer' : 'default'}
                hoverStyle={item.onPress ? { backgroundColor: '$backgroundHover' } : {}}
                borderRadius="$2"
                onPress={() => {
                  item.onPress?.()
                  if (!item.read) onMarkRead?.(item.id)
                }}
              >
                {item.icon && (
                  <ViewJsx
                    width="$2"
                    height="$2"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="$0.5"
                  >
                    {item.icon}
                  </ViewJsx>
                )}
                <YStackJsx flex={1} gap="$0.5">
                  <TextJsx
                    fontSize="$3"
                    fontWeight={item.read ? '$2' : '$3'}
                    fontFamily="$body"
                    color="$color"
                  >
                    {item.title}
                  </TextJsx>
                  {item.description && (
                    <TextJsx fontSize="$2" fontFamily="$body" color="$colorSubtle">
                      {item.description}
                    </TextJsx>
                  )}
                  <TextJsx fontSize="$1" fontFamily="$body" color="$colorSubtle">
                    {item.timestamp}
                  </TextJsx>
                </YStackJsx>
                {!item.read && (
                  <ViewJsx
                    width={8}
                    height={8}
                    borderRadius="$full"
                    backgroundColor="$color10"
                    marginTop="$1"
                  />
                )}
              </XStackJsx>
            </ViewJsx>
          ))}
        </YStackJsx>
      </YStackJsx>
    </CardJsx>
  )
}

// -- Comments variant --

function CommentsFeed({
  title = 'Comments',
  comments = [],
  onLike,
}: FeedBlockProps) {
  return (
    <CardJsx width="100%" style={{ maxWidth: 600 }} padding="$4">
      <YStackJsx gap="$4">
        {title && (
          <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
            {title}
          </TextJsx>
        )}
        <YStackJsx gap="$3">
          {comments.map((comment) => (
            <CommentNode key={comment.id} comment={comment} onLike={onLike} />
          ))}
        </YStackJsx>
      </YStackJsx>
    </CardJsx>
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
    <YStackJsx gap="$2" paddingLeft={depth > 0 ? '$4' : undefined}>
      <XStackJsx gap="$2.5" alignItems="flex-start">
        <AvatarJsx
          size="sm"
          src={comment.author.avatar}
          fallback={initials}
        />
        <YStackJsx flex={1} gap="$1">
          <XStackJsx gap="$2" alignItems="center">
            <TextJsx fontSize="$3" fontWeight="$3" fontFamily="$body" color="$color">
              {comment.author.name}
            </TextJsx>
            <TextJsx fontSize="$2" fontFamily="$body" color="$colorSubtle">
              {comment.timestamp}
            </TextJsx>
          </XStackJsx>
          <TextJsx fontSize="$3" fontFamily="$body" color="$color">
            {comment.text}
          </TextJsx>
          <XStackJsx gap="$3" paddingTop="$0.5">
            {onLike && (
              <ButtonJsx
                variant="ghost"
                size="sm"
                onPress={() => onLike(comment.id)}
              >
                <ButtonTextJsx>
                  {comment.liked ? '\u2764' : '\u2661'} {comment.likes ?? 0}
                </ButtonTextJsx>
              </ButtonJsx>
            )}
          </XStackJsx>
        </YStackJsx>
      </XStackJsx>

      {comment.replies && comment.replies.length > 0 && (
        <YStackJsx gap="$2">
          {comment.replies.map((reply) => (
            <CommentNode key={reply.id} comment={reply} onLike={onLike} depth={depth + 1} />
          ))}
        </YStackJsx>
      )}
    </YStackJsx>
  )
}
