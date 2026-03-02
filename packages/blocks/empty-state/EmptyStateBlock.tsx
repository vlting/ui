import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import { useState } from 'react'
import { Text, View, YStack } from 'tamagui'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const YStackJsx = YStack as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const InputJsx = Input as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  width: '100%',
  maxWidth: 360,
} as any)
const FormJsx = FormElement as AnyFC

// -- Types --

export type EmptyStateBlockVariant = 'no-data' | 'error' | 'coming-soon'

export interface EmptyStateBlockProps extends BlockProps {
  variant: EmptyStateBlockVariant
  title?: string
  description?: string
  icon?: ReactNode
  action?: { label: string; onPress?: () => void }
  errorCode?: string | number
  onRetry?: () => void
  onNotify?: (email: string) => void
}

// -- Default titles --

const variantDefaults: Record<EmptyStateBlockVariant, { title: string; description: string }> = {
  'no-data': {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
  },
  error: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
  },
  'coming-soon': {
    title: 'Coming soon',
    description: 'This feature is under development. Stay tuned!',
  },
}

// -- Main component --

export function EmptyStateBlock(props: EmptyStateBlockProps) {
  const defaults = variantDefaults[props.variant]
  const title = props.title ?? defaults.title
  const description = props.description ?? defaults.description

  switch (props.variant) {
    case 'no-data':
      return <NoDataState {...props} title={title} description={description} />
    case 'error':
      return <ErrorState {...props} title={title} description={description} />
    case 'coming-soon':
      return <ComingSoonState {...props} title={title} description={description} />
  }
}

// -- No data variant --

function NoDataState({
  title,
  description,
  icon,
  action,
}: EmptyStateBlockProps) {
  return (
    <YStackJsx
      alignItems="center"
      justifyContent="center"
      padding="$8"
      gap="$4"
      minHeight={300}
    >
      {icon && (
        <ViewJsx opacity={0.5} paddingBottom="$2">
          {icon}
        </ViewJsx>
      )}
      <TextJsx fontSize="$6" fontWeight="$4" fontFamily="$heading" color="$color" textAlign="center">
        {title}
      </TextJsx>
      <TextJsx
        fontSize="$4"
        fontFamily="$body"
        color="$colorSubtle"
        textAlign="center"
        style={{ maxWidth: 400 }}
      >
        {description}
      </TextJsx>
      {action && (
        <ButtonJsx variant="default" onPress={action.onPress}>
          <ButtonTextJsx>{action.label}</ButtonTextJsx>
        </ButtonJsx>
      )}
    </YStackJsx>
  )
}

// -- Error variant --

function ErrorState({
  title,
  description,
  icon,
  errorCode,
  onRetry,
}: EmptyStateBlockProps) {
  return (
    <YStackJsx
      alignItems="center"
      justifyContent="center"
      padding="$8"
      gap="$4"
      minHeight={300}
    >
      {icon && (
        <ViewJsx opacity={0.5} paddingBottom="$2">
          {icon}
        </ViewJsx>
      )}
      {errorCode && (
        <TextJsx fontSize="$9" fontWeight="$4" fontFamily="$heading" color="$colorSubtle">
          {errorCode}
        </TextJsx>
      )}
      <TextJsx fontSize="$6" fontWeight="$4" fontFamily="$heading" color="$color" textAlign="center">
        {title}
      </TextJsx>
      <TextJsx
        fontSize="$4"
        fontFamily="$body"
        color="$colorSubtle"
        textAlign="center"
        style={{ maxWidth: 400 }}
      >
        {description}
      </TextJsx>
      {onRetry && (
        <ButtonJsx variant="default" onPress={onRetry}>
          <ButtonTextJsx>Try again</ButtonTextJsx>
        </ButtonJsx>
      )}
    </YStackJsx>
  )
}

// -- Coming soon variant --

function ComingSoonState({
  title,
  description,
  icon,
  onNotify,
}: EmptyStateBlockProps) {
  const [email, setEmail] = useState('')

  return (
    <YStackJsx
      alignItems="center"
      justifyContent="center"
      padding="$8"
      gap="$4"
      minHeight={300}
    >
      {icon && (
        <ViewJsx opacity={0.5} paddingBottom="$2">
          {icon}
        </ViewJsx>
      )}
      <TextJsx fontSize="$6" fontWeight="$4" fontFamily="$heading" color="$color" textAlign="center">
        {title}
      </TextJsx>
      <TextJsx
        fontSize="$4"
        fontFamily="$body"
        color="$colorSubtle"
        textAlign="center"
        style={{ maxWidth: 400 }}
      >
        {description}
      </TextJsx>
      {onNotify && (
        <FormJsx
          onSubmit={(e: Event) => {
            e.preventDefault()
            if (email) onNotify(email)
          }}
        >
          <ViewJsx flex={1}>
            <InputJsx
              type="email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
            />
          </ViewJsx>
          <ButtonJsx
            variant="default"
            onPress={() => {
              if (email) onNotify(email)
            }}
          >
            <ButtonTextJsx>Notify me</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>
      )}
    </YStackJsx>
  )
}
