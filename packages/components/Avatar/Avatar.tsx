import type React from 'react'
import { createContext, useContext, useState } from 'react'
import type { ComponentType } from 'react'
import { Image as TamaguiImage, Text, View, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ImageJsx = TamaguiImage as AnyFC

const AvatarFrame = styled(View, {
  borderRadius: '$full',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$color5',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { width: '$2.5', height: '$2.5' },
      // @ts-expect-error Tamagui v2 RC
      md: { width: '$3.5', height: '$3.5' },
      // @ts-expect-error Tamagui v2 RC
      lg: { width: '$5', height: '$5' },
      // @ts-expect-error Tamagui v2 RC
      xl: { width: '$7', height: '$7' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

const AvatarFallbackText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  color: '$color11',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$1' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$3' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$5' },
      // @ts-expect-error Tamagui v2 RC
      xl: { fontSize: '$7' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

const AvatarFrameJsx = AvatarFrame as AnyFC
const AvatarFallbackTextJsx = AvatarFallbackText as AnyFC

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
const SIZE_PX: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 52, xl: 74 }

const AvatarContext = createContext<{
  size: AvatarSize
  imgError: boolean
  setImgError: (v: boolean) => void
}>({
  size: 'md',
  imgError: false,
  setImgError: () => {},
})

export interface AvatarProps {
  children?: React.ReactNode
  /** @deprecated Use compound pattern: <Avatar><Avatar.Image /><Avatar.Fallback /></Avatar> */
  src?: string
  /** @deprecated Use compound pattern */
  alt?: string
  /** @deprecated Use compound pattern */
  fallback?: string
  size?: AvatarSize
}

export function Avatar({ children, src, alt, fallback, size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  // Legacy single-component API: if no children, render image/fallback directly
  if (!children) {
    const showImage = src && !imgError
    const px = SIZE_PX[size]
    return (
      <AvatarFrameJsx size={size} role="img" aria-label={alt || fallback || 'avatar'}>
        {showImage ? (
          <ImageJsx
            source={{ uri: src!, width: px, height: px }}
            style={{ width: px, height: px }}
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallbackTextJsx size={size}>{fallback || '?'}</AvatarFallbackTextJsx>
        )}
      </AvatarFrameJsx>
    )
  }

  // Compound API: <Avatar><Avatar.Image /><Avatar.Fallback /></Avatar>
  return (
    <AvatarContext.Provider value={{ size, imgError, setImgError }}>
      <AvatarFrameJsx size={size} role="img">
        {children}
      </AvatarFrameJsx>
    </AvatarContext.Provider>
  )
}

export interface AvatarImageProps {
  src: string
  alt?: string
}

function AvatarImage({ src, alt }: AvatarImageProps) {
  const { size, imgError, setImgError } = useContext(AvatarContext)
  const px = SIZE_PX[size]

  if (imgError) return null

  return (
    <ImageJsx
      source={{ uri: src, width: px, height: px }}
      style={{ width: px, height: px }}
      onError={() => setImgError(true)}
      alt={alt}
    />
  )
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
  const { size, imgError } = useContext(AvatarContext)

  // Only show fallback when image has errored or no image is present
  if (!imgError) return null

  return <AvatarFallbackTextJsx size={size}>{children}</AvatarFallbackTextJsx>
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
