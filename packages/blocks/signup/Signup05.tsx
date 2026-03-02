import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { useState } from 'react'
import { YStack } from 'tamagui'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Text } from '../../primitives/Text'
import type { SignupBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormCard,
  AuthFormHeader,
  AuthSocialButtons,
} from '../login/_shared'

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

export interface Signup05Props extends SignupBlockProps {
  title?: string
  description?: string
}

export function Signup05({
  title = 'Create an account',
  description = 'Sign up with your preferred method',
  logo,
  socialProviders = [],
  loginHref,
  onLogin,
  onSubmit,
  loading = false,
  error,
}: Signup05Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
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
