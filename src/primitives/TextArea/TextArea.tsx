import type { GetProps } from 'tamagui'
import { Text, TextArea as TamaguiTextArea, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// TextArea primitive — multi-line text entry
//
// Spec: TextArea.spec.md
// For collecting longer-form text content (descriptions, comments, notes).
// Use Input for single-line text. Use a RichText editor for formatted text.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TextAreaFrame — the actual textarea control
// ---------------------------------------------------------------------------

const TextAreaFrame = styled(TamaguiTextArea, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  backgroundColor: '$background',
  color: '$color',
  fontFamily: '$body',
  fontSize: '$4',
  width: '100%',
  minHeight: 80,

  // Focus ring — accent border on focus
  focusStyle: {
    borderColor: '$blue10',
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

    textAreaSize: {
      sm: {
        fontSize: '$3',
        minHeight: 64,
        paddingHorizontal: '$2',
      },
      md: {
        fontSize: '$4',
        minHeight: 80,
        paddingHorizontal: '$3',
      },
      lg: {
        fontSize: '$5',
        minHeight: 120,
        paddingHorizontal: '$4',
      },
    },
  } as const,

  defaultVariants: {
    textAreaSize: 'md',
  },
})

// ---------------------------------------------------------------------------
// TextAreaContainer — wraps label + control + helper/error
// ---------------------------------------------------------------------------

const TextAreaContainer = styled(YStack, {
  gap: '$1',
  width: '100%',
})

// ---------------------------------------------------------------------------
// TextAreaLabel — visible label above the textarea
// ---------------------------------------------------------------------------

const TextAreaLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$3' as '500',
  color: '$color',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// TextAreaHelper — supplemental hint text below the textarea
// ---------------------------------------------------------------------------

const TextAreaHelper = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$color2',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// TextAreaError — destructive error message below the textarea
// ---------------------------------------------------------------------------

const TextAreaError = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$red10',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const TextArea = withStaticProperties(TextAreaFrame, {
  Container: TextAreaContainer,
  Label: TextAreaLabel,
  Helper: TextAreaHelper,
  Error: TextAreaError,
})

export type TextAreaProps = GetProps<typeof TextAreaFrame>
