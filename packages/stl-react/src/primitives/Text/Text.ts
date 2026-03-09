import { styled } from "../../config"

const TEXT_STYLES = {
  fontSize: "$p",
  fontWeight: "$400",
  lineHeight: "$body",
} as const

export const getTextStyles = () => TEXT_STYLES

export const Text = styled("p", getTextStyles(), "Text")
