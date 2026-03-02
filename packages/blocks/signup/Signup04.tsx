import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import type React from 'react'
import { useState } from 'react'
import { View, XStack, YStack } from 'tamagui'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { Input } from '../../components/Input'
import { Text } from '../../primitives/Text'
import type { SignupBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormHeader,
  AuthSocialButtons,
} from '../login/_shared'

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

export interface Signup04Props extends SignupBlockProps {
  title?: string
  description?: string
  image?: ReactNode
}

export function Signup04({
  title = 'Create an account',
  description = 'Enter your information to get started',
  logo,
  image,
  socialProviders = [],
  loginHref,
  onLogin,
  termsHref,
  privacyHref,
  onSubmit,
  loading = false,
  error,
}: Signup04Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ name, email, password })
  }

  return (
    <CardJsx width="100%" style={{ maxWidth: 800 }} overflow="hidden">
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
              <Checkbox.Root
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              >
                <TextJsx fontSize="$2" color="$colorSubtitle">
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
                </TextJsx>
              </Checkbox.Root>
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

        {image ? (
          <ViewJsx flex={1} overflow="hidden" $sm={{ display: 'none' }}>
            {image}
          </ViewJsx>
        ) : null}
      </XStackJsx>
    </CardJsx>
  )
}
