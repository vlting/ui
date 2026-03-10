import type { ComponentType, ReactNode } from 'react'
import { styled } from '../../stl-react/src/config'
import { Badge } from '../../primitives/Badge'
import { Button } from '../../components/Button'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const BadgeJsx = Badge as AnyFC

const Anchor = styled('a', { textDecoration: 'none', color: 'inherit' }, 'HeroAnchor')

// -- Types --

export type HeroBlockVariant = 'centered' | 'split' | 'image-bg'

export interface HeroAction {
  label: string
  onPress?: () => void
  href?: string
}

export interface HeroBlockProps extends BlockProps {
  variant: HeroBlockVariant
  title: string
  description?: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  media?: ReactNode
  mediaPosition?: 'left' | 'right'
  backgroundImage?: string
  overlay?: boolean
  badge?: string
  align?: 'left' | 'center'
}

// -- Main component --

export function HeroBlock(props: HeroBlockProps) {
  switch (props.variant) {
    case 'centered':
      return <HeroCentered {...props} />
    case 'split':
      return <HeroSplit {...props} />
    case 'image-bg':
      return <HeroImageBg {...props} />
  }
}

// -- Action button helper --

function ActionButton({
  action,
  variant,
}: {
  action: HeroAction
  variant: 'default' | 'outline'
}) {
  const btn = (
    <ButtonJsx variant={variant} onPress={action.onPress}>
      <ButtonTextJsx>{action.label}</ButtonTextJsx>
    </ButtonJsx>
  )
  if (action.href) {
    return <Anchor href={action.href}>{btn}</Anchor>
  }
  return btn
}

// -- Centered variant --

function HeroCentered({
  title,
  description,
  primaryAction,
  secondaryAction,
  badge,
  align = 'center',
}: HeroBlockProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        justifyContent: 'center',
        padding: 32,
        gap: 16,
        minHeight: 400,
        width: '100%',
      }}
    >
      {badge && (
        <BadgeJsx variant="secondary">
          <span style={{ fontSize: 12, fontFamily: 'var(--font-body)' }}>{badge}</span>
        </BadgeJsx>
      )}
      <span
        style={{
          fontSize: 48,
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          color: 'var(--color)',
          textAlign: align,
          maxWidth: 800,
        }}
      >
        {title}
      </span>
      {description && (
        <span
          style={{
            fontSize: 18,
            fontFamily: 'var(--font-body)',
            color: 'var(--secondaryText12)',
            textAlign: align,
            maxWidth: 600,
          }}
        >
          {description}
        </span>
      )}
      {(primaryAction || secondaryAction) && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, paddingTop: 8 }}>
          {primaryAction && <ActionButton action={primaryAction} variant="default" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
        </div>
      )}
    </div>
  )
}

// -- Split variant --

function HeroSplit({
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  mediaPosition = 'right',
  badge,
  align = 'left',
}: HeroBlockProps) {
  const textContent = (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {badge && (
        <BadgeJsx variant="secondary">
          <span style={{ fontSize: 12, fontFamily: 'var(--font-body)' }}>{badge}</span>
        </BadgeJsx>
      )}
      <span
        style={{
          fontSize: 36,
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          color: 'var(--color)',
          textAlign: align,
        }}
      >
        {title}
      </span>
      {description && (
        <span
          style={{
            fontSize: 18,
            fontFamily: 'var(--font-body)',
            color: 'var(--secondaryText12)',
            textAlign: align,
          }}
        >
          {description}
        </span>
      )}
      {(primaryAction || secondaryAction) && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, paddingTop: 8 }}>
          {primaryAction && <ActionButton action={primaryAction} variant="default" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
        </div>
      )}
    </div>
  )

  const mediaContent = media ? (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {media}
    </div>
  ) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: 400 }}>
      {mediaPosition === 'left' ? (
        <>
          {mediaContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {mediaContent}
        </>
      )}
    </div>
  )
}

// -- Image background variant --

function HeroImageBg({
  title,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  overlay = true,
  badge,
}: HeroBlockProps) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        position: 'relative',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {overlay && (
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {badge && (
          <BadgeJsx variant="secondary">
            <span style={{ fontSize: 12, fontFamily: 'var(--font-body)' }}>{badge}</span>
          </BadgeJsx>
        )}
        <span
          style={{
            fontSize: 48,
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            color: 'white',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          {title}
        </span>
        {description && (
          <span
            style={{
              fontSize: 18,
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              maxWidth: 600,
            }}
          >
            {description}
          </span>
        )}
        {(primaryAction || secondaryAction) && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, paddingTop: 8 }}>
            {primaryAction && <ActionButton action={primaryAction} variant="default" />}
            {secondaryAction && (
              <ActionButton action={secondaryAction} variant="outline" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
