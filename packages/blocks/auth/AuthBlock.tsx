import type React from 'react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Input } from '../../components/Input'
import { styled } from '../../stl-react/src/config'
import type { BlockProps, SocialProvider } from '../_shared/types'
import {
  AuthDivider,
  AuthErrorMessage,
  AuthFooterLink,
  AuthFormCard,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

const FormElement = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
}, { name: 'AuthForm' })

// -- Types --

export type AuthBlockVariant =
  | 'login-standard'
  | 'login-otp'
  | 'login-magic'
  | 'login-social'
  | 'signup-standard'
  | 'signup-social'

export interface AuthBlockProps extends BlockProps {
  variant: AuthBlockVariant
  title?: string
  description?: string
  logo?: ReactNode
  onSubmit?: (data: Record<string, string>) => void
  socialProviders?: SocialProvider[]
  loading?: boolean
  error?: string
  forgotPasswordHref?: string
  onForgotPassword?: () => void
  signupHref?: string
  onSignup?: () => void
  loginHref?: string
  onLogin?: () => void
  termsHref?: string
  privacyHref?: string
}

// -- Default titles per variant --

const variantDefaults: Record<AuthBlockVariant, { title: string; description: string }> =
  {
    'login-standard': {
      title: 'Sign in to your account',
      description: 'Enter your email and password',
    },
    'login-otp': {
      title: 'Verify your identity',
      description: 'Enter the code sent to your email',
    },
    'login-magic': {
      title: 'Sign in with email',
      description: 'Enter your email to receive a sign-in link',
    },
    'login-social': {
      title: 'Sign in',
      description: 'Choose your preferred sign-in method',
    },
    'signup-standard': {
      title: 'Create an account',
      description: 'Enter your information to get started',
    },
    'signup-social': {
      title: 'Create an account',
      description: 'Sign up with your preferred method',
    },
  }

const VStack = { display: 'flex', flexDirection: 'column' as const }

// -- Main component --

export function AuthBlock(props: AuthBlockProps) {
  const defaults = variantDefaults[props.variant]
  const title = props.title ?? defaults.title
  const description = props.description ?? defaults.description
  const resolvedProps = { ...props, title, description }

  switch (props.variant) {
    case 'login-standard':
      return <LoginStandard {...resolvedProps} />
    case 'login-otp':
      return <LoginOtp {...resolvedProps} />
    case 'login-magic':
      return <LoginMagic {...resolvedProps} />
    case 'login-social':
      return <LoginSocial {...resolvedProps} />
    case 'signup-standard':
      return <SignupStandard {...resolvedProps} />
    case 'signup-social':
      return <SignupSocial {...resolvedProps} />
  }
}

// -- login-standard --

function LoginStandard({
  title,
  description,
  logo,
  socialProviders = [],
  forgotPasswordHref,
  onForgotPassword,
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
}: AuthBlockProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}
        <FormElement onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            required
            aria-required="true"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            required
            aria-required="true"
          />
          {(forgotPasswordHref || onForgotPassword) && (
            <AuthFooterLink
              text=""
              linkText="Forgot your password?"
              href={forgotPasswordHref}
              onPress={onForgotPassword}
            />
          )}
          <Button
            variant="solid"
            style={{ width: '100%' }}
            onClick={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
          >
            Sign in
          </Button>
        </FormElement>
        {(signupHref || onSignup) && (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        )}
      </div>
    </AuthFormCard>
  )
}

// -- login-otp --

function LoginOtp({
  title,
  description,
  logo,
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
}: AuthBlockProps) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, code })
  }

  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        <FormElement onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            required
            aria-required="true"
          />
          <Input
            label="Verification code"
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={setCode}
            required
            aria-required="true"
          />
          <Button
            variant="solid"
            style={{ width: '100%' }}
            onClick={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
          >
            Verify
          </Button>
        </FormElement>
        {(signupHref || onSignup) && (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        )}
      </div>
    </AuthFormCard>
  )
}

// -- login-magic --

function LoginMagic({
  title,
  description,
  logo,
  socialProviders = [],
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
}: AuthBlockProps) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email })
  }

  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}
        <FormElement onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            required
            aria-required="true"
          />
          <Button
            variant="solid"
            style={{ width: '100%' }}
            onClick={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
          >
            Send sign-in link
          </Button>
        </FormElement>
        {(signupHref || onSignup) && (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        )}
      </div>
    </AuthFormCard>
  )
}

// -- login-social --

function LoginSocial({
  title,
  description,
  logo,
  socialProviders = [],
  signupHref,
  onSignup,
  error,
}: AuthBlockProps) {
  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        <AuthSocialButtons providers={socialProviders} />
        {(signupHref || onSignup) && (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        )}
      </div>
    </AuthFormCard>
  )
}

// -- signup-standard --

function SignupStandard({
  title,
  description,
  logo,
  socialProviders = [],
  loginHref,
  onLogin,
  termsHref,
  privacyHref,
  onSubmit,
  loading = false,
  error,
}: AuthBlockProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ name, email, password })
  }

  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}
        <FormElement onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            required
            aria-required="true"
          />
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            required
            aria-required="true"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            required
            aria-required="true"
          />
          {(termsHref || privacyHref) && (
            <Checkbox.Root
              checked={termsAccepted}
              onCheckedChange={(checked: boolean | 'indeterminate') =>
                setTermsAccepted(checked === true)
              }
            >
              I agree to the{' '}
              {termsHref ? (
                <a href={termsHref} style={{ color: 'inherit' }}>
                  Terms of Service
                </a>
              ) : (
                'Terms of Service'
              )}{' '}
              and{' '}
              {privacyHref ? (
                <a href={privacyHref} style={{ color: 'inherit' }}>
                  Privacy Policy
                </a>
              ) : (
                'Privacy Policy'
              )}
            </Checkbox.Root>
          )}
          <Button
            variant="solid"
            style={{ width: '100%' }}
            onClick={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
          >
            Create account
          </Button>
        </FormElement>
        {(loginHref || onLogin) && (
          <AuthFooterLink
            text="Already have an account?"
            linkText="Sign in"
            href={loginHref}
            onPress={onLogin}
          />
        )}
      </div>
    </AuthFormCard>
  )
}

// -- signup-social --

function SignupSocial({
  title,
  description,
  logo,
  socialProviders = [],
  loginHref,
  onLogin,
  onSubmit,
  loading = false,
  error,
}: AuthBlockProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <AuthFormCard>
      <div style={{ ...VStack, gap: 16, width: '100%' }}>
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider text="or" />
          </>
        ) : null}
        <FormElement onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            required
            aria-required="true"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            required
            aria-required="true"
          />
          <Button
            variant="solid"
            style={{ width: '100%' }}
            onClick={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
          >
            Create account
          </Button>
        </FormElement>
        {(loginHref || onLogin) && (
          <AuthFooterLink
            text="Already have an account?"
            linkText="Sign in"
            href={loginHref}
            onPress={onLogin}
          />
        )}
      </div>
    </AuthFormCard>
  )
}
