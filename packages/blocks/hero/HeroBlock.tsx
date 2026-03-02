import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { Badge } from '../../primitives/Badge'
import { Button } from '../../components/Button'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const BadgeJsx = Badge as AnyFC

const AnchorEl = styledHtml('a', {
  textDecoration: 'none',
  color: 'inherit',
} as any)
const AnchorJsx = AnchorEl as AnyFC

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
    return <AnchorJsx href={action.href}>{btn}</AnchorJsx>
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
    <YStackJsx
      alignItems={align === 'center' ? 'center' : 'flex-start'}
      justifyContent="center"
      padding="$8"
      gap="$4"
      minHeight={400}
      width="100%"
    >
      {badge && (
        <BadgeJsx variant="secondary">
          <TextJsx fontSize="$2" fontFamily="$body">{badge}</TextJsx>
        </BadgeJsx>
      )}
      <TextJsx
        fontSize="$10"
        fontWeight="$4"
        fontFamily="$heading"
        color="$color"
        textAlign={align}
        style={{ maxWidth: 800 }}
      >
        {title}
      </TextJsx>
      {description && (
        <TextJsx
          fontSize="$5"
          fontFamily="$body"
          color="$colorSubtle"
          textAlign={align}
          style={{ maxWidth: 600 }}
        >
          {description}
        </TextJsx>
      )}
      {(primaryAction || secondaryAction) && (
        <XStackJsx gap="$3" paddingTop="$2">
          {primaryAction && <ActionButton action={primaryAction} variant="default" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
        </XStackJsx>
      )}
    </YStackJsx>
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
    <YStackJsx
      flex={1}
      justifyContent="center"
      gap="$4"
      padding="$6"
      alignItems={align === 'center' ? 'center' : 'flex-start'}
    >
      {badge && (
        <BadgeJsx variant="secondary">
          <TextJsx fontSize="$2" fontFamily="$body">{badge}</TextJsx>
        </BadgeJsx>
      )}
      <TextJsx
        fontSize="$9"
        fontWeight="$4"
        fontFamily="$heading"
        color="$color"
        textAlign={align}
      >
        {title}
      </TextJsx>
      {description && (
        <TextJsx fontSize="$5" fontFamily="$body" color="$colorSubtle" textAlign={align}>
          {description}
        </TextJsx>
      )}
      {(primaryAction || secondaryAction) && (
        <XStackJsx gap="$3" paddingTop="$2">
          {primaryAction && <ActionButton action={primaryAction} variant="default" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
        </XStackJsx>
      )}
    </YStackJsx>
  )

  const mediaContent = media ? (
    <ViewJsx flex={1} alignItems="center" justifyContent="center" padding="$4">
      {media}
    </ViewJsx>
  ) : null

  return (
    <XStackJsx
      width="100%"
      minHeight={400}
      $sm={{ flexDirection: 'column' }}
    >
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
    </XStackJsx>
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
    <ViewJsx
      width="100%"
      minHeight={500}
      justifyContent="center"
      alignItems="center"
      padding="$8"
      style={{
        position: 'relative',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {overlay && (
        <ViewJsx
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      )}
      <YStackJsx
        alignItems="center"
        gap="$4"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {badge && (
          <BadgeJsx variant="secondary">
            <TextJsx fontSize="$2" fontFamily="$body">{badge}</TextJsx>
          </BadgeJsx>
        )}
        <TextJsx
          fontSize="$10"
          fontWeight="$4"
          fontFamily="$heading"
          color="white"
          textAlign="center"
          style={{ maxWidth: 800 }}
        >
          {title}
        </TextJsx>
        {description && (
          <TextJsx
            fontSize="$5"
            fontFamily="$body"
            color="rgba(255,255,255,0.85)"
            textAlign="center"
            style={{ maxWidth: 600 }}
          >
            {description}
          </TextJsx>
        )}
        {(primaryAction || secondaryAction) && (
          <XStackJsx gap="$3" paddingTop="$2">
            {primaryAction && <ActionButton action={primaryAction} variant="default" />}
            {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
          </XStackJsx>
        )}
      </YStackJsx>
    </ViewJsx>
  )
}
