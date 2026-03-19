import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Textarea ───────────────────────────────────────────────────────────────

const TextareaBase = styled('textarea', {
  fontFamily: '$body',
  fontSize: '$field',
  color: '$neutralText3',
  bg: '$neutral1',
  border: '$neutralMin',
  borderColor: '$neutral4',
  borderRadius: '$field',
  width: '100%',
  outline: 'none',
  resize: 'vertical',
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'Textarea',
  variants: {
    size: {
      sm: { minHeight: '$56', px: '$8', py: '$6', fontSize: '$buttonSmall' },
      md: { minHeight: '$72', px: '$12', py: '$8', fontSize: '$button' },
      lg: { minHeight: '$96', px: '$16', py: '$12', fontSize: '$button' },
    },
    error: {
      true: {
        border: '$error',
        ':focus': { outline: '$error' },
      },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', resize: 'none' },
    },
  },
  defaultVariants: { size: 'md' },
  mapProps: (props: any) => ({
    ...props,
    disabled: props.disabled === 'true' || props.disabled === true ? true : undefined,
    'aria-invalid': props.error === 'true' || props.error === true ? 'true' : undefined,
  }),
})

export type TextareaProps = Omit<ComponentPropsWithRef<typeof TextareaBase>, 'onChange'> & {
  onChangeText?: (text: string) => void
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onChangeText, onChange, ...rest }, ref) => (
    <TextareaBase
      ref={ref}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChangeText?.(e.target.value)
        onChange?.(e)
      }}
      {...rest}
    />
  ),
)
Textarea.displayName = 'Textarea'
