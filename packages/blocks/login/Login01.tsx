import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { useState } from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Field } from '../../components/Field'
import { Input } from '../../components/Input'
import type { LoginBlockProps } from '../_shared/types'
import {
  AuthDivider,
  AuthFooterLink,
  AuthFormCard,
  AuthFormHeader,
  AuthSocialButtons,
} from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const ButtonJsx = Button as AnyFC

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

export interface Login01Props extends LoginBlockProps {
  /** Title text — defaults to "Sign in to your account" */
  title?: string
  /** Description text — defaults to "Enter your email and password" */
  description?: string
}

export function Login01({
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
}: Login01Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <ViewJsx
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$4"
      minHeight="100vh"
    >
      <AuthFormCard>
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
                <a
                  href={forgotPasswordHref}
                  style={{ fontSize: 14, fontFamily: 'inherit' }}
                >
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
      </AuthFormCard>
    </ViewJsx>
  )
}
