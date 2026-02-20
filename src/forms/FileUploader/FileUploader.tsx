import { X } from '../_jsx-compat'
import React, { useCallback, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Text, View, XStack, YStack } from '../_jsx-compat'
import { DragAndDropZone } from '../DragAndDropZone/DragAndDropZone'
import { InlineError } from '../InlineError/InlineError'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export type FileUploaderProps = {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onSelect?: (files: File[]) => void
  disabled?: boolean
  error?: string
  testID?: string
}

export function FileUploader({
  accept,
  multiple = false,
  maxSize,
  onSelect,
  disabled = false,
  error,
  testID,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [sizeErrors, setSizeErrors] = useState<Record<string, string>>({})

  const processFiles = useCallback(
    (incoming: File[]) => {
      const errors: Record<string, string> = {}
      const valid: File[] = []
      for (const f of incoming) {
        if (maxSize !== undefined && f.size > maxSize) {
          errors[f.name] = `File exceeds max size of ${formatBytes(maxSize)}`
        } else {
          valid.push(f)
        }
      }
      const next = multiple ? [...files, ...valid] : valid
      setFiles(next)
      setSizeErrors(errors)
      onSelect?.(next)
    },
    [files, multiple, maxSize, onSelect],
  )

  const removeFile = useCallback(
    (name: string) => {
      const next = files.filter((f) => f.name !== name)
      setFiles(next)
      onSelect?.(next)
    },
    [files, onSelect],
  )

  const openPicker = useCallback(() => {
    if (Platform.OS === 'web') {
      inputRef.current?.click()
    }
    // TODO: React Native — use expo-document-picker or platform-appropriate solution
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(Array.from(e.target.files))
        // Reset so the same file can be re-selected
        e.target.value = ''
      }
    },
    [processFiles],
  )

  return (
    <YStack gap="$3" testID={testID}>
      <DragAndDropZone
        onDrop={processFiles}
        accept={accept ? [accept] : []}
        disabled={disabled}
      >
        <View
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius="$3"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          alignItems="center"
          justifyContent="center"
          opacity={disabled ? 0.5 : 1}
          onPress={openPicker}
        >
          <Text fontSize="$4" color="$color">
            Browse files
          </Text>
        </View>
      </DragAndDropZone>

      {Platform.OS === 'web' && (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      )}

      {error && <InlineError>{error}</InlineError>}

      {files.length > 0 && (
        <YStack gap="$1">
          {files.map((f) => (
            <YStack key={f.name}>
              <XStack
                alignItems="center"
                justifyContent="space-between"
                paddingVertical="$1"
                paddingHorizontal="$2"
                borderRadius="$2"
                backgroundColor="$color2"
              >
                <Text fontSize="$3" color="$color" flex={1} numberOfLines={1}>
                  {f.name} ({formatBytes(f.size)})
                </Text>
                <View
                  onPress={() => removeFile(f.name)}
                  aria-label={`Remove ${f.name}`}
                >
                  <X size={14} color="$color2" />
                </View>
              </XStack>
              {sizeErrors[f.name] && <InlineError>{sizeErrors[f.name]}</InlineError>}
            </YStack>
          ))}
        </YStack>
      )}
    </YStack>
  )
}
