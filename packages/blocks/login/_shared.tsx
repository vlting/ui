import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { XStack, YStack } from 'tamagui'
import { styledHtml } from '@tamagui/web'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import type { SocialProvider } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>

const CardJsx = Card as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const TextJsx = Text as AnyFC
const SeparatorJsx = Separator as AnyFC
const YStackJsx = YStack as AnyFC
const XStackJsx = XStack as AnyFC

// -- AuthFormCard --

export interface AuthFormCardProps {
  children?: ReactNode
}

export function AuthFormCard({ children }: AuthFormCardProps) {
  return (
    <CardJsx
      width="100%"
      style={{ maxWidth: 400 }}
      paddingHorizontal="$6"
      paddingVertical="$6"
    >
      {children}
    </CardJsx>
  )
}

// -- AuthFormHeader --

export interface AuthFormHeaderProps {
  logo?: ReactNode
  title: string
  description?: string
}

export function AuthFormHeader({ logo, title, description }: AuthFormHeaderProps) {
  return (
    <YStackJsx alignItems="center" gap="$2">
      {logo}
      <TextJsx
        fontSize="$6"
        fontWeight="$4"
        fontFamily="$heading"
        textAlign="center"
      >
        {title}
      </TextJsx>
      {description ? (
        <TextJsx
          fontSize="$3"
          color="$colorSubtitle"
          fontFamily="$body"
          textAlign="center"
        >
          {description}
        </TextJsx>
      ) : null}
    </YStackJsx>
  )
}

// -- AuthSocialButtons --

export interface AuthSocialButtonsProps {
  providers: SocialProvider[]
}

export function AuthSocialButtons({ providers }: AuthSocialButtonsProps) {
  if (providers.length === 0) return null

  if (providers.length <= 2) {
    return (
      <YStackJsx gap="$2" width="100%">
        {providers.map((provider) => (
          <ButtonJsx
            key={provider.name}
            variant="outline"
            onPress={provider.onPress}
            width="100%"
          >
            <XStackJsx alignItems="center" gap="$2">
              {provider.icon}
              <ButtonTextJsx>Continue with {provider.name}</ButtonTextJsx>
            </XStackJsx>
          </ButtonJsx>
        ))}
      </YStackJsx>
    )
  }

  return (
    <XStackJsx gap="$2" justifyContent="center" width="100%">
      {providers.map((provider) => (
        <ButtonJsx
          key={provider.name}
          variant="outline"
          size="icon"
          onPress={provider.onPress}
          aria-label={`Continue with ${provider.name}`}
        >
          {provider.icon}
        </ButtonJsx>
      ))}
    </XStackJsx>
  )
}

// -- AuthDivider --

export interface AuthDividerProps {
  text?: string
}

export function AuthDivider({ text = 'or continue with' }: AuthDividerProps) {
  return (
    <XStackJsx alignItems="center" gap="$2" width="100%">
      <SeparatorJsx flex={1} />
      <TextJsx fontSize="$2" color="$colorSubtitle">
        {text}
      </TextJsx>
      <SeparatorJsx flex={1} />
    </XStackJsx>
  )
}

// -- AuthFooterLink --

const FooterLinkButton = styledHtml('button', {
  display: 'inline',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: '$color10',
  cursor: 'pointer',
  textDecoration: 'underline',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const FooterLinkButtonJsx = FooterLinkButton as AnyFC

const FooterLinkAnchor = styledHtml('a', {
  color: '$color10',
  textDecoration: 'underline',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const FooterLinkAnchorJsx = FooterLinkAnchor as AnyFC

export interface AuthFooterLinkProps {
  text: string
  linkText: string
  href?: string
  onPress?: () => void
}

export function AuthFooterLink({ text, linkText, href, onPress }: AuthFooterLinkProps) {
  return (
    <TextJsx fontSize="$2" color="$colorSubtitle" textAlign="center">
      {text}{' '}
      {href ? (
        <FooterLinkAnchorJsx href={href}>{linkText}</FooterLinkAnchorJsx>
      ) : (
        <FooterLinkButtonJsx type="button" onClick={onPress}>
          {linkText}
        </FooterLinkButtonJsx>
      )}
    </TextJsx>
  )
}
