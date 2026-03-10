import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const AvatarFrame = styled(
  'div',
  {
    display: 'flex',
    borderRadius: '$full',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$tertiary5',
  },
  {
    size: {
      sm: { width: '32px', height: '32px' },
      md: { width: '40px', height: '40px' },
      lg: { width: '52px', height: '52px' },
      xl: { width: '74px', height: '74px' },
    },
  },
  'Avatar',
)

const AvatarFallbackText = styled(
  'span',
  {
    fontFamily: '$body',
    fontWeight: '$500',
    color: '$tertiary11',
  },
  {
    size: {
      sm: { fontSize: '$12' },
      md: { fontSize: '$14' },
      lg: { fontSize: '$18' },
      xl: { fontSize: '$21' },
    },
  },
  'AvatarFallback',
)

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
  const px = SIZE_PX[size]

  if (!children) {
    const showImage = src && !imgError
    return (
      <AvatarFrame size={size} role="img" aria-label={alt || fallback || 'avatar'}>
        {showImage ? (
          <img
            src={src!}
            alt={alt || fallback || 'avatar'}
            width={px}
            height={px}
            style={{ width: px, height: px, objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallbackText size={size}>{fallback || '?'}</AvatarFallbackText>
        )}
      </AvatarFrame>
    )
  }

  return (
    <AvatarContext.Provider value={{ size, imgError, setImgError }}>
      <AvatarFrame size={size} role="img">
        {children}
      </AvatarFrame>
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
    <img
      src={src}
      alt={alt}
      width={px}
      height={px}
      style={{ width: px, height: px, objectFit: 'cover' }}
      onError={() => setImgError(true)}
    />
  )
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
  const { size, imgError } = useContext(AvatarContext)
  if (!imgError) return null
  return <AvatarFallbackText size={size}>{children}</AvatarFallbackText>
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
