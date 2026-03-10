import { useId } from 'react'
import { styled } from '../../stl-react/src/config'

const TextareaFrame = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  'TextareaFrame',
)

const StyledTextArea = styled(
  'textarea',
  {
    fontFamily: '$body',
    fontSize: '$p',
    color: '$defaultBody',
    backgroundColor: '$background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '$4',
    padding: '8px 12px',
    outline: 'none',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
  },
  {
    size: {
      sm: { fontSize: '$14', padding: '6px 8px', borderRadius: '$2' },
      md: { fontSize: '$p', padding: '8px 12px', borderRadius: '$4' },
      lg: { fontSize: '$p', padding: '12px 16px', borderRadius: '$4' },
    },
    error: {
      true: { borderColor: 'var(--stl-error9, red)' },
    },
  },
  'Textarea',
)

const StyledLabelText = styled(
  'span',
  {
    fontFamily: '$body',
    fontWeight: '$500',
    fontSize: '$p',
    color: '$defaultBody',
  },
  'TextareaLabel',
)

const TextareaHelper = styled(
  'span',
  {
    fontFamily: '$body',
    fontSize: '$14',
    color: '$tertiary7',
  },
  'TextareaHelper',
)

export interface TextareaProps {
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  rows?: number
  maxLength?: number
}

export function Textarea({
  value,
  defaultValue,
  onChangeText,
  placeholder,
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  size = 'md',
  rows = 3,
  maxLength,
}: TextareaProps) {
  const textareaId = useId()
  const helperId = useId()
  const displayHelper = error && errorMessage ? errorMessage : helperText

  return (
    <TextareaFrame>
      {label && (
        <label htmlFor={textareaId}>
          <StyledLabelText>{label}</StyledLabelText>
        </label>
      )}
      <StyledTextArea
        id={textareaId}
        value={value}
        defaultValue={defaultValue}
        onChange={
          onChangeText
            ? (e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.target.value)
            : undefined
        }
        placeholder={placeholder}
        disabled={disabled || undefined}
        rows={rows}
        maxLength={maxLength}
        error={error || undefined}
        size={size}
        aria-invalid={error || undefined}
        aria-describedby={displayHelper ? helperId : undefined}
        aria-label={!label ? placeholder : undefined}
      />
      {displayHelper && (
        <TextareaHelper
          id={helperId}
          style={error ? { color: 'var(--stl-error9, red)' } : undefined}
        >
          {displayHelper}
        </TextareaHelper>
      )}
    </TextareaFrame>
  )
}
