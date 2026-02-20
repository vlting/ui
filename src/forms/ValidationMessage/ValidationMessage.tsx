import { AlertCircle, AlertTriangle, CheckCircle, Info } from '../_jsx-compat'
import type { GetProps } from 'tamagui'
import { XStack as TamaguiXStack } from 'tamagui'
import { Text, XStack } from '../_jsx-compat'

type Variant = 'error' | 'warning' | 'success' | 'info'

const variantTheme: Record<Variant, string> = {
  error: 'red',
  warning: 'yellow',
  success: 'green',
  info: 'blue',
}

const variantAriaLive: Record<Variant, 'assertive' | 'polite'> = {
  error: 'assertive',
  warning: 'polite',
  success: 'polite',
  info: 'polite',
}

type XStackProps = GetProps<typeof TamaguiXStack>

export type ValidationMessageProps = Omit<XStackProps, 'children'> & {
  variant: Variant
  message: string
}

export function ValidationMessage({ variant, message, ...props }: ValidationMessageProps) {
  const theme = variantTheme[variant]
  const ariaLive = variantAriaLive[variant]

  const Icon =
    variant === 'error'
      ? AlertCircle
      : variant === 'warning'
        ? AlertTriangle
        : variant === 'success'
          ? CheckCircle
          : Info

  return (
    <XStack theme={theme} alignItems="center" gap="$2" {...props}>
      <Icon size={16} color="$color" aria-hidden={true} />
      <Text fontSize="$3" color="$color" lineHeight="$3" flex={1} aria-live={ariaLive}>
        {message}
      </Text>
    </XStack>
  )
}
