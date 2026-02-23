import React from 'react'
import { Spinner } from '../../primitives'

const VARIANT_COLOR_MAP = {
  primary: '$color10',
  light: '$color4',
  dark: '$color11',
} as const

const SIZE_MAP = { sm: 'sm', md: 'md', lg: 'lg' } as const

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'light' | 'dark'
}

export function Loader({ size = 'md', variant = 'primary' }: LoaderProps) {
  return <Spinner size={SIZE_MAP[size]} color={VARIANT_COLOR_MAP[variant]} />
}
