import React from 'react'
import { Platform } from 'react-native'
import { Bold, Italic, Link, List, ListOrdered, Text, Underline, View, YStack } from '../_jsx-compat'

// TODO: React Native — requires platform-appropriate rich text solution

export type RichTextEditorProps = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  minHeight?: number
  maxHeight?: number
  testID?: string
}

// Web implementation loaded lazily to avoid bundling Tiptap in native
let WebRichTextEditor: React.ComponentType<RichTextEditorProps> | null = null

if (Platform.OS === 'web') {
  // Dynamic require so React Native bundler doesn't try to parse it
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createWebRichTextEditor } = require('./RichTextEditor.web') as {
    createWebRichTextEditor: () => React.ComponentType<RichTextEditorProps>
  }
  WebRichTextEditor = createWebRichTextEditor()
}

export function RichTextEditor(props: RichTextEditorProps) {
  if (Platform.OS !== 'web') {
    return (
      <YStack
        testID={props.testID}
        borderWidth={1}
        borderColor={props.error ? '$red10' : '$borderColor'}
        borderRadius="$3"
        overflow="hidden"
        opacity={props.disabled ? 0.5 : 1}
      >
        <View
          flexDirection="row"
          gap={4}
          padding={8}
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
          flexWrap="wrap"
          role="toolbar"
          aria-label="Text formatting"
        >
          <Bold size={16} color="$color2" />
          <Italic size={16} color="$color2" />
          <Underline size={16} color="$color2" />
          <List size={16} color="$color2" />
          <ListOrdered size={16} color="$color2" />
          <Link size={16} color="$color2" />
        </View>
        <YStack padding="$3" minHeight={props.minHeight ?? 120}>
          <Text fontSize="$4" color="$placeholderColor">
            {/* TODO: React Native — requires platform-appropriate rich text solution */}
            Rich text editing is not supported on this platform.
          </Text>
        </YStack>
      </YStack>
    )
  }

  if (WebRichTextEditor) {
    return <WebRichTextEditor {...props} />
  }

  return null
}
