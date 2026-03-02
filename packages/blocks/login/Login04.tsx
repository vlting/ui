import type { ComponentType, ReactNode } from 'react'
import React, { useState } from 'react'
import { View, XStack, YStack } from 'tamagui'
import { styledHtml } from '@tamagui/web'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Text } from '../../primitives/Text'
import type { LoginBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>

const CardJsx = Card as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const InputJsx = Input as AnyFC
const TextJsx = Text as AnyFC
const ViewJsx = View as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
} as any)
const FormJsx = FormElement as AnyFC

export interface Login04Props extends LoginBlockProps {
  title?: string
  description?: string
  image?: ReactNode
}

export function Login04({
  title = 'Login',
  description = 'Enter your email below to login to your account',
  logo,
  image,
  socialProviders = [],
  forgotPasswordHref,
  onForgotPassword,
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
}: Login04Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <CardJsx
      width="100%"
      style={{ maxWidth: 800 }}
      overflow="hidden"
    >
      <XStackJsx width="100%" $sm={{ flexDirection: 'column' }}>
        <YStackJsx flex={1} padding="$6" gap="$4" justifyContent="center">
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
              onPress={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
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

        {image ? (
          <ViewJsx
            flex={1}
            overflow="hidden"
            $sm={{ display: 'none' }}
          >
            {image}
          </ViewJsx>
        ) : null}
      </XStackJsx>
    </CardJsx>
  )
}
