import type { GetProps } from 'tamagui'
import { Input as TamaguiInput, Text, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Input primitive — single-line text entry
//
// Spec: Input.spec.md
// Foundational text field for short-form input. Supports labels, helper
// text, error messages, and error/disabled states — all via design tokens.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// InputFrame — the actual input control
// ---------------------------------------------------------------------------

const InputFrame = styled(TamaguiInput, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  backgroundColor: '$background',
  color: '$color',
  fontFamily: '$body',
  fontSize: '$4',
  width: '100%',
  minHeight: 44,

  // Focus ring — accent border on focus
  focusStyle: {
    borderColor: '$color10',
    outlineWidth: 0,
  },

  variants: {
    error: {
      true: {
        borderColor: '$red10',
        focusStyle: {
          borderColor: '$red10',
        },
      },
    },

    inputSize: {
      sm: {
        fontSize: '$3',
        minHeight: 36,
        paddingHorizontal: '$2',
      },
      md: {
        fontSize: '$4',
        minHeight: 44,
        paddingHorizontal: '$3',
      },
      lg: {
        fontSize: '$5',
        minHeight: 52,
        paddingHorizontal: '$4',
      },
    },
  } as const,

  defaultVariants: {
    inputSize: 'md',
  },
})

// ---------------------------------------------------------------------------
// InputContainer — wraps label + control + helper/error
// ---------------------------------------------------------------------------

const InputContainer = styled(YStack, {
  gap: '$1',
  width: '100%',
})

// ---------------------------------------------------------------------------
// InputLabel — associates a visible label with the control
// ---------------------------------------------------------------------------

const InputLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$3' as '500',
  color: '$color',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// InputHelper — supplemental hint text below the field
// ---------------------------------------------------------------------------

const InputHelper = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$color2',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// InputError — destructive error message below the field
// ---------------------------------------------------------------------------

const InputError = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$red10',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Input = withStaticProperties(InputFrame, {
  Container: InputContainer,
  Label: InputLabel,
  Helper: InputHelper,
  Error: InputError,
})

export type InputProps = GetProps<typeof InputFrame>
