import type { ReactNode } from 'react'
import { createNativeCompoundStub } from '../_stub.native'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  children?: ReactNode
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
  style?: any
}

export interface AvatarImageProps {
  src: string
  alt?: string
}

export const Avatar = createNativeCompoundStub('Avatar', ['Image', 'Fallback'])
