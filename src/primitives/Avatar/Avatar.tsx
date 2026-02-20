import React from 'react'
import type { GetProps, ImageProps } from 'tamagui'
import { Image, Text, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Avatar primitive — person visual identifier
//
// Spec: Avatar.spec.md
// Displays a profile photo, initials fallback, or generic icon for a person.
// Fixed container size and shape; image clips to container boundaries.
// NOT for org/team logos — use OrgAvatar for that purpose.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// AvatarFrame — the outer container
// ---------------------------------------------------------------------------

const AvatarFrame = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',

  variants: {
    size: {
      xs: { width: '$3',  height: '$3'  },
      sm: { width: '$4',  height: '$4'  },
      md: { width: '$6',  height: '$6'  },
      lg: { width: '$8',  height: '$8'  },
      xl: { width: '$10', height: '$10' },
    },

    shape: {
      circle: { borderRadius: 9999 },
      square: { borderRadius: '$3' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})

// ---------------------------------------------------------------------------
// AvatarImage — the profile photo
// ---------------------------------------------------------------------------

const AvatarImage = styled(Image, {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
})

// ---------------------------------------------------------------------------
// AvatarFallback — shown when no image or image fails to load
// Container fills the full avatar frame with a neutral token background.
// ---------------------------------------------------------------------------

const AvatarFallback = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$color4',
})

// ---------------------------------------------------------------------------
// AvatarFallbackText — initials rendered inside the fallback
// Max two characters; uppercase enforced at the token level.
// ---------------------------------------------------------------------------

const AvatarFallbackText = styled(Text, {
  fontSize: '$3',
  fontWeight: '$3' as '500',
  color: '$color',
  fontFamily: '$body',
  textTransform: 'uppercase' as const,
})

// ---------------------------------------------------------------------------
// AvatarWithFallback — convenience wrapper
//
// Accepts `src` and `name` props. Renders the image when src is present;
// falls back to initials derived from `name` (first letter of each word,
// max 2 chars). Provides correct accessibility attributes automatically.
// ---------------------------------------------------------------------------

type AvatarWithFallbackProps = GetProps<typeof AvatarFrame> & {
  /** URL of the profile photo */
  src?: string
  /** Person's name — used for initials and alt/aria-label */
  name?: string
  /** Image load error handler */
  onImageError?: ImageProps['onError']
}

const AvatarWithFallbackBase = React.forwardRef<
  React.ElementRef<typeof AvatarFrame>,
  AvatarWithFallbackProps
>(function AvatarWithFallback({ src, name, onImageError, ...props }, ref) {
  const [imageError, setImageError] = React.useState(false)

  const initials = React.useMemo(() => {
    if (!name) return ''
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0] ?? '')
      .join('')
      .toUpperCase()
  }, [name])

  const showImage = Boolean(src) && !imageError
  const ariaLabel = name ?? undefined

  return (
    <AvatarFrame
      ref={ref}
      {...props}
      aria-label={ariaLabel}
    >
      {showImage ? (
        <AvatarImage
          src={src}
          alt={name ?? ''}
          onError={(e) => {
            setImageError(true)
            onImageError?.(e)
          }}
        />
      ) : (
        <AvatarFallback>
          <AvatarFallbackText>{initials}</AvatarFallbackText>
        </AvatarFallback>
      )}
    </AvatarFrame>
  )
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Avatar = withStaticProperties(AvatarWithFallbackBase, {
  Frame: AvatarFrame,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  FallbackText: AvatarFallbackText,
})

export type AvatarProps = GetProps<typeof AvatarFrame>
export type AvatarWithFallbackProps2 = AvatarWithFallbackProps
