import { forwardRef, useEffect, useState } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { styled, props } from '../../stl-react/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const AvatarImage = styled('img', {
  stl: {
    width: '100%',
    height: '100%',
  },
  styleName: 'AvatarImage',
})

const AvatarFallback = styled('span', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  styleName: 'AvatarFallback',
})

// ─── Base ───────────────────────────────────────────────────────────────────

const AvatarBase = styled('span', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    radius: '$full',
    overflow: 'hidden',
    bg: '$neutral4',
    color: '$neutralText3',
    fontWeight: '$500',
    flexShrink: '0',
    userSelect: 'none',
  },
  variants: {
    size: {
      sm: { width: '32px', height: '32px', fontSize: '$small' },
      md: { width: '40px', height: '40px', fontSize: '$p' },
      lg: { width: '56px', height: '56px', fontSize: '$h5' },
      xl: { width: '72px', height: '72px', fontSize: '$h4' },
    },
  },
  defaultVariants: { size: 'md' },
  styleName: 'Avatar',
})

// ─── Avatar Root ────────────────────────────────────────────────────────────

type AvatarBaseProps = ComponentPropsWithRef<typeof AvatarBase>

interface AvatarRootProps extends AvatarBaseProps {
  src?: string
  alt?: string
  fallback?: string
}

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(
  ({ src, alt, fallback, children, ...rest }, ref) => {
    const [imgError, setImgError] = useState(false)
    useEffect(() => { setImgError(false) }, [src])

    let content: ReactNode
    if (children) {
      content = children
    } else if (src && !imgError) {
      content = (
        <AvatarImage
          src={src}
          alt={alt ?? ''}
          onError={() => setImgError(true)}
          style={{ objectFit: 'cover' }}
        />
      )
    } else {
      content = <AvatarFallback>{fallback}</AvatarFallback>
    }

    return (
      <AvatarBase
        ref={ref}
        role="img"
        aria-label={rest['aria-label'] ?? alt ?? fallback}
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
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

export type AvatarProps = AvatarRootProps
export type AvatarImageProps = ComponentPropsWithRef<typeof AvatarImage>
