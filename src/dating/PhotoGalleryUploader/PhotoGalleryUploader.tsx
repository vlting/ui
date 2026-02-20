import React, { useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'
import { AlertTriangle, Camera, Text, View, X, XStack, YStack, Image } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// PhotoGalleryUploader — grid uploader for profile photos
//
// Renders a fixed-slot grid where each slot can be empty, filled, uploading,
// or in an error state. Parent controls the photo array and receives callbacks
// for add, remove, and reorder actions.
// Presentation-only — no business logic, file system access, or data fetching.
// ---------------------------------------------------------------------------

export type PhotoSlot = {
  id: string
  uri?: string
  isUploading?: boolean
  progress?: number
  error?: string
}

export type PhotoGalleryUploaderProps = {
  /** Array of photo slot data */
  photos: PhotoSlot[]
  /** Maximum number of slots to display (default 6) */
  maxSlots?: number
  /** Callback when an empty or error slot is pressed */
  onAdd: (slotIndex: number) => void
  /** Callback when remove is pressed on a filled slot */
  onRemove: (slotIndex: number) => void
  /** Callback when a photo is reordered */
  onReorder?: (fromIndex: number, toIndex: number) => void
  /** Optional test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Individual slot sub-component
// ---------------------------------------------------------------------------

type SlotProps = {
  slot: PhotoSlot | null
  index: number
  onAdd: (index: number) => void
  onRemove: (index: number) => void
  testID?: string
}

const PhotoSlotItem = React.memo(function PhotoSlotItem(props: SlotProps) {
  const { slot, index, onAdd, onRemove, testID } = props
  const isEmpty = !slot || (!slot.uri && !slot.isUploading && !slot.error)
  const isUploading = slot?.isUploading
  const hasError = slot?.error

  const slotLabel = isEmpty
    ? `Photo slot ${index + 1}, empty`
    : isUploading
      ? `Photo slot ${index + 1}, uploading`
      : hasError
        ? `Photo slot ${index + 1}, error`
        : `Photo slot ${index + 1}, filled`

  const handleAdd = useCallback(() => {
    onAdd(index)
  }, [onAdd, index])

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [onRemove, index])

  // Empty slot
  if (isEmpty) {
    return (
      <Pressable
        onPress={handleAdd}
        role="button"
        aria-label={slotLabel}
        accessibilityRole="button"
        accessibilityLabel={slotLabel}
        data-testid={testID ? `${testID}-slot-${index}` : undefined}
      >
        <YStack
          width="100%"
          aspectRatio={1}
          borderWidth={2}
          borderStyle="dashed"
          borderColor="$borderColor"
          borderRadius="$3"
          backgroundColor="$background"
          alignItems="center"
          justifyContent="center"
          gap="$1"
          cursor="pointer"
        >
          <Camera size={24} color="$color2" aria-hidden />
          <Text
            fontSize="$1"
            color="$color2"
            fontFamily="$body"
          >
            Add Photo
          </Text>
        </YStack>
      </Pressable>
    )
  }

  // Uploading slot
  if (isUploading) {
    const progress = slot?.progress ?? 0

    return (
      <YStack
        width="100%"
        aspectRatio={1}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$3"
        backgroundColor="$gray3"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        aria-label={slotLabel}
        data-testid={testID ? `${testID}-slot-${index}` : undefined}
      >
        {/* Progress bar overlay */}
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={4}
          backgroundColor="$gray5"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Upload progress ${progress}%`}
        >
          <View
            height={4}
            backgroundColor="$color10"
            width={`${progress}%`}
          />
        </YStack>
        <Text
          fontSize="$2"
          color="$color2"
          fontFamily="$body"
        >
          {`${progress}%`}
        </Text>
      </YStack>
    )
  }

  // Error slot
  if (hasError) {
    return (
      <Pressable
        onPress={handleAdd}
        role="button"
        aria-label={`${slotLabel}. ${slot.error}. Press to retry`}
        accessibilityRole="button"
        accessibilityLabel={`${slotLabel}. ${slot.error}. Press to retry`}
        data-testid={testID ? `${testID}-slot-${index}` : undefined}
      >
        <YStack
          width="100%"
          aspectRatio={1}
          borderWidth={1}
          borderColor="$red10"
          borderRadius="$3"
          backgroundColor="$red3"
          alignItems="center"
          justifyContent="center"
          gap="$1"
          cursor="pointer"
        >
          <AlertTriangle size={20} color="$red10" aria-hidden />
          <Text
            fontSize="$1"
            color="$red10"
            fontFamily="$body"
            textAlign="center"
            paddingHorizontal="$1"
            numberOfLines={2}
          >
            {slot.error}
          </Text>
          <Text
            fontSize="$1"
            color="$color2"
            fontFamily="$body"
          >
            Tap to retry
          </Text>
        </YStack>
      </Pressable>
    )
  }

  // Filled slot
  return (
    <YStack
      width="100%"
      aspectRatio={1}
      borderRadius="$3"
      overflow="hidden"
      position="relative"
      aria-label={slotLabel}
      data-testid={testID ? `${testID}-slot-${index}` : undefined}
    >
      <Image
        source={{ uri: slot!.uri }}
        width="100%"
        height="100%"
        alt={`Photo ${index + 1}`}
        resizeMode="cover"
      />

      {/* Remove button overlay */}
      <Pressable
        onPress={handleRemove}
        role="button"
        aria-label={`Remove photo ${index + 1}`}
        accessibilityRole="button"
        accessibilityLabel={`Remove photo ${index + 1}`}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
        }}
        data-testid={testID ? `${testID}-remove-${index}` : undefined}
      >
        <View
          width={24}
          height={24}
          borderRadius={12}
          backgroundColor="rgba(0,0,0,0.6)"
          alignItems="center"
          justifyContent="center"
        >
          <X size={14} color="white" aria-hidden />
        </View>
      </Pressable>
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const PhotoGalleryUploader = React.memo(function PhotoGalleryUploader(
  props: PhotoGalleryUploaderProps,
) {
  const {
    photos,
    maxSlots = 6,
    onAdd,
    onRemove,
    testID,
  } = props

  // Build slot array: existing photos + empty slots up to maxSlots
  const slots = useMemo(() => {
    const result: (PhotoSlot | null)[] = [...photos]
    while (result.length < maxSlots) {
      result.push(null)
    }
    return result.slice(0, maxSlots)
  }, [photos, maxSlots])

  return (
    <YStack
      testID={testID}
      gap="$2"
      aria-label="Photo gallery"
      role="group"
    >
      <XStack flexWrap="wrap" gap="$2">
        {slots.map((slot, index) => (
          <YStack
            key={slot?.id ?? `empty-${index}`}
            width="31%"
            minWidth={80}
          >
            <PhotoSlotItem
              slot={slot}
              index={index}
              onAdd={onAdd}
              onRemove={onRemove}
              testID={testID}
            />
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
})
