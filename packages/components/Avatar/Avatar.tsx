import { useEffect, useState } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { styled, props } from '../../stl-react/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const AvatarImage = styled('img', {
  stl: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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

// ─── Avatar ─────────────────────────────────────────────────────────────────

const AvatarRoot = styled('span', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999',
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
  mapProps: (p) => ({
    ...p,
    role: 'img',
    'aria-label': p['aria-label'] ?? p.alt ?? p.fallback,
  }),
  ...props<{ src?: string; alt?: string; fallback?: string }>('src', 'alt', 'fallback'),
  useHooks: (p) => {
    const [imgError, setImgError] = useState(false)
    useEffect(() => { setImgError(false) }, [p.src])
    return { imgError, onImgError: () => setImgError(true) }
  },
  template: ({ src, alt, fallback, children }, state) => {
    if (children) return <>{children}</>
    if (src && !state.imgError) {
      return <AvatarImage src={src} alt={alt ?? ''} onError={state.onImgError} />
    }
    return <AvatarFallback>{fallback}</AvatarFallback>
  },
  styleName: 'Avatar',
})

// ─── Export ─────────────────────────────────────────────────────────────────

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

export type AvatarProps = ComponentPropsWithRef<typeof AvatarRoot>
export type AvatarImageProps = ComponentPropsWithRef<typeof AvatarImage>
