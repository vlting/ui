import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { useState } from 'react'
import { View, YStack } from 'tamagui'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Text } from '../../primitives/Text'
import type { LoginBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormCard,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>

const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const InputJsx = Input as AnyFC
const TextJsx = Text as AnyFC
const ViewJsx = View as AnyFC
const YStackJsx = YStack as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
} as any)
const FormJsx = FormElement as AnyFC

export interface Login03Props extends LoginBlockProps {
  title?: string
  description?: string
}

export function Login03({
  title = 'Login',
  description = 'Enter your email below to login to your account',
  logo,
  socialProviders = [],
  forgotPasswordHref,
  onForgotPassword,
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
}: Login03Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <ViewJsx
      minHeight="100vh"
      width="100%"
      backgroundColor="$color1"
      alignItems="center"
      justifyContent="center"
      padding="$4"
    >
      <AuthFormCard>
        <YStackJsx gap="$4" width="100%">
          <AuthFormHeader logo={logo} title={title} description={description} />

          {error ? (
            <TextJsx fontSize="$2" color="$red10" textAlign="center" role="alert">
              {error}
            </TextJsx>
          ) : null}

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
              <ButtonTextJsx>Login</ButtonTextJsx>
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
    </ViewJsx>
  )
}
