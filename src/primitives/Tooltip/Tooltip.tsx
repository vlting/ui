import type { GetProps } from 'tamagui'
import { Tooltip as TamaguiTooltip, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Tooltip primitive — contextual information on hover/focus
//
// Spec: Tooltip.spec.md
// For providing brief supplemental information about an element on hover
// or keyboard focus. Never used as a primary information source.
//
// Wraps the full Tamagui Tooltip compound component API with the design
// system's canonical theming via TamaguiProvider configuration.
// ---------------------------------------------------------------------------

export const Tooltip = withStaticProperties(TamaguiTooltip, {
  // Trigger — the element that the tooltip is attached to
  Trigger: TamaguiTooltip.Trigger,
  // Content — the tooltip panel that appears on hover/focus
  Content: TamaguiTooltip.Content,
  // Arrow — the directional arrow pointing to the trigger
  Arrow: TamaguiTooltip.Arrow,
})

export type TooltipProps = GetProps<typeof TamaguiTooltip>
