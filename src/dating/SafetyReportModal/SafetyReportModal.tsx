import React, { useCallback, useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Flag, Separator, Spinner, Text, TextArea, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// SafetyReportModal — modal for reporting inappropriate user behavior
//
// Presents a dialog with radio-selectable reasons and optional details input.
// Controlled: parent manages open/close via open and onCancel props.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

const DEFAULT_REASONS = [
  'Inappropriate messages',
  'Fake profile',
  'Harassment',
  'Spam',
  'Other',
]

export type SafetyReportModalProps = {
  /** Whether the modal is open */
  open: boolean
  /** Callback when report is submitted */
  onSubmit: (reason: string, details?: string) => void
  /** Callback when modal is cancelled */
  onCancel: () => void
  /** Name of user being reported */
  userName?: string
  /** Custom list of report reasons */
  reportReasons?: string[]
  /** Whether submission is in progress */
  isLoading?: boolean
  /** Optional test ID for testing */
  testID?: string
}

const ReasonOption = React.memo(function ReasonOption(props: {
  reason: string
  selected: boolean
  disabled: boolean
  onSelect: (reason: string) => void
}) {
  const { reason, selected, disabled, onSelect } = props

  const handlePress = useCallback(() => {
    if (!disabled) {
      onSelect(reason)
    }
  }, [disabled, onSelect, reason])

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      role="radio"
      aria-checked={selected}
      aria-label={reason}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={reason}
    >
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$2"
        paddingHorizontal="$3"
        borderRadius="$3"
        backgroundColor={selected ? '$blue3' : 'transparent'}
        minHeight={44}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
      >
        <View
          width={20}
          height={20}
          borderRadius={10}
          borderWidth={2}
          borderColor={selected ? '$blue10' : '$borderColor'}
          alignItems="center"
          justifyContent="center"
        >
          {selected ? (
            <View
              width={10}
              height={10}
              borderRadius={5}
              backgroundColor="$blue10"
            />
          ) : null}
        </View>
        <Text
          fontSize="$3"
          color="$color"
          fontFamily="$body"
          flex={1}
        >
          {reason}
        </Text>
      </XStack>
    </Pressable>
  )
})

export const SafetyReportModal = React.memo(function SafetyReportModal(
  props: SafetyReportModalProps,
) {
  const {
    open,
    onSubmit,
    onCancel,
    userName,
    reportReasons = DEFAULT_REASONS,
    isLoading = false,
    testID,
  } = props

  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [details, setDetails] = useState('')

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setSelectedReason(null)
      setDetails('')
    }
  }, [open])

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

  const handleReasonSelect = useCallback((reason: string) => {
    setSelectedReason(reason)
  }, [])

  const handleDetailsChange = useCallback((text: string) => {
    setDetails(text)
  }, [])

  const handleSubmit = useCallback(() => {
    if (selectedReason && !isLoading) {
      onSubmit(selectedReason, details || undefined)
    }
  }, [selectedReason, isLoading, onSubmit, details])

  const canSubmit = selectedReason != null && !isLoading
  const title = userName ? `Report ${userName}` : 'Report User'

  if (!open) {
    return null
  }

  return (
    <View
      testID={testID}
      role="dialog"
      aria-modal={true}
      aria-label={title}
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
          <Flag size={20} color="$red10" aria-hidden />
          <Text
            fontSize="$5"
            fontWeight="700"
            color="$color"
            fontFamily="$body"
            flex={1}
          >
            {title}
          </Text>
        </XStack>

        <Separator />

        {/* Reason selection */}
        <YStack role="radiogroup" aria-label="Report reason" gap="$1">
          <Text
            fontSize="$2"
            fontWeight="600"
            color="$color2"
            fontFamily="$body"
            paddingBottom="$1"
          >
            Select a reason
          </Text>
          {reportReasons.map((reason) => (
            <ReasonOption
              key={reason}
              reason={reason}
              selected={selectedReason === reason}
              disabled={isLoading}
              onSelect={handleReasonSelect}
            />
          ))}
        </YStack>

        {/* Optional details */}
        {selectedReason ? (
          <YStack gap="$1">
            <Text
              fontSize="$2"
              fontWeight="600"
              color="$color2"
              fontFamily="$body"
            >
              Additional details (optional)
            </Text>
            <TextArea
              value={details}
              onChangeText={handleDetailsChange}
              placeholder="Provide more details..."
              aria-label="Additional details"
              disabled={isLoading}
              minHeight={80}
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$3"
              padding="$2"
              fontFamily="$body"
              fontSize="$3"
            />
          </YStack>
        ) : null}

        <Separator />

        {/* Actions */}
        <XStack justifyContent="flex-end" gap="$2">
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
            onPress={handleSubmit}
            disabled={!canSubmit}
            role="button"
            aria-label="Submit report"
            aria-disabled={!canSubmit}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit }}
            accessibilityLabel="Submit report"
            data-testid={testID ? `${testID}-submit` : undefined}
          >
            <XStack
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              backgroundColor={canSubmit ? '$red10' : '$gray6'}
              minHeight={40}
              alignItems="center"
              justifyContent="center"
              gap="$2"
              cursor={canSubmit ? 'pointer' : 'not-allowed'}
              opacity={!canSubmit ? 0.5 : 1}
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
                Submit
              </Text>
            </XStack>
          </Pressable>
        </XStack>
      </YStack>
    </View>
  )
})
