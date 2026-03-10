import type { ComponentType, ReactNode } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Badge } from '../../primitives/Badge'
import { Separator } from '../../primitives/Separator'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const CardJsx = Card as AnyFC
const BadgeJsx = Badge as AnyFC

// -- Types --

export type NotificationCenterBlockVariant = 'panel' | 'dropdown' | 'grouped'

export interface Notification {
  id: string
  title: string
  description?: string
  timestamp: string
  read: boolean
  icon?: ReactNode
  avatar?: string
  category?: string
  action?: { label: string; onPress: () => void }
  onPress?: () => void
}

export interface NotificationCenterBlockProps extends BlockProps {
  variant: NotificationCenterBlockVariant
  title?: string
  notifications: Notification[]
  unreadCount?: number
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onDismiss?: (id: string) => void
  onClearAll?: () => void
  emptyMessage?: string
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Shared notification row --

function NotificationRow({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: Notification
  onMarkRead?: (id: string) => void
  onDismiss?: (id: string) => void
}) {
  const initials = notification.avatar
    ? undefined
    : notification.title.charAt(0).toUpperCase()

  return (
    <div
      role="article"
      aria-label={notification.title}
      onClick={() => {
        notification.onPress?.()
        if (!notification.read) onMarkRead?.(notification.id)
      }}
      style={{
        ...row,
        gap: 12,
        padding: 12,
        alignItems: 'flex-start',
        cursor: notification.onPress ? 'pointer' : 'default',
        opacity: notification.read ? 0.7 : 1,
        borderRadius: 'var(--radius3, 6px)',
        backgroundColor: notification.read
          ? 'transparent'
          : 'var(--background2, rgba(0,0,0,0.02))',
      }}
    >
      {(notification.avatar || notification.icon) && (
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {notification.avatar ? (
            <Avatar size="sm" src={notification.avatar} fallback={initials} />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {notification.icon}
            </div>
          )}
        </div>
      )}
      <div style={{ ...col, flex: 1, gap: 4 }}>
        <div style={{ ...row, gap: 8, alignItems: 'center' }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: notification.read ? 400 : 600,
              fontFamily: 'var(--font-body)',
              flex: 1,
            }}
          >
            {notification.title}
          </span>
          {!notification.read && (
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--color10, #0066ff)',
                flexShrink: 0,
              }}
            />
          )}
        </div>
        {notification.description && (
          <span style={{ fontSize: 13, opacity: 0.7, fontFamily: 'var(--font-body)' }}>
            {notification.description}
          </span>
        )}
        <div style={{ ...row, gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            {notification.timestamp}
          </span>
          {notification.action && (
            <ButtonJsx
              variant="ghost"
              size="sm"
              onPress={notification.action.onPress}
              aria-label={notification.action.label}
            >
              <ButtonTextJsx>{notification.action.label}</ButtonTextJsx>
            </ButtonJsx>
          )}
        </div>
      </div>
      {onDismiss && (
        <ButtonJsx
          variant="ghost"
          size="sm"
          onPress={() => onDismiss(notification.id)}
          aria-label={`Dismiss ${notification.title}`}
        >
          <ButtonTextJsx>x</ButtonTextJsx>
        </ButtonJsx>
      )}
    </div>
  )
}

// -- Main component --

export function NotificationCenterBlock(props: NotificationCenterBlockProps) {
  switch (props.variant) {
    case 'panel':
      return <PanelNotifications {...props} />
    case 'dropdown':
      return <DropdownNotifications {...props} />
    case 'grouped':
      return <GroupedNotifications {...props} />
  }
}

// -- Panel variant --

function PanelNotifications({
  title = 'Notifications',
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  emptyMessage = 'No notifications',
}: NotificationCenterBlockProps) {
  const count = unreadCount ?? notifications.filter((n) => !n.read).length

  return (
    <CardJsx style={{ width: '100%', maxWidth: 500, padding: 16 }}>
      <div style={{ ...col, gap: 12 }}>
        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...row, gap: 8, alignItems: 'center' }}>
            <span
              style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </span>
            {count > 0 && (
              <BadgeJsx variant="secondary">
                <span style={{ fontSize: 12, fontFamily: 'var(--font-body)' }}>
                  {count}
                </span>
              </BadgeJsx>
            )}
          </div>
          {onMarkAllRead && count > 0 && (
            <ButtonJsx
              variant="ghost"
              size="sm"
              onPress={onMarkAllRead}
              aria-label="Mark all as read"
            >
              <ButtonTextJsx>Mark all read</ButtonTextJsx>
            </ButtonJsx>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', opacity: 0.5 }}>
            <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
              {emptyMessage}
            </span>
          </div>
        ) : (
          <div style={{ ...col }} role="feed" aria-label={title} aria-live="polite">
            {notifications.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onMarkRead={onMarkRead}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        )}
      </div>
    </CardJsx>
  )
}

