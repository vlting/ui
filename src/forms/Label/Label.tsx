import type { GetProps } from 'tamagui'
import { XStack as TamaguiXStack } from 'tamagui'
import { Text, XStack } from '../_jsx-compat'

type XStackProps = GetProps<typeof TamaguiXStack>

export type LabelProps = XStackProps & {
  htmlFor?: string
  required?: boolean
  optional?: boolean
}

export function Label({ htmlFor, required, optional, children, ...props }: LabelProps) {
  return (
    <XStack
      tag="label"
      alignItems="center"
      gap="$1"
      htmlFor={htmlFor}
      {...props}
    >
      <Text fontSize="$4" color="$color" fontWeight="500">
        {children}
      </Text>
      {required && (
        <Text theme="red" color="$color" fontSize="$4" aria-hidden={true}>
          *
        </Text>
      )}
      {optional && (
        <Text color="$color2" fontSize="$3">
          (optional)
        </Text>
      )}
    </XStack>
  )
}
