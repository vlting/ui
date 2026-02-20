import { Plus, X } from '../_jsx-compat'
import React, { useCallback, useRef } from 'react'
import { Platform } from 'react-native'
import { Image, Text, View, XStack, YStack } from '../_jsx-compat'

export type MultiImageUploaderProps = {
  value?: string[]
  onChange?: (files: File[]) => void
  maxImages?: number
  disabled?: boolean
  testID?: string
}

export function MultiImageUploader({
  value = [],
  onChange,
  maxImages,
  disabled = false,
  testID,
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const selectedFiles = useRef<File[]>([])

  const canAdd = maxImages === undefined || value.length < maxImages

  const openPicker = useCallback(() => {
    if (Platform.OS === 'web') {
      inputRef.current?.click()
    }
    // TODO: React Native — use expo-image-picker or platform-appropriate solution
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files)
        selectedFiles.current = [...selectedFiles.current, ...newFiles]
        onChange?.(selectedFiles.current)
        e.target.value = ''
      }
    },
    [onChange],
  )

  const handleRemove = useCallback(
    (index: number) => {
      selectedFiles.current = selectedFiles.current.filter((_, i) => i !== index)
      onChange?.(selectedFiles.current)
    },
    [onChange],
  )

  return (
    <XStack flexWrap="wrap" gap="$2" testID={testID}>
      {value.map((src, i) => (
        <View
          key={src}
          width={80}
          height={80}
          borderRadius="$2"
          overflow="hidden"
          position="relative"
        >
          <Image
            source={{ uri: src }}
            width={80}
            height={80}
            alt={`Image ${i + 1}`}
          />
          {!disabled && (
            <View
              position="absolute"
              top={2}
              right={2}
              width={20}
              height={20}
              borderRadius={10}
              backgroundColor="$background"
              alignItems="center"
              justifyContent="center"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              onPress={() => handleRemove(i)}
              aria-label={`Remove image ${i + 1}`}
            >
              <X size={10} color="$color" />
            </View>
          )}
        </View>
      ))}

      {canAdd && !disabled && (
        <View
          width={80}
          height={80}
          borderRadius="$2"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="$borderColor"
          alignItems="center"
          justifyContent="center"
          backgroundColor="$background"
          onPress={openPicker}
          aria-label="Add image"
        >
          <Plus size={24} color="$color2" />
          <Text fontSize="$2" color="$color2" marginTop="$1">
            Add
          </Text>
        </View>
      )}

      {Platform.OS === 'web' && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={maxImages === undefined || maxImages - value.length > 1}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      )}

      {value.length === 0 && disabled && (
        <YStack>
          <Text fontSize="$3" color="$color2">
            No images
          </Text>
        </YStack>
      )}
    </XStack>
  )
}
