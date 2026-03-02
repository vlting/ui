import type { ComponentType } from 'react'
import React, { useState } from 'react'
import { YStack } from 'tamagui'
import { styledHtml } from '@tamagui/web'
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
const YStackJsx = YStack as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
} as any)
const FormJsx = FormElement as AnyFC

export interface Login05Props extends LoginBlockProps {
  title?: string
  description?: string
  submitText?: string
}

export function Login05({
  title = 'Login',
  description = 'Enter your email to sign in to your account',
  logo,
  socialProviders = [],
  signupHref,
  onSignup,
  onSubmit,
  loading = false,
  error,
  submitText = 'Sign in with email',
}: Login05Props) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email })
  }

  return (
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

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>{submitText}</ButtonTextJsx>
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
