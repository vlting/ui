import type { GetProps } from 'tamagui'
import { Sheet as TamaguiSheet, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Sheet primitive — bottom sheet / drawer
//
// Spec: Sheet.spec.md
// For contextual actions, supplemental content, or mobile-friendly
// alternatives to dialogs. Slides up from the bottom of the screen.
//
// Wraps the full Tamagui Sheet compound component API with the design
// system's canonical theming via TamaguiProvider configuration.
// ---------------------------------------------------------------------------

export const Sheet = withStaticProperties(TamaguiSheet, {
  // Frame — the main content panel of the sheet
  Frame: TamaguiSheet.Frame,
  // Handle — the drag handle at the top of the sheet
  Handle: TamaguiSheet.Handle,
  // Overlay — the semi-transparent backdrop behind the sheet
  Overlay: TamaguiSheet.Overlay,
  // ScrollView — a scrollable container within the sheet frame
  ScrollView: TamaguiSheet.ScrollView,
})

export type SheetProps = GetProps<typeof TamaguiSheet>
