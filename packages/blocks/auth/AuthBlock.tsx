import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import type React from 'react'
import { useState } from 'react'
import { YStack } from 'tamagui'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Input } from '../../components/Input'
import type { BlockProps, SocialProvider } from '../_shared/types'
import {
  AuthDivider,
  AuthErrorMessage,
  AuthFooterLink,
  AuthFormCard,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>

const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const CheckboxRootJsx = Checkbox.Root as AnyFC
const InputJsx = Input as AnyFC
const YStackJsx = YStack as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
} as any)
const FormJsx = FormElement as AnyFC

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

const variantDefaults: Record<AuthBlockVariant, { title: string; description: string }> = {
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

// -- login-standard: Email + password form --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />

        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}

        <FormJsx onSubmit={handleSubmit}>
          <InputJsx
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
          />
          <InputJsx
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />

          {forgotPasswordHref || onForgotPassword ? (
            <AuthFooterLink
              text=""
              linkText="Forgot your password?"
              href={forgotPasswordHref}
              onPress={onForgotPassword}
            />
          ) : null}

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Sign in</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>

        {signupHref || onSignup ? (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}

// -- login-otp: Email + verification code --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />

        <FormJsx onSubmit={handleSubmit}>
          <InputJsx
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
          />
          <InputJsx
            label="Verification code"
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={setCode}
            inputMode="numeric"
          />

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Verify</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>

        {signupHref || onSignup ? (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}

// -- login-magic: Email-only magic link --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />

        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}

        <FormJsx onSubmit={handleSubmit}>
          <InputJsx
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
          />

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Send sign-in link</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>

        {signupHref || onSignup ? (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}

// -- login-social: Social providers only --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />
        <AuthSocialButtons providers={socialProviders} />

        {signupHref || onSignup ? (
          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}

// -- signup-standard: Name + email + password + terms --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />

        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider />
          </>
        ) : null}

        <FormJsx onSubmit={handleSubmit}>
          <InputJsx
            label="Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />
          <InputJsx
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
          />
          <InputJsx
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />

          {termsHref || privacyHref ? (
            <CheckboxRootJsx
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
            </CheckboxRootJsx>
          ) : null}

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Create account</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>

        {loginHref || onLogin ? (
          <AuthFooterLink
            text="Already have an account?"
            linkText="Sign in"
            href={loginHref}
            onPress={onLogin}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}

// -- signup-social: Social-first with email fallback --

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
      <YStackJsx gap="$4" width="100%">
        <AuthFormHeader logo={logo} title={title!} description={description} />
        <AuthErrorMessage error={error} />

        {socialProviders.length > 0 ? (
          <>
            <AuthSocialButtons providers={socialProviders} />
            <AuthDivider text="or" />
          </>
        ) : null}

        <FormJsx onSubmit={handleSubmit}>
          <InputJsx
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
          />
          <InputJsx
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() =>
              handleSubmit(new Event('submit') as unknown as React.FormEvent)
            }
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Create account</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>

        {loginHref || onLogin ? (
          <AuthFooterLink
            text="Already have an account?"
            linkText="Sign in"
            href={loginHref}
            onPress={onLogin}
          />
        ) : null}
      </YStackJsx>
    </AuthFormCard>
  )
}
