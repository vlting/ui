import React, { useState } from 'react'
import { styled, Text, View, Image } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const AvatarFrame = styled(View, {
  borderRadius: 1000,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$color5',

  variants: {
    size: {
      sm: { width: 32, height: 32 },
      md: { width: 40, height: 40 },
      lg: { width: 56, height: 56 },
      xl: { width: 72, height: 72 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const AvatarFallback = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  color: '$color11',

  variants: {
    size: {
      sm: { fontSize: '$1' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$5' },
      xl: { fontSize: '$7' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError

  const sizeMap = { sm: 32, md: 40, lg: 56, xl: 72 }
  const px = sizeMap[size]

  return (
    // @ts-expect-error Tamagui v2 RC
    <AvatarFrame size={size} accessibilityRole="image" aria-label={alt || fallback || 'avatar'}>
      {showImage ? (
        <Image
          source={{ uri: src, width: px, height: px }}
          style={{ width: px, height: px }}
          onError={() => setImgError(true)}
        />
      ) : (
        // @ts-expect-error Tamagui v2 RC
        <AvatarFallback size={size}>
          {fallback || '?'}
        </AvatarFallback>
      )}
    </AvatarFrame>
  )
}