// -- Dropdown variant --

function DropdownNotifications({
  title = 'Notifications',
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClearAll,
  emptyMessage = 'All caught up!',
}: NotificationCenterBlockProps) {
  const count = unreadCount ?? notifications.filter((n) => !n.read).length

  return (
    <CardJsx
      style={{
        width: 380,
        maxHeight: 480,
        overflow: 'auto',
        padding: 0,
        borderRadius: 'var(--radius4, 8px)',
        boxShadow: 'var(--shadow5, 0 4px 24px rgba(0,0,0,0.12))',
      }}
    >
      <div style={{ ...col }}>
        <div
          style={{
            ...row,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--borderColor, #e5e7eb)',
          }}
        >
          <div style={{ ...row, gap: 8, alignItems: 'center' }}>
            <span
              style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </span>
            {count > 0 && (
              <BadgeJsx variant="default">
                <span style={{ fontSize: 11, fontFamily: 'var(--font-body)' }}>
                  {count}
                </span>
              </BadgeJsx>
            )}
          </div>
          {onMarkAllRead && count > 0 && (
            <ButtonJsx
              variant="ghost"
              size="sm"
              onPress={onMarkAllRead}
              aria-label="Mark all as read"
            >
              <ButtonTextJsx>Mark all read</ButtonTextJsx>
            </ButtonJsx>
          )}
        </div>
        {notifications.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', opacity: 0.5 }}>
            <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
              {emptyMessage}
            </span>
          </div>
        ) : (
          <div style={{ ...col, padding: 8 }} role="feed" aria-label={title} aria-live="polite">
            {notifications.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onMarkRead={onMarkRead}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        )}
        {onClearAll && notifications.length > 0 && (
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--borderColor, #e5e7eb)',
              textAlign: 'center',
            }}
          >
            <ButtonJsx
              variant="ghost"
              size="sm"
              onPress={onClearAll}
              aria-label="Clear all notifications"
            >
              <ButtonTextJsx>Clear all</ButtonTextJsx>
            </ButtonJsx>
          </div>
        )}
      </div>
    </CardJsx>
  )
}

// -- Grouped variant --

function GroupedNotifications({
  title = 'Notifications',
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  emptyMessage = 'No notifications',
}: NotificationCenterBlockProps) {
  // Group by category
  const groups = new Map<string, Notification[]>()
  for (const n of notifications) {
    const cat = n.category ?? 'Other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(n)
  }

  return (
    <CardJsx style={{ width: '100%', maxWidth: 500, padding: 16 }}>
      <div style={{ ...col, gap: 16 }}>
        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </span>
          {onMarkAllRead && (
            <ButtonJsx
              variant="ghost"
              size="sm"
              onPress={onMarkAllRead}
              aria-label="Mark all as read"
            >
              <ButtonTextJsx>Mark all read</ButtonTextJsx>
            </ButtonJsx>
          )}
        </div>
        {notifications.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', opacity: 0.5 }}>
            <span style={{ fontSize: 14, fontFamily: 'var(--font-body)' }}>
              {emptyMessage}
            </span>
          </div>
        ) : (
          <div style={{ ...col, gap: 16 }} role="feed" aria-label={title} aria-live="polite">
            {Array.from(groups.entries()).map(([category, items]) => (
              <div key={category} style={{ ...col, gap: 4 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    opacity: 0.5,
                    fontFamily: 'var(--font-body)',
                    padding: '0 12px',
                  }}
                >
                  {category}
                </span>
                {items.map((n) => (
                  <NotificationRow
                    key={n.id}
                    notification={n}
                    onMarkRead={onMarkRead}
                    onDismiss={onDismiss}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </CardJsx>
  )
}
