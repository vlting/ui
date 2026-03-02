import type { ReactNode } from 'react'

/** Base props all blocks accept */
export interface BlockProps {
  children?: ReactNode
}

/** Social login provider definition */
export interface SocialProvider {
  /** Display name (e.g., "Google", "GitHub") */
  name: string
  /** Icon element to render */
  icon: ReactNode
  /** Handler when this provider is selected */
  onPress: () => void
}

/** Common props shared by all auth blocks (login + signup) */
export interface AuthBlockProps extends BlockProps {
  /** Form submit handler */
  onSubmit?: (data: Record<string, string>) => void
  /** Optional social login providers */
  socialProviders?: SocialProvider[]
  /** Optional logo element rendered above the form */
  logo?: ReactNode
  /** Loading state for the submit button */
  loading?: boolean
  /** Error message to display at the top of the form */
  error?: string
}

/** Login-specific props extending AuthBlockProps */
export interface LoginBlockProps extends AuthBlockProps {
  /** "Forgot password" link href or handler */
  forgotPasswordHref?: string
  onForgotPassword?: () => void
  /** "Sign up" redirect link href or handler */
  signupHref?: string
  onSignup?: () => void
}

/** Signup-specific props extending AuthBlockProps */
export interface SignupBlockProps extends AuthBlockProps {
  /** "Sign in" redirect link href or handler */
  loginHref?: string
  onLogin?: () => void
  /** Terms of service acceptance (if the block has a checkbox) */
  termsHref?: string
  privacyHref?: string
}
