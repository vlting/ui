import { styled } from '@vlting/stl-react'

// ─── Icons ───────────────────────────────────────────────────────────────────

export const SunIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" />
  </svg>
)

export const MoonIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z" />
  </svg>
)

export const CheckCircleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" />
  </svg>
)

export const AlertTriangleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.866 3L22.3923 19.5C22.5833 19.8094 22.5833 20.1906 22.3923 20.5C22.2013 20.8094 21.866 21 21.5263 21H2.47372C2.134 21 1.7987 20.8094 1.6077 20.5C1.4167 20.1906 1.4167 19.8094 1.6077 19.5L11.134 3C11.325 2.69064 11.6603 2.5 12 2.5C12.3397 2.5 12.675 2.69064 12.866 3ZM11 16V18H13V16H11ZM11 9V14H13V9H11Z" />
  </svg>
)

export const ErrorCircleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z" />
  </svg>
)

export const InfoCircleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" />
  </svg>
)

// ─── Constants ───────────────────────────────────────────────────────────────

export const THEMES = ['primary', 'secondary', 'neutral', 'destructive'] as const
export const VARIANTS = ['solid', 'subtle', 'outline', 'ghost', 'link'] as const
export const SIZES = ['xs', 'sm', 'md', 'lg', 'icon'] as const

export const ALERT_THEMES = ['primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info'] as const
export const ALERT_VARIANTS = ['solid', 'subtle', 'outline'] as const
export const PROGRESS_SIZES = ['sm', 'md', 'lg'] as const
export const SPINNER_SIZES = ['sm', 'md', 'lg', 'xl'] as const

// ─── Shared styled components ────────────────────────────────────────────────

export const Section = styled('div', {
  mb: '$32',
}, { name: 'Section' })

export const SectionHeading = styled('h2', {
  fontSize: '$h4',
  fontWeight: '$700',
  color: '$color12',
  m: '$0',
  mb: '$16',
}, { name: 'SectionHeading' })

export const SectionTitle = styled('h3', {
  fontSize: '$buttonTiny',
  fontWeight: '$600',
  color: '$neutralText3',
  m: '$0',
  mb: '$10',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}, { name: 'SectionTitle' })

export const DemoCard = styled('div', {
  bg: '$background1',
  radius: '$card',
  p: '$48',
  boxShadow: '$lg',
}, {
  name: 'DemoCard',
  variants: {
    surface: {
      default: {},
      dark: { bg: '$background2' },
    },
  },
})

export const ButtonRow = styled('div', {
  display: 'flex', gap: '$12', flexWrap: 'wrap',
}, { name: 'ButtonRow' })

export const GridLabel = styled('span', {
  fontSize: '$buttonTiny', color: '$neutralText3', textAlign: 'center',
}, { name: 'GridLabel' })

export const GridCell = styled('div', {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', gap: '$8', height: '100%',
}, { name: 'GridCell' })

export const StackY = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12',
}, { name: 'StackY' })

export const DarkStage = styled('div', {
  bg: '$background10', radius: '$3', p: '$24',
}, { name: 'DarkStage' })

// ─── Section component props ─────────────────────────────────────────────────

export interface SectionProps {
  sectionRef: (el: HTMLDivElement | null) => void
}
