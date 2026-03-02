import type { ReactNode } from 'react'

/** Base props all blocks accept */
export interface BlockProps {
  children?: ReactNode
}

/** Social login provider definition */
export interface SocialProvider {
  /** Display name (e.g., "Google", "GitHub") */
  name: string
  /** Icon element to render */
  icon: ReactNode
  /** Handler when this provider is selected */
  onPress: () => void
}
