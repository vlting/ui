import React, { useCallback, useEffect } from 'react'
import { Pressable } from 'react-native'
import { Shield, Spinner, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// BlockUserModal — confirmation dialog for blocking a user
//
// Presents an interruptive dialog that requires explicit confirmation before
// a block action is committed. Surfaces consequences and provides cancel/confirm.
// Controlled: parent manages open/close via open and onCancel/onConfirm props.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type BlockUserModalProps = {
  /** Whether the modal is open */
  open: boolean
  /** Callback when block is confirmed */
  onConfirm: () => void
  /** Callback when modal is cancelled */
  onCancel: () => void
  /** Name of user being blocked */
  userName?: string
  /** Whether confirmation is in progress */
  isLoading?: boolean
  /** Error message to display */
  error?: string
  /** Optional test ID for testing */
  testID?: string
}

export const BlockUserModal = React.memo(function BlockUserModal(
  props: BlockUserModalProps,
) {
  const {
    open,
    onConfirm,
    onCancel,
    userName,
    isLoading = false,
    error,
    testID,
  } = props

  const title = userName ? `Block ${userName}?` : 'Block User?'
  const titleId = testID ? `${testID}-title` : 'block-user-modal-title'
  const bodyId = testID ? `${testID}-body` : 'block-user-modal-body'

  // Handle Escape key
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
    return undefined
  }, [open, onCancel])

  const handleConfirm = useCallback(() => {
    if (!isLoading) {
      onConfirm()
    }
  }, [isLoading, onConfirm])

  if (!open) {
    return null
  }

  return (
    <View
      testID={testID}
      role="dialog"
      aria-modal={true}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0,0,0,0.5)"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
    >
      {/* Backdrop press to cancel */}
      <Pressable
        onPress={onCancel}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        aria-label="Close dialog"
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      />

      {/* Modal content */}
      <YStack
        backgroundColor="$background"
        borderRadius="$4"
        padding="$4"
        gap="$3"
        maxWidth={400}
        width="90%"
        zIndex={1001}
      >
        {/* Header */}
        <XStack alignItems="center" gap="$2">
          <Shield size={20} color="$red10" aria-hidden />
          <Text
            id={titleId}
            fontSize="$5"
            fontWeight="700"
            color="$color"
            fontFamily="$body"
            flex={1}
          >
            {title}
          </Text>
        </XStack>

        {/* Body */}
        <Text
          id={bodyId}
          fontSize="$3"
          color="$color2"
          fontFamily="$body"
          lineHeight="$3"
        >
          This user will no longer appear in your matches or conversations. Any
          existing connections will be removed. This action cannot be undone.
        </Text>

        {/* Error message */}
        {error ? (
          <Text
            fontSize="$2"
            color="$red10"
            fontFamily="$body"
            aria-live="assertive"
            role="alert"
            testID={testID ? `${testID}-error` : undefined}
          >
            {error}
          </Text>
        ) : null}

        {/* Actions */}
        <XStack justifyContent="flex-end" gap="$2" paddingTop="$2">
          <Pressable
            onPress={onCancel}
            disabled={isLoading}
            role="button"
            aria-label="Cancel"
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            data-testid={testID ? `${testID}-cancel` : undefined}
          >
            <View
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              minHeight={40}
              alignItems="center"
              justifyContent="center"
              cursor={isLoading ? 'not-allowed' : 'pointer'}
              opacity={isLoading ? 0.5 : 1}
            >
              <Text
                fontSize="$3"
                color="$color"
                fontFamily="$body"
              >
                Cancel
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            disabled={isLoading}
            role="button"
            aria-label="Confirm block"
            aria-disabled={isLoading}
            accessibilityRole="button"
            accessibilityState={{ disabled: isLoading }}
            accessibilityLabel="Confirm block"
            data-testid={testID ? `${testID}-confirm` : undefined}
          >
            <XStack
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              backgroundColor="$red10"
              minHeight={40}
              alignItems="center"
              justifyContent="center"
              gap="$2"
              cursor={isLoading ? 'not-allowed' : 'pointer'}
              opacity={isLoading ? 0.7 : 1}
            >
              {isLoading ? (
                <Spinner size="small" color="white" />
              ) : null}
              <Text
                fontSize="$3"
                fontWeight="600"
                color="white"
                fontFamily="$body"
              >
                Block
              </Text>
            </XStack>
          </Pressable>
        </XStack>
      </YStack>
    </View>
  )
})
