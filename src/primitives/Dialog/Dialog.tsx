import type { GetProps } from 'tamagui'
import { Dialog as TamaguiDialog, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Dialog primitive — modal dialog container
//
// Spec: Dialog.spec.md
// For focused, interruptive interactions that require user acknowledgment
// or action before returning to the main content.
//
// Wraps the full Tamagui Dialog compound component API with the design
// system's canonical theming via TamaguiProvider configuration.
// ---------------------------------------------------------------------------

export const Dialog = withStaticProperties(TamaguiDialog, {
  // Trigger — the element that opens the dialog
  Trigger: TamaguiDialog.Trigger,
  // Portal — renders the dialog into a portal (outside the normal DOM tree)
  Portal: TamaguiDialog.Portal,
  // Overlay — the semi-transparent backdrop behind the dialog
  Overlay: TamaguiDialog.Overlay,
  // Content — the dialog panel itself
  Content: TamaguiDialog.Content,
  // Title — the accessible dialog title (required for a11y)
  Title: TamaguiDialog.Title,
  // Description — optional accessible description
  Description: TamaguiDialog.Description,
  // Close — a trigger element that closes the dialog
  Close: TamaguiDialog.Close,
})

export type DialogProps = GetProps<typeof TamaguiDialog>
