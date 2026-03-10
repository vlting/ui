import React, { createContext, useContext, forwardRef, useState } from "react"
import { View, Text as RNText, Image } from "react-native"
import type { ViewStyle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const AvatarFrame = styled(
  View,
  {
    borderRadius: 9999,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$color4",
  },
  {
    size: {
      sm: { width: 32, height: 32 },
      md: { width: 40, height: 40 },
      lg: { width: 52, height: 52 },
      xl: { width: 74, height: 74 },
    },
  },
  "Avatar",
)

const AvatarFallbackText = styled(
  RNText,
  {
    fontWeight: "500",
    color: "$defaultBody",
  },
  {
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 18 },
      xl: { fontSize: 21 },
    },
  },
  "AvatarFallback",
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type AvatarSize = "sm" | "md" | "lg" | "xl"

const SIZE_PX: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 52, xl: 74 }

const AvatarContext = createContext<{
  size: AvatarSize
  imgError: boolean
  setImgError: (v: boolean) => void
}>({
  size: "md",
  imgError: false,
  setImgError: () => {},
})

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

export interface AvatarProps {
  children?: React.ReactNode
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
  style?: ViewStyle
}

export function Avatar({
  children,
  src,
  alt,
  fallback,
  size = "md",
  style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const px = SIZE_PX[size]

  if (!children) {
    const showImage = !!src && !imgError
    return (
      <AvatarFrame
        size={size}
        style={style}
        accessibilityRole="image"
        accessibilityLabel={alt || fallback || "avatar"}
      >
        {showImage ? (
          <Image
            source={{ uri: src! }}
            style={{ width: px, height: px }}
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallbackText size={size}>
            {fallback || "?"}
          </AvatarFallbackText>
        )}
      </AvatarFrame>
    )
  }

  return (
    <AvatarContext.Provider value={{ size, imgError, setImgError }}>
      <AvatarFrame
        size={size}
        style={style}
        accessibilityRole="image"
      >
        {children}
      </AvatarFrame>
    </AvatarContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AvatarImageProps {
  src: string
  alt?: string
}

function AvatarImage({ src, alt }: AvatarImageProps) {
  const { size, imgError, setImgError } = useContext(AvatarContext)
  const px = SIZE_PX[size]

  if (imgError) return null

  return (
    <Image
      source={{ uri: src }}
      style={{ width: px, height: px }}
      accessibilityLabel={alt}
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
