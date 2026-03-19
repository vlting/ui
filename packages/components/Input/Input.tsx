import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Input ──────────────────────────────────────────────────────────────────

const InputBase = styled('input', {
  fontFamily: '$body',
  fontSize: '$field',
  color: '$neutralText3',
  bg: '$neutral1',
  border: '$neutralMin',
  borderRadius: '$field',
  width: '100%',
  outline: 'none',
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'Input',
  variants: {
    size: {
      sm: { height: '$28', px: '$8', fontSize: '$buttonSmall' },
      md: { height: '$32', px: '$12', fontSize: '$button' },
      lg: { height: '$40', px: '$16', fontSize: '$button' },
    },
    error: {
      true: {
        border: '$error',
        ':focus': { outline: '$error' },
      },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed' },
    },
  },
  defaultVariants: { size: 'md' },
  mapProps: (props: any) => ({
    ...props,
    disabled: props.disabled === 'true' || props.disabled === true ? true : undefined,
    'aria-invalid': props.error === 'true' || props.error === true ? 'true' : undefined,
  }),
})

export type InputProps = Omit<ComponentPropsWithRef<typeof InputBase>, 'onChange'> & {
  onChangeText?: (text: string) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChangeText, onChange, ...rest }, ref) => (
    <InputBase
      ref={ref}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText?.(e.target.value)
        onChange?.(e)
      }}
      {...rest}
    />
  ),
)
Input.displayName = 'Input'
