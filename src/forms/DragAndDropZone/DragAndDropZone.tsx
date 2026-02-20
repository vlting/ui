import { Upload } from '../_jsx-compat'
import React, { useCallback, useId, useState } from 'react'
import { Platform } from 'react-native'
import { Text, YStack } from '../_jsx-compat'

function filterByAccept(files: FileList | File[], accept: string[]): File[] {
  const list: File[] = Array.from(files)
  if (accept.length === 0) return list
  return list.filter((f) => {
    return accept.some((ext) => {
      if (ext.startsWith('.')) return f.name.toLowerCase().endsWith(ext.toLowerCase())
      if (ext.includes('/')) return f.type === ext
      return false
    })
  })
}

export type DragAndDropZoneProps = {
  onDrop?: (files: File[]) => void
  accept?: string[]
  disabled?: boolean
  children?: React.ReactNode
  testID?: string
}

export function DragAndDropZone({
  onDrop,
  accept = [],
  disabled = false,
  children,
  testID,
}: DragAndDropZoneProps) {
  const descId = useId()
  const [dragging, setDragging] = useState(false)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return
      e.preventDefault()
      setDragging(true)
    },
    [disabled],
  )

  const handleDragLeave = useCallback(() => {
    setDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return
      e.preventDefault()
      setDragging(false)
      const files = filterByAccept(e.dataTransfer.files, accept)
      if (files.length > 0) onDrop?.(files)
    },
    [disabled, accept, onDrop],
  )

  if (Platform.OS !== 'web') {
    // TODO: React Native — requires platform-appropriate file picker solution
    return (
      <YStack
        alignItems="center"
        justifyContent="center"
        padding="$6"
        borderRadius="$3"
        borderWidth={2}
        borderColor="$borderColor"
        backgroundColor="$background"
        testID={testID}
      >
        <Text fontSize="$3" color="$color2">
          File upload not supported on this platform
        </Text>
      </YStack>
    )
  }

  return (
    <>
      <Text id={descId} position="absolute" width={1} height={1} overflow="hidden">
        Drag and drop files here, or press to browse
      </Text>
      <YStack
        testID={testID}
        alignItems="center"
        justifyContent="center"
        gap="$2"
        padding="$6"
        borderRadius="$3"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={dragging ? '$color10' : '$borderColor'}
        backgroundColor={dragging ? '$backgroundHover' : '$background'}
        opacity={disabled ? 0.5 : 1}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="File drop zone"
        aria-describedby={descId}
        aria-disabled={disabled}
      >
        {children ?? (
          <>
            <Upload size={24} color="$color2" />
            <Text fontSize="$4" color="$color">
              Drag & drop files here
            </Text>
            <Text fontSize="$3" color="$color2">
              or click to browse
            </Text>
          </>
        )}
      </YStack>
    </>
  )
}
