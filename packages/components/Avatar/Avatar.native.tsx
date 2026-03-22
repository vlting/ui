import { forwardRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { View, Text as RNText, Image as RNImage } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const AvatarFallback = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}, 'AvatarFallback')

const AvatarFallbackText = styled(RNText, {
  color: '$neutralText3',
  fontWeight: '500',
}, 'AvatarFallbackText')

// ─── Base ───────────────────────────────────────────────────────────────────

const AvatarBase = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  overflow: 'hidden',
  backgroundColor: '$neutral4',
}, {
  size: {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 },
  },
}, 'Avatar')

// ─── Avatar Root ────────────────────────────────────────────────────────────

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
  style?: ViewStyle
}

export interface AvatarImageProps {
  src: string
  alt?: string
}

const AvatarRoot = forwardRef<View, AvatarProps>(
  ({ src, alt, fallback, children, size = 'md', ...rest }, ref) => {
    const [imgError, setImgError] = useState(false)
    useEffect(() => { setImgError(false) }, [src])

    const sizeMap = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 }
    const fontSize = { xs: 10, sm: 12, md: 14, lg: 18, xl: 22 }
    const dim = sizeMap[size]

    let content: ReactNode
    if (children) {
      content = children
    } else if (src && !imgError) {
      content = (
        <RNImage
          source={{ uri: src }}
          style={{ width: dim, height: dim }}
          onError={() => setImgError(true)}
          accessibilityLabel={alt ?? ''}
        />
      )
    } else {
      content = (
        <AvatarFallback>
          <AvatarFallbackText style={{ fontSize: fontSize[size] }}>
            {fallback}
          </AvatarFallbackText>
        </AvatarFallback>
      )
    }

    return (
      <AvatarBase
        ref={ref}
        size={size}
        accessibilityRole="image"
        accessibilityLabel={alt ?? fallback}
        {...rest}
      >
        {content}
      </AvatarBase>
    )
  },
)

AvatarRoot.displayName = 'Avatar'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Avatar = Object.assign(AvatarRoot, {
  Image: RNImage,
  Fallback: AvatarFallback,
})
