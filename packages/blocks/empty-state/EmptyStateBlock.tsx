import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { styled } from '../../stl-react/src/config'
import type { BlockProps } from '../_shared/types'

const FormElement = styled(
  'form',
  {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    maxWidth: 360,
  },
  'EmptyStateForm',
)

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

const variantDefaults: Record<
  EmptyStateBlockVariant,
  { title: string; description: string }
> = {
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

const center = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 32,
  gap: 16,
  minHeight: 300,
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

function NoDataState({ title, description, icon, action }: EmptyStateBlockProps) {
  return (
    <div style={center}>
      {icon && <div style={{ opacity: 0.5, paddingBottom: 8 }}>{icon}</div>}
      <h2 style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', margin: 0 }}>
        {title}
      </h2>
      <span
        style={{ fontSize: 16, opacity: 0.6, textAlign: 'center', maxWidth: 400 }}
      >
        {description}
      </span>
      {action && (
        <Button variant="default" onClick={action.onPress}>
          <Button.Text>{action.label}</Button.Text>
        </Button>
      )}
    </div>
  )
}

function ErrorState({
  title,
  description,
  icon,
  errorCode,
  onRetry,
}: EmptyStateBlockProps) {
  return (
    <div style={center}>
      {icon && <div style={{ opacity: 0.5, paddingBottom: 8 }}>{icon}</div>}
      {errorCode && (
        <span style={{ fontSize: 36, fontWeight: 600, opacity: 0.3 }}>
          {errorCode}
        </span>
      )}
      <h2 style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', margin: 0 }}>
        {title}
      </h2>
      <span
        style={{ fontSize: 16, opacity: 0.6, textAlign: 'center', maxWidth: 400 }}
      >
        {description}
      </span>
      {onRetry && (
        <Button variant="default" onClick={onRetry}>
          <Button.Text>Try again</Button.Text>
        </Button>
      )}
    </div>
  )
}

function ComingSoonState({ title, description, icon, onNotify }: EmptyStateBlockProps) {
  const [email, setEmail] = useState('')

  return (
    <div style={center}>
      {icon && <div style={{ opacity: 0.5, paddingBottom: 8 }}>{icon}</div>}
      <h2 style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', margin: 0 }}>
        {title}
      </h2>
      <span
        style={{ fontSize: 16, opacity: 0.6, textAlign: 'center', maxWidth: 400 }}
      >
        {description}
      </span>
      {onNotify && (
        <FormElement
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            if (email) onNotify(email)
          }}
        >
          <div style={{ flex: 1 }}>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              aria-label="Email for notifications"
            />
          </div>
          <Button
            variant="default"
            onClick={() => {
              if (email) onNotify(email)
            }}
          >
            <Button.Text>Notify me</Button.Text>
          </Button>
        </FormElement>
      )}
    </div>
  )
}
