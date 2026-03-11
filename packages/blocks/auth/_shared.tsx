import type { ReactNode } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Separator } from '../../primitives/Separator'
import { Text } from '../../primitives/Text'
import { styled } from '../../stl-react/src/config'
import type { SocialProvider } from '../_shared/types'

const FooterLinkBtn = styled(
  'button',
  {
    display: 'inline',
    appearance: 'none',
    border: 'none',
    background: 'none',
    padding: '0',
    margin: '0',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'var(--color10, #0066ff)',
    cursor: 'pointer',
    textDecoration: 'underline',
    outline: 'none',
  },
  'AuthFooterLinkButton',
)

const FooterLinkA = styled(
  'a',
  {
    color: 'var(--color10, #0066ff)',
    textDecoration: 'underline',
    outline: 'none',
  },
  'AuthFooterLinkAnchor',
)

// -- AuthFormCard --

export interface AuthFormCardProps {
  children?: ReactNode
}

export function AuthFormCard({ children }: AuthFormCardProps) {
  return <Card style={{ width: '100%', maxWidth: 400, padding: '24px' }}>{children}</Card>
}

// -- AuthFormHeader --

export interface AuthFormHeaderProps {
  logo?: ReactNode
  title: string
  description?: string
}

export function AuthFormHeader({ logo, title, description }: AuthFormHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {logo}
      <Text style={{ fontSize: '18px', fontWeight: 600, textAlign: 'center' }}>
        {title}
      </Text>
      {description ? (
        <Text style={{ fontSize: '14px', opacity: 0.6, textAlign: 'center' }}>
          {description}
        </Text>
      ) : null}
    </div>
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
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}
      >
        {providers.map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            onClick={provider.onPress}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {provider.icon}
              <Button.Text>Continue with {provider.name}</Button.Text>
            </div>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          size="icon"
          onClick={provider.onPress}
          aria-label={`Continue with ${provider.name}`}
        >
          {provider.icon}
        </Button>
      ))}
    </div>
  )
}

// -- AuthDivider --

export interface AuthDividerProps {
  text?: string
}

export function AuthDivider({ text = 'or continue with' }: AuthDividerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <Separator style={{ flex: 1 }} />
      <Text style={{ fontSize: '12px', opacity: 0.6 }}>{text}</Text>
      <Separator style={{ flex: 1 }} />
    </div>
  )
}

// -- AuthFooterLink --

export interface AuthFooterLinkProps {
  text: string
  linkText: string
  href?: string
  onPress?: () => void
}

export function AuthFooterLink({ text, linkText, href, onPress }: AuthFooterLinkProps) {
  return (
    <Text style={{ fontSize: '12px', opacity: 0.6, textAlign: 'center' }}>
      {text}{' '}
      {href ? (
        <FooterLinkA href={href}>{linkText}</FooterLinkA>
      ) : (
        <FooterLinkBtn type="button" onClick={onPress}>
          {linkText}
        </FooterLinkBtn>
      )}
    </Text>
  )
}

// -- AuthErrorMessage --

export function AuthErrorMessage({ error }: { error?: string }) {
  if (!error) return null
  return (
    <Text style={{ fontSize: '12px', color: 'red', textAlign: 'center' }} role="alert">
      {error}
    </Text>
  )
}
