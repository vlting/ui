import type { ComponentType, ReactNode } from 'react'
import React, { useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { styledHtml } from '@tamagui/web'
import { Button } from '../../components/Button'
import { Field } from '../../components/Field'
import { Input } from '../../components/Input'
import type { LoginBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const ButtonJsx = Button as AnyFC
const YStackJsx = YStack as AnyFC
const XStackJsx = XStack as AnyFC

// @ts-expect-error Tamagui v2 RC
const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  width: '100%',
})
const FormElementJsx = FormElement as AnyFC

// @ts-expect-error Tamagui v2 RC
const ForgotPasswordButton = styledHtml('button', {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: '$body',
  fontSize: '$3',
  color: '$color10',
  textDecoration: 'underline',
})
const ForgotPasswordButtonJsx = ForgotPasswordButton as AnyFC

export interface Login02Props extends LoginBlockProps {
  /** Title text — defaults to "Sign in to your account" */
  title?: string
  /** Description text — defaults to "Enter your email and password" */
  description?: string
  /** Cover image element for the right column */
  image?: ReactNode
}

export function Login02({
  title = 'Sign in to your account',
  description = 'Enter your email and password',
  logo,
  onSubmit,
  socialProviders,
  loading,
  error,
  forgotPasswordHref,
  onForgotPassword,
  signupHref,
  onSignup,
  image,
}: Login02Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <XStackJsx flex={1} minHeight="100vh">
      {/* Left column — login form */}
      <YStackJsx
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding="$6"
      >
        <YStackJsx width="100%" style={{ maxWidth: 400 }}>
          <AuthFormHeader logo={logo} title={title} description={description} />

          {error && (
            <TextJsx
              fontSize="$3"
              fontFamily="$body"
              color="$red10"
              textAlign="center"
              marginBottom="$2"
              role="alert"
            >
              {error}
            </TextJsx>
          )}

          <FormElementJsx onSubmit={handleSubmit}>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Field.Control>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </Field.Control>
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Field.Control>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </Field.Control>
            </Field.Root>

            {(forgotPasswordHref || onForgotPassword) && (
              <ViewJsx alignItems="flex-end">
                {forgotPasswordHref ? (
                  <a href={forgotPasswordHref} style={{ fontSize: 14, fontFamily: 'inherit' }}>
                    Forgot password?
                  </a>
                ) : (
                  <ForgotPasswordButtonJsx type="button" onClick={onForgotPassword}>
                    Forgot password?
                  </ForgotPasswordButtonJsx>
                )}
              </ViewJsx>
            )}

            <ButtonJsx
              type="submit"
              variant="default"
              width="100%"
              loading={loading}
              disabled={loading}
            >
              <Button.Text>Sign in</Button.Text>
            </ButtonJsx>
          </FormElementJsx>

          {socialProviders && socialProviders.length > 0 && (
            <>
              <AuthDivider />
              <AuthSocialButtons providers={socialProviders} />
            </>
          )}

          <AuthFooterLink
            text="Don't have an account?"
            linkText="Sign up"
            href={signupHref}
            onPress={onSignup}
          />
        </YStackJsx>
      </YStackJsx>

      {/* Right column — cover image (hidden on mobile) */}
      {image && (
        <ViewJsx
          flex={1}
          overflow="hidden"
          $sm={{ display: 'none' }}
        >
          {image}
        </ViewJsx>
      )}
    </XStackJsx>
  )
}
